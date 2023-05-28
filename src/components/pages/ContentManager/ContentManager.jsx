import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Internal Data
import Post from './Posts';
import { Posts } from '../../../constants/Post';
import { useState } from 'react';

const ContentManager = () => {
  const [open, setOpen] = React.useState(false);
  const [modalId, setModalId] = useState(null);
  const handleModalInfo = (id) => {
    setModalId(id);
  };
  return (
    <section className="pt-16 pl-[7rem]">
      {/* <TopLines right="-right-36" /> */}
      <h1 className="font-bold text-[2.5rem] leading-10">Content Manager</h1>
      <div className="flex gap-12 items-center pt-12">
        <div>
          <div className="flex items-center justify-end pb-2">
            <div className="flex flex-col">
              <p className="text-green text-base font-bold">Approve All</p>
              <p className="text-red text-base font-bold">Reject All</p>
            </div>
          </div>
          <div className="flex flex-col">
            <Post />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between pb-2">
            <h1 className="text-violet font-semibold text-3xl">
              Pending Posts
            </h1>
            <p className="text-red text-base font-bold">Delete All</p>
          </div>
          <div className="flex flex-col">
            <Post />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentManager;
