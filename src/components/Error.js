import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>{err.status} {err.statusText}</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <p>{err.data}</p>
        <p>
          Return to <a href="/">Home</a>
        </p>
      </div>
      
    </div>
  );
};

export default Error;
