import React from "react";
import spinnerStyles from "./Spinner.module.scss"; // Import CSS file for spinner styles

const Spinner: React.FC = () => {
  return (
    <div className={spinnerStyles["spinner-container"]}>
      <div className={spinnerStyles["spinner"]}></div>
    </div>
  );
};

export default Spinner;
