import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const Navbar = () => {
  const location = useLocation();
  let navigate = useNavigate();
  return (
    <>
      <div className="w-full h-24 border-b flex justify-between px-5 md:px-28">
        <div
          className="my-auto flex gap-3 pointer-events-auto"
          onClick={() => navigate("/")}
        >
          <img
            src="/Logo.png"
            alt="logo"
            className="object-fit"
          />
          <h1 className="text-3xl pointer-events-auto">SIMS PPOB</h1>
        </div>
        <div className="flex gap-14 my-auto">
          <button
            className={`text-2xl ${
              location.pathname === "/TopUp" ? "text-red-500" : ""
            }`}
            onClick={() => navigate("/TopUp")}
          >
            Top Up
          </button>
          <button
            className={`text-2xl ${
              location.pathname === "/Transaction" ? "text-red-500" : ""
            }`}
            onClick={() => navigate("/Transaction")}
          >
            Transaction
          </button>
          <button
            className={`text-2xl ${
              location.pathname === "/Akun" ? "text-red-500" : ""
            }`}
            onClick={() => navigate("/Akun")}
          >
            Akun
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
