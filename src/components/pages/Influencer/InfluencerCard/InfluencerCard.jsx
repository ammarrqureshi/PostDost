import { useContext, useState } from 'react';

import { InfluencerContext } from '../../../../contexts/InfluencerProvider';
import { BuyPostContext } from '../../../../contexts/BuyPostProvider';

import InfluencerImage from './InfluencerImage';
import classes from './../Influencer.module.css';
import InstaIcon from './../../../../assets/InfluencerPageAssets/InstaIcon.png';
import LocationIcon from './../../../../assets/InfluencerPageAssets/LocationInfo.png';

import Addtofavourite from './Addtofavourite';
import TagElements from './TagElements';

import Card from '../../../UI/Card';
import Button from '../../../UI/Button';

import BuyPostForm1 from '../BuyPostForms/BuyPostForm1';
import BuyPostForm2 from '../BuyPostForms/BuyPostForm2';
import BuyPostForm3 from '../BuyPostForms/BuyPostForm3';

function InfluencerCard() {
  const ctx = useContext(InfluencerContext);
  const { formIndex, IncrementFormIndex } = useContext(BuyPostContext);

  return (
    <>
      {formIndex == 1 && <BuyPostForm1 />}
      {formIndex == 2 && <BuyPostForm2 />}
      {formIndex == 3 && <BuyPostForm3 />}

      <Card>
        <div className={classes.influencerCard}>
          <InfluencerImage displayImage={ctx.profileImg} />
          <section className={classes.cardText}>
            <h1>{ctx.influencerName}</h1>
            <h2>@{ctx.username}</h2>
            <h3>{ctx.profession}</h3>
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
          <Button onClick={IncrementFormIndex}>
            Buy now <span>{ctx.initialPrice}$</span>
          </Button>
          <Button $secondary>Message now</Button>
        </div>
      </Card>
    </>
  );
}

export default InfluencerCard;
