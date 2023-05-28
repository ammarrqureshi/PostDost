import * as yup from 'yup';
const passwordRegex =
  /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
//One UpperCase letter, one lower case letter, one number
export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, 'Must be atleast 3 characters')
    .max(10, 'Max of 8 characters allowed')
    .required('Required'),
  secondName: yup
    .string()
    .min(3, 'Must be atleast 3 characters')
    .max(10, 'Max of 8 characters allowed'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(8, 'Must be atleast 8 characters')
    .matches(passwordRegex, { message: 'Please create a Strong Password' })
    .required('Required'),
  agreement: yup
    .boolean()
    .oneOf([true], 'Please accept term and Conditions')
    .required('Required'),
});
export const initialValues = {
  firstName: '',
  secondName: '',
  email: '',
  password: '',
  agreement: false,
};
