import React, { useState, useContext, useEffect } from 'react';
import { InfluencerContext } from '../../../../contexts/InfluencerProvider';
import InfluencerImage from './InfluencerImage';
import classes from './../Influencer.module.css';
import InstaIcon from './../../../../assets/InfluencerPageAssets/InstaIcon.png';
import LocationIcon from './../../../../assets/InfluencerPageAssets/LocationInfo.png';
import Addtofavourite from './Addtofavourite';
import TagElements from './TagElements';
import Card from '../../../UI/Card';
import Button from '../../../UI/Button';
import { Persons } from '../../../../constants/Influencer';

function InfluencerCard(props) {
  const { influencerName } = props;
  const [influencer, setInfluencer] = useState('');
  const ctx = useContext(InfluencerContext);
  const findInfluencer = () => {
    setInfluencer(Persons.find((person) => person.name === influencerName));
  };
  useEffect(() => {
    findInfluencer();
  }, []);

  return (
    <Card className={classes.influencerCard}>
      <InfluencerImage displayImage={ctx.profileImg} />
      <section className={classes.cardText}>
        <h1>{influencer.name}</h1>
        <h2>@{ctx.username}</h2>
        <h3>{influencer.category}</h3>
      </section>
      <Addtofavourite />
      <TagElements />
      <div className={classes.socialMediaLinks}>
        <div className={classes.instaInfo}>
          <img src={InstaIcon} alt="Insta-icon" />
          <label>{ctx.followers} Followers</label>
        </div>
        <div className={classes.locationInfo}>
          <img src={LocationIcon} alt="location-icon" />
          <label>
            {ctx.city}, {ctx.country}
          </label>
        </div>
      </div>
      <Button>
        Buy now <span>{influencer.price}$</span>
      </Button>
      <Button $secondary>Message now</Button>
    </Card>
  );
}

export default InfluencerCard;
