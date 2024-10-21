import React from "react";

type Props = {};

const NoAccess = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h3>You have no access to this page</h3>
      <p>Contact Admin to give you access</p>
    </div>
  );
};

export default NoAccess;
