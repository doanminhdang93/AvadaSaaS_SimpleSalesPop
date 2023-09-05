import React, {useState} from 'react';
import {Card, Tabs, Page, Layout, Loading} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DisplaySettings from '../../components/DisplaySettings/DisplaySettings';
import TriggersSettings from '../../components/TriggerSettings/TriggersSettings';
import defaultSettings from '../../const/defaultSettings';
import '../../styles/components/settings.css';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const {data: input, setData: setInput, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });

  const {editing, handleEdit} = useEditApi({url: '/settings'});

  const handleInputChange = (key, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [key]: value
    }));
  };

  const handleSave = async () => {
    await handleEdit(input);
  };

  const primaryAction = {
    content: 'Save',
    onAction: () => {
      handleSave();
    },
    loading: editing
  };

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
      bodyContent: <TriggersSettings settings={input} handleChangeSettings={handleInputChange} />
    }
  ];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Page
          fullWidth
          title="Settings"
          subtitle="Decide how your notifications will display"
          primaryAction={primaryAction}
        >
          <Layout>
            <Layout.Section secondary>
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
      )}
    </>
  );
};

export default Settings;
