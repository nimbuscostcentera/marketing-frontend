import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Container, Alert } from "react-bootstrap";
import moment from "moment/moment";
import InputBox from "../../Component/InputBox";
import "../../GlobalStyle/GlobalTheme.css";
import "./AreaMaster.css";
import locmap from "../../Asset/country.svg";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import useFetchCountry from "../../Custom_Hooks/useFetchCountry";
import { useSelector } from "react-redux";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { AddCountryFunc, ClearStateAddCountry } from "../../Slice/AddCountrySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageGeoLoc() {
  const [data, setData] = useState({ Country: null });
  const [param, setParam] = useState({ val: false, message: "" });
  const dispatch = useDispatch();
  const [countryId, setCountryId] = useState([]);
  const navigate = useNavigate();
  const currdate = moment();
  const { userInfo } = useSelector((state) => state.auth);


  // Fetch the Country Add 
  const { isAddCountryLoading,
    AddCountrySuccessMsg,
    AddCountryErrorMsg,
    isAddCountryError,
    isAddCountrySuccess } = useSelector(state => state.countryadd);

  //Fetch the country list
  const { CountryListData } = useFetchCountry({
    CompanyCode: userInfo?.details?.CompanyCode,
  }, [isAddCountrySuccess]);


  //useEffect for country add 
  useEffect(() => {
    if (isAddCountrySuccess && !isAddCountryError & !isAddCountryLoading) {
      toast.success(AddCountrySuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      // Reset the specific input field
      setData({ ...data, Country: "" });

    }

    if (isAddCountryError && !isAddCountryLoading) {
      toast.error(AddCountryErrorMsg, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearStateAddCountry());
    // dispatch(ClearState1());
  }, [isAddCountryError, isAddCountrySuccess, isAddCountryLoading]);


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
    data.Country = (data?.Country)?.trim()
    let obj = { CompanyCode: userInfo?.details?.CompanyCode, ...data }
    if (obj.Country === undefined || obj.Country === null || obj.Country === "") {
      toast.warning("Please Write a Country Name", {
        autoClose: 6000,
        position: "top-right",
      });
    } else {
      dispatch(
        AddCountryFunc(obj)
      );
    }
    // Reset the specific input field
    setData({ ...data, Country: "" });
  };



  const countryCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "Country_name", headerName: "Country", width: 200 },
  ];

  return (
    <Container fluid>

      {/* Toaster  */}

      <ToastContainer />


      {param.val === true ? <>
        <Alert className="text-center" variant={'danger'} dismissible onClose={() => setParam({ val: false, message: "" })}>
          {param.message}
        </Alert>
      </> : null}
      <Row>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <h5 className="ms-5 mt-2">Geo Location Manager</h5>
        </Col>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
          <span>Show States</span>
          <button
            className="btn btn-link"
            onClick={() => {
              if (countryId.length === 0) {
                setParam({ val: true, message: "Please select a Country" })
              } else {

                navigate("/auth/state", { state: {countryId: countryId[0] } });
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
                  Icon={<i class="bi bi-globe-americas"></i>}
                  type={"text"}
                  Name={"Country"}
                  error={false}
                  isdisable={false}
                  label={"Country"}
                  maxlen={50}
                  value={data?.Country || ""}
                  placeholder={"Enter Country Name"}
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
                row={CountryListData}
                col={countryCol}
                id={countryId}
                onChangeRow={(id) => setCountryId(id ? [id] : [])}
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
          <div className="d-flex justify-content-center align-items-center">
            <img src={locmap} alt="pic" width={"85%"} />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageGeoLoc;
