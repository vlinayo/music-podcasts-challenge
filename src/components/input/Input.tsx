import React, { ChangeEvent, useState } from "react";
import inputStyles from "./Input.module.scss";

interface InputProps {
  onInputChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ onInputChange }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onInputChange(newValue);
  };

  return (
    <input
      type="text"
      placeholder="Filter podcasts ..."
      value={value}
      onChange={handleChange}
      className={inputStyles.input}
    />
  );
};

export default Input;
