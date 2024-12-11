import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputBox from "../../Component/InputBox/index.jsx";
import ResetButton from "../../Component/ResetButton/index.jsx";
import SubmitButton from "../../Component/SubmitButton/index.jsx";
import SelectOption from "../../Component/SelectOption/index.jsx";
import "./Register.css";
import "../../Component/InputBox/InputBox.css";
import "../../GlobalStyle/GlobalTheme.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EmailValidation from "../../Validators/EmailValidation.js";
// import {
//   CompRegClearState, 
//   CustRegFunc,
// } from "../../Slice/CustomerRegSlice.js";
import useFetchCountry from "../../Custom_Hooks/useFetchCountry.js";
import { CompanyRegFunc, CompRegClearState } from "../../Slice/CompanyRegSlice.js";

function CompanyRegisterMaster() {
    const utypeOptions = [
      { ID: 1, description: "All countries" },
      { ID: 2, description: "One country" },
      { ID: 3, description: "Some states" },
      { ID: 4, description: "Individual" },
    ];
 const [custData, setCustData] = useState({
   companyName: "",
   CompanyCode: "",
   GSTIN: "",
   PANNo: "",
   Country: "",
   Utype: "",
   Address: "",
   Name: "",
   ContactNumber: "",
   Email: "",
   pass: "",
 });

  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const {
    isComRegLoding,
    CompRegSuccessMsg,
    CompRegErrorMsg,
    isCompRegErrorMsg,
    isCompRegSuccess,
  } = useSelector((state) => state.compreg);
  const { userInfo } = useSelector((state) => state.auth);
// //console.log(CompRegErrorMsg, CompRegSuccessMsg);

  //Fetch the country list
  const { CountryListData } = useFetchCountry(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );


  //validator
  const [inputVal, setInputVal] = useState({
    EmailId: true,
    PhNo: true,
    PinCode: true,
    ContactNumber: true,
  });



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
  //country
  let SelectUserType = useMemo(() => {
    if (!utypeOptions) return [];
    let arr = [];
    arr.push({ Name: "---Select User type--", Value: -1 });
    let arr1 = utypeOptions.map((item) => ({
      Name: item?.description,
      Value: item?.["ID"],
    }));
    return [...arr, ...arr1];
  }, [utypeOptions]);
    
  //toaster
  useEffect(() => {
    if (isCompRegSuccess && !isCompRegErrorMsg & !isComRegLoding) {
      toast.success(CompRegSuccessMsg.message, {
        autoClose: 3000,
        position: "top-right",
      });
      setCustData({
        companyName: "",
        CompanyCode: "",
        GSTIN: "",
        PANNo: "",
        Country: "",
        Utype: "",
        Address: "",
        Name: "",
        ContactNumber: "",
        Email: "",
        pass: "",
      });
      dispatch(CompRegClearState());
    }
    if (isCompRegErrorMsg && !isCompRegSuccess && !isComRegLoding) {
      toast.error(CompRegErrorMsg.message, {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isCompRegErrorMsg, isCompRegSuccess, isComRegLoding]);

  //input loader
  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    setCustData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  // //console.log(custData);
  //submiter
  const SubmitHandler = (e) => {
    e.preventDefault();
    //console.log(custData);
    dispatch(
      CompanyRegFunc({
        ...custData,
      })
    );
  };


  return (
    <Container
      fluid
      className="body-height"
      style={{ marginLeft: "40px", width: "auto" }}
    >
      <ToastContainer />
      <div className="ms-4">
        <div className="d-flex justify-content-between align-items-center m-0 px-3">
          <h5 className="title_container mt-2">Company Register</h5>
        </div>

        <hr style={{ marginBottom: "10px", marginTop: "5px" }} />
      </div>
      <Form className="form_wrapper mx-md-5 mx-sm-1 px-md-4 ">
        <Row>
          <Col xs={12}>
            <h6>Company Register Form</h6>
            <hr />
          </Col>
          <Col xl={6}>
            <Row>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-building small-icon"></i>}
                  type={"text"}
                  placeholder={"Company Name"}
                  label={"Company Name"}
                  value={custData?.companyName || ""}
                  Name={"companyName"}
                  error={false}
                  errorMsg={"Enter Correct Name"}
                  maxlen={100}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-building small-icon"></i>}
                  type={"text"}
                  placeholder={"Company Code"}
                  label={"Company Name"}
                  value={custData?.CompanyCode || ""}
                  Name={"CompanyCode"}
                  error={false}
                  errorMsg={"Enter Correct Code"}
                  maxlen={100}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-building small-icon"></i>}
                  type={"text"}
                  placeholder={"GSTIN"}
                  label={"GSTIN"}
                  value={custData?.GSTIN || ""}
                  Name={"GSTIN"}
                  error={false}
                  errorMsg={"Enter GSTIN "}
                  maxlen={100}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-building small-icon"></i>}
                  type={"text"}
                  placeholder={"PAN Number"}
                  label={"PANNo"}
                  value={custData?.PANNo || ""}
                  Name={"PANNo"}
                  error={false}
                  errorMsg={"Enter PAN Number"}
                  maxlen={100}
                  onChange={InputHandler}
                />{" "}
              </Col>
              {/**Country selector */}
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"Country"}
                  SName={"Country"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.Country}
                  Soptions={SelectCountryList}
                  key={2}
                  OnSelect={InputHandler}
                />
              </Col>
              <Col md={6}>
                <SelectOption
                  PlaceHolder={"Country"}
                  SName={"Utype"}
                  SelectStyle={{
                    padding: "4px 10px",
                    marginBottom: "15px",
                  }}
                  Value={custData?.Utype}
                  Soptions={SelectUserType}
                  key={2}
                  OnSelect={InputHandler}
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
                    name="Address"
                    value={custData?.Address || ""}
                    onChange={InputHandler}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>

          {/**Detail Personel */}
          <Col xl={6}>
            <Row>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-person small-icon"></i>}
                  type={"text"}
                  placeholder={"Contact Name"}
                  label={"Name"}
                  value={custData?.Name || ""}
                  Name={"Name"}
                  error={false}
                  errorMsg={"Enter Name Field"}
                  maxlen={80}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-phone small-icon"></i>}
                  type={"text"}
                  placeholder={"Phone Number"}
                  label={"ContactNumber"}
                  value={custData?.ContactNumber || ""}
                  Name={"ContactNumber"}
                  error={false}
                  errorMsg={"Enter Correct ContactNumber"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-envelope small-icon"></i>}
                  type={"email"}
                  placeholder={"EmailId"}
                  label={"Email"}
                  value={custData?.Email || ""}
                  Name={"Email"}
                  //   error={!inputVal?.EmailId}
                  errorMsg={"Enter Email id"}
                  maxlen={50}
                  onChange={(e) => {
                    if (
                      e?.target?.value !== "" &&
                      e?.target?.value !== null &&
                      e?.target?.value !== undefined
                    ) {
                      let res = EmailValidation(e?.target?.value);
                      setInputVal({ ...inputVal, Email: res });
                    } else {
                      setInputVal({ ...inputVal, Email: true });
                    }
                    InputHandler(e);
                  }}
                />{" "}
              </Col>
              <Col md={6}>
                <InputBox
                  Icon={<i className="bi bi-telephone small-icon"></i>}
                  type={"password"}
                  placeholder={"Password"}
                  label={"PhNo"}
                  value={custData?.pass || ""}
                  Name={"pass"}
                  error={false}
                  errorMsg={"Enter Password"}
                  maxlen={10}
                  onChange={InputHandler}
                />{" "}
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <SubmitButton
              OnClickBtn={SubmitHandler}
              type={"submit"}
              isdisable={
                !(
                  custData?.companyName !== "" &&
                  custData?.CompanyCode !== "" &&
                  custData?.GSTIN !== "" &&
                  custData?.PANNo !== "" &&
                  custData?.Country !== "" &&
                  custData?.Utype !== "" &&
                  custData?.Address !== "" &&
                  custData?.Name !== "" &&
                  custData?.ContactNumber !== "" &&
                  custData?.Email !== "" &&
                  custData?.pass !== ""
                )
              }
            />
          </Col>
          <Col xs={6}>
            <ResetButton
              type={"reset"}
              onClick={(e) => {
                setCustData({
                  companyName: "",
                  CompanyCode: "",
                  GSTIN: "",
                  PANNo: "",
                  Country: "",
                  Utype: "",
                  Address: "",
                  Name: "",
                  ContactNumber: "",
                  Email: "",
                  pass: "",
                });
              }}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CompanyRegisterMaster;
