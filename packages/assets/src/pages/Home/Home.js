import React, {useState} from 'react';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';

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
                if (!enabled) {
                  window.location.href =
                    'https://admin.shopify.com/store/avada-saas-training/themes/158295490877/editor?context=apps&appEmbed=53faea18-cde3-459d-898f-6dd454970b4a%2F/app-embed';
                }
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
