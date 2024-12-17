import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../GlobalStyle/GlobalTheme.css";
import "./AreaMaster.css";
import moment from "moment/moment";

import { Row, Col, Container, Alert } from "react-bootstrap";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

import InputBox from "../../Component/InputBox";
import ReusableDataGrid from "../../Component/ReusableDataGrid";

import locmap from "../../Asset/city.svg";

import useFetchCity from "../../Custom_Hooks/useFetchCity";
import { AddCityFunc, ClearCityAddCity } from "../../Slice/AddCitySlice";

function StateAdd() {
  const location = useLocation();
  let { stateId } = location.state || {};
  const [data, setData] = useState({ NAME: null, id_state: stateId });
  const dispatch = useDispatch();
  const [cityId, setCityId] = useState([]);
  const [param, setParam] = useState({ val: false, message: "" });
  const navigate = useNavigate();

  const currdate = moment();
  const { userInfo } = useSelector((state) => state.auth);

  // Fetch the City Add
  const {
    isAddCityLoading,
    AddCitySuccessMsg,
    AddCityErrorMsg,
    isAddCityError,
    isAddCitySuccess,
  } = useSelector((state) => state.cityadd);

  const { CityListData } = useFetchCity(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      StateCode: stateId,
    },
    [isAddCitySuccess]
  );

  useEffect(() => {
    setTimeout(() => {
      if (!stateId) {
        toast.error("Select a State to see City");
        navigate("/auth/state");
      }
    }, 3000);
  }, [stateId]);

  //useEffect for City add
  useEffect(() => {
    if (isAddCitySuccess && !isAddCityError & !isAddCityLoading) {
      toast.success(AddCitySuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      setData({
        NAME: null,
        id_country: stateId,
      });
    }

    if (isAddCityError && !isAddCityLoading) {
      toast.error(AddCityErrorMsg, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearCityAddCity());
  }, [isAddCityError, isAddCitySuccess, isAddCityLoading]);

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
    console.log(data);
    data.NAME = data?.NAME?.trim();
    let obj = { CompanyCode: userInfo?.details?.CompanyCode, ...data };
    if (obj.NAME === undefined || obj.NAME === null || obj.NAME === "") {
      toast.warning("Please Write a City Name", {
        autoClose: 6000,
        position: "top-right",
      });
    } else {
      dispatch(AddCityFunc(obj));
    }
  };
  const cityCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "NAME", headerName: "City", width: 200 },
  ];

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
          <h5 className="ms-5 mt-2">City Manager</h5>
        </Col>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
          <span>Show Zones</span>
          <button
            className="btn btn-link"
            onClick={() => {
              if (cityId?.length === 0) {
                setParam({ val: true, message: "Please select a City" });
              } else {
                navigate("/auth/zone", { state: { cityId: cityId[0] } });
              }
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "grey" }}
            />
          </button>
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
                  label={"City"}
                  maxlen={50}
                  value={data?.NAME || ""}
                  placeholder={"Enter City Name"}
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
                row={CityListData}
                col={cityCol}
                id={cityId}
                onChangeRow={(id) => setCityId(id ? [id] : [])}
                uniquekey={"ID"}
                loading={stateId ? false : true}
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

export default StateAdd;
