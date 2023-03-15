import React from "react";
import "../Css/SwitchThemeBtn.css";
const SwitchThemeBtn = () => {
  return (
    <div>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  );
};

export default SwitchThemeBtn;
