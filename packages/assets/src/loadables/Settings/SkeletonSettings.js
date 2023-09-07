import {
  Card,
  FormLayout,
  Layout,
  SkeletonBodyText,
  SkeletonPage,
  SkeletonThumbnail,
  TextContainer
} from '@shopify/polaris';
import React from 'react';

export default function SkeletonSettings() {
  return (
    <SkeletonPage fullWidth>
      <Layout>
        <Layout.Section secondary>
          <SkeletonBodyText />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <SkeletonBodyText lines={10} />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
