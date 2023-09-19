import React, { useState } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import women from '../../../assets/ContentManager/women.png';
const Post = (props) => {
  console.log(props.media);
  // const [image, setImage] = useState('');
  // if (props.media) {
  //   setImage(props.media);
  // } else {
  //   setImage(women);
  // }
  // // console.log(image);
  return (
    <Card
      style={{
        display: 'flex',
        gap: '.5rem',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '395px',
        height: '95px',
      }}
    >
      <div className="w-[74px] h-[72px] rounded-[4px]">
        <img src={women} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-[12rem] justify-center ">
        <h1 className="text-xl font-bold">{props.createdByUserName}</h1>
        <p className="text-base text-grey">{props.description}</p>
      </div>
      <div className="grid gap-2">
        <Button
          style={{
            backgroundColor: 'var(--green)',
            width: '74px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            borderRadius: '4px',
          }}
        >
          Approve
        </Button>
        <Button
          style={{
            width: '74px',
            height: '32px',
            color: 'var(--red)',
            background: 'var(--secondary-grey)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            borderRadius: '4px',
          }}
        >
          Reject
        </Button>
      </div>
    </Card>
  );
};

export default Post;
