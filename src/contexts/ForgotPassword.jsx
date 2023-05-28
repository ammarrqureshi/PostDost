import React, { useState, createContext } from 'react';
export const ForgotPasswordContext = createContext();
const ForgotPasswordProvider = (props) => {
  const [email, setEmail] = useState('');

  return (
    <ForgotPasswordContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {props.children}
    </ForgotPasswordContext.Provider>
  );
};

export default ForgotPasswordProvider;
