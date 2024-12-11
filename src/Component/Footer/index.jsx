import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./Footer.css"
function Footer() {
  return (
    <div className="d-flex justify-content-center align-items-center footer py-2">
      Copyright
      <a href="#" style={{ marginLeft: "10px" }}>
        {" "}
        Nimbus Systems Pvt. Ltd.{" "}
      </a>
      <span style={{ marginLeft: "8px" }}> 2024</span>
    </div>
  );
}

export default Footer;
