import moment from 'moment';

/**
 *
 * @param {Array} notifications
 * @returns {Array}
 */
export function presentNotifications(notifications) {
  const notificationsPresented = notifications.map(notification => {
    const timestampToMoment = moment(notification.timestamp.toDate()).fromNow();
    return {
      ...notification,
      timestamp: timestampToMoment
    };
  });

  return notificationsPresented;
}
