// import displayImage from '../../../../assets/InfluencerPageAssets/ProfileImage.png';
import classes from './../Influencer.module.css';
function InfluencerImage(props){
    return(
        <div className={classes.profileimg}>
        <img src={props.displayImage} alt="Influencer_Image" />
        </div>
    )
}

export default InfluencerImage;