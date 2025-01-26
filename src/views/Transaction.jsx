import Profile from "../components/Profile";
import Saldo from "../components/Saldo";
import TransactionHistory from "../components/TransactionHistory";

const TransactionPage = () => {
  return (
    <>
      <div>
        <div className="px-5 md:px-28 mt-10 flex">
          <Profile />
          <Saldo />
        </div>
        <div className="px-5 md:px-28 mt-10 flex">
          <TransactionHistory />
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
