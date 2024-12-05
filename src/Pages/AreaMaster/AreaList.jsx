import React, { useState } from "react";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Row, Col, Container } from "react-bootstrap";
import "../../GlobalStyle/GlobalTheme.css";
import "./AreaMaster.css";

import useFetchArea from "../../Custom_Hooks/useFetchArea";
import { useSelector } from "react-redux";

function AreaList() {
  const [areaid, setAreaId] = useState([]);
  const areaCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "AreaCode", headerName: "Area Code", width:160 },
    { field: "Remarks", headerName: "Remarks", width: 200 },
    { field: "ClosingDay", headerName: "Closing Days", width: 120 },
    { field: "ClosingFrom", headerName: "Closing From", width: 120 },
    { field: "ClosingTill", headerName: "Closing Till", width: 120 },
    { field: "Zone", headerName: "Zone", width: 150 },
    { field: "City", headerName: "City", width: 120 },
    { field: "State", headerName: "State", width: 120 },
    { field: "half", headerName: "half day", width: 120 },
    { field: "full", headerName: "full day", width: 120 },
  ];
  const { userInfo } = useSelector((state) => state.auth);
  const { area, isloading3 } = useFetchArea(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );
  const onChangeHandler = (pid) => {
    setAreaId(pid);
  };
  console.log(area);

  return (
    <Container fluid className="base-container">
      <Row className="inner-container px-3">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="ps-5">
          <div className="mt-2">
            <h5 className="title_container mt-2">Area List</h5>
            <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="ps-3">
          <ReusableDataGrid
            col={areaCol}
            row={area}
            id={areaid}
            onChangeRow={(id) => {
              onChangeHandler(id);
            }}
            loading={isloading3}
            uniquekey={"ID"}
            DataGridHeight={"80vh"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AreaList;
