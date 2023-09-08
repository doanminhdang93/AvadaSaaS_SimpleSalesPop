import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

/**
 * @param {string} shopId
 * @param {Object} data
 * @param {Object} updatedData
 * @returns {Object}
 */
export async function addNewSetting(shopId, data) {
  const setting = await getSetting(shopId);
  if (!setting) {
    return settingRef.add({
      ...data,
      shopId: shopId
    });
  }
}

export async function getSetting(shopId) {
  const settingDocs = await settingRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    return null;
  }
  const settingDoc = settingDocs.docs[0];

  return {
    ...settingDoc.data(),
    id: settingDoc.id
  };
}

export async function updateSetting(shopId, updatedData) {
  const settingDocs = await settingRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (settingDocs.empty) {
    return;
  }

  const settingDoc = settingDocs.docs[0];
  await settingRef.doc(settingDoc.id).update(updatedData);
}
