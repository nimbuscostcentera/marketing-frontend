import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Container, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Admin.css";

import DateDiffChecker from "../../Validators/DateDiffChecker";

import ReusableDataGrid from "../../Component/ReusableDataGrid";
import DateRangeInput from "../../Component/DateRangeInput";
import SelectOption from "../../Component/SelectOption";

import useFetchCompany from "../../Custom_Hooks/useFetchCompany";
import { getAllAdmin, ClearStateAdmin } from "../../Slice/AdminSlice";
import CheckBox from "../../Component/CheckBox";
import useFetchFBType from "../../Custom_Hooks/useFetchFBType";
import MultipleSelection from "../../Component/MultipleSelection";
import useFetchIndustry from "../../Custom_Hooks/useFetchIndustry";
import useFetchSalesMan from "../../Custom_Hooks/useFetchSalesMan";
import useFetchBusiness from "../../Custom_Hooks/useFetchBusiness";

function AdminPanel() {
  const cdate = moment().format("YYYY-MM-DD");
  const [adminData, setAdminData] = useState([]);
  // const [tableData, setTableData] = useState([]);
  // const [newdata, setNewData] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [custData, setCustData] = useState({
    id_industry: -1,
    id_salesman: -1,
    BusinessSize: null,
  });

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
    [custData.BusinessSize]
  );

  const { salesmanList } = useFetchSalesMan(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    [custData.id_salesman]
  );
  const InputHandler = (e) => {
    console.log(BusinessListData);

    e.preventDefault();
    var key = e.target.name;
    var value = e.target.value;
    // console.log(IndustryListData)

    if (value != 0) {
      let indName = IndustryListData.filter((item) => {
        //  console.log( typeof item.ID)
        return item.ID == value;
      });
      // console.log(indName)
      industryFilter(indName);
    }

    setCustData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const industryFilter = (val) => {
    let table = [...Admin];
    let result = table.filter((item) => item?.Industry?.includes(val[0].NAME));
    setAdminData(result);
  };
  const InputHandler1 = (e) => {
    e.preventDefault();
    var key = e.target.name;
    var value = e.target.value;
    if (value != 0) {
      salesManFilter(value);
    }
    setCustData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const InputHandler2 = (e) => {
    e.preventDefault();
    var key = e.target.name;
    var value = e.target.value;
    // console.log(value);
    if (value != 0) {
      let businessName = BusinessListData.filter((item) => {
        //  console.log( typeof item.ID)
        return item.ID == value;
      });

      businessSizeFilter(businessName);
    }
    setCustData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const businessSizeFilter = (val) => {
    console.log(val);

    let table = [...Admin];
    let result = table.filter((item) =>
      item?.Description?.includes(val[0]?.description)
    );
    setAdminData(result);
  };

  const salesManFilter = (value) => {
    let table = [...Admin];

    let result = table.filter((item) => item?.SalesMan_Name?.includes(value));
    console.log(result);
    setAdminData(result);
  };

  const { isAdminLoading, Admin, ErrorAdmin, isErrorAdmin, isAdminSuccess } =
    useSelector((state) => state.admin);
  // console.log(Admin);
  const { CompList = [] } = useFetchCompany({
    CompanyCode: userInfo?.details?.CompanyCode,
  });

  const { FBTypeListData } = useFetchFBType(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
    },
    []
  );

  // industry
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

  // const [id, setID] = useState([]);
  const [filteredData, setFilteredData] = useState({
    StartDate: null,
    EndDate: null,
    Status: [3, 4, 5],
    today: 0,
  });

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

  let SelectBSizeList = useMemo(() => {
    if (!BusinessListData) return [];
    let arr = [];
    arr.push({ Name: "---Select Business Size---", Value: 0 });
    let arr1 = BusinessListData.map((item) => ({
      Name: item?.description,
      Value: item?.ID,
    }));
    return [...arr, ...arr1];
  }, [BusinessListData]);

  const SelectHandler = (e) => {
    let value = e.target.value;
    // console.log(e)
    console.log(e.target.value);

    // console.log(value);
    let AllValue = FBTypeListData.map((i) => i?.ID);
    // console.log(AllValue);

    if (value === "all") {
      if (filteredData?.Status?.length === AllValue?.length) {
        setFilteredData({ ...filteredData, Status: [] });
      } else {
        setFilteredData({ ...filteredData, Status: AllValue });
      }
      filterTable(AllValue);
    } else {
      value = Number(value);
      let arr = [...filteredData?.Status];
      // console.log("hi", arr, value, arr.includes(value));
      if (arr.length !== 0 && arr.includes(value)) {
        arr = arr.filter((item) => item !== value);
        //filterTable(Number(value))
      } else {
        arr.push(Number(value));
        //
      }
      setFilteredData((prev) => {
        return { ...prev, Status: arr };
      });
      filterTable(arr);
      console.log(arr);
    }
  };

  const filterTable = (val) => {
    let table = [...Admin];
    let array = [...val];
    let result = table.filter((item) => array.includes(item?.ID_Status));
    //  console.log(result,table, filteredData?.Status,"panel")
    setAdminData(result);
  };

  let option1 = [{ Value: -1, Name: "--Select Column--" }];
  if (CompList.length !== 0) {
    let arr = Object.keys(CompList[0]).reduce((acc, key) => {
      if (typeof CompList[0][key] === "number") {
        acc.push({ Name: key, Value: key });
      }
      return acc;
    }, []);
    option1 = [...option1, ...arr];
  }

  useEffect(() => {
    dispatch(
      getAllAdmin({
        CompanyCode: userInfo?.details?.CompanyCode,
        ...filteredData,
      })
    );
  }, [filteredData?.StartDate, filteredData?.EndDate, filteredData?.today]);

  useEffect(() => {
    if (isAdminSuccess && Admin && !isAdminLoading) {
      setAdminData(Admin);
    }
  }, [isErrorAdmin, isAdminSuccess]);

  // const onChangeHandler = (pid) => {
  //   let iniarr = [...id, ...pid];
  //   const myset = new Set([...iniarr]);
  //   let arr = Array.from(myset);
  //   setID(arr);
  // };

  const Column = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "CustomerName",
      headerName: "Customer",
      width: 180,
      hideable: false,
    },
    {
      field: "Vounum",
      headerName: "Voucher",
      width: 90,
      hideable: false,
    },
    {
      field: "Voudate",
      headerName: "Voucher Date",
      width: 105,
      hideable: false,
      renderCell: (item) => {
        return <span>{moment(item?.row?.Voudate).format("DD/MM/YYYY")}</span>;
      },
    },
    {
      field: "Actiondate",
      headerName: "Action Date",
      width: 98,
      hideable: false,
      renderCell: (item) => {
        return (
          <span>{moment(item?.row?.Actiondate).format("DD/MM/YYYY")}</span>
        );
      },
    },
    {
      field: "Cust_Status",
      headerName: "Status",
      width: 75,
      hideable: false,
    },
    {
      field: "Industry",
      headerName: "Industry",
      width: 90,
      hideable: false,
    },
    {
      field: "SalesMan_Name",
      headerName: "Sales Man",
      width: 90,
      hideable: false,
    },
    {
      field: "Description",
      headerName: "Business Size",
      width: 90,
      hideable: false,
    },
    {
      field: "mobile",
      headerName: "Phone No.",
      width: 110,
      hideable: false,
    },
    {
      field: "remarks",
      headerName: "Remark",
      width: 100,
    },
    {
      field: "AreaCode",
      headerName: "Area",
      width: 95,
      hideable: false,
    },
    {
      field: "Zone",
      headerName: "Zone",
      width: 90,
      hideable: false,
    },
    {
      field: "City",
      headerName: "City",
      width: 85,
      hideable: false,
    },
    {
      field: "State",
      headerName: "State",
      width: 110,
      hideable: false,
    },
    {
      field: "Country",
      headerName: "Country",
      width: 85,
      hideable: false,
    },
  ];

  const filterHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    console.log(key, value);

    if (key === "EndDate") {
      let diff = DateDiffChecker(filteredData?.StartDate, value);
      console.log(diff);
      if (diff) {
        console.log(diff);
        setFilteredData({ ...filteredData, [key]: value });
      } else {
        setFilteredData({ ...filteredData, [key]: null });
      }
    } else {
      setFilteredData({ ...filteredData, [key]: value });
    }
  };

  return (
    <Container
      fluid
      className="px-3"
      style={{ height: "88%", marginLeft: "40px", width: "auto" }}
    >
      <ToastContainer />
      <div
        className="px-3 d-flex justify-content-between align-items-center"
        style={{ height: "40px" }}
      >
        <h5 className="title_container mt-2">Admin Panel</h5>
        <div className="d-flex justift-content-center align-items-center ">
          <span>Add Industries</span>
          <button
            className="btn btn-link"
            onClick={() => {
              navigate("/auth/industry");
            }}
          >
            <i
              className="bi bi-plus"
              style={{ fontSize: "30px", color: "grey" }}
            />
          </button>
        </div>
      </div>
      <hr className="m-0 p-0" />

      <Row style={{padding:"1px 30px"}}>
        <Col xl={4 } lg={5} md={8} sm={12} xs={12} >
          <DateRangeInput
            InputHandler={filterHandler}
            StartDate={"StartDate"}
            EndDate={"EndDate"}
            StartDateValue={filteredData?.StartDate}
            EndDateValue={filteredData?.EndDate}
            maxdate1={cdate}
            maxdate2={cdate}
            mindate2={filteredData?.StartDate}
          />
        </Col>

        <Col xl={2} lg={3} md={4} sm={12} xs={12}>
          <div className="d-flex justify-content-start align-items-center mt-3">
            <CheckBox
              Label={"Today"}
              Name={"today"}
              checkid={filteredData?.today}
              Value={filteredData?.today == 0 ? 1 : 0}
              onChange={filterHandler}
            />{" "}
            <Button
              variant="link"
              name="Reset"
              type="reset"
              value="reset"
              onClick={() => {
                setFilteredData({
                  EndDate: null,
                  StartDate: null,
                  Status: null,
                  today: null,
                });
              }}
            >
              <i
                className="bi bi-arrow-counterclockwise"
                style={{
                  fontSize: "25px",
                  fontWeight: "bolder",
                  color: "gray",
                }}
              ></i>
            </Button>
          </div>
        </Col>

        <Col xl={3} lg={4} md={5} sm={6} xs={12}>
          <MultipleSelection
            FieldName={"Feedback Status"}
            MName={"type_name"}
            State={filteredData?.Status}
            data={FBTypeListData}
            onChange={SelectHandler}
            uniqueKey={"ID"}
            dataLength={FBTypeListData?.length}
            StyleInput={{ padding: "4px 10px" ,marginTop:"25px"}}
          />
        </Col>

        <Col lg={3} md={4} sm={6} xs={12} >
          <SelectOption
            OnSelect={InputHandler}
            PlaceHolder={"--Select Industry--"}
            SName={"id_industry"}
            Value={custData?.id_industry}
            Soptions={SelectIndustryList}
            SelectStyle={{ padding: "4px 10px",marginBottom:"20px",marginTop:"28px" }}
          />
        </Col>

        <Col lg={3} md={4} sm={6} xs={12}>
          <SelectOption
            OnSelect={InputHandler1}
            PlaceHolder={"--Select SalesMan--"}
            SName={"id_salesman"}
            Value={custData?.id_salesman}
            Soptions={SelectSalesManList}
            SelectStyle={{
              padding: "4px 10px",
            }}
          />
        </Col>

        <Col lg={3} md={4} sm={6} xs={12}>
          <SelectOption
            Soptions={SelectBSizeList}
            SName={"BusinessSize"}
            OnSelect={InputHandler2}
            Value={custData?.BusinessSize || 0}
            PlaceHolder={"--Select Business Size--"}
            SelectStyle={{
              padding: "4px 10px",
            }}
          />
        </Col>
      </Row>

      <div className="px-md-2 px-sm-3 px-xs-1">
        <ReusableDataGrid
          col={Column}
          row={adminData}
          uniquekey={"Vounum"}
          key={1}
          checkSelect={false}
          onChangeRow={() => {
            return 0;
          }}
        />
      </div>
    </Container>
  );
}

export default AdminPanel;
