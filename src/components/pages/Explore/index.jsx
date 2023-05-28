import React from 'react';
import Explore from './Explore';
import ExploreProvider from '../../../contexts/ExploreContext';
const index = () => {
  return (
    <>
      <ExploreProvider>
        <Explore />
      </ExploreProvider>
    </>
  );
};

export default index;
