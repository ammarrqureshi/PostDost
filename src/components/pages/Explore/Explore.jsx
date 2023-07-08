//External Imports
import React, { useState, useContext, useEffect } from 'react';
import { CiFilter } from 'react-icons/ci';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

//Internal Imports
import Influencer from './Influencer';
import Filter from './Filter';
import { ExploreContext } from '../../../contexts/ExploreContext';
//UI Ones
import TopLines from '../../UI/TopLines';
import TextField from '../../UI/TextField';

import { apiGetCall } from '../../../utils/API';
const Explore = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  console.log(influencers);
  useEffect(() => {
    (async () => {
      const res = await apiGetCall('/influencer');
      setInfluencers(res.Influencers);
    })();
  }, []);
  const {
    Persons,
    filterText,
    setFilterText,
    filteredData,
    setFilteredData,
    follower,
    priceRange,
    category,
  } = useContext(ExploreContext);

  //Filter Changing
  //Just Filter with Input name.
  const handleInputChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
    const filtered = Persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase().trim())
    );
    setFilteredData(filtered);
  };
  //Filter with Followers,Prices,Category.
  const handleFilters = () => {
    const filtered = Persons.filter((person) => {
      return (
        person.followers >= follower[0] &&
        person.followers <= follower[1] &&
        person.price >= priceRange[0] &&
        person.price <= priceRange[1] &&
        category.includes(person.category)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <section className="pt-16 pl-[7rem] relative max-w-[89%] overflow-hidden">
        <TopLines right="-right-36" />
        <div className="flex flex-row justify-between max-w-full mb-10">
          <h1 className="font-bold text-[2.5rem] leading-10">Explore</h1>
          <div className="flex flex-row">
            <div className="relative">
              <TextField
                type="text"
                name="name"
                id=""
                placeholder="Search now"
                value={filterText}
                onChange={handleInputChange}
                style={{
                  width: '20rem',
                  height: '3rem',
                  position: 'relative',
                }}
              />
              <AiOutlineSearch className="absolute top-3 right-4 text-2xl text-lightGrey" />
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="w-[6rem] h-[3rem] border border-lightGrey p-2 rounded-lg text-left inline ml-6  text-lightGrey hover:text-[#fff]  hover:border-[#fff] hover:bg-violet"
            >
              Filter <CiFilter className="inline ml-4" />
            </button>
          </div>
        </div>

        <div
          className={`${
            showFilter ? 'right-0' : '-right-[50%]'
          } absolute  top-[15%]`}
        >
          <Filter />
        </div>

        {/* Influencers */}
        <div className="flex flex-row flex-wrap gap-10 relative ml-2">
          {filteredData.length !== 0 ? (
            influencers?.map((person) => {
              console.log(person);
              return (
                <Link
                  key={person._id}
                  to={`http://localhost:5173/${person.username}`}
                >
                  <Influencer {...person} />
                </Link>
              );
            })
          ) : (
            <div className="pt-10">
              <h1 className="text-violet text-2xl font-bold">
                No Person Found
              </h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore;
