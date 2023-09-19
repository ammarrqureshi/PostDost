import React, { useState, useEffect } from 'react';

import Post from './Posts';
import { apiGetCall } from '../../../utils/API';
import MainContext from '../../../contexts/MainContext';
import { useContext } from 'react';

const ContentManager = () => {
  const [posts, setPosts] = useState([]);
  const [isUserInfluencer, setIsUserInfluencer] = useState(false);
  const { userInformation, setUserInformation } = useContext(MainContext);
  console.log(userInformation);
  useEffect(() => {
    (async () => {
      const res = await apiGetCall('/post');
      console.log(res);
      setPosts(res.Posts);
    })();
  }, []);

  return (
    <section className="pt-16 pl-[7rem]">
      {/* <TopLines right="-right-36" /> */}
      <h1 className="font-bold text-[2.5rem] leading-10">Content Manager</h1>
      <div className="flex gap-12 items-center pt-12">
        <div>
          {userInformation.isVerified ? (
            <>
              <div className="flex items-center justify-end pb-2">
                <div className="flex flex-col">
                  <p className="text-green text-base font-bold">Approve All</p>
                  <p className="text-red text-base font-bold">Reject All</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {posts?.map((post, index) => {
                  const { createdByUserName, description, media } = post;
                  const image = media[0];
                  {/* console.log(image); */}
                  return (
                    <Post
                      key={index}
                      createdByUserName={createdByUserName}
                      description={description}
                      media={image}
                    />
                  );
                })}
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentManager;
