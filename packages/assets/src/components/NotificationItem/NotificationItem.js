import {Stack, ResourceItem, TextStyle} from '@shopify/polaris';
import React from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const NotificationsItem = ({item}) => {
  const {id, firstName, city, country, productName, timestamp, productImage} = item;
  //   console.log(item);
  return (
    <Stack distribution="equalSpacing">
      <NotificationPopup
        firstName={firstName}
        productImage={productImage}
        city={city}
        country={country}
        timestamp={timestamp}
      ></NotificationPopup>

      <TextStyle variation="strong">From March 8, 2021</TextStyle>
    </Stack>
  );
};

export default NotificationsItem;
