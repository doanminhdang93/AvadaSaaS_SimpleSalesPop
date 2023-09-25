import {Card, Layout, Page, Pagination, ResourceItem, ResourceList, Stack} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationsItem from '../../components/NotificationItem/NotificationItem';
import useFetchApi from '../../hooks/api/useFetchApi';
import EmptyStateMarkup from '../../config/emptyState/emptyState';

const Notifications = () => {
  const [sortValue, setSortValue] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const {data: notifications, loading, pageInfo, count, fetchApi, fetched} = useFetchApi({
    url: '/notifications',
    initQueries: {
      page: currentPage,
      sort: sortValue
    }
  });

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const handleSortChange = async selected => {
    setSortValue(selected);
    await fetchApi('/notifications', {page: 1, sort: selected});
    setCurrentPage(1);
  };

  const handlePageChange = async newPage => {
    setCurrentPage(newPage);
    await fetchApi('/notifications', {page: newPage, sort: sortValue});
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
              emptyState={fetched && <EmptyStateMarkup />}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              sortValue={sortValue}
              totalItemsCount={count}
              renderItem={item => (
                <ResourceItem
                  id={item.id}
                  accessibilityLabel={`View details for ${item.productName}`}
                >
                  <NotificationsItem item={item} />
                </ResourceItem>
              )}
              sortOptions={[
                {label: 'Newest update', value: 'desc'},
                {label: 'Oldest update', value: 'asc'}
              ]}
              onSortChange={selected => {
                handleSortChange(selected);
              }}
            ></ResourceList>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasPrevious={currentPage > 1}
              onPrevious={() => handlePageChange(currentPage - 1)}
              hasNext={currentPage < Math.ceil(count / pageInfo.limit)}
              onNext={() => handlePageChange(currentPage + 1)}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Notifications;
