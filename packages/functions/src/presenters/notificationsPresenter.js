import moment from 'moment';

export async function notificationsPresenter(notifications) {
  const notificationsPresented = notifications.map(notification => {
    const timestampToMoment = moment(
      notification.timestamp._seconds * 1000 + notification.timestamp._nanoseconds / 1000000
    ).fromNow();
    return {
      ...notification,
      timestamp: timestampToMoment
    };
  });

  return notificationsPresented;
}
