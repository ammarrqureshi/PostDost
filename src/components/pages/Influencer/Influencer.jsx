import classes from './Influencer.module.css';
import InfluencerCard from './InfluencerCard/InfluencerCard';
import InfluencerNavData from './InfluencerNavbarContent/InfluencerNavData';
import TabProvider from '../../../contexts/TabProvider';
import InfluencerProvider from '../../../contexts/InfluencerProvider';
import BuyPostProvider from '../../../contexts/BuyPostProvider';

const Influencer = () => {
  return (
    <TabProvider>
      <InfluencerProvider>
        <BuyPostProvider>
      <section className={classes.influencerPage}>
       <InfluencerCard> </InfluencerCard>
       <InfluencerNavData> </InfluencerNavData>
    </section>
    </BuyPostProvider>
    </InfluencerProvider>
    </TabProvider>
  )
}

export default Influencer;