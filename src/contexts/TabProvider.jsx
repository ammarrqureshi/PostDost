import { useState } from "react";
import { createContext } from "react";

export const TabContext= createContext();


const TabProvider=(props)=>{
   const [activeTab,setActiveTab]=useState(0);
   const [activePricingTab,setActivePricingTab]=useState(0);
    
   const tabContext={
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    activePricingTab: activePricingTab,
    setActivePricingTab:setActivePricingTab
   }

    return(
    <TabContext.Provider value={tabContext}>
       {props.children}
    </TabContext.Provider>
    )
}

export default TabProvider;