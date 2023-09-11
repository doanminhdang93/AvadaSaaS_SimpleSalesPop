import {
  Card,
  FormLayout,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer
} from '@shopify/polaris';
import React from 'react';

export default function SkeletonSettings() {
  return (
    <Layout>
      <Layout.Section secondary>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText />
            <SkeletonBodyText lines={10} />
          </TextContainer>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
