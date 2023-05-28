import classes from './Influencer.module.css';
import InfluencerCard from './InfluencerCard/InfluencerCard';
import InfluencerNavData from './InfluencerNavbarContent/InfluencerNavData';
import TabProvider from './../../../contexts/TabProvider';
import InfluencerProvider from '../../../contexts/InfluencerProvider';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Influencer = () => {
  const { id } = useParams();
  return (
    <TabProvider>
      <InfluencerProvider>
        <section className={classes.influencerPage}>
          <InfluencerCard influencerId={id} />
          <InfluencerNavData />
        </section>
      </InfluencerProvider>
    </TabProvider>
  );
};

export default Influencer;
