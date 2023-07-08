import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Card from '../../UI/Card';
const Influencer = ({ firstName, secondName, follower, pricing, category }) => {
  function formatFollower(follower) {
    if (follower >= 1000000) {
      return (follower / 1000000).toFixed(1) + 'M';
    } else if (follower >= 1000) {
      return (follower / 1000).toFixed(1) + ' K';
    } else {
      return follower;
    }
  }
  const formattedFollower = formatFollower(follower);
  return (
    <>
      <Card className="w-[240px] h-[265px] relative shadow-2xl rounded-2xl max-h-60">
        <div className="flex flex-col items-center">
          <div className="absolute top-4 right-4 text-2xl text-lightGrey">
            <AiOutlineHeart className="hover:text-violet  border-lightGrey  " />
          </div>
          <div className="w-[5rem] h-[5rem] rounded-full relative mt-3">
            <img
              src="/Influencer/dummyCardImg.png"
              alt="InfluencerImage"
              className="w-full h-full"
            />
            <div className="w-6 h-6 rounded-full absolute bottom-0 right-0">
              <img src="/Influencer/palestine.png" alt="Country" />
            </div>
          </div>
          <h3 className="font-bold text-lg mt-2">{`${firstName} ${secondName}`}</h3>
          <p className="text-[.65rem] font-semibold text-lightGrey">
            {category}
          </p>
        </div>

        <div className="flex justify-between gap-6 mt-10 w-full">
          <div className="flex gap-1 items-center">
            <div>
              <img
                src="/Influencer/instaLogo.png"
                alt=""
                className="w-full h-full"
              />
            </div>
            <p className="font-bold text-xs">{formattedFollower}</p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-[.75rem] font-semibold text-lightGrey">
              Starting from
              <span className="font-bold text-violet text-lg ml-[.35rem]">
                ${pricing}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Influencer;
