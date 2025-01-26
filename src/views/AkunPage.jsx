import ProfilePicture from "../components/ProfilePicture";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProfile } from "../features/GetProfile";
import Toastify from "toastify-js";
import Form from "../components/Form";

const AkunPage = () => {
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

  return (
    <>
      <div className="w-full flex justify-center">
        <ProfilePicture profile={profile} />
      </div>
      <div className="mx-96 mt-20 mb-20">
        <Form profile={profile} />
      </div>
    </>
  );
};

export default AkunPage;
