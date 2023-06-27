import React, { useRef } from 'react';
import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';
import styles from './../Influencer.module.css';

function BuyPostForm3(props){
     const cardHolderRef=useRef();
     const creditDebitRef=useRef();
     const enteredDateRef=useRef();
     const cvcRef=useRef();

    function formSubmitHandler(e){
        e.preventDefault();
        const form3Data={
            cardHolderName: cardHolderRef.current.value,
            creditDebitNumber: creditDebitRef.current.value,
            enteredDate: enteredDateRef.current.value,
            cvc: cvcRef.current.value
        }
        if(form3Data.cardHolderName && form3Data.creditDebitNumber &&
            form3Data.enteredDate && form3Data.cvc){
            props.formIndex(4);
            props.form3Data(form3Data);
        }  
    }

    return(
        <Backdrop>
            <form className={styles.buyPostForm1} onSubmit={formSubmitHandler}>
            <div className={styles.buyFormHeading}>
             <h1>Add Payment Detail</h1>
             <span onClick={props.onCancel}>&times;</span>
             </div>
             
             <div className={styles.addPaymentFields}>
             <div className={styles.paymentField}>
              <label>Card Holder*</label>
              <input type="text" placeholder='Enter card holder name' ref={cardHolderRef}/>
             </div>

             <div className={styles.paymentField}>
              <label>Credit/Debit Card Number*</label>
 <input type="number" placeholder='Enter credit/debit card number' ref={creditDebitRef} />
             </div>

             <div className={styles.paymentField}>
              <label>Expiry Month and Year*</label>
        <input type="date" placeholder='Enter your date' ref={enteredDateRef}/>
             </div>

             <div className={styles.paymentField}>
              <label>CVC*</label>
        <input type="number" placeholder='Enter CVC number' ref={cvcRef} />
             </div>
             </div>
             
            <Button>Pay now</Button>
            </form>
        </Backdrop>
        
    )
}

export default BuyPostForm3;