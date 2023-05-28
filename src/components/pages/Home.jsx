import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
const Home = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center gap-10'>
      <Link to="/signup">
        <Button>SignUp</Button>
      </Link>
      <Link to="/login">
        <Button>LogIn</Button>
      </Link>
    </div>
  );
};

export default Home;
