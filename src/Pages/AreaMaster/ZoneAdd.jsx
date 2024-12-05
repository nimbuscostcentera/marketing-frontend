import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import moment from "moment/moment";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../GlobalStyle/GlobalTheme.css";
import "./AreaMaster.css";

import InputBox from "../../Component/InputBox";
import ReusableDataGrid from "../../Component/ReusableDataGrid";

import locmap from "../../Asset/zone.svg";

import useFetchZone from "../../Custom_Hooks/useFetchZone";
import { AddZoneFunc, ClearStateAddZone } from "../../Slice/AddZoneSlice";

function ZoneAdd() {
  const location = useLocation();
  var { cityId } = location.state;
  const [data, setData] = useState({
    NAME: null,
    Parent_zone: cityId,
    id_city: cityId,
  });
  const dispatch = useDispatch();
  const [zoneId, setZoneId] = useState([]);
  const [param, setParam] = useState({ val: false, message: "" });
  //   const navigate = useNavigate();

  const currdate = moment();
  const { userInfo } = useSelector((state) => state.auth);
  // Fetch the City Add
  const {
    isAddZoneLoading,
    AddZoneSuccessMsg,
    AddZoneErrorMsg,
    isAddZoneError,
    isAddZoneSuccess,
  } = useSelector((state) => state.zoneadd);

  //fetching zone list
  const { ZoneListData } = useFetchZone(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      CityCode: cityId,
    },
    [isAddZoneSuccess]
  );

  //useEffect for City add
  useEffect(() => {
    if (isAddZoneSuccess && !isAddZoneError & !isAddZoneLoading) {
      toast.success(AddZoneSuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      setData({
        NAME: null,
        Parent_zone: cityId,
        id_city: cityId,
      });
    }

    if (isAddZoneError && !isAddZoneLoading) {
      toast.error(AddZoneErrorMsg, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearStateAddZone());
  }, [isAddZoneError, isAddZoneSuccess, isAddZoneLoading]);

  //Input handler
  const InputHandler = (e) => {
    let { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(), // Update the specific property
    }));
  };

  // Submit function
  const SubmitHandler = (e) => {
    e.preventDefault();
    // console.log(data)
    data.NAME = data?.NAME?.trim();
    let obj = { CompanyCode: userInfo?.details?.CompanyCode, ...data };
    if (obj.NAME === undefined || obj.NAME === null || obj.NAME === "") {
      toast.warning("Please Write a Zone Name", {
        autoClose: 6000,
        position: "top-right",
      });
    } else {
      dispatch(AddZoneFunc(obj));
    }
  };
  const zoneCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "NAME", headerName: "Zone", width: 200 },
  ];
  //   console.log(cityId)
  return (
    <Container fluid>
      {/* Toaster  */}

      <ToastContainer />
      {param.val === true ? (
        <>
          <Alert
            className="text-center"
            variant={"danger"}
            dismissible
            onClose={() => setParam({ val: false, message: "" })}
          >
            {param.message}
          </Alert>
        </>
      ) : null}
      <Row>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <h5 className="ms-5 mt-2">Zone Manager</h5>
        </Col>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <hr style={{ marginTop: 1, marginBottom: 1 }} />
        </Col>
        <Col xs={12} sm={12} md={7} lg={7} xl={7}>
          <Row className="ps-5">
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="ms-5 my-4">
                <InputBox
                  Icon={<i className="bi bi-globe-americas"></i>}
                  type={"text"}
                  Name={"NAME"}
                  error={false}
                  isdisable={false}
                  label={"Zone"}
                  maxlen={50}
                  value={data?.NAME || ""}
                  placeholder={"Enter Zone Name"}
                  onChange={InputHandler}
                  SearchButton={true}
                  SearchHandler={SubmitHandler}
                  SearchIcon={<i className="bi bi-plus-lg"></i>}
                  key={1}
                />
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="ms-3 my-4">
                <InputBox
                  Icon={<i className="bi bi-calendar"></i>}
                  type={"date"}
                  Name={"Date"}
                  error={false}
                  isdisable={true}
                  label={"Date"}
                  maxlen={50}
                  value={currdate.format("YYYY-MM-DD")}
                  placeholder={"Date"}
                  key={5}
                />{" "}
              </div>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-2">
              <ReusableDataGrid
                row={ZoneListData}
                col={zoneCol}
                id={zoneId}
                onChangeRow={(id) => setZoneId(id ? [id] : [])}
                uniquekey={"ID"}
                loading={false}
                DataGridHeight={360}
                checkSelect={1}
                key={2}
                width={"100%"}
              />{" "}
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} xl={5}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <img src={locmap} alt="pic" width={"85%"} />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ZoneAdd;
