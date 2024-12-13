import React from 'react'
import { Form, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../InputBox/InputBox.css";
function DateRangeInput({
  StartDate,
  EndDate,
  InputHandler,
  StartDateValue,
  EndDateValue,
  maxdate1,
  maxdate2,
  mindate2,
  mindate1,
}) {
  return (
    <div className="px-2 py-1 d-flex justify-content-between align-items-center flex-wrap">
      <div className="pe-1">
        <label style={{ fontSize: "12px" }}>Start Date</label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="color-label">
            <i className="bi bi-calendar-check"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Start Date"
            aria-label="StartDate"
            aria-describedby="basic-addon1"
            type="date"
            name={StartDate}
            value={StartDateValue || ""}
            onChange={InputHandler}
            max={maxdate1}
            min={mindate1}
            style={{ padding: "5px 12px" }}
          />
        </InputGroup>
      </div>
      <div className="ps-1">
        <label style={{ fontSize: "12px" }}>End Date</label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="color-label">
            <i className="bi bi-calendar"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="End Date"
            aria-label="EndDate"
            aria-describedby="basic-addon1"
            type="date"
            name={EndDate}
            value={EndDateValue || ""}
            disabled={
              StartDateValue == null ||
              StartDateValue == undefined ||
              StartDateValue == ""
            }
            min={mindate2}
            max={maxdate2}
            onChange={InputHandler}
            style={{ padding: "5px 12px" }}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default DateRangeInput;
