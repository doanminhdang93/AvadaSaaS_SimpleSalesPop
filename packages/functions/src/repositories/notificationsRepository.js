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
 * @param {string} id
 * @returns {Object}
 */
export async function getNotifications({shopId, page = 1, limit = 3, sort = 'desc'}) {
  const baseQuery = await notificationsRef.where('shopId', '==', shopId);

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
      shopId: shopId
    };
    return notificationsRef.add(notification);
  });
  await Promise.all(orders);

  return orders;
}
