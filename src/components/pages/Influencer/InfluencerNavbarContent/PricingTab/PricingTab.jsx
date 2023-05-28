import classes from './../../Influencer.module.css';
import PricingTabNavbar from './PricingTabNavbar';
// import BuyPost from './BuyPostPage/BuyPost';
import React,{ useContext} from 'react';
import { TabContext } from '../../../../../contexts/TabProvider';
import Button from '../../../../UI/Button';

function PricingTab(){
  const ctx=useContext(TabContext);
  const activePricingTab=ctx.activePricingTab;

  const pricingContent=[
    <Button>Not Content added yet</Button>,
    <Button>Not Content added yet</Button>,
    <Button>Not Content added yet</Button>
  ]

    return(
           <div className={classes.pricingPageContent}>
            <PricingTabNavbar></PricingTabNavbar>
            {pricingContent[activePricingTab]}
          </div>    
    )}
export default PricingTab;