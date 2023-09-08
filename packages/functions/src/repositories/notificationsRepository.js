import {Firestore} from '@google-cloud/firestore';
import {getOrdersGraphQLQuery} from '../services/shopifyGraphQL';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const notificationsRef = firestore.collection('notifications');

/**
 * @param {string} shopId
 * @param {string} page
 * @param {string} limit
 * @param {string} sort
 * @param {string} shopifyDomain
 * @param {string} accessToken
 * @param {Object} orderData
 * @returns {Object}
 */

export async function addNewNotification({shopId, shopifyDomain, data}) {
  await notificationsRef.add({
    ...data,
    shopId: shopId,
    shopifyDomain: shopifyDomain
  });
}

export async function getNotificationItem(shopify, orderData) {
  const productWithId = await shopify.product.get(orderData.line_items[0].product_id);

  const notification = {
    timestamp: orderData.updated_at,
    firstName: orderData.billing_address.first_name,
    city: orderData.billing_address.city,
    country: orderData.billing_address.country,
    productId: orderData.line_items[0].product_id,
    productName: orderData.line_items[0].name,
    productImage: productWithId.images[0].src
  };

  return notification;
}

export async function getNotifications({shopId, page = 1, limit = 5, sort = 'desc'}) {
  const baseQuery = notificationsRef.where('shopId', '==', shopId);

  const countRef = baseQuery.get();

  const paginateNotifications = baseQuery
    .orderBy('timestamp', sort === 'asc' ? 'asc' : 'desc')
    .limit(parseInt(limit))
    .offset((parseInt(page) - 1) * parseInt(limit))
    .get();

  const [countSnapshot, notificationsSnapshot] = await Promise.all([
    countRef,
    paginateNotifications
  ]);

  if (countRef.empty || paginateNotifications.empty) {
    return null;
  }

  const count = countSnapshot.size;

  const notifications = notificationsSnapshot.docs.map(doc => {
    return {
      ...doc.data(),
      id: doc.id
    };
  });

  const pageInfo = {
    count,
    page: parseInt(page),
    limit: parseInt(limit),
    sort
  };

  return {count, pageInfo, notifications};
}

export async function syncNotifications({shopifyDomain, shopId, accessToken}) {
  const response = await getOrdersGraphQLQuery(shopifyDomain, accessToken);

  const orders = response.orders.edges.map(item => {
    const notification = {
      timestamp: new Date(item.node.updatedAt),
      firstName: item.node?.billingAddress.firstName,
      city: item.node?.billingAddress.city,
      country: item.node?.billingAddress.country,
      productName: item.node?.lineItems.edges[0].node.name,
      productImage: item.node?.lineItems.edges[0].node.product.featuredImage.url,
      productId: parseInt(item.node?.lineItems.edges[0].node.product.id.match(/\d+/)[0]),
      shopId: shopId,
      shopifyDomain: shopifyDomain
    };
    return notificationsRef.add(notification);
  });
  await Promise.all(orders);

  return orders;
}
