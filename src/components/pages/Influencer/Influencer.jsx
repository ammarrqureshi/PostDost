import classes from './Influencer.module.css';
import InfluencerCard from './InfluencerCard/InfluencerCard';
import InfluencerNavData from './InfluencerNavbarContent/InfluencerNavData';
import TabProvider from '../../../contexts/TabProvider';
import InfluencerProvider from '../../../contexts/InfluencerProvider';
import BuyPostProvider from '../../../contexts/BuyPostProvider';
import { useParams } from 'react-router-dom';

const Influencer = () => {
  const { username } = useParams();
  return (
    <TabProvider>
      <InfluencerProvider username={username}>
        <BuyPostProvider>
          <section className={classes.influencerPage}>
            <InfluencerCard> </InfluencerCard>
            <InfluencerNavData> </InfluencerNavData>
          </section>
        </BuyPostProvider>
      </InfluencerProvider>
    </TabProvider>
  );
};

export default Influencer;
