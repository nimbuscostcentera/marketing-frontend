import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReusableModal from "../../Component/Modal";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import InputBox from "../../Component/InputBox/index.jsx";
import ResetButton from "../../Component/ResetButton/index.jsx";
import SubmitButton from "../../Component/SubmitButton/index.jsx";
import SelectOption from "../../Component/SelectOption/index.jsx";
import MultipleSelection from "../../Component/MultipleSelection";

import "./Cust.css";
import "../../Component/InputBox/InputBox.css";
import "../../GlobalStyle/GlobalTheme.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AreaData from "../../mock-data/Area.js";
import BSize from "../../mock-data/BSize.js";
import statusData from "../../mock-data/Status.js";
import FilterData from "../../mock-data/UserData.js";

import EmailValidation from "../../Validators/EmailValidation.js";
import {
  CustRegClearState,
  CustRegFunc,
} from "../../Slice/CustomerRegSlice.js";
import useFetchCountry from "../../Custom_Hooks/useFetchCountry.js";
import useFetchState from "../../Custom_Hooks/useFetchState.js";
import useFetchCity from "../../Custom_Hooks/useFetchCity.js";
import useFetchZone from "../../Custom_Hooks/useFetchZone.js";
import useFetchArea from "../../Custom_Hooks/useFetchArea.js";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import useFetchSalesMan from "../../Custom_Hooks/useFetchSalesMan.js";
import useFetchIndustry from "../../Custom_Hooks/useFetchIndustry.js";
import useFetchBusiness from "../../Custom_Hooks/useFetchBusiness.js";
import useFetchCustType from "../../Custom_Hooks/useFetchCustType.js";

function CustomerMaster() {
  const [custData, setCustData] = useState({
    id_country: -1,
    id_state: -1,
    id_city: -1,
    id_zone: -1,
    id_area: -1,
    Area: null,
    id_salesman: -1,
    id_industry: -1,
    CoName: null,
    PhNo: null,
    Mobile: null,
    PinCode: null,
    Contact_Name: null,
    ADDRESS: null,
    Remarks: null,
    REFNAME: null,
    ID_Vendor: null,
    ID_Vendor1: null,
    sold: 0,
    Garbage: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isCustRegLoding,
    CustRegSuccessMsg,
    CustRegErrorMsg,
    isCustRegErrorMsg,
    isCustRegSuccess,
  } = useSelector((state) => state.custadd);
  const { userInfo } = useSelector((state) => state.auth);

  //Fetch the country list
  const { CountryListData } = useFetchCountry(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );

  // Fetch state data list
  const { StateListData } = useFetchState(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      CountryCode: custData.id_country,
    },
    [custData.id_country]
  );
  // Fetch city data list
  const { CityListData } = useFetchCity(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      StateCode: custData?.id_state,
    },
    [custData.id_state, custData.id_country]
  );

  //fetching zone list
  const { ZoneListData } = useFetchZone(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      CityCode: custData?.id_city,
    },
    [custData.id_city, custData.id_state]
  );

  //Fetch area list
  const { area } = useFetchArea(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      zone_id: custData?.id_zone,
    },
    [custData.id_zone]
  );

  //Fetch salesman list
  const { salesmanList } = useFetchSalesMan(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    [custData.id_salesman]
  );
  //Fetch Industry list
  const { IndustryListData } = useFetchIndustry(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    [custData.id_industry]
  );
  //Fetch Business list
  const { BusinessListData } = useFetchBusiness(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    [custData.id_industry]
  );


  //Fetch Customer type
 const { CustTypeListData } = useFetchCustType(
   {
     CompanyCode: userInfo?.details?.CompanyCode,
   },
   []
 );

// console.log(CustTypeListData);
  // console.log(IndustryListData);
  //hook to upload

  //modal controler hook
  const [show, setShow] = useState({
    Area: false,
    Country: false,
    State: false,
    City: false,
  });
  //id picker
  const [rid, setRid] = useState({
    id_area: null,
    id_country: null,
    id_city: null,
    id_state: null,
  });
  //validator
  const [inputVal, setInputVal] = useState({
    EmailId: true,
    PhNo: true,
    PinCode: true,
    Mobile: true,
  });

  //Business size  
  let SelectBSizeList = useMemo(() => {
    if (!BusinessListData) return [];
    let arr = [];
    arr.push({ Name: "---Select Business Size---", Value: 0 });
    let arr1 = BusinessListData.map((item) => ({
      Name: item?.code,
      Value: item?.ID,
    }));
    return [...arr, ...arr1];
  }, [BusinessListData]);

  //filter
  // let SelectFilterList = useMemo(() => {
  //   if (!FilterData) return [];
  //   let arr = [];
  //   arr.push({ Name: "---Select Vendor--", Value: 0 });
  //   let arr1 = FilterData.map((item) => ({
  //     Name: item?.UserName,
  //     Value: item?.["User ID"],
  //   }));
  //   return [...arr, ...arr1];
  // }, [FilterData]);

  //Industry 
  let SelectIndustryList = useMemo(() => {
    if (!IndustryListData) return [];
    let arr = [];
    arr.push({ Name: "---Select Industry--", Value: 0 });
    let arr1 = IndustryListData.map((item) => ({
      Name: item?.NAME,
      Value: item?.["ID"],
    }));
    return [...arr, ...arr1];
  }, [IndustryListData]);

  //Salesman
  let SelectSalesManList = useMemo(() => {
    if (!salesmanList) return [];
    let arr = [];
    arr.push({ Name: "---Select SalesMan--", Value: 0 });
    let arr1 = salesmanList.map((item) => ({
      Name: item?.NAME,
      Value: item?.["id"],
    }));
    return [...arr, ...arr1];
  }, [salesmanList]);

  //country
  let SelectCountryList = useMemo(() => {
    if (!CountryListData) return [];
    let arr = [];
    arr.push({ Name: "---Select Country--", Value: -1 });
    let arr1 = CountryListData.map((item) => ({
      Name: item?.Country_name,
      Value: item?.["ID"],
    }));
    return [...arr, ...arr1];
  }, [CountryListData]);

  //state list
  let SelectStateList = useMemo(() => {
    if (!StateListData) return [];
    let arr = [];
    arr.push({ Name: "---Select State--", Value: 0 });
    let arr1 = StateListData.map((item) => ({
      Name: item?.state,
      Value: item?.["ID"],
    }));
    return [...arr, ...arr1];
  }, [StateListData]);

  //city
  let SelectCityList = useMemo(() => {
    if (!CityListData) return [];
    let arr = [];
    arr.push({ Name: "---Select City--", Value: 0 });
    let arr1 = CityListData.map((item) => ({
      Name: item?.NAME,
      Value: item?.["ID"],
    }));
    return [...arr, ...arr1];
  }, [CityListData]);

  //zone
  let SelectZoneList = useMemo(() => {
    if (!ZoneListData) return [];
    let arr = [];
    arr.push({ Name: "---Select Zone--", Value: 0 });
    let arr1 = ZoneListData.map((item) => ({
      Name: item?.NAME,
      Value: item?.["ID"],
    }));
    return [...arr, ...arr1];
  }, [ZoneListData]);

  //toaster
  useEffect(() => {
    if (isCustRegSuccess && !isCustRegErrorMsg & !isCustRegLoding) {
      toast.success(CustRegSuccessMsg, {
        autoClose: 6000,
        position: "top-right",
      });
      setCustData({
        id_country: null,
        id_state: null,
        id_city: null,
        id_area: null,
        Area: null,
        CoName: null,
        PhNo: null,
        Mobile: null,
        PinCode: null,
        Contact_Name: null,
        ADDRESS: null,
        Remarks: null,
        REFNAME: null,
        ID_Vendor: null,
        ID_Vendor1: null,
        sold: null,
        Garbage: null,
      });
      dispatch(CustRegClearState());
    }
    if (isCustRegErrorMsg && !isCustRegSuccess && !isCustRegLoding) {
      toast.error(CustRegErrorMsg, { autoClose: 6000, position: "top-right" });
    }
  }, [isCustRegErrorMsg, isCustRegSuccess, isCustRegLoding]);

  //input loader
  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    if (key === "id_country") {
      // setCustData({
      //   ...custData,
      //   id_city: -1,
      //   id_state: -1,
      //   id_area: -1,
      // })
      setCustData((prev) => {
        return { ...prev, id_city: -1, id_state: -1, id_area: -1, id_zone: -1 };
      });
    } else if (key === "id_state") {
      setCustData((prev) => {
        return {
          ...prev,
          id_city: -1,
          id_area: -1,
          id_zone: -1,
        };
      });
    } else if (key === "id_city") {
      setCustData((prev) => {
        return {
          ...prev,
          id_area: -1,
          id_zone: -1,
        };
      });
    } else if (key === "id_zone") {
      setCustData((prev) => {
        return {
          ...prev,
          id_area: -1,
        };
      });
    }
    // else if (key === "id_state") {
    //   setCustData({
    //     ...custData,
    //     id_city: -1,
    //     id_area: -1,
    //     [key]: value,
    //    });
    // } else  if (key === "id_city") {
    //   setCustData({
    //     ...custData,
    //     id_area: -1,
    //     [key]: value,
    //   });
    // } else {

    //   setCustData({ ...custData, [key]: value });
    // }
    setCustData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  // console.log(custData);
  //submiter
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(custData);
    dispatch(
      CustRegFunc({
        ...custData,
        CompanyCode: userInfo?.details?.CompanyCode,
      })
    );
  };
  //modal close
  const handleClose = () => {
    setShow({ area: false });
  };
  //modal open
  const HandleOpen = (args) => {
    console.log(args, "hi");
    setShow({ ...show, [`${args}`]: true });
  };
  //multiple selection handler
  const SelectHandler1 = (e) => {
    let value = e.target.value;
    let AllValue = CustTypeListData?.map((i) => i?.ID);

    if (value === "all") {
      if (custData?.Status?.length === AllValue?.length) {
        setCustData({ ...custData, Status: [] });
      } else {
        setCustData({ ...custData, Status: AllValue });
      }
    } else {
      value = Number(value);
      let arr = custData?.Status || [];
      if (arr !== 0 && arr?.includes(value)) {
        arr = arr.filter((item) => item !== value);
      } else {
        arr.push(Number(value));
      }
      setCustData({ ...custData, Status: arr });
    }
  };
  //column name of area
  const areaCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "AreaCode", headerName: "Area Code", width: 160 },
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
  return (
    <Container
      fluid
      className="body-height"
      style={{ marginLeft: "40px", width: "auto" }}
    >
      <ToastContainer />
      <div className="ms-4">
        <div className="d-flex justify-content-between align-items-center m-0 px-3">
          <h5 className="title_container mt-2">Customer Management</h5>
          <button
            className="btn btn-link p-0"
            onClick={() => {
              navigate("/auth/cust-list");
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "25px", color: "grey" }}
            ></i>
          </button>
        </div>

        <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
      </div>
      <Form className="form_wrapper mx-md-5 mx-sm-1 px-md-4 ">
        <Row>
          <Col xs={12}>
            <h6>Customer Form</h6>
            <hr />
          </Col>
          <Col xl={6}>
            <Row>
              <Col md={12}>
                <InputBox
                  Icon={<i className="bi bi-building small-icon"></i>}
                  type={"text"}
                  placeholder={"Company Name"}
                  label={"Company Name"}
                  value={custData?.CoName || ""}
                  Name={"CoName"}
                  error={false}
                  errorMsg={"Enter Correct Name"}
                  maxlen={100}
                  onChange={InputHandler}
                />{" "}
              </Col>
              {/**Country selector */}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"Country"}
                  SName={"id_country"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_country}
                  Soptions={SelectCountryList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*State Selector*/}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"State"}
                  SName={"id_state"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_state}
                  Soptions={SelectStateList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*City Selector*/}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"City"}
                  SName={"id_city"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_city}
                  Soptions={SelectCityList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*Zone Selector*/}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"Zone"}
                  SName={"id_zone"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.id_zone}
                  Soptions={SelectZoneList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              {/*Area*/}
              <Col md={12}>
                <InputBox
                  Icon={<i className="bi bi-geo-alt-fill small-icon"></i>}
                  type={"text"}
                  placeholder={"Area"}
                  label={"Area"}
                  value={custData?.Area || ""}
                  Name={"Area"}
                  error={false}
                  errorMsg={"Enter Correct Area"}
                  maxlen={10}
                  SearchButton={true}
                  SearchHandler={() => {
                    HandleOpen("Area");
                  }}
                />
                <ReusableModal
                  show={show?.Area}
                  SuccessButtonName={"Save"}
                  Title={"Area"}
                  handleClose={handleClose}
                  isSuccess={true}
                  handleSuccess={() => {
                    let obj = (AreaData?.filter(
                      (i) => i?.Id_Area === rid?.id_area
                    ))[0];
                    setCustData({
                      ...custData,
                      id_area: obj?.ID,
                      Area: obj?.Code,
                    });
                    handleClose();
                  }}
                  body={
                    <ReusableDataGrid
                      col={areaCol}
                      row={area}
                      uniquekey={"ID"}
                      id={rid?.Area}
                      onChangeRow={(id) => {
                        setRid({ ...rid, id_area: id });
                      }}
                    />
                  }
                />
              </Col>
              {/*Address*/}
              <Col md={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="color-label">
                    <i className="bi bi-geo-alt"></i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Address"
                    name="ADDRESS"
                    value={custData?.ADDRESS || ""}
                    onChange={InputHandler}
                  />
                </InputGroup>
              </Col>

              {/**pincode */}

              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-asterisk"></i>}
                  type={"text"}
                  placeholder={"PinCode"}
                  label={"PinCode"}
                  value={custData?.PinCode || ""}
                  Name={"PinCode"}
                  error={false}
                  errorMsg={"Enter Correct PinCode"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-person small-icon"></i>}
                  type={"text"}
                  placeholder={"Referance Name"}
                  label={"REFNAME"}
                  value={custData?.REFNAME || ""}
                  Name={"REFNAME"}
                  error={false}
                  errorMsg={"Enter Correct REFNAME"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-around align-items-center flex-wrap">
                  <Form.Check
                    type="checkbox"
                    value={custData?.sold == 1 ? 0 : 1}
                    name="sold"
                    label={"Sold"}
                    onChange={InputHandler}
                    style={{
                      marginTop: "1px",
                    }}
                    checked={custData?.sold == 1 ? true : false}
                  />
                  <Form.Check
                    type="checkbox"
                    value={custData?.Garbage == 1 ? 0 : 1}
                    label={"Garbage"}
                    name="Garbage"
                    style={{
                      marginTop: "1px",
                    }}
                    checked={custData?.Garbage == 1 ? true : false}
                    onChange={InputHandler}
                  />
                </div>
              </Col>
            </Row>
          </Col>

          {/**Detail Personel */}
          <Col xl={6}>
            <Row>
              <Col md={6}>
                <MultipleSelection
                  FieldName={"Status"}
                  MName={"type"}
                  onChange={SelectHandler1}
                  uniqueKey={"ID"}
                  data={CustTypeListData}
                  State={custData?.Status}
                  StyleInput={{ marginTop: "1px", marginBottom: "15px" }}
                  dataLength={CustTypeListData?.length}
                />
              </Col>
              <Col md={6}>
                <SelectOption
                  Soptions={SelectBSizeList}
                  SName={"BusinessSize"}
                  OnSelect={InputHandler}
                  Value={custData?.BusinessSize || 0}
                  PlaceHolder={"--Select Business Size--"}
                  SelectStyle={{
                    height: "28px",
                    marginTop: "1px",
                    marginBottom: "15px",
                  }}
                />
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-person small-icon"></i>}
                  type={"text"}
                  placeholder={"Contact Name"}
                  label={"Contact Name"}
                  value={custData?.Contact_Name || ""}
                  Name={"Contact_Name"}
                  error={false}
                  errorMsg={"Enter Correct Contact_Name"}
                  maxlen={80}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-envelope small-icon"></i>}
                  type={"email"}
                  placeholder={"EmailId"}
                  label={"EmailId"}
                  value={custData?.EmailId || ""}
                  Name={"EmailId"}
                  error={!inputVal?.EmailId}
                  errorMsg={"Enter Correct Phone Number"}
                  maxlen={50}
                  onChange={(e) => {
                    if (
                      e?.target?.value !== "" &&
                      e?.target?.value !== null &&
                      e?.target?.value !== undefined
                    ) {
                      let res = EmailValidation(e?.target?.value);
                      setInputVal({ ...inputVal, EmailId: res });
                    } else {
                      setInputVal({ ...inputVal, EmailId: true });
                    }
                    InputHandler(e);
                  }}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-phone small-icon"></i>}
                  type={"text"}
                  placeholder={"Mobile Number"}
                  label={"Mobile"}
                  value={custData?.Mobile || ""}
                  Name={"Mobile"}
                  error={false}
                  errorMsg={"Enter Correct Mobile"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>{" "}
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-telephone small-icon"></i>}
                  type={"tel"}
                  placeholder={"Phone Number"}
                  label={"PhNo"}
                  value={custData?.PhNo || ""}
                  Name={"PhNo"}
                  error={false}
                  errorMsg={"Enter Correct Phone"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>{" "}
              <Col md={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="color-label">
                    <i className="bi bi-pencil-square"></i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Remarks"
                    name="Remarks"
                    value={custData?.Remarks || ""}
                    onChange={InputHandler}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <SelectOption
                  OnSelect={InputHandler}
                  PlaceHolder={"--Select Industry--"}
                  SName={"id_industry"}
                  Value={custData?.id_industry}
                  Soptions={SelectIndustryList}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                />
              </Col>
              <Col md={6}>
                <SelectOption
                  OnSelect={InputHandler}
                  PlaceHolder={"--Select SalesMan--"}
                  SName={"id_salesman"}
                  Value={custData?.id_salesman}
                  Soptions={SelectSalesManList}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <SubmitButton
              OnClickBtn={SubmitHandler}
              type={"submit"}
              isdisable={
                !(
                  custData?.CoName !== null &&
                  custData?.PhNo !== null &&
                  custData?.Mobile !== null &&
                  custData?.ADDRESS !== null &&
                  custData?.id_area !== null &&
                  custData?.id_city !== null &&
                  custData?.id_state !== null &&
                  custData?.id_country !== null &&
                  custData?.REFNAME !== null &&
                  custData?.ID_Vendor !== null &&
                  custData?.ID_Vendor1 !== null &&
                  custData?.PinCode !== null &&
                  custData?.Remarks !== null
                )
              }
            />
          </Col>
          <Col xs={6}>
            <ResetButton
              type={"reset"}
              onClick={(e) => {
                setCustData({
                  id_country: null,
                  id_state: null,
                  id_city: null,
                  id_area: null,
                  Area: null,
                  CoName: null,
                  PhNo: null,
                  Mobile: null,
                  PinCode: null,
                  Contact_Name: null,
                  ADDRESS: null,
                  Remarks: null,
                  REFNAME: null,
                  ID_Vendor: null,
                  ID_Vendor1: null,
                  sold: null,
                  Garbage: null,
                });
              }}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CustomerMaster;
