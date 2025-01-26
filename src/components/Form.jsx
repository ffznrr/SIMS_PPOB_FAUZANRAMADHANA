import InputField from "./InputField";
import axios from "axios";
import { MdAlternateEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchAsyncProfile } from "../features/GetProfile";
import Toastify from "toastify-js";

const Form = ({ profile }) => {
  const [isEditProfile, setisEditProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    setEmail(profile.email);
    setFirst_name(profile.first_name);
    setLast_name(profile.last_name);
  }, [profile]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token")).token;
      const { data } = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      Toastify({
        text: "Sukses Update Data",
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

      dispatch(fetchAsyncProfile());
      setisEditProfile(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {profile ? (
        <div className="w-full h-full px-20">
          <div>
            <label className="text-2xl">Email</label>
            <div className="mt-3 mb-5">
              <InputField
                disabled={"true"}
                icon={MdAlternateEmail}
                inputValue={email}
                setData={setEmail}
              />
            </div>
          </div>
          <div>
            <label className="text-2xl">Nama Depan</label>
            <div className="mt-3 mb-5">
              <InputField
                disabled={!isEditProfile}
                icon={IoPerson}
                inputValue={first_name}
                setData={setFirst_name}
              />
            </div>
          </div>
          <div>
            <label className="text-2xl">Nama Belakang</label>
            <div className="mt-3 mb-5">
              <InputField
                setData={setLast_name}
                disabled={!isEditProfile}
                icon={IoPerson}
                inputValue={last_name}
              />
            </div>
          </div>
          <div className="w-full">
            {isEditProfile ? (
              <div>
                {" "}
                <button
                  className="w-full border-2 border-red-500 text-white bg-red-500  py-3"
                  onClick={() => handleSave()}
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div>
                {" "}
                <button
                  className="w-full border-2 border-red-500 text-red-500 py-3"
                  onClick={() => setisEditProfile(!isEditProfile)}
                >
                  Edit Profile
                </button>
                <button
                  className="w-full border-2 border-red-500 text-white bg-red-500 mt-5 py-3"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1>Loading ...</h1>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
