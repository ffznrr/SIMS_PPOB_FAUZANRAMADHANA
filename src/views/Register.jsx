import { FaAt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useState } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";

const RegisterPage = () => {
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [password, setPassword] = useState(false);

  // State untuk Mengambil Value
  const [email, setEmail] = useState("");
  const [first_name, setNamaDepan] = useState("");
  const [last_name, setNamaBelakang] = useState("");
  const [buatPassword, setBuatPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  // function untuk handle ketika submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (buatPassword !== konfirmasiPassword) {
      // untuk menampilkan Response di atas kiri setelah Hit API
      Toastify({
        text: "Password Tidak Sesuai",
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
    try {
      const dataObj = {
        email,
        first_name,
        last_name,
        password: buatPassword,
      };

      // untuk fetching data
      const { data } = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        dataObj,
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
    <div className="w-screen flex">
      {/* Bagian Form */}
      <div className="w-full h-screen flex justify-center items-center">
        <form
          className="max-w-lg w-full"
          onSubmit={HandleSubmit}
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
              Lengkapi data untuk <br /> membuat akun
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
            type="text"
            placeholder="Nama Depan"
            icon={MdPerson}
            setData={setNamaDepan}
          />
          <InputField
            type="text"
            placeholder="Nama Belakang"
            icon={MdPerson}
            setData={setNamaBelakang}
          />
          <InputField
            type={password ? "text" : "password"}
            placeholder="Buat Password"
            setData={setBuatPassword}
            icon={FaLock}
            value={password}
            onClick={() => setPassword(!password)}
            isPasswordField
          />
          <InputField
            type={confirmPassword ? "text" : "password"}
            placeholder="Konfirmasi Password"
            icon={FaLock}
            setData={setKonfirmasiPassword}
            value={confirmPassword}
            onClick={() => setConfirmPassword(!confirmPassword)}
            isPasswordField
          />

          <button
            className="w-full bg-red-500 text-white py-3"
            type="submit"
          >
            Registrasi
          </button>
          <Link to="/login">
            <p className="text-center mt-10">
              Sudah Punya akun? login{" "}
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
  );
};

export default RegisterPage;
