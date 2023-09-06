import {Firestore} from '@google-cloud/firestore';
import {getOrdersGraphQLQuery, handleOrdersGraphQL} from '../services/shopifyGraphQL';

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
export async function getNotifications(shopId) {
  const notificationsDocs = await notificationsRef.where('shopId', '==', shopId).get();
  if (notificationsDocs.empty) {
    return null;
  }
  const notificationsDoc = notificationsDocs.docs.map(doc => {
    return {
      ...doc.data(),
      id: doc.id
    };
  });

  return notificationsDoc;
}

export async function syncNotifications({shopifyDomain, shopId, accessToken}) {
  const response = getOrdersGraphQLQuery(shopifyDomain, accessToken);

  const orders = handleOrdersGraphQL(response, shopId);

  orders.forEach(order => {
    notificationsRef.add(order);
  });

  return orders;
}
