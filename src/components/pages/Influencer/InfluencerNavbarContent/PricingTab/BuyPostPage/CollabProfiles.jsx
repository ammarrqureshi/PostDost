import classes from './../../../Influencer.module.css';
import collabIcon from './../../../../../../assets/InfluencerPageAssets/collabimg.png';

function CollabProfiles(props){
    return(
        <div className={classes.collabProfileImgs}>
            <div className={classes.influencerProfile}>
             <img src={props.influencerImg} alt="InfluencerImage" />
             <label>{props.influencerName}</label>
            </div>
             <img src={collabIcon} alt="Collab-Icon"></img>
             <div className={classes.userProfile}>
             <img src={props.userImg} alt="UserImage" />
             <label>{props.userName}</label>
            </div>
        </div>
    )
}

export default CollabProfiles;