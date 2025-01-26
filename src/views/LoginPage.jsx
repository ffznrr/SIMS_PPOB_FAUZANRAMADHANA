import { FaAt, FaLock } from "react-icons/fa";
import Toastify from "toastify-js";
import { useState } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [password, setPassword] = useState(false);
  let navigate = useNavigate();

  // state untuk mengambil data
  const [email, setEmail] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const dataLogin = {
        email,
        password: passwordUser,
      };

      const { data } = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        dataLogin,
      );

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
      sessionStorage.setItem(
        "token",
        JSON.stringify({ token: data.data.token }),
      );
      navigate("/");
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

  return (
    <>
      <div className="w-screen flex">
        {/* Bagian Form */}
        <div className="w-full h-screen flex justify-center items-center">
          <form
            className="max-w-lg w-full"
            onSubmit={handleLogin}
          >
            <div className="flex justify-center gap-2 mb-10">
              <img
                src="./Logo.png"
                alt="logo"
              />
              <h1 className="my-auto font-bold text-xl">SIMS PPOB</h1>
            </div>
            <div className="flex justify-center gap-2 mb-10">
              <h1 className="my-auto font-bold text-3xl text-center">
                Masuk atau buat akun <br /> untuk memulai
              </h1>
            </div>

            {/* Bagian Input */}
            <InputField
              type="text"
              placeholder="Masukan Email Anda"
              icon={FaAt}
              setData={setEmail}
            />

            <InputField
              type={password ? "text" : "password"}
              placeholder="Masukan Password Anda"
              icon={FaLock}
              value={password}
              setData={setPasswordUser}
              onClick={() => setPassword(!password)}
              isPasswordField
            />

            <button className="w-full bg-red-500 text-white py-3">Login</button>
            <Link to="/registration">
              <p className="text-center mt-10">
                Belum punya akun? registrasi{" "}
                <span className="text-red-500">di sini</span>
              </p>
            </Link>
          </form>
        </div>

        {/* Bagian Image */}
        <div className="w-full">
          <img
            className="w-full h-screen object-cover"
            src="./regislogin.png"
            alt="register"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
