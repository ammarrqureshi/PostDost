import SignUp from './SignUp';
import TopLines from '../../UI/TopLines';
const index = () => {
  return (
    <section className="relative m-auto max-w-screen max-h-screen overflow-hidden ">
      <TopLines right="-right-9" />
      <div className="flex">
        {/* LeftSide */}
        <div className="w-[50%] h-screen flex items-center justify-center">
          <div className="h-[95%] ">
            <img src="/SignUp.png" alt="SignUp" className="w-full h-full" />
          </div>
        </div>

        {/* RightSide */}
        <div className="w-[50%] pt-10">
          <SignUp />
        </div>
      </div>
    </section>
  );
};

export default index;
