import React, { useRef, useContext } from 'react';

import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';

import styles from './../Influencer.module.css';
import uploadedImage from './../../../../assets/InfluencerPageAssets/ProfileImage.png';

import { InfluencerContext } from '../../../../contexts/InfluencerProvider';
import { BuyPostContext } from '../../../../contexts/BuyPostProvider';
import ToastMessage from '../../../../utils/ToastNotification';

function BuyPostForm2() {
  const captionpara = useRef();
  const ctx = useContext(InfluencerContext);
  const { postData, setPostData, IncrementFormIndex, CancelForm } =
    useContext(BuyPostContext);

  function formSubmitHandler(e) {
    e.preventDefault();
    const postCaption = captionpara.current.value;
    if (!postCaption) {
      ToastMessage({ type: 'error', message: 'Please Enter Description!' });
    } else if (postCaption) {
      setPostData((prev) => ({ ...prev, Caption: postCaption }));
      IncrementFormIndex();
    } else {
      ToastMessage({ type: 'error', message: 'Please Enter Values Again!' });
    }
  }
  //! Create a URL for the uploadedFile
  const fileUrl = URL.createObjectURL(postData.Image);

  //! Determine if the file is an image or video
  const isImage = postData.Image.type.includes('image');
  const isVideo = postData.Image.type.includes('video');

  return (
    <Backdrop>
      <form onSubmit={formSubmitHandler} className={styles.buyPostForm1}>
        <div className={styles.buyFormHeading}>
          <h1>Add Your Caption</h1>
          <span onClick={CancelForm}>&times;</span>
        </div>

        <div className={styles.form2Grid}>
          {isImage && <img src={fileUrl} alt="Uploaded-Image" />}
          {isVideo && (
            <video src={fileUrl} alt="Uploaded-Video" controls></video>
          )}

          <div className={styles.gridCaption}>
            <div className={styles.influencerProfileForm}>
              <img src={uploadedImage} alt="Uploaded-Image" />
              <p>@{ctx.username}</p>
            </div>
            <textarea
              rows="4"
              placeholder="Enter your caption here"
              ref={captionpara}
            />
          </div>
        </div>
        <Button>Next</Button>
      </form>
    </Backdrop>
  );
}

export default BuyPostForm2;
