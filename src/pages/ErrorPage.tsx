import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl text-center my-4 text-red-600 mt-9s">Error!</h2>
      <div className="card bg-base-100 p-2">
        <div className="card-body gap-8 text-center">
          <div className="card-title text-red-500 flex justify-center">Oops! Something went wrong.</div>
          <p className="text-gray-600">We couldn't process your request at this time. Please try again later.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
