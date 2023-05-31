import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import TextField from '../../UI/TextField';
import Button from '../../UI/Button';
import { initialValues, loginSchema } from './LogInSchema';

const LogIn = () => {
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    const apiUrl = import.meta.env.BASE_URL;
    await axios
      .post(
        'http://localhost:8000/api/auth/login',
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        response.status === 200 && navigate("/explore");
      })
      .catch((error) => {
        setErrorText(error.response.data);
        setTimeout(() => {
          setErrorText('');
        }, 1000);
      });
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
              {errorText && (
                <p className="text-red text-xl max-w-[540px] font-semibold pb-4">
                  {errorText}
                </p>
              )}
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
                LogIn
              </Button>
            </form>
            <p className="text-center">
              Dont' have account?
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
