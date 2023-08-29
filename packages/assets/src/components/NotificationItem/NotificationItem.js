import {Stack, ResourceItem} from '@shopify/polaris';
import React from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const NotificationsItem = ({item}) => {
  const {id, firstName, city, country, productName, timestamp, productImage} = item;
  //   console.log(item);
  return (
    <ResourceItem id={id} accessibilityLabel={`View details for ${productName}`} persistActions>
      <Stack distribution="equalSpacing">
        <NotificationPopup
          firstName={firstName}
          productImage={productImage}
          city={city}
          country={country}
          timestamp={timestamp}
        ></NotificationPopup>

        <p style={{fontWeight: '500'}}>From March 8, 2021</p>
      </Stack>
    </ResourceItem>
  );
};

export default NotificationsItem;
