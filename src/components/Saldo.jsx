import { useDispatch, useSelector } from "react-redux";
import SaldoPrivacy from "./SaldoPrivacy";
import { useEffect, useState } from "react";
import { fetchAsyncSaldo } from "../features/GetSaldo";
import Toastify from "toastify-js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Saldo = () => {
  const [privacy, setPrivacy] = useState(true);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const { saldo, loading, error } = useSelector((state) => state.GetSaldo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Toastify({
        text: error,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchAsyncSaldo());
  }, [dispatch]);

  return (
    <>
      <div className="w-full h-full overflow-hidden relative flex flex-col md:flex-row">
        <img
          src="/BackgroundSaldo.png"
          alt="Background"
          className="w-full h-64 md:h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center md:justify-start text-white p-5 md:p-10">
          <p className="text-sm md:text-lg font-light">Saldo Anda</p>
          <div className="flex items-center space-x-2">
            {privacy ? (
              <div className="flex">
                <h1 className="text-3xl md:text-5xl font-semibold">Rp</h1>
                <SaldoPrivacy />
              </div>
            ) : (
              <h1 className="text-3xl md:text-5xl font-semibold">
                {rupiah(saldo.balance)}
              </h1>
            )}
          </div>
          <div className="flex">
            <p className="text-xs md:text-sm mt-5">Lihat Saldo</p>
            <p
              className="text-xs md:text-sm mt-5.5 mx-2"
              onClick={() => setPrivacy(!privacy)}
            >
              {privacy ? (
                <FaRegEyeSlash className="w-5 h-5" />
              ) : (
                <FaRegEye className="w-5 h-5" />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Saldo;
