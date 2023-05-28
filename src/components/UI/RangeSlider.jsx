import { useState } from 'react';
import Slider from '@mui/material/Slider';

// function valuetext(value) {
//   return `${value}`;
// }

const minDistance = 5;

export default function RangeSlider(props) {
  //value or setValue are from useState
  const { min, max, value, setValue, formatSymbol } = props;
  function valueLabelFormat(value) {
    if (value >= 1000000) {
      return `${formatSymbol}` + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return `${formatSymbol}` + (value / 1000).toFixed(1) + ' K';
    } else {
      return `${formatSymbol}` + value;
    }
  }
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <>
      <style>
        {`
    .css-187mznn-MuiSlider-root {
      color: var(--primary-purple);
      box-sizing: border-box;
      width: 99%;
     
  
  }
  .css-eg0mwd-MuiSlider-thumb:hover{
      box-shadow: none;
      
  }
  .css-eg0mwd-MuiSlider-thumb:active{
      box-shadow: none;
      
  }
  
  .css-eg0mwd-MuiSlider-thumb.Mui-active{
      box-shadow: none;
      
  }
  
  .css-nnid7-MuiSlider-valueLabel{
      background: var(--black);
      padding: 0.15em 0.75em;
      font-size: 0.8em;
      
  
  } `}
      </style>

      <Slider
        min={min}
        max={max}
        getAriaLabel={() => 'Minimum distance'}
        defaultValue={900}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        valueLabelFormat={valueLabelFormat}
        disableSwap
      />
    </>
  );
}
