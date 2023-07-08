import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/logo.png';

import Button from '../../UI/Button';

import { apiPostCall } from '../../../utils/API';
import ToastMessage from '../../../utils/ToastNotification';
import Spinner from '../../../utils/Spinner';

const ConfirmPage = () => {
  const [loading, setLoading] = useState(false);
  const [otpNumber, setOTP] = useState(null);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const userId = queryParams.get('i');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await apiPostCall('auth/verifyOTP', {
      userId,
      otpNumber,
    });
    setLoading(false);
    if (res.success) {
      navigate('/login');
    } else {
      ToastMessage({
        type: 'error',
        message: res.message,
      });
      return;
    }
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
              {loading ? <Spinner size={16} /> : 'Submit'}
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
