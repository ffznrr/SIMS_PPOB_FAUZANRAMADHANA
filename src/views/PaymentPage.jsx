import { useParams } from "react-router-dom";
import Profile from "../components/Profile";
import Saldo from "../components/Saldo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsync } from "../features/GetService";
import InputFieldNumber from "../components/InputFieldNumber";
import Toastify from "toastify-js";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import axios from "axios";
import { fetchAsyncSaldo } from "../features/GetSaldo";

const PaymentPage = () => {
  const { todos, loading, error } = useSelector((state) => state.GetService);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const find = todos?.data?.find((element) => element.service_code == slug);

  const handleSubmit = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (!storedToken) {
      }
      const token = JSON.parse(storedToken).token;

      const { data } = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          service_code: slug,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      dispatch(fetchAsyncSaldo());
      Toastify({
        text: data.message,
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
    } catch (err) {
      Toastify({
        text: err.response.data.message,
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
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

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
    dispatch(fetchAsync());
  }, []);

  return (
    <>
      <div>
        <div className="px-5 md:px-28 mt-10 flex">
          <Profile />
          <Saldo />
        </div>
        <div className="px-5 md:px-28 mt-14 ">
          <h1 className="text-2xl">Pembayaran</h1>
          <div className="flex mt-5">
            <img
              src={find && find.service_icon}
              alt={find && find.service_name}
            />
            <h1 className="font-bold text-2xl my-auto ml-5">
              {find && find.service_name}
            </h1>
          </div>
        </div>
        <div className="px-5 md:px-28 mt-14 ">
          <InputFieldNumber
            disabled="true"
            placeholder={"Masukan"}
            icon={BsCreditCard2FrontFill}
            inputValue={rupiah(find && find.service_tariff)}
          />
          <button
            className="w-full bg-red-500 border py-3 text-white"
            onClick={handleSubmit}
          >
            Bayar
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
