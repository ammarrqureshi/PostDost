import classes from './../../../Influencer.module.css';
import ActionButtons from './ActionButtons';
import CollabProfiles from './CollabProfiles';
import { useContext } from 'react';
import { InfluencerContext } from '../../../../../../contexts/InfluencerProvider';
import { UserContext } from '../../../../../../contexts/UserProvider';

function BuyPost() {
  const influencerCtx = useContext(InfluencerContext);
  const UserCtx = useContext(UserContext);

  return (
    <section className={classes.buyPost}>
      <CollabProfiles
        influencerImg={influencerCtx.profileImg}
        influencerName={influencerCtx.influencerName}
        userImg={UserCtx.profileImg}
        userName={UserCtx.userName}
      ></CollabProfiles>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur
      </p>
      <ActionButtons
        postPrice={influencerCtx.initialPrice}
        storyPrice={influencerCtx.storyPrice}
      ></ActionButtons>
    </section>
  );
}

export default BuyPost;
