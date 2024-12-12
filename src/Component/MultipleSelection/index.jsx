import React from "react";
import { Form } from "react-bootstrap";
import "./multiselect.css";
function MultipleSelection({
  data,
  uniqueKey,
  MName,
  onChange,
  State,
  FieldName,
  StyleInput,
  dataLength,
}) {
  
  
  return (
    <details style={StyleInput}>
      <summary className="select-box">--Select {FieldName}--</summary>
      <ul className="ul-div" style={{ height: "200px", overflowY: "scroll" }}>
        <li className="list-box">
          <Form.Check
            type="checkbox"
            value={"all"}
            onChange={onChange}
            label="All"
            checked={State?.length === dataLength}
          />
        </li>
        {data?.map((item, index) => {
          // console.log(
          // console.log(item);
          //   State?.includes(item[`${uniqueKey}`]),
          //   item[`${uniqueKey}`],State
          // );
          console.log(State);

          return (
            <li key={index} className="list-box">
              <Form.Check
                type="checkbox"
                value={item[`${uniqueKey}`]}
                onChange={onChange}
                checked={State?.includes(item[`${uniqueKey}`])}
                label={item[`${MName}`]}
              />
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export default MultipleSelection;
