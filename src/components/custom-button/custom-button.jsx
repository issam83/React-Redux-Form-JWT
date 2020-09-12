import React from "react";
import "./custom-button.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  onClick,
  ...otherProps
}) => {
  // const eventOnClick = React.useCallback(() => {
  //   onClick();
  // }, []);
  return (
    <button
      className={`${inverted ? "inverted" : " "} ${
        isGoogleSignIn ? "google-sign-in" : " "
      } custom-button`}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
