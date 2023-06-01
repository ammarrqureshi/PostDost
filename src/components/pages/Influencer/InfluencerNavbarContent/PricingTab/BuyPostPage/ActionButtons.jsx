import Button from "../../../../../UI/Button";
import classes from './../../../Influencer.module.css';

function ActionButtons(props){
    return(
     <div className={classes.collabActionBtn}>
        <Button>Buy now  <span>{props.postPrice}$</span></Button>
        <Button $outline>Buy story  <span>{props.storyPrice}$</span></Button>
     </div>
    )
}

export default ActionButtons;