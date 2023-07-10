import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import logo from '../../../assets/guestpostlogo.svg';

import TextField from '../../UI/TextField';
import Button from '../../UI/Button';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { apiPostCall } from '../../../utils/API';
import ToastMessage from '../../../utils/ToastNotification';
import Spinner from '../../../utils/Spinner';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const { password } = values;
    const res = await apiPostCall('/auth/resetpassword', {
      password,
    });
    setLoading(false);
    if (res.success) {
      ToastMessage({
        type: 'success',
        message: 'Password Changes Successfully,Please Login!',
      });
      navigate('/login');
    } else {
      ToastMessage({
        type: 'error',
        message: res.message,
      });
      return;
    }
  };
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const resetSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Must be atleast 8 characters')
      .matches(passwordRegex, { message: 'Please create a Strong Password' })
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match!')
      .required('Required'),
  });
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
    validationSchema: resetSchema,
    onSubmit,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };
  return (
    <section className="relative m-auto max-w-screen max-h-screen overflow-hidden ">
      <div className="flex">
        <div className="w-[50%] h-screen pt-10 flex-col pl-40 justify-center flex">
          <div className="flex flex-col gap-3">
            <div className="w-[10rem] h-[2rem] object-contain">
              <img src={logo} alt="" className="w-full h-full" />
            </div>
            <h1 className="font-bold text-4xl">Be Secure!</h1>
            <p className="font-bold text-grey">Set Your New Password</p>
          </div>
          <form
            className="grid gap-6 pt-16 w-80 text-sm"
            onSubmit={handleSubmit}
          >
            {errors.password && touched.password && (
              <p className="text-red">{errors.password}</p>
            )}
            <div className="relative">
              <TextField
                placeholder="New Password"
                type={passwordVisibility ? 'text' : 'password'}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.password && touched.password}
                style={{ marginBottom: '1rem', width: '25rem' }}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-3 text-grey text-xl"
              >
                {passwordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red">{errors.confirmPassword}</p>
            )}
            <div className="relative">
              <TextField
                placeholder="Re-Enter Password"
                type={passwordVisibility ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.confirmPassword && touched.confirmPassword}
                style={{ marginBottom: '1rem', width: '25rem' }}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-3 text-grey text-xl"
              >
                {passwordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            <Button type="submit">
              {loading ? <Spinner size={16} /> : 'Reset Password'}
            </Button>
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

export default ResetPassword;
