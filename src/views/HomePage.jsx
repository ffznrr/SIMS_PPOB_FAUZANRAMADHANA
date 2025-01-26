import { useSelector, useDispatch } from "react-redux";
import Profile from "../components/Profile";
import Saldo from "../components/Saldo";
import { fetchAsync } from "../features/GetService";
import Toastify from "toastify-js";
import { useEffect } from "react";
import ServiceComponent from "../components/Service";
import Slider from "../components/Slider";

const HomePage = () => {
  const { todos, loading, error } = useSelector((state) => state.GetService);
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
    dispatch(fetchAsync());
  }, [dispatch]);

  return (
    <>
      <div className="w-full h-full">
        <div className="px-5 md:px-28 mt-10 flex">
          <Profile />
          <Saldo />
        </div>
        <div className="w-full px-5 md:px-28 flex mt-20">
          {todos.message == "Sukses" &&
            todos.data.map((value, i) => (
              <ServiceComponent
                key={i}
                image={value.service_icon}
                name={value.service_name}
                code={value.service_code}
              />
            ))}
        </div>
        <div>
          <Slider />
        </div>
      </div>
    </>
  );
};

export default HomePage;
