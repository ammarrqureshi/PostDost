import React, { useRef , useContext } from 'react';
import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';
import styles from './../Influencer.module.css';
import uploadedImage from './../../../../assets/InfluencerPageAssets/ProfileImage.png';
import { BuyPostContext } from '../../../../contexts/BuyPostProvider';

function BuyPostForm2(props){
    const captionpara=useRef();
    const { buyPostContext } = useContext(BuyPostContext);

    function formSubmitHandler(e){
      e.preventDefault();
      const captionPara=captionpara.current.value;
      if(captionPara){
        props.formIndex(2);
        props.form2Data(captionPara);
      }
    }

//! Create a URL for the uploadedFile
const fileUrl = URL.createObjectURL(buyPostContext.uploadedFile);

//! Determine if the file is an image or video
const isImage = buyPostContext.uploadedFile.type.includes('image');
const isVideo = buyPostContext.uploadedFile.type.includes('video');

    return(
        <Backdrop>
            <form onSubmit={formSubmitHandler} className={styles.buyPostForm1}>
            <div className={styles.buyFormHeading}>
             <h1>Add Your Caption</h1>
             <span onClick={props.onCancel}>&times;</span>
             </div>

            <div className={styles.form2Grid}>
            {isImage && <img src={fileUrl} alt="Uploaded-Image" />}
              {isVideo && (
              <video src={fileUrl} alt="Uploaded-Video" controls>
             </video>
          )}

             <div className={styles.gridCaption}>
              <div className={styles.influencerProfileForm}>
              <img src={uploadedImage} alt="Uploaded-Image" />
              <p>@influencer</p>
              </div>
            <textarea rows='4' placeholder='Enter your caption here' ref={captionpara}/>
             </div>
             </div>
            <Button>Next</Button>
            </form>
        </Backdrop>
        
    )
}

export default BuyPostForm2;