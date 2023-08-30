import React from 'react';
import {Layout, RangeSlider, TextField} from '@shopify/polaris';
import './TimeSettings.css';

const TimeSettings = ({settings, handleChangeSettings}) => {
  const rangeSliderSettings = [
    {
      label: 'Display duration',
      minValue: 0,
      maxValue: 100,
      value: settings.displayDuration,
      onChange: value => handleChangeSettings('displayDuration', value),
      helpText: 'How long each pop will display on your page',
      suffix: 'second(s)'
    },
    {
      label: 'Time before the first pop',
      minValue: 0,
      maxValue: 100,
      value: settings.firstDelay,
      onChange: value => handleChangeSettings('firstDelay', value),
      helpText: 'The delay time before the first notification',
      suffix: 'second(s)'
    },
    {
      label: 'Gap time between two pops',
      minValue: 0,
      maxValue: 100,
      value: settings.popsInterval,
      onChange: value => handleChangeSettings('popsInterval', value),
      helpText: 'The time interval between two popup notifications',
      suffix: 'second(s)'
    },
    {
      label: 'Maximum of popups',
      minValue: 0,
      maxValue: 80,
      value: settings.maxPopsDisplay,
      onChange: value => handleChangeSettings('maxPopsDisplay', value),
      helpText:
        'The maximum number of popups are allowed to show after page loading. Maximum number is 80.',
      suffix: 'pop(s)'
    }
  ];
  return (
    <Layout>
      {rangeSliderSettings.map((item, index) => (
        <Layout.Section oneThird>
          <RangeSlider
            key={index}
            output
            label={item.label}
            minValue={item.minValue}
            maxValue={item.maxValue}
            value={item.value}
            onChange={item.onChange}
            helpText={item.helpText}
            suffix={
              <div style={{width: '112px'}}>
                <TextField
                  value={`${item.value}`}
                  autoComplete="off"
                  suffix={`${item.suffix}`}
                ></TextField>
              </div>
            }
          ></RangeSlider>
        </Layout.Section>
      ))}
    </Layout>
  );
};

export default TimeSettings;
