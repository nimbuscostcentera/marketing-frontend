import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./InputBox.css";
import { Button } from "react-bootstrap";

function InputBox({
  Icon,
  type,
  placeholder,
  label,
  Name,
  onChange,
  error,
  errorMsg,
  maxlen,
  value,
  InputStyle,
  SearchIcon,
  SearchButton,
  SearchHandler,
  isdisable,
}) {
  return (
    <div className="Zindex">
      <div className="input-group flex-nowrap">
        <span
          className="input-group-text color-label Zindex"
          id="addon-wrapping"
        >
          {Icon}
        </span>
        <input
          value={value}
          type={type}
          className="form-input Zindex"
          placeholder={placeholder}
          aria-label={label}
          onChange={onChange}
          name={Name}
          maxLength={maxlen}
          style={InputStyle}
          disabled={isdisable}
        />
        {SearchButton ? (
          <Button
            className="search"
            onClick={SearchHandler}
            style={{ height: "30px" }}
          >
            {SearchIcon || <i className="bi bi-search"></i>}
          </Button>
        ) : null}
      </div>
      <div
        style={{
          visibility: error ? "inherit" : "hidden",
          color: "red",
          fontSize: "10px",
        }}
      >
        {errorMsg}
      </div>
    </div>
  );
}

export default InputBox;
