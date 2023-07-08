import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import img from './../assets/InfluencerPageAssets/ProfileImage.png';
import { apiGetCall } from '../utils/API';
export const InfluencerContext = createContext();

function InfluencerProvider(props) {
  const { username } = props;
  const [influencerInfo, setInfluencerInfo] = useState({
    username: '',
    country: '',
    category: '',
    pricing: '',
    follower: '',
    city: '',
    firstName: '',
    secondName: '',
  });
  useEffect(() => {
    (async () => {
      const res = await apiGetCall(`/influencer/${username}`);
      const {
        username: username2,
        country,
        category,
        pricing,
        follower,
        firstName,
        secondName,
        city,
      } = res;
      setInfluencerInfo({
        username: username2,
        country,
        category,
        pricing,
        follower,
        firstName,
        secondName,
        city,
      });
    })();
  }, []);
  const cardDataObj = {
    profileImg: img,
    influencerName: `${influencerInfo.firstName} ${influencerInfo.secondName} `,
    username: `${influencerInfo.username}`,
    profession: `${influencerInfo.category}`,
    initialPrice: `${influencerInfo.pricing}`,
    followers: `${influencerInfo.follower}`,
    city: `${influencerInfo.city}`,
    country: `${influencerInfo.country}`,
  };

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
  return (
    <InfluencerContext.Provider value={cardDataObj}>
      {props.children}
    </InfluencerContext.Provider>
  );
}

export default InfluencerProvider;
