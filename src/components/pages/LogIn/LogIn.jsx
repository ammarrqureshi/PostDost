import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { initialValues, loginSchema } from './LogInSchema';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';

import logo from '../../../assets/logo.png';

import TextField from '../../UI/TextField';
import Button from '../../UI/Button';

import { apiPostCall } from '../../../utils/API';
import ToastMessage from '../../../utils/ToastNotification';
import Spinner from '../../../utils/Spinner';

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    setLoading(true);
    const res = await apiPostCall('/auth/login', {
      email,
      password,
    });
    setLoading(false);
    if (res.success) {
      navigate('/explore');
    } else {
      ToastMessage({
        type: 'error',
        message: res.message,
      });
      return;
    }
  };

  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };
  return (
    <section className="relative m-auto max-w-screen max-h-screen overflow-hidden ">
      <div className="flex">
        {/* LeftSide */}
        <div className="w-[50%] h-screen pt-10 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3">
            <div className="w-[10rem] h-[2rem] object-contain">
              <img src={logo} alt="" className="w-full h-full" />
            </div>
            <h1 className="font-bold text-4xl">Welcome Back!</h1>
            <p className="font-bold text-grey">
              Provide your login credentials
            </p>
          </div>
          <div className="grid gap-6 pt-16 w-80 text-sm">
            <form onSubmit={handleSubmit} autoComplete="off">
              {errors.email && touched.email && (
                <p className="text-red">{errors.email}</p>
              )}
              <TextField
                placeholder="Enter Your Gmail"
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.email && touched.email}
                style={{ marginBottom: '1rem', width: '25rem' }}
              />
              {errors.password && touched.password && (
                <p className="text-red">{errors.password}</p>
              )}
              <div className="relative">
                <TextField
                  placeholder="Enter Your Password"
                  type={passwordVisibility ? 'text' : 'password'}
                  style={{ width: '25rem' }}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={errors.password && touched.password}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 top-3 text-grey text-xl"
                >
                  {passwordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>

              <p className="font-bold text-black text-right">
                <Link to="/forgotpassword">Forgot Passowrd?</Link>{' '}
              </p>
              <Button
                type="submit"
                style={{ width: '25rem', marginTop: '1rem' }}
                disabled={isSubmitting}
              >
                {loading ? <Spinner size={16} /> : 'Log In'}
              </Button>
            </form>
            <p className="text-center">
              Do not have account?
              <span className="font-bold text-black text">
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
            <div className="text-center">
              <div className="flex justify-center items-center gap-2">
                <hr className="h-[2px] bg-lightGrey w-[9rem]" />
                Or
                <hr className="h-[2px] bg-lightGrey w-[9rem]" />
              </div>
            </div>
            <div>
              <Button
                className="relative"
                style={{
                  width: '25rem',
                  backgroundColor: 'transparent',
                  color: 'var(--black)',
                  border: '1px solid var(--black)',
                }}
              >
                <FaGoogle className="absolute top-4 left-4" />
                Continue with Google Account
              </Button>
            </div>
          </div>
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

export default LogIn;
