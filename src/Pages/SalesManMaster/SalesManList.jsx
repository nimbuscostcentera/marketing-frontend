import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Row, Col, Container } from "react-bootstrap";

import "../../GlobalStyle/GlobalTheme.css";
import "./SalesMan.css";

import useFetchSalesMan from "../../Custom_Hooks/useFetchSalesMan";

function SalesManList() {
  const [SMid, setSMid] = useState([]);
  const SMCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "NAME", headerName: "Sales Man Name", width: 150 },
    { field: "PHONE", headerName: "Phone no.", width: 120 },
    { field: "ADDRESS", headerName: "address", width: 300 },
    { field: "CompanyCode", headerName: "CompanyCode", width: 120 },
    { field: "vat_no", headerName: "VAT No.", width: 100 },
    { field: "LISCENCENO", headerName: "Liscence No.", width: 120 },
    { field: "TrgAmt", headerName: "trgamt", width: 80 },
    { field: "CONTACTPERSON", headerName: "Contact Person", width: 150 },
  ];
  const { userInfo } = useSelector((state) => state.auth);
  const { salesmanList, isSalesManLoading } = useFetchSalesMan(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );
  const onChangeHandler = (pid) => {
    setSMid(pid);
  };
  return (
    <Container fluid className="base-container">
      <Row className="ps-5">
        <Col xs={12} style={{ height: "fit-content" }}>
          <h5 className="title_container mt-2">Sales Man List</h5>
          <hr className="mt-2" />
        </Col>
        <Col xs={12}>
          <ReusableDataGrid
            col={SMCol}
            row={salesmanList}
            id={SMid}
            onChangeRow={(id) => {
              onChangeHandler(id);
            }}
            loading={isSalesManLoading}
            uniquekey={"CODE"}
            DataGridHeight={"75vh"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SalesManList;
