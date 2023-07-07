import { useContext, useState } from "react";
import { InfluencerContext } from "../../../../contexts/InfluencerProvider";
import InfluencerImage from "./InfluencerImage";
import classes from './../Influencer.module.css'; 
import InstaIcon from './../../../../assets/InfluencerPageAssets/InstaIcon.png';
import LocationIcon from './../../../../assets/InfluencerPageAssets/LocationInfo.png';
import Addtofavourite from "./Addtofavourite";
import TagElements from "./TagElements";
import Card from '../../../UI/Card';
import Button from '../../../UI/Button';
import BuyPostForm1 from "../BuyPostForms/BuyPostForm1";
import BuyPostForm2 from "../BuyPostForms/BuyPostForm2";
import BuyPostForm3 from "../BuyPostForms/BuyPostForm3";
import { BuyPostContext } from "../../../../contexts/BuyPostProvider";


function InfluencerCard(){
    const ctx=useContext(InfluencerContext);
    const buyPostContext=useContext(BuyPostContext);

    const [formIndex,setFormIndex]=useState();
    const [buyFormData1,setBuyFormData1]=useState();
    const [buyFormData2,setBuyFormData2]=useState();
    
    

    function showFormHandler(){
    setFormIndex(0);
    }
    
    // ! Form no 2 Form index setting
    function form2IndexHandler(value){
        setFormIndex(value);
    }

    // ! Form no 3 Form index setting
    function form3IndexHandler(value){
        setFormIndex(value);
    }

    // ! Closing form after submit
     function formCloseHandler(value){
        setFormIndex(value);
     }
    
    //  ! Setting Form Data in context

    function form1Data(uploadedFile){
        setBuyFormData1(uploadedFile);

        const buyPostData = {
            uploadedFile: uploadedFile,
          };
          buyPostContext.setBuyPostContext(buyPostData);
    }

    function form2Data(captionPara){
        setBuyFormData2(captionPara);
    }

    function form3Data(form3Data){
        const buyPostData={
            uploadedFile: buyFormData1,
            captionPara: buyFormData2,
            cardHolderName: form3Data.cardHolderName,
            creditDebitNumber: form3Data.creditDebitNumber,
            enteredDate: form3Data.enteredDate,
            cvc: form3Data.cvc
        }
        buyPostContext.setBuyPostContext(buyPostData);
    }

    return(
        <>
        {formIndex==0 && <BuyPostForm1 onCancel={formCloseHandler} form1Data={form1Data}
        formIndex={form2IndexHandler}></BuyPostForm1>}
        {formIndex==1 && <BuyPostForm2 onCancel={formCloseHandler} form2Data={form2Data} 
        formIndex={form3IndexHandler}></BuyPostForm2>}
        {formIndex==2 && <BuyPostForm3 onCancel={formCloseHandler} form3Data={form3Data}
        formIndex={formCloseHandler}></BuyPostForm3>}

        <Card>
        <div className={classes.influencerCard}>
          <InfluencerImage displayImage={ctx.profileImg}></InfluencerImage>
          <section className={classes.cardText}>
          <h1>{ctx.influencerName}</h1>
          <h2>@{ctx.username}</h2>
          <h3>{ctx.profession}</h3>
          </section>
          <Addtofavourite></Addtofavourite>
          <TagElements></TagElements>
          <div className={classes.socialMediaLinks}>
          <div className={classes.instaInfo}>
          <img src={InstaIcon} alt="Insta-icon" />
          <label>{ctx.followers} Followers</label>
          </div>
          <div className={classes.locationInfo}>
          <img src={LocationIcon} alt="location-icon" />
          <label>{ctx.city}, {ctx.country}</label>
          </div>
          </div>
          <Button onClick={showFormHandler}>Buy now <span>{ctx.initialPrice}$</span></Button>
          <Button $secondary>Message now</Button>
          </div>
         </Card>
         </>
    )}

export default InfluencerCard;
