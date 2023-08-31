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
  // const options = {
  //   method: 'POST',
  //   body: {
  //     displayDuration: 55,
  //     includedUrls: '',
  //     maxPopsDisplay: 20,
  //     firstDelay: 35,
  //     truncateProductName: false,
  //     excludedUrls: '',
  //     allowShow: 'specific',
  //     position: 'bottom-left',
  //     hideTimeAgo: true,
  //     popsInterval: 30
  //   }
  // };
  // async function callApi() {
  //   await api('/settings', options);
  //   // console.log(data);
  // }
  // useEffect(() => {
  //   callApi();
  // }, []);

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
