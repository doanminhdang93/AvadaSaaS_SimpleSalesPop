import React, {useState} from 'react';
import {Card, Tabs, Page, Layout} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DisplaySettings from '../../components/DisplaySettings/DisplaySettings';
import TriggersSettings from '../../components/TriggerSettings/TriggersSettings';
import defaultSettings from '../../const/defaultSettings';
import '../../styles/components/settings.css';

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSave = () => {
    console.log(settings);
  };
  const primaryAction = {
    content: 'Save',
    onAction: () => {
      handleSave();
    }
  };

  const handleTabChange = selectedTabIndex => {
    setSelectedTab(selectedTabIndex);
  };
  const tabs = [
    {
      id: 'display-settings',
      content: 'Display',
      bodyContent: (
        <DisplaySettings settings={settings} handleChangeSettings={handleChangeSettings} />
      )
    },
    {
      id: 'triggers-settings',
      content: 'Triggers',
      bodyContent: (
        <TriggersSettings settings={settings} handleChangeSettings={handleChangeSettings} />
      )
    }
  ];
  return (
    <Page
      fullWidth
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={primaryAction}
    >
      <br />
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <Card.Section>{tabs[selectedTab].bodyContent}</Card.Section>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Settings;
