import React, { useState } from 'react';

export const BuyPostContext=React.createContext();

function BuyPostProvider(props){
   const [buyPostContext,setBuyPostContext]=useState({});

//    console.log(buyPostContext);

   return(
    <BuyPostContext.Provider value={{buyPostContext,setBuyPostContext}}>
        {props.children}
    </BuyPostContext.Provider>
   )
}

export default BuyPostProvider;
