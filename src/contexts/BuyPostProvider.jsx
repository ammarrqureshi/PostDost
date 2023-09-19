import React, { useState } from 'react';

export const BuyPostContext = React.createContext();

function BuyPostProvider(props) {
  const [postData, setPostData] = useState({
    Image: '',
    Caption: '',
    paymentCredentials: {
      cardHolderName: '',
      creditDebitNumber: 0,
      enteredDate: '',
      cvc: 0,
    },
    postMediaURL: '',
  });
  const [loading, setLoading] = useState(false);
  const [formIndex, setFormIndex] = useState(0);
  function IncrementFormIndex() {
    setFormIndex((prev) => prev + 1);
    return;
  }
  function DecrementFormIndex() {
    setFormIndex((prev) => prev - 1);
    return;
  }
  function CancelForm() {
    setPostData((prevState) => ({
      ...prevState,
      postImage: null,
      postCaption: '',
      paymentCredentials: {
        cardHolderName: '',
        creditDebitNumber: 0,
        enteredDate: '',
        cvc: 0,
      },
    }));
    setFormIndex(0);
    return;
  }

  return (
    <BuyPostContext.Provider
      value={{
        postData,
        setPostData,
        loading,
        setLoading,
        formIndex,
        setFormIndex,
        IncrementFormIndex,
        DecrementFormIndex,
        CancelForm,
      }}
    >
      {props.children}
    </BuyPostContext.Provider>
  );
}

export default BuyPostProvider;
