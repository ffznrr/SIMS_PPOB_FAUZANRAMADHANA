import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncBanner } from "../features/GetBanner";
import Toastify from "toastify-js";

const Slider = () => {
  const { banner, loading, error } = useSelector((state) => state.GetBanner);
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
    dispatch(fetchAsyncBanner());
  }, []);
  return (
    <>
      <div className="w-full pl-5 md:pl-28  mt-20 mb-20">
        <p className="font-bold text-2xl mb-5">Temukan Promo Menarik</p>
        <div className="snap-x snap-mandatory overflow-x-auto flex gap-5 mr-5">
          {/* Snap Items */}
          {banner.message === "Sukses" &&
            banner.data.map((value, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-96 h-48 bg-gray-200 rounded-lg"
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={value.banner_image}
                  alt={`Promo ${index}`}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
