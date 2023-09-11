import React, {useState} from 'react';
import {Card, Tabs, Page, Layout} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DisplaySettings from '../../components/DisplaySettings/DisplaySettings';
import TriggersSettings from '../../components/TriggerSettings/TriggersSettings';
import defaultSettings from '../../const/defaultSettings';
import '../../styles/components/settings.css';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import SkeletonSettings from '../../loadables/Settings/SkeletonSettings';

const Settings = () => {
  const {data: input, setData: setInput, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const handleInputChange = (key, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [key]: value
    }));
  };

  const [message, setMessage] = useState('');
  const {editing, handleEdit} = useEditApi({url: '/settings'});
  const handleSave = async () => {
    try {
      if (input.allowShow === 'specific' && !input.includedUrls.trim()) {
        throw new Error('You need to enter a valid included pages!');
      }
      await handleEdit(input);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const primaryAction = {
    content: 'Save',
    onAction: () => {
      handleSave();
    },
    loading: editing,
    disabled: loading
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = selectedTabIndex => {
    setSelectedTab(selectedTabIndex);
  };
  const tabs = [
    {
      id: 'display-settings',
      content: 'Display',
      bodyContent: <DisplaySettings settings={input} handleChangeSettings={handleInputChange} />
    },
    {
      id: 'triggers-settings',
      content: 'Triggers',
      bodyContent: (
        <TriggersSettings
          message={message}
          settings={input}
          handleChangeSettings={handleInputChange}
        />
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
      {loading && <SkeletonSettings />}
      {!loading && (
        <Layout>
          <Layout.Section secondary>
            <NotificationPopup settings={input} />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                {tabs[selectedTab].bodyContent}
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
};

export default Settings;
