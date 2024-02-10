import React from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import AppTitle from "@/components/AppTitle";

const LoadErrorTemplate = ({
  children,
  lastUpdated,
  title,
  loading,
  errorMessage,
}) => {
  return (
    <div className="h-100vh">
      <AppTitle title={title} lastUpdated={lastUpdated} />
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : errorMessage ? (
        <div className="h-full w-full flex justify-center items-center">
          <Error error={errorMessage} />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default LoadErrorTemplate;
