import {Select, TextField, FormLayout, Card} from '@shopify/polaris';
import React from 'react';
import defaultSettings from '../../const/defaultSettings';

const TriggersSettings = ({message, handleChangeSettings, settings = defaultSettings}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  return (
    <Card.Section title={`PAGES RESTRICTION`}>
      <FormLayout>
        <Select
          options={options}
          onChange={value => handleChangeSettings('allowShow', value)}
          value={settings.allowShow}
        ></Select>

        {settings.allowShow === 'specific' && (
          <TextField
            label="Included pages"
            value={settings.includedUrls}
            onChange={value => handleChangeSettings('includedUrls', value)}
            multiline={4}
            autoComplete="off"
            helpText="Page URLs to show the pop-up (separated by new lines)"
            error={message}
            autoFocus
          ></TextField>
        )}

        <TextField
          label="Excluded pages"
          value={settings.excludedUrls}
          onChange={value => handleChangeSettings('excludedUrls', value)}
          multiline={4}
          autoComplete="off"
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
        ></TextField>
      </FormLayout>
    </Card.Section>
  );
};

export default TriggersSettings;
