import React, { useRef, useContext } from 'react';

import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';

import styles from './../Influencer.module.css';

import ToastMessage from '../../../../utils/ToastNotification';

import { BuyPostContext } from '../../../../contexts/BuyPostProvider';

function BuyPostForm1() {
  const { setPostData, IncrementFormIndex, CancelForm } =
    useContext(BuyPostContext);
  const addFileRef = useRef();
  function formSubmitHandler(e) {
    e.preventDefault();
    //Just one file files[0]
    const uploadedFile = addFileRef.current.files[0];
    if (!uploadedFile) {
      ToastMessage({
        type: 'error',
        message: 'Please upload at least one Image!',
      });
      return;
    }
    if (uploadedFile) {
      setPostData((prevState) => ({ ...prevState, Image: uploadedFile }));
      IncrementFormIndex();
    }
  }

  return (
    <Backdrop>
      <form onSubmit={formSubmitHandler} className={styles.buyPostForm1}>
        <div className={styles.buyFormHeading}>
          <h1>Add Your File</h1>
          <span onClick={CancelForm}>&times;</span>
        </div>

        <div className={styles.addImageFile}>
          <label>Select your file</label>
          <input type="file" accept="image/*, video/*" ref={addFileRef} />
        </div>

        <Button>Next</Button>
      </form>
    </Backdrop>
  );
}

export default BuyPostForm1;
