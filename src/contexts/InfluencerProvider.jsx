import React, { useState } from 'react';
import { createContext } from 'react';
import img from './../assets/InfluencerPageAssets/ProfileImage.png';

export const InfluencerContext=createContext();

function InfluencerProvider(props){
    const cardDataObj={
        profileImg: img,
        influencerName: 'Usama Kamran',
        username: 'usama1232',
        profession: 'Marketer',
        initialPrice: '30',
        followers: '500000',
        city: 'Gujar Khan',
        country: 'Pakistan'
    }

    // .......................

    function formatFollowers(followers) {
        if (followers >= 1000000) {
          return (followers / 1000000).toFixed(1) + ' Million';
        } else if (followers >= 1000) {
          return (followers / 1000).toFixed(1) + ' K';
        } else {
          return followers;
        }
      }

    cardDataObj.followers = formatFollowers(cardDataObj.followers);

    // const [cardData,setCardData]=useState(cardDataObj);
    return(
        <InfluencerContext.Provider value={cardDataObj}>
            {props.children}
        </InfluencerContext.Provider>
    )
}

export default InfluencerProvider;