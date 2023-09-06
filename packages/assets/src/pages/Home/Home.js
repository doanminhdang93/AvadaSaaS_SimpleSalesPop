import React, {useEffect, useState} from 'react';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import {api} from '../../helpers';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Page fullWidth title="Home">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <TextStyle>
              App status is{' '}
              <TextStyle variation="strong">{enabled ? 'enabled' : 'disabled'}</TextStyle>
            </TextStyle>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
