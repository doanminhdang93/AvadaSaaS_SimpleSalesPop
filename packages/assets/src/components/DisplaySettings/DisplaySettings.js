import {Checkbox, FormLayout, RangeSlider, TextField, TextStyle} from '@shopify/polaris';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import './DisplaySettings.css';
import React from 'react';
import defaultSettings from '../../const/defaultSettings';

const DisplaySettings = ({settings = defaultSettings, handleChangeSettings}) => {
  const onTyping = (key, val, max) => {
    let valToNumber = +val;
    // if (val?.trim() === '') valToNumber = 0;
    if (valToNumber < 0) return;
    if (Number.isNaN(valToNumber)) return;
    if (valToNumber > max) valToNumber = max;
    handleChangeSettings(key, valToNumber);
  };
  const rangeSliderSettings = [
    {
      label: 'Display duration',
      minValue: 0,
      maxValue: 100,
      value: settings.displayDuration,
      key: 'displayDuration',
      helpText: 'How long each pop will display on your page',
      suffix: 'second(s)'
    },
    {
      label: 'Time before the first pop',
      minValue: 0,
      maxValue: 100,
      value: settings.firstDelay,
      key: 'firstDelay',
      helpText: 'The delay time before the first notification',
      suffix: 'second(s)'
    },
    {
      label: 'Gap time between two pops',
      minValue: 0,
      maxValue: 100,
      value: settings.popsInterval,
      key: 'popsInterval',
      helpText: 'The time interval between two popup notifications',
      suffix: 'second(s)'
    },
    {
      label: 'Maximum of popups',
      minValue: 0,
      maxValue: 80,
      value: settings.maxPopsDisplay,
      key: 'maxPopsDisplay',
      helpText:
        'The maximum number of popups are allowed to show after page loading. Maximum number is 80.',
      suffix: 'pop(s)'
    }
  ];
  return (
    <FormLayout>
      <TextStyle variation="strong">APPEARANCE</TextStyle>
      <DesktopPositionInput value={settings.position} onChange={handleChangeSettings} />

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

      <FormLayout.Group>
        {rangeSliderSettings.map((item, index) => (
          <RangeSlider
            key={index}
            output
            label={item.label}
            min={item.minValue}
            max={item.maxValue}
            value={item.value}
            onChange={val => handleChangeSettings(item.key, val)}
            helpText={item.helpText}
            suffix={
              <div style={{width: '112px'}}>
                <TextField
                  value={`${item.value}`}
                  autoComplete="off"
                  suffix={`${item.suffix}`}
                  onChange={val => onTyping(item.key, val, item.maxValue)}
                ></TextField>
              </div>
            }
          ></RangeSlider>
        ))}
      </FormLayout.Group>
    </FormLayout>
  );
};

export default DisplaySettings;
