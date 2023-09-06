import {Labelled, Stack, TextStyle} from '@shopify/polaris';
import './desktopPositionInput.css';
import React from 'react';

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];

const DesktopPositionInput = ({label, value, onChange, options = defaultOptions}) => {
  return (
    <>
      <TextStyle>Desktop Position</TextStyle>
      <Labelled label={label} helpText="The display position of the pop on your website">
        <Stack>
          {options.map((option, key) => (
            <div
              key={key}
              className={`Avada-DesktopPosition ${
                value === option.value ? 'Avada-DesktopPosition--selected' : ''
              }`}
              onClick={() => onChange('position', option.value)}
            >
              <div
                className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
              ></div>
            </div>
          ))}
        </Stack>
      </Labelled>
    </>
  );
};

export default DesktopPositionInput;
