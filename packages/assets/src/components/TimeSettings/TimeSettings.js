import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';
import './TimeSettings.css';

const TimeSettings = ({settings, handleChangeSettings}) => {
  return (
    <div className="Avada-TimeSettings__Content">
      <RangeSliderComponent
        label="Display duration"
        minValue={0}
        maxValue={100}
        value={settings.displayDuration}
        onChange={value => handleChangeSettings('displayDuration', value)}
        helpText="How long each pop will display on your page"
        suffix="second(s)"
      ></RangeSliderComponent>

      <RangeSliderComponent
        label="Time before the first pop"
        minValue={0}
        maxValue={100}
        value={settings.firstDelay}
        onChange={value => handleChangeSettings('firstDelay', value)}
        helpText="The delay time before the first notification"
        suffix="second(s)"
      ></RangeSliderComponent>

      <RangeSliderComponent
        label="Gap time between two pops"
        minValue={0}
        maxValue={100}
        value={settings.popsInterval}
        onChange={value => handleChangeSettings('popsInterval', value)}
        helpText="The time interval between two popup notifications"
        suffix="second(s)"
      ></RangeSliderComponent>

      <RangeSliderComponent
        label="Maximum of popups"
        minValue={0}
        maxValue={80}
        value={settings.maxPopsDisplay}
        onChange={value => handleChangeSettings('maxPopsDisplay', value)}
        helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
        suffix="pop(s)"
      ></RangeSliderComponent>
    </div>
  );
};

const RangeSliderComponent = ({label, minValue, maxValue, value, onChange, suffix, helpText}) => {
  return (
    <RangeSlider
      output
      label={label}
      min={minValue}
      max={maxValue}
      value={value}
      onChange={onChange}
      helpText={helpText}
      suffix={
        <div style={{width: '112px'}}>
          <TextField value={`${value}`} autoComplete="off" suffix={`${suffix}`}></TextField>
        </div>
      }
    ></RangeSlider>
  );
};

export default TimeSettings;
