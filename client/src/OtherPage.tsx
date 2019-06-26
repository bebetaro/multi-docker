import React from "react";
import { Link } from "react-router-dom";

const OtherPage: React.FC = () => {
  return (
    <div>
      Im some other OtherPage
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default OtherPage;
