import React, { createContext } from "react";
// import { useState } from "react";
import userImg from './../assets/InfluencerPageAssets/UserImage.png';

export const UserContext=createContext();

function UserProvider(props){
    const currentUserObj={
        userName: 'Qureshi Sheikh',
        profileImg: userImg
    }
    // const [userObj,SetUserObj]=useState(currentUserObj);
    return(
        <UserContext.Provider value={currentUserObj}>
         {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;