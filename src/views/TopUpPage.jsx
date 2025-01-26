import Profile from "../components/Profile";
import Saldo from "../components/Saldo";
import TopUpComponent from "../components/TopUpComponent";

const TopUpPage = () => {
  return (
    <>
      <div>
        <div className="px-5 md:px-28 mt-10 flex">
          <Profile />
          <Saldo />
        </div>
        <div className="px-5 md:px-28 mt-20 flex">
          <TopUpComponent />
        </div>
      </div>
    </>
  );
};

export default TopUpPage;
