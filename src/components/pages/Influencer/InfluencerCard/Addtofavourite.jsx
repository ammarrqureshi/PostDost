import classes from './../Influencer.module.css';
import addIcon from './../../../../assets/InfluencerPageAssets/addtofavourite.png';
import Link from './Link';

function Addtofavourite(){
    return (
         <div className={classes.addtoFavourite}>
          <img src={addIcon} alt="Add to favourite icon" />
          <Link opacity='1' color='var(--primary-purple)'>
            Add to favourite</Link>
         </div>
    )}

export default Addtofavourite;