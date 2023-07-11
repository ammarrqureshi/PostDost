import React, { useEffect, useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";

const Login = () => {
  console.log("COMMIT 16");
  const app_creds = {
    app_id: "177944255262951",
    app_secret: "b081432a152f58b87e7c5643ef8efddf",
    redirect_uri: "https://instaapi-sigma.vercel.app/",
    scope: "user_profile,user_media",
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const auth_code = queryParameters.get("code");
  const ACCESS_TOKEN = "IGQVJXMjNPYTM2a0FILWsxLW1qNGYwU3ByOGRoS05OYTQ3ZAzFIdnEyaV9LV0dibkRnUFFSUVpya1hzWDhtVVdtUDdDcWlWQW8tRUdVWWNyU3RTdkI0WS1sU1gyZA05aR2M1clVEcExSZAFNWdkgtM0FLbAZDZD"
  if (auth_code) {
    axios
      .post("https://api.instagram.com/oauth/access_token", {
        params: {
          client_id: app_creds.app_id,
          client_secret: app_creds.app_secret,
          redirect_uri: app_creds.redirect_uri,
          grant_type: 'authorization_code',
          code: auth_code
        }},{
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"

          }}
        
     )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("AUTH NOT RECEIVED");
  }
  // useEffect(() => {
  //   axios.post('https://api.instagram.com/oauth/access_token?client_id='+app_creds.app_id+'&client_secret='+app_creds.app_secret+'&redirect_uri='+app_creds.redirect_uri+'&grant_type=authorization_code&code='+auth_code).then((response)=>{
  //     console.log(response)
  //   })
  //   return () => { console.log(auth_code)

  //   };
  // }, [auth_code]);
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const responseFacebook = (response) => {
    const accessToken = response.accessToken;
    console.log(accessToken);
  };

  return (
    <div>
      <FacebookLogin
        appId="6928307980531176"
        onSuccess={(response) => {
          console.log("Login Success!", response);
          setAccessToken(response.accessToken);
          axios
            .get(
              "https://graph.facebook.com/v12.0/me/photos?access_token=" +
                response.accessToken
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }}
        onFail={(error) => {
          console.log("Login Failed!", error);
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!", response);
          setName(response.name);
        }}
        fields="name,email,picture"
        scope="public_profile, email, user_photos"
        callback={responseFacebook}
        config_id="634035201998149"
      />
      {/* <img src={imgurl} alt="" /> */}
      Name: {name}; accessToken: {accessToken}
      <a
        href={
          "https://api.instagram.com/oauth/authorize?client_id=" +
          app_creds["app_id"] +
          "&redirect_uri=" +
          app_creds.redirect_uri +
          "&scope=" +
          app_creds.scope +
          "&response_type=code"
        }
      >
        <button>Get Instagram Data</button>
      </a>
      <br></br> Instagram Auth Code : {auth_code}
    </div>
  );
};

export default Login;

// import React from 'react'
// import Button from './Button'

// const Login = () => {
//   const displayName= () => {
//     FB.login(function(response) {
//       console.log(response)
//     });
//   }
//   return (
//     <>
//     <Button onClick= {displayName}></Button>
//     </>

//   )
// }

// export default Login
