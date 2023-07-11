import React, { useRef, useState } from 'react';
import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';
import styles from './../Influencer.module.css';
import Spinner from '../../../../utils/Spinner';

function BuyPostForm3(props) {
  const cardHolderRef = useRef();
  const creditDebitRef = useRef();
  const enteredDateRef = useRef();
  const cvcRef = useRef();
  const [creditCardError, setCreditCardError] = useState('');
  const [cvcError,setCvcError]=useState('');
  const [dateError,setDateError]=useState('');

  function formSubmitHandler(e) {
    e.preventDefault();
    const form3Data = {
      cardHolderName: cardHolderRef.current.value,
      creditDebitNumber: creditDebitRef.current.value,

    //   enteredDate: enteredDateRef.current.value,
      enteredDate: new Date(enteredDateRef.current.value) ,
      cvc: cvcRef.current.value,
    };
    console.log(form3Data.enteredDate);
     
    if (
      form3Data.cardHolderName &&
      form3Data.creditDebitNumber &&
      form3Data.enteredDate &&
      form3Data.cvc &&
      creditCardValidation(form3Data.creditDebitNumber) &&
      cvcNumberValidation(form3Data.cvc) && dateValidation(form3Data.enteredDate)
    ) {
      props.formIndex(4);
      props.form3Data(form3Data);
    }
    // creditCardValidation(form3Data.creditDebitNumber);
    // cvcNumberValidation(form3Data.cvc);
  }

  function creditCardValidation(creditCardNumber) {
    const validCardNumber = creditCardNumber.replace(/\s+/g, '');
    if (validCardNumber.length !== 16) {
      setCreditCardError('Invalid credit card number');
      return false
    }
    else{
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
  function dateValidation(date){
    const currentYear = new Date().getFullYear();
      const selectedYear= date.getFullYear();
    //   const month=date.getMonth();
      if (selectedYear >= currentYear) {
        setDateError('');
        return true;
      }
      else{
        setDateError('Card Expired! Change Date or Update Card')
        return false;
      }
  }
  

  return (
    <Backdrop>
      <form className={styles.buyPostForm1} onSubmit={formSubmitHandler}>
        <div className={styles.buyFormHeading}>
          <h1>Add Payment Detail</h1>
          <span onClick={props.onCancel}>&times;</span>
        </div>

        <div className={styles.addPaymentFields}>
          <div className={styles.paymentField}>
            <label>Card Holder*</label>
            <input type="text"
             placeholder="Enter card holder name" ref={cardHolderRef} />
          </div>

          <div className={styles.paymentField}>
            <label>Credit/Debit Card Number*</label>
            <input
              type="text"
             maxlength="16"
              placeholder="Enter credit/debit card number"
              ref={creditDebitRef}
            />
            {<div className={styles.errormsg}><p>{creditCardError}</p></div>}
          </div>

          <div className={styles.paymentField}>
            <label>Expiry Month and Year*</label>
            <input type="date" placeholder="Enter your date" ref={enteredDateRef} />
            {<div className={styles.errormsg}><p>{dateError}</p></div>}
          </div>

          <div className={styles.paymentField}>
            <label>CVC*</label>
            <input
             type="text"
             maxlength="3"
            placeholder="Enter CVC number" ref={cvcRef} />
            {<div className={styles.errormsg}><p>{cvcError}</p></div>}
          </div>
        </div>

        <Button>Pay now</Button>
      </form>
    </Backdrop>
  );
//Ehsaan Commit
             <div className={styles.paymentField}>
              <label>CVC*</label>
        <input type="number" placeholder='Enter CVC number' ref={cvcRef} />
             </div>
             </div>
             
            <Button>{props.loading ? <Spinner size={8}/> :'Pay now'}</Button>
            </form>
        </Backdrop>
        
    )

}

export default BuyPostForm3;
