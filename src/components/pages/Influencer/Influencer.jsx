import classes from './Influencer.module.css';
import InfluencerCard from './InfluencerCard/InfluencerCard';
import InfluencerNavData from './InfluencerNavbarContent/InfluencerNavData';
import TabProvider from './../../../contexts/TabProvider';
import InfluencerProvider from '../../../contexts/InfluencerProvider';
import UserProvider from '../../../contexts/UserProvider';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Influencer = () => {
  const { username } = useParams();
  return (
    <UserProvider>
      <TabProvider>
        <InfluencerProvider>
          <section className={classes.influencerPage}>
            <InfluencerCard influencerName={username} />
            <InfluencerNavData />
          </section>
        </InfluencerProvider>
      </TabProvider>
    </UserProvider>
  );
};

export default Influencer;
