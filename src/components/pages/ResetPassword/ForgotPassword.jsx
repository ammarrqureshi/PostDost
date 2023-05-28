import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import TextField from '../../UI/TextField';
import Button from '../../UI/Button';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const onSubmit = async (values, actions) => {
    const { email } = values;

    await axios
      .post('http://localhost:8000/api/auth/forgotpassword', { email })
      .then((response) => {
        if (response.status == 200) {
          const userId = response.data.userId;
          const email = response.data.email;
          navigate(
            `/confirmpage?email=${encodeURIComponent(
              email
            )}&i=${encodeURIComponent(userId)}`
          );
        }
      })
      .catch((error) => {
        setErrorText(error.response.data);
        setTimeout(() => {
          setErrorText('');
        }, 2000);
      });
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
            <Button type="submit" style={{ width: '25rem', marginTop: '1rem' }}>
              Forgot Password
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
