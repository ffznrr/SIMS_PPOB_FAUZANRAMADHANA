import { useNavigate } from "react-router";

const ServiceComponent = ({ image, name, code }) => {
  let navigate = useNavigate();
  return (
    <>
      <div
        className="w-full mx-auto"
        onClick={() => navigate(`/payment/${code}`)}
      >
        <div className="flex justify-center">
          <img
            src={image}
            alt={name}
          />
        </div>
        <h1 className="text-center">{name}</h1>
      </div>
    </>
  );
};

export default ServiceComponent;
