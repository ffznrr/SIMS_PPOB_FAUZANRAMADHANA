import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProfile } from "../features/GetProfile";
import Toastify from "toastify-js";

const Profile = () => {
  const { profile, loading, error } = useSelector((state) => state.GetProfile);
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
    dispatch(fetchAsyncProfile());
  }, [dispatch]);

  const link = profile.profile_image;

  return (
    <>
      <div className="w-full">
        <div className="rounded-full w-24 h-24">
          <img
            src={link && !link.includes("null") ? link : "/ProfilePhoto.png"}
            alt="profile"
            className="mb-5 w-24 h-24 rounded-full"
          />
        </div>
        <h2 className="text-4xl font-light mb-1">Selamat Datang,</h2>
        <h1 className="font-semibold text-5xl">
          {profile.first_name} {profile.last_name}
        </h1>
      </div>
    </>
  );
};

export default Profile;
