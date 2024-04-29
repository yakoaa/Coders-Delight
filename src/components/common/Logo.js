import React from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";

const Logo = ({ isFocusedMode }) => {

  return (
    <div className="header" style={{visibility: isFocusedMode ? 'hidden' : 'visible' }}>
      <h1>
        Coders Delight <KeyboardAltIcon fontSize="large" />
      </h1>
      <span className="sub-header">
      A typing speed test tool made by developers
      </span>
    </div>
  );
};

export default Logo;
