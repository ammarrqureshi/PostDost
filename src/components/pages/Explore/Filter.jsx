//External Imports
import React, { useContext } from 'react';

//Internal Imports
import { ExploreContext } from '../../../contexts/ExploreContext';
import Slider from '../../UI/Slider';
import RangeSlider from '../../UI/RangeSlider';
import Checkbox from '../../UI/Checkbox';

const Filter = () => {
  const { follower, setFollowerValue, priceRange, setPriceValue, setCategory } =
    useContext(ExploreContext);
  return (
    <>
      <section className="grid gap-2 w-[300px] h-[350px] rounded-2xl p-8 shadow-2xl absolute top-0 right-0 z-50 bg-[#fff]">
        <div>
          <h3 className="text-[#000] font-bold pb-3">Followers</h3>
          {/* Followers Slider */}
          <div className="w-[13rem] relative">
            <RangeSlider
              min={0}
              max={45000000}
              value={follower}
              setValue={setFollowerValue}
              formatSymbol=" "
            />
            <div>
              <hr className="h-[2px] bg-lightGrey w-[13rem] absolute top-14" />
            </div>
          </div>
        </div>
        {/* End of Follower Slider */}

        {/* Start of CheckBox */}
        <div>
          <h1 className="text-[#000] font-bold mt-4">Categories</h1>
          <div className="mt-3">
            <Checkbox
              label="Digital Marketer"
              name="Digital Marketer"
              id="Digital Marketer"
              value="Digital Marketer"
              setValue={setCategory}
              checked={false}
            />
            <br />
            <Checkbox
              label="Social Media Influencer"
              name="Social Media Influencer"
              id="Social Media Influencer"
              value="Social Media Influencer"
              setValue={setCategory}
              checked={false}
            />
            <br />
            <Checkbox
              label="Web Developer"
              name="Web Developer"
              id="Web Developer"
              value="Web Developer"
              setValue={setCategory}
              checked={false}
            />
          </div>
        </div>
        {/* End of Check Box */}
        {/* Start of Pricing  */}
        <div>
          <h1 className="text-black font-bold">Prices</h1>
          <div className="w-[13rem]">
            <RangeSlider
              min={0}
              max={450}
              value={priceRange}
              setValue={setPriceValue}
              formatSymbol="$"
            />
          </div>
        </div>
        {/* End of Pricing */}
      </section>
    </>
  );
};

export default Filter;
