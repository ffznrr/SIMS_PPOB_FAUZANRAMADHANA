import axios from "axios";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchAsyncProfile } from "../features/GetProfile";
import Toastify from "toastify-js";

const ProfilePicture = ({ profile }) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const handleEditImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = JSON.parse(sessionStorage.getItem("token")).token;

      const { data } = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
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
      dispatch(fetchAsyncProfile());
    } catch (err) {
      console.error(
        "Error uploading image:",
        err.response?.data || err.message,
      );
    }
  };
  const link = profile.profile_image;
  return (
    <>
      <div className="mt-10">
        <div className="rounded-full flex justify-center">
          <div className="relative  h-full">
            <img
              src={link && !link.includes("null") ? link : "./ProfilePhoto.png"}
              alt="profile"
              className="w-36 h-36"
            />
            <div className="absolute -right-3 -bottom-0 border-2 border-gray-200 rounded-full p-2">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center space-x-1"
              >
                <MdModeEdit className="w-5 h-5" />
                <span className="sr-only">Upload File</span>{" "}
              </label>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleEditImage}
              />
            </div>
          </div>
        </div>
        <h1 className="font-semibold text-5xl text-center mt-10">
          {profile.first_name} {profile.last_name}
        </h1>
      </div>
    </>
  );
};

export default ProfilePicture;
