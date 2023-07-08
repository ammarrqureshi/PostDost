import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/logo.png';

import TextField from '../../UI/TextField';
import Button from '../../UI/Button';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { apiPostCall } from '../../../utils/API';
import ToastMessage from '../../../utils/ToastNotification';
import Spinner from '../../../utils/Spinner';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const { email } = values;
    setLoading(true);

    const res = await apiPostCall('/auth/forgotpassword', {
      email,
    });
    setLoading(false);
    if (res.success) {
      const { userId, email } = res;
      ToastMessage({
        type: 'success',
        message: 'Check your email for OTP',
      });
      navigate(
        `/confirmpage?email=${encodeURIComponent(email)}&i=${encodeURIComponent(
          userId
        )}`
      );
    } else {
      ToastMessage({
        type: 'error',
        message: res.message,
      });
      return;
    }
  };

  const initialValues = {
    email: '',
  };
  const gmailSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
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
    validationSchema: gmailSchema,
    onSubmit,
  });
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
              Forgot your Password with Email!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 pt-16 w-80 text-sm"
          >
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
            <Button type="submit" style={{ width: '25rem', marginTop: '1rem' }}>
              {loading ? <Spinner size={16} /> : 'Forgot Password'}
            </Button>
            <p className="text-l">
              Dont' have account?
              <Link to="/signup">
                <span className="font-bold"> SignUp</span>
              </Link>
            </p>
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

export default ForgotPassword;
