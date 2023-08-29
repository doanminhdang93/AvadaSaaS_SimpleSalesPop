import {Checkbox, Stack, TextStyle} from '@shopify/polaris';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import TimeSettings from '../TimeSettings/TimeSettings';
import defaultSettings from '../../const/defaultSettings';
import './DisplaySettings.css';
import React from 'react';

const DisplaySettings = ({settings, handleChangeSettings}) => {
  return (
    <Stack vertical>
      <TextStyle variation="strong">APPEARANCE</TextStyle>
      <DesktopPositionInput
        value={settings.position}
        onChange={handleChangeSettings}
      ></DesktopPositionInput>

      <Checkbox
        label="Hide time ago"
        checked={settings.hideTimeAgo}
        onChange={() => handleChangeSettings('hideTimeAgo', !settings.hideTimeAgo)}
      />
      <Checkbox
        label="Truncate content text"
        checked={settings.truncateProductName}
        onChange={() => handleChangeSettings('truncateProductName', !settings.truncateProductName)}
        helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
      />

      <TextStyle variation="strong">TIMING</TextStyle>

      <TimeSettings settings={settings} handleChangeSettings={handleChangeSettings}></TimeSettings>
    </Stack>
  );
};

export default DisplaySettings;
