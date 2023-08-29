import {Select, TextField, Stack, TextStyle} from '@shopify/polaris';
import './TriggerSettings.css';
import React from 'react';

const TriggersSettings = ({settings, handleChangeSettings}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  return (
    <Stack vertical>
      <TextStyle variation="strong">PAGES RESTRICTION</TextStyle>

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
    </Stack>
  );
};

export default TriggersSettings;
