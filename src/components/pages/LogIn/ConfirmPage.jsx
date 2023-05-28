import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import logo from '../../../assets/logo.png';
import Button from '../../UI/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ConfirmPage = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const userId = queryParams.get('i');
  const [errorText, setErrorText] = useState('');
  const [otpNumber, setOTP] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = import.meta.env.BASE_URL;
    await axios
      .post('http://localhost:8000/api/auth/verifyOTP', { userId, otpNumber })
      .then((response) => {
        response.status === 200 && navigate('/login');
      })

      .catch((error) => {
        console.log(error);
        // setErrorText(error.response.data);
        setTimeout(() => {
          setErrorText('');
        }, 1000);
      });
  };

  return (
    <section className="relative m-auto max-w-screen max-h-screen overflow-hidden ">
      <div className="flex">
        <div className="w-[50%] h-screen pt-10 flex flex-col pl-40 justify-center">
          <div className="flex flex-col gap-3">
            <div className="w-[10rem] h-[2rem] object-contain">
              <img src={logo} alt="" className="w-full h-full" />
            </div>
            <h1 className="font-bold text-4xl">Be at Ease!</h1>
            <p className="font-bold text-grey">
              We have send email to your account <strong>{email}</strong>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 pt-16 w-80 text-sm"
          >
            {errorText && (
              <p className="text-red text-xl max-w-[540px] font-semibold pb-4">
                {errorText}
              </p>
            )}
            <div className="flex verification-wrapper">
              <VerificationInput
                classNames={{
                  character: 'verfication-character',
                  characterSelected: 'verfication-character--selected',
                  container: 'verfication-character-container',
                }}
                validChars={'0-9'}
                value={otpNumber}
                onChange={(code) => {
                  console.log('code', code);
                  setOTP(code);
                }}
                length={6}
              />
            </div>

            <Button type="submit" style={{ width: '25rem', marginTop: '1rem' }}>
              Submit
            </Button>
            <p className="text-end font-bold ">Resend OTP</p>
          </form>
        </div>
        {/* LeftSide */}
        <div className="w-[50%] h-screen flex items-center justify-center">
          <div className="h-[95%]">
            <img src="/LogIn.png" alt="SignUp" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmPage;
