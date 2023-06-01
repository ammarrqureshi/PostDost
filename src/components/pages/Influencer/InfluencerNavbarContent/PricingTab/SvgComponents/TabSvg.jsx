import React from 'react';

const TabSvg = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 20 18" fill="none"  xmlns="http://www.w3.org/2000/svg">
     <path d="M1 5H18.7778L17.7901 17H1.98765L1 5Z" stroke={props.color} strokeOpacity="100" strokeWidth="2" strokeLinejoin="round"/>
<path d="M5.9386 6.77778V1H13.8398V6.77778" stroke={props.color} strokeOpacity="100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.9386 13.4445H13.8398" stroke={props.color} strokeOpacity="100" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default TabSvg;