import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../GlobalStyle/GlobalTheme.css";
import locmap from "../../Asset/industry.svg";

import InputBox from "../../Component/InputBox";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import useFetchIndustry from "../../Custom_Hooks/useFetchIndustry";
import {
  AddIndustryFunc,
  ClearStateAddIndustry,
} from "../../Slice/AddIndustrySlice";

function Industry() {
  const [data, setData] = useState({ NAME: null });
  const [param, setParam] = useState({ val: false, message: "" });
  const dispatch = useDispatch();
  const [industryId, setIndustryId] = useState([]);
  const navigate = useNavigate();
  const currdate = moment();
  const { userInfo } = useSelector((state) => state.auth);

  // Fetch the Country Add
  const {
    isAddIndustryLoading,
    AddIndustrySuccessMsg,
    AddIndustryErrorMsg,
    isAddIndustryError,
    isAddIndustrySuccess,
  } = useSelector((state) => state.addindustry);

  //Fetch the country list
  const { IndustryListData } = useFetchIndustry(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    [isAddIndustrySuccess]
  );

  //useEffect for industry add
  useEffect(() => {
    if (isAddIndustrySuccess && !isAddIndustryError & !isAddIndustryLoading) {
      toast.success(AddIndustrySuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      // Reset the specific input field
      setData({ ...data, NAME: "" });
    }

    if (isAddIndustryError && !isAddIndustryLoading) {
      toast.error(AddIndustryErrorMsg, {
        autoClose: 6000,
        position: "top-right",
      });
    }
    dispatch(ClearStateAddIndustry());
    // dispatch(ClearState1());
  }, [isAddIndustryError, isAddIndustrySuccess, isAddIndustryLoading]);

  //Input handler
  const InputHandler = (e) => {
    let { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(), // Update the specific property
    }));
    // setData({...data,[e.target.name]:e.target.value})
  };

  // Submit function
  const SubmitHandler = (e) => {
    e.preventDefault();
    // console.log(data)
    data.NAME = data?.NAME?.trim();
    let obj = { CompanyCode: userInfo?.details?.CompanyCode, ...data };
    if (obj.NAME === undefined || obj.NAME === null || obj.NAME === "") {
      toast.warning("Please Write a Industry Name", {
        autoClose: 6000,
        position: "top-right",
      });
    } else {
      dispatch(AddIndustryFunc(obj));
    }
    // Reset the specific input field
    setData({ ...data, NAME: "" });
  };

  const IndustryCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "NAME", headerName: "Industry", width: 200 },
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
          <h5 className="ms-5 mt-2">Industry Manager</h5>
        </Col>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
          {/* <span>Show States</span>
          <button
            className="btn btn-link"
            onClick={() => {
              if (industryId.length === 0) {
                setParam({ val: true, message: "Please select a Country" })
              } else {

                // navigate("/auth/state", { state: { countryId } });
              }
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "grey" }}
            />
          </button> */}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <hr style={{ marginTop: 1, marginBottom: 1 }} />
        </Col>
        <Col xs={12} sm={12} md={7} lg={7} xl={7}>
          <Row className="ps-5">
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="ms-5 my-4">
                <InputBox
                  Icon={<i class="bi bi-globe-americas"></i>}
                  type={"text"}
                  Name={"NAME"}
                  error={false}
                  isdisable={false}
                  label={"Country"}
                  maxlen={50}
                  value={data?.NAME || ""}
                  placeholder={"Enter Industry Name"}
                  onChange={InputHandler}
                  SearchButton={true}
                  SearchHandler={SubmitHandler}
                  SearchIcon={<i class="bi bi-plus-lg"></i>}
                  key={1}
                />
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="ms-3 my-4">
                <InputBox
                  Icon={<i class="bi bi-calendar"></i>}
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
                row={IndustryListData}
                col={IndustryCol}
                id={industryId}
                onChangeRow={(id) => setIndustryId(id ? [id] : [])}
                uniquekey="ID"
                loading={false}
                DataGridHeight={360}
                checkSelect={1}
                key={2}
                width="100%"
              />
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

export default Industry;
