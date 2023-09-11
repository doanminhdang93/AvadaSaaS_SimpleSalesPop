import {EmptyState} from '@shopify/polaris';
import React from 'react';
import {EMPTY_STATE_IMG} from '../theme';

const EmptyStateMarkup = () => {
  return <EmptyState heading="No notifications found!" image={EMPTY_STATE_IMG} />;
};

export default EmptyStateMarkup;
