import { BsCreditCard2FrontFill } from "react-icons/bs";
import { useState } from "react";
import InputFieldNumber from "./InputFieldNumber";
import Toastify from "toastify-js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAsyncSaldo } from "../features/GetSaldo";

const TopUpComponent = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const PostTopUp = async (value) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token.token);
      const { data } = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          top_up_amount: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        },
      );
      Toastify({
        text: "Top Up Success",
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

      dispatch(fetchAsyncSaldo());
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
          background: "red",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const handleTopUp = () => {
    let number = value.split(" ")[1];
    const resultNumber = number.replace(/\./g, "");
    if (resultNumber < 10000) {
      Toastify({
        text: "Minimal Top Up, Rp. 10.000",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      return;
    } else if (resultNumber > 1000000) {
      Toastify({
        text: "Maksimal Top Up, Rp. 1.000.000",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      return;
    }

    PostTopUp(resultNumber);
  };

  return (
    <>
      <div className="w-full">
        <h3 className="text-2xl mb-5">
          Silahkan Masukan
          <br />
          <span className="text-4xl font-bold">Nominal Top Up</span>
        </h3>
        <div className="w-full h-full grid grid-cols-12 gap-4 ">
          <div className="col-span-6 col-start-1">
            <InputFieldNumber
              placeholder={"Masukan Nominal Top Up"}
              icon={BsCreditCard2FrontFill}
              setData={setValue}
              type="number"
              inputValue={value}
            />
            <button
              onClick={() => handleTopUp()}
              disabled={value.length == 0}
              className={`w-full   text-white border py-3 ${
                value.length == 0
                  ? "bg-gray-500 border-gray-500"
                  : "bg-red-500 border-red-500"
              }`}
            >
              Top Up
            </button>
          </div>
          <div className="col-span-2 start-8">
            <button
              onClick={() => setValue("Rp. 10.000")}
              className="border mb-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              Rp. 10.000
            </button>
            <button
              onClick={() => setValue("Rp. 100.000")}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              Rp. 100.000
            </button>
          </div>
          <div className="col-span-2  start-8">
            <button
              onClick={() => setValue("Rp. 20.000")}
              className="border mb-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              Rp. 20.000
            </button>
            <button
              onClick={() => setValue("Rp. 250.000")}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              Rp. 250.000
            </button>
          </div>
          <div className="col-span-2  start-8">
            <button
              onClick={() => setValue("Rp. 50.000")}
              className="border mb-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              Rp. 50.000
            </button>
            <button
              onClick={() => setValue("Rp. 500.000")}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              Rp. 500.000
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpComponent;
