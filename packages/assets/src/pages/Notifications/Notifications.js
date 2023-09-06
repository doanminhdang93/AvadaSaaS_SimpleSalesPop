import {Card, Layout, Page, Pagination, ResourceItem, ResourceList, Stack} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationsItem from '../../components/NotificationItem/NotificationItem';
import useFetchApi from '../../hooks/api/useFetchApi';

const Notifications = () => {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);

  const {data: notifications, setData, loading} = useFetchApi({
    url: '/notifications'
  });

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  return (
    <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={loading}
              resourceName={resourceName}
              items={notifications}
              selectable
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              sortValue={sortValue}
              renderItem={item => (
                <ResourceItem
                  id={item.id}
                  accessibilityLabel={`View details for ${item.productName}`}
                  persistActions
                >
                  <NotificationsItem item={item} />
                </ResourceItem>
              )}
              promotedBulkActions={[
                {
                  content: 'Delete'
                }
              ]}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                // console.log(`Sort option changed to ${selected}.`);
              }}
            ></ResourceList>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasPrevious
              onPrevious={() => {
                //   console.log("Previous");
              }}
              hasNext
              onNext={() => {
                //   console.log("Next");
              }}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Notifications;
