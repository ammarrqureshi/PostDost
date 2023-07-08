import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MainContext from '../../contexts/MainContext';

import Button from '../UI/Button';

import { apiGetCall } from '../../utils/API';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await apiGetCall('/users');
      console.log(res);
      if (res.success) {
        navigate('/explore');
        return;
      }
    })();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-10">
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
