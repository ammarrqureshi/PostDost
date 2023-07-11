import classes from './../../Influencer.module.css';
import PricingTabNavbar from './PricingTabNavbar';
import BuyPost from './BuyPostPage/BuyPost';
import React,{ useContext} from 'react';
import { TabContext } from '../../../../../contexts/TabProvider';

function PricingTab(){
  const ctx=useContext(TabContext);
  const activePricingTab=ctx.activePricingTab;

  const pricingContent=[
    <BuyPost/>,
    <p>Coming Soon.....</p>,
    <p>Coming Soon.....</p>
  ]

    return(
           <div className={classes.pricingPageContent}>
            <PricingTabNavbar></PricingTabNavbar>
            {pricingContent[activePricingTab]}
          </div>    
    )}
export default PricingTab;