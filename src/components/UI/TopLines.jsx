import React from 'react';

const TopLines = (props) => {
  const { right, flip } = props;
  // in direction just right or left is required for prop!
  return (
    <div
      className={`absolute flex flex-col items-end gap-2 top-0 ${right} pt-1 ${flip}`}
    >
      <div>
        <img src="/lines/line1.png" alt="" className="w-full h-full" />
      </div>
      <div>
        <img src="/lines/line2.png" alt="" className="w-full h-full" />
      </div>
      <div>
        <img src="/lines/line3.png" alt="" className="w-full h-full" />
      </div>
      <div>
        <img src="/lines/line4.png" alt="" className="w-full h-full" />
      </div>
      <div>
        <img src="/lines/line5.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default TopLines;
