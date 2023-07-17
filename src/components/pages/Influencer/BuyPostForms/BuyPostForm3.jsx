import React, { useRef, useState, useContext } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';

import styles from './../Influencer.module.css';

import { BuyPostContext } from '../../../../contexts/BuyPostProvider';
import { InfluencerContext } from '../../../../contexts/InfluencerProvider';

import { storage } from '../../../../utils/firebase';
import Spinner from '../../../../utils/Spinner';
import ToastMessage from '../../../../utils/ToastNotification';
import { apiPostCall } from '../../../../utils/API';

function BuyPostForm3() {
  //All the Data state made in context!
  const {
    setPostData,
    postData,
    setFormIndex,
    CancelForm,
    loading,
    setLoading,
  } = useContext(BuyPostContext);
  const { _id } = useContext(InfluencerContext);
  const cardHolderRef = useRef();
  const creditDebitRef = useRef();
  const enteredDateRef = useRef();
  const cvcRef = useRef();
  const [creditCardError, setCreditCardError] = useState('');
  const [cvcError, setCvcError] = useState('');
  const [dateError, setDateError] = useState('');

  async function formSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const uploadImage = async () => {
      const imageRef = ref(storage, `images/${postData.Image.name + v4()}`);
      const uploadResponse = await uploadBytes(imageRef, postData.Image);
      console.log(uploadResponse);
      const imageUrl = await getDownloadURL(uploadResponse.ref);
      return imageUrl;
    };
    const imageURL = await uploadImage();
    const cardHolderName = cardHolderRef.current.value;
    const creditDebitNumber = creditDebitRef.current.value;
    const enteredDate = new Date(enteredDateRef.current.value);
    const cvc = cvcRef.current.value;
    if (
      cardHolderName &&
      creditDebitNumber &&
      enteredDate &&
      cvc &&
      creditCardValidation(creditDebitNumber) &&
      cvcNumberValidation(cvc) &&
      dateValidation(enteredDate)
    ) {
      setPostData((prevValues) => ({
        ...prevValues,
        paymentCredentials: {
          cardHolderName: cardHolderRef.current.value,
          creditDebitNumber: creditDebitRef.current.value,
          enteredDate: enteredDateRef.current.value,
          cvc: cvcRef.current.value,
        },
        postMediaURL: imageURL,
      }));
      try {
        const res = await apiPostCall(`/post/${_id}`, { postData, imageURL });
        setLoading(false);
        if (res.success) {
          ToastMessage({
            type: 'success',
            message: 'Post sent to influencer for approval successfully!',
          });
        } else {
          ToastMessage({
            type: 'error',
            message: 'Failed to Post your post!',
          });
        }
        setFormIndex(0);
      } catch (error) {
        console.log(error);
        ToastMessage({
          type: 'error',
          message: 'Posting Failed due to Server Error,Please try again later!',
        });
      }
    } else {
      ToastMessage({ type: 'error', message: 'Please Re-Enter Values' });
    }
  }

  function creditCardValidation(creditCardNumber) {
    const validCardNumber = creditCardNumber.replace(/\s+/g, '');
    if (validCardNumber.length !== 16) {
      setCreditCardError('Invalid credit card number');
      return false;
    } else {
      setCreditCardError('');
      return true;
    }
  }

  function cvcNumberValidation(cvcNumber) {
    // const dummyCvc = [121, 122, 123];
    // if (!dummyCvc.includes(cvcNumber)) {
    //   setCvcError('Invalid CVC Number');
    //   return false;
    // }
    // else{
    //     setCvcError('');
    //     return true;
    // }
    return true;
  }

  //Usama Commit
  function dateValidation(date) {
    const currentYear = new Date().getFullYear();
    const selectedYear = date.getFullYear();
    //   const month=date.getMonth();
    if (selectedYear >= currentYear) {
      setDateError('');
      return true;
    } else {
      setDateError('Card Expired! Change Date or Update Card');
      return false;
    }
  }

  return (
    <Backdrop>
      <form className={styles.buyPostForm1} onSubmit={formSubmitHandler}>
        <div className={styles.buyFormHeading}>
          <h1>Add Payment Detail</h1>
          <span onClick={CancelForm}>&times;</span>
        </div>
        <div className={styles.addPaymentFields}>
          <div className={styles.paymentField}>
            <label>Card Holder*</label>
            <input
              type="text"
              placeholder="Enter card holder name"
              ref={cardHolderRef}
            />
          </div>

          <div className={styles.paymentField}>
            <label>Credit/Debit Card Number*</label>
            <input
              type="text"
              maxLength="16"
              placeholder="Enter credit/debit card number"
              ref={creditDebitRef}
            />
            {
              <div className={styles.errormsg}>
                <p>{creditCardError}</p>
              </div>
            }
          </div>

          <div className={styles.paymentField}>
            <label>Expiry Month and Year*</label>
            <input
              type="date"
              placeholder="Enter your date"
              ref={enteredDateRef}
            />
            {
              <div className={styles.errormsg}>
                <p>{dateError}</p>
              </div>
            }
          </div>

          <div className={styles.paymentField}>
            <label>CVC*</label>
            <input
              type="text"
              maxLength="3"
              placeholder="Enter CVC number"
              ref={cvcRef}
            />
            {
              <div className={styles.errormsg}>
                <p>{cvcError}</p>
              </div>
            }
          </div>
        </div>

        <Button>{loading ? <Spinner size={14} /> : 'Pay now'}</Button>
      </form>
    </Backdrop>
  );
}

export default BuyPostForm3;
