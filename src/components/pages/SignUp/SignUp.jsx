import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import Checkbox from '../../UI/SignUpCheckbox';
import TextField from '../../UI/TextField';
import Button from '../../UI/Button';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import axios from 'axios';
import { signupSchema, initialValues } from './InitialValueAndSchema';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const onSubmit = async (values, actions) => {
    const { firstName, secondName, email, password, agreement } = values;
    // setLoad(true);
    const apiUrl = import.meta.env.REACT_APP_API_URL;
    axios
      .post('http://localhost:8000/api/auth/register', {
        firstName,
        secondName,
        email,
        password,
        agreement,
      })
      .then((response) => {
        //  const {email} = response
        console.log(response.data.userId);
        // setLoad(false);
        if (response.data.success) {
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
        // setLoad(false);
        console.log(error);
        setErrorText(error.response?.data);
        setTimeout(() => {
          setErrorText('');
        }, 3000);
      });
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  return (
    <Fragment>
      <div className="w-full h-full">
        <div className="flex flex-col gap-3">
          <div className="w-40 h-8 object-contain">
            <img src={logo} alt="" className="w-full h-full" />
          </div>
          <h1 className="font-bold text-4xl">Create an account</h1>
          <p className="font-bold text-grey">
            Describe yourself clearly to avoid any mistake
          </p>
        </div>

        <div className="grid gap-6 w-[25rem] text-sm ">
          <form
            className="grid pt-16 w-fit text-sm"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {errorText && (
              <p className="text-red text-xl max-w-[540px] font-semibold pb-4">
                {errorText}
              </p>
            )}
            {touched.firstName && errors.firstName && (
              <p className="text-red">{errors.firstName}</p>
            )}
            <div className="flex gap-12 min-w-[25rem] mb-4">
              <TextField
                placeholder="First Name"
                type="text"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.firstName && touched.firstName}
                style={{ width: '11.5rem' }}
              />
              {errors.secondName && touched.secondName && (
                <p className="text-red">{errors.secondName}</p>
              )}
              <TextField
                placeholder="Second Name"
                type="text"
                id="secondName"
                name="secondName"
                value={values.secondName}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={errors.secondName && touched.secondName}
                style={{ width: '11.5rem' }}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red">{errors.email}</p>
            )}
            <TextField
              placeholder="Enter Your email"
              id="email"
              name="email"
              text="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isError={touched.email && errors.email}
              style={{ marginBottom: '1rem' }}
            />
            {errors.password && touched.password && (
              <p className="text-red">{errors.password}</p>
            )}
            <div className="relative">
              <TextField
                placeholder="Enter Your Password"
                type={passwordVisibility ? 'text' : 'password'}
                style={{ width: '26rem', marginBottom: '1rem' }}
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isError={touched.password && errors.password}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-3 text-grey text-xl"
              >
                {passwordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            {touched.agreement && errors.agreement && (
              <p className="text-red">{errors.agreement}</p>
            )}
            <Checkbox
              label="I understand and agree to Postdost Terms and conditions"
              id="agreement"
              name="agreement"
              value={values.agreement}
              onChange={handleChange}
              onBlur={handleBlur}
              isError={touched.agreement && errors.agreement}
            />
            <Button type="submit" disabled={isSubmitting}>
              Create Account
            </Button>
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login">
              <span className="font-bold">LogIn</span>
            </Link>
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
                width: '26rem',
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
    </Fragment>
  );
};

export default SignUp;
