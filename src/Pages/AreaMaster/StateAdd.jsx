import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Container, Alert } from "react-bootstrap";
import moment from "moment/moment";
import InputBox from "../../Component/InputBox";
import "../../GlobalStyle/GlobalTheme.css";
import "./AreaMaster.css";
import locmap from "../../Asset/state.svg";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import { useSelector } from "react-redux";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
// import { AddCountryFunc } from "../../Slice/AddCountrySlice";
import useFetchState from "../../Custom_Hooks/useFetchState";
import { AddStateFunc, ClearStateAddState } from "../../Slice/AddStateSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function StateAdd() {
  const location = useLocation();
  const { countryId } = location.state;
  const [data, setData] = useState({ State_name: "", id_country: countryId });
  const dispatch = useDispatch();
  const [stateId, setStateId] = useState([]);
  const [param, setParam] = useState({ val: false, message: "" });
  const navigate = useNavigate();
  const currdate = moment();
  const { userInfo } = useSelector((state) => state.auth);

    // Fetch the State Add 
    const { isAddStateLoading,
    AddStateSuccessMsg,
    AddStateErrorMsg,
    isAddStateError,
    isAddStateSuccess } = useSelector(state => state.stateadd);


    // fetch state data list
  const { StateListData } = useFetchState(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      CountryCode: countryId
    }, [isAddStateSuccess]); 


  //useEffect for country add 
  useEffect(() => {
    // setId(countryId);
    if (isAddStateSuccess && !isAddStateError & !isAddStateLoading) {
      toast.success(AddStateSuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      setData( {
        State_name: null, // Reset only the `State_name` field
        id_country : countryId
      });

    }

    if (isAddStateError && !isAddStateLoading) {
      toast.error(AddStateErrorMsg, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearStateAddState());
    // dispatch(ClearState1());
  }, [isAddStateError, isAddStateSuccess, isAddStateLoading]);


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
    console.log(data)
    data.State_name = (data?.State_name)?.trim()
    let obj = { CompanyCode: userInfo?.details?.CompanyCode, ...data }
    if (obj.State_name === undefined || obj.State_name === null || obj.State_name === "") {
      toast.warning("Please Write a State Name", {
        autoClose: 6000,
        position: "top-right",
      });
    } else {
      dispatch(
        AddStateFunc(obj)
      );
    }
    // Reset the specific input field
    // setData( {
    //   State_name: null, // Reset only the `State_name` field
    //   id_country : countryId
    // });
  };
  const stateCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "state", headerName: "State", width: 200 },
  ];
  // console.log(countryId);
  return (
    <Container fluid>
        {/* Toaster  */}

        <ToastContainer />
      {param.val ? <>
        <Alert className="text-center" variant={'danger'} dismissible onClose={() => setParam({ val: false, message: "" })}>
          {param.message}
        </Alert>
      </> : null}
      <Row>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <h5 className="ms-5 mt-2">State Manager</h5>
        </Col>
        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="text-center text-sm-end"
        >
          <span>Show Cities</span>
          <button
            className="btn btn-link"
            onClick={() => {
              if (stateId.length === 0) {
                setParam({ val: true, message: "Please select a State" })
              } else {
                navigate("/auth/city", { state: {stateId: stateId[0] } });
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
                  Name={"State_name"}
                  error={false}
                  isdisable={false}
                  label={"State"}
                  maxlen={50}
                  value={data?.State_name || ""}
                  placeholder={"Enter State Name"}
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
                row={StateListData}
                col={stateCol}
                id={stateId}
                onChangeRow={(id) => setStateId(id ? [id] : [])}
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
          <div className="d-flex justify-content-center align-items-center">
            <img src={locmap} alt="pic" width={"85%"} />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StateAdd;
