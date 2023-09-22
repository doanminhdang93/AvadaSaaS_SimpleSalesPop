import {Stack, TextStyle} from '@shopify/polaris';
import React from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import moment from 'moment';

const NotificationsItem = ({item}) => {
  const {firstName, city, country, productName, timestamp, productImage} = item;

  const seconds = timestamp._seconds;
  const nanoSeconds = timestamp._nanoseconds;
  const notificationsTimestamp = seconds * 1000 + nanoSeconds / 1000000;

  const formattedDate = moment(notificationsTimestamp).format('MMMM DD, YYYY');

  return (
    <Stack distribution="equalSpacing">
      <NotificationPopup
        firstName={firstName}
        city={city}
        country={country}
        productName={productName}
        timestamp={notificationsTimestamp}
        productImage={productImage}
        // settings={data}
      ></NotificationPopup>

      <TextStyle variation="strong">From {formattedDate}</TextStyle>
    </Stack>
  );
};

export default NotificationsItem;
