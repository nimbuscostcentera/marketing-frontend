import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../GlobalStyle/GlobalTheme.css";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import ResetButton from "../../Component/ResetButton";
import ReusableModal from "../../Component/Modal";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import MultipleSelection from "../../Component/MultipleSelection";

import smPic from "../../Asset/SM.svg";

import {
  AddSalesManFunc,
  ClearAddSalesMan,
} from "../../Slice/AddSalesManSlice";
import useFetchCompany from "../../Custom_Hooks/useFetchCompany";
function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [smData, setSmData] = useState({
    PHONE: null,
    CompanyCode: null,
    NAME: null,
    ADDRESS: null,
    CONTACTPERSON: null,
    LISCENCENO: null,
    TrgAmt: null,
    vat_no: null,
  });

  const { userInfo } = useSelector((state) => state.auth);

  const {
    isAddSalesManLoading,
    AddSalesManSuccessMsg,
    AddSalesManErrorMsg,
    isAddSalesManError,
    isAddSalesManSuccess,
  } = useSelector((state) => state.addSM);

  const { CompList } = useFetchCompany(
    {
      CountryCode: userInfo?.details?.ID_Country,
      User_Type: userInfo?.details?.Utype,
    },
    []
  );

  const compCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    { field: "companyName", headerName: "Company", width: 200 },
    { field: "ContactNumber", headerName: "Mobile No", width: 140 },
    { field: "GSTIN", headerName: "GSTIN", width: 160 },
    { field: "PANNo", headerName: "PAN No.", width: 150 },
    { field: "Address", headerName: "Address", width: 280 },
    { field: "Country", headerName: "Country", width: 80 },
    { field: "state", headerName: "State", width: 140 },
    { field: "Status", headerName: "Status", width: 80 },
  ];
  const InputHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setSmData({ ...smData, [key]: value });
  };
  const ResetHandler = () => {
    setSmData({
      PHONE: null,
      CompanyCode: null,
      NAME: null,
      ADDRESS: null,
      CONTACTPERSON: null,
      LISCENCENO: null,
      TrgAmt: null,
      vat_no: null,
    });
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    let obj = {
      ...smData,
      CompanyCode: userInfo?.details?.CompanyCode,
      ID_Country:userInfo?.details?.ID_Country
    };
    dispatch(AddSalesManFunc(obj));
  };
  const HandleOpen = () => {
    setShow(true);
  };
  const HandleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (isAddSalesManSuccess && !isAddSalesManLoading) {
      toast.success(AddSalesManSuccessMsg, {
        autoClose: 5000,
        position: "top-right",
      });
      dispatch(ClearAddSalesMan());
      ResetHandler();
    }
    if (isAddSalesManError && !isAddSalesManLoading) {
      toast.error(AddSalesManErrorMsg, {
        autoClose: 5000,
        position: "top-right",
      });
    }
  }, [isAddSalesManLoading, isAddSalesManError, isAddSalesManSuccess]);

  return (
    <Container fluid className="base-container">
      <ToastContainer />
      <Row>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          style={{ height: "fit-content" }}
        >
          <h5 className="title_container text-start text-sm-start ms-5 ps-3 mt-2">
            Sales Man Management
          </h5>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={12}>
          <Button
            variant="link"
            className="btn btn-link float-end float-sm-center"
            onClick={() => {
              navigate("/auth/salesman-list");
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "25px", color: "grey" }}
            ></i>
          </Button>
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <hr
            style={{
              margin: 0,
            }}
          />
        </Col>

        <Col xl={6} lg={6} md={12} sm={12} xs={12} style={{ height: "80vh" }}>
          <div className="d-flex justify-content-center align-items-center mx-5 me-3 px-3 mt-4">
            <Form className="form_wrapper">
              <Row className="area-row">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <h6>SalesMan Details Form</h6>
                  <hr />
                </Col>
                <Col md={12}>
                  <InputBox
                    Icon={<i className="bi bi-person"></i>}
                    // InputStyle={ }
                    Name={"NAME"}
                    error={false}
                    errorMsg={"false"}
                    label={"Sales man name"}
                    onChange={InputHandler}
                    placeholder={"SalesMan name"}
                    type={"text"}
                    value={smData?.NAME||""}
                  />
                </Col>
                <Col md={6}>
                  <InputBox
                    Icon={<i className="bi bi-person-badge"></i>}
                    // InputStyle={ }
                    Name={"CONTACTPERSON"}
                    error={false}
                    errorMsg={"false"}
                    label={"Contact Person"}
                    onChange={InputHandler}
                    placeholder={"Contact Person"}
                    type={"text"}
                    value={smData?.CONTACTPERSON || ""}
                  />
                </Col>
                <Col md={6}>
                  <InputBox
                    Icon={<i className="bi bi-phone"></i>}
                    // InputStyle={ }
                    Name={"PHONE"}
                    error={false}
                    errorMsg={"false"}
                    label={"Sales Man Phone No."}
                    onChange={InputHandler}
                    placeholder={"Phone No."}
                    type={"tel"}
                    value={smData?.PHONE || ""}
                    maxlen={10}
                  />
                </Col>

                <Col md={12} className="mt-1">
                  <InputGroup>
                    <InputGroup.Text className="color-label">
                      <i className="bi bi-pencil-square"></i>
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      value={smData?.ADDRESS || ""}
                      onChange={InputHandler}
                      placeholder="SalesMan Address"
                      name="ADDRESS"
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="mt-3">
                  <InputBox
                    Icon={<i className="bi bi-building"></i>}
                    SearchButton={true}
                    SearchHandler={HandleOpen}
                    Name={"CompanyCode"}
                    error={false}
                    errorMsg={"false"}
                    label={"Company Name"}
                    placeholder={"Company Name"}
                    type={"text"}
                    value={smData?.CompanyCode || ""}
                  />
                  <ReusableModal
                    show={show}
                    Title={"Company"}
                    handleClose={HandleClose}
                    isPrimary={true}
                    body={
                      <ReusableDataGrid
                        col={compCol}
                        row={CompList}
                        id={smData?.CompanyCode || 0}
                        onChangeRow={(code) => {
                          console.log(code);
                          setSmData({
                            ...smData,
                            CompanyCode: code,
                          });
                        }}
                        uniquekey={"CompanyCode"}
                      />
                    }
                    handlePrimary={() => {
                      let obj = (CompList?.filter(
                        (i) => i?.CompanyCode === smData?.CompanyCode
                      ))[0];
                      console.log(obj);

                      setSmData({ ...smData, CoName: obj?.CoName });
                      HandleClose();
                    }}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <InputBox
                    Icon={<i class="bi bi-bullseye"></i>}
                    // InputStyle={ }
                    Name={"TrgAmt"}
                    error={false}
                    errorMsg={"false"}
                    label={"Target Amount"}
                    onChange={InputHandler}
                    placeholder={"Target Amount"}
                    type={"number"}
                    value={smData?.TrgAmt||""}
                  />
                </Col>
                <Col md={6}>
                  <InputBox
                    Icon={<i className="bi bi-credit-card-fill"></i>}
                    Name={"LISCENCENO"}
                    error={false}
                    errorMsg={"false"}
                    label={"Lisence No"}
                    onChange={InputHandler}
                    placeholder={"Lisence No"}
                    type={"text"}
                    value={smData?.LISCENCENO||""}
                  />
                </Col>
                <Col md={6}>
                  <InputBox
                    Icon={<i className="bi bi-credit-card-fill"></i>}
                    Name={"vat_no"}
                    error={false}
                    errorMsg={"false"}
                    label={"VAT No"}
                    onChange={InputHandler}
                    placeholder={"VAT No"}
                    type={"text"}
                    value={smData?.vat_no||""}
                  />
                </Col>

                <Col xs={6} className="pt-4">
                  <SubmitButton
                    ButtonNm={"Submit"}
                    OnClickBtn={SubmitHandler}
                    type={"Submit"}
                    isdisable={false}
                  />
                </Col>
                <Col xs={6} className="pt-4">
                  <ResetButton
                    Buttonname={"reset"}
                    onClick={ResetHandler}
                    type={"reset"}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className="vanising-div"
          style={{ height: "80vh" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={smPic}
              alt="user-reg"
              className="img-fluid"
              width={"600px"}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;
