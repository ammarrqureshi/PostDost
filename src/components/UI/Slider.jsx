import Slider from '@mui/material/Slider';

function valueLabelFormat(value) {
  return `${value}K`;
}
const marks = [
  { value: 0, label: '0' },
  { value: 450, label: '450' },
];

export default function Sliderr(props) {
  //value or setValue are from useState
  const { min, max, value, setValue } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
        // getAriaValueText={valuetext}
        valueLabelFormat={valueLabelFormat}
      />
    </>
  );
}
