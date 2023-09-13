import moment from 'moment';

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
