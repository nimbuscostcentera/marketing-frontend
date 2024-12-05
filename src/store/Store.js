import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AuthSlice from "../Slice/AuthSlice";
import FeedBackListSlice from "../Slice/FeedBackListSlice";
import CustomerListSlice from "../Slice/CustomerListSlice";
import CustRegSlice from "../Slice/CustomerRegSlice";
import CompanyListSlice from "../Slice/CompanyListSlice";
import CompanyRegSlice from "../Slice/CompanyRegSlice";
import LocationListSlice from "../Slice/LocationListSlice";
import AreaListSlice from "../Slice/AreaListSlice";
import UserListSlice from "../Slice/UserListSlice";
import AddAreaSlice from "../Slice/AddAreaSlice";
import AddFeedBackSlice from "../Slice/AddFeedbackSlice";
import CountryListSlice from "../Slice/CountryListSlice";
import StateListSlice from "../Slice/StateListSlice";
import CityListSlice from "../Slice/CityListSlice";
import ZoneListSlice from "../Slice/ZoneListSlice";
import AddFeedbackSlice from "../Slice/AddFeedbackSlice";
import Admin from "../Slice/AdminSlice";
import AddCountrySlice from "../Slice/AddCountrySlice";
import AddStateSlice from "../Slice/AddStateSlice";
import AddCitySlice from "../Slice/AddCitySlice";
import AddZoneSlice from "../Slice/AddZoneSlice";
import VendorListSlice from "../Slice/VendorList";
import AddVendorSlice from "../Slice/AddVendor";
import AddSalesManSlice from "../Slice/AddSalesManSlice";
import SalesManSlice from "../Slice/SalesManSlice";
import WeekDaysListSlice from "../Slice/WeekdaysListSlice";
import IndustrySlice from "../Slice/IndustryListSlice";
import BusinessSlice from "../Slice/BusinessSlice";
import AddIndustrySlice from "../Slice/AddIndustrySlice";
import CustTypeListSlice from "../Slice/CustomerTypeSlice";
import FBTypeListSlice from "../Slice/FeedBackTypeSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  fb: FeedBackListSlice,
  company: CompanyListSlice,
  compreg: CompanyRegSlice,
  loclist: LocationListSlice,
  area: AreaListSlice,
  userlist: UserListSlice,
  addArea: AddAreaSlice,
  addFB: AddFeedBackSlice,
  statelist: StateListSlice,
  countrylist: CountryListSlice,
  zonelist: ZoneListSlice,
  city: CityListSlice,
  customer: CustomerListSlice,
  fbtrans: AddFeedbackSlice,
  custadd: CustRegSlice,
  admin: Admin,
  countryadd: AddCountrySlice,
  stateadd: AddStateSlice,
  cityadd: AddCitySlice,
  zoneadd: AddZoneSlice,
  vendorlist: VendorListSlice,
  addVendor: AddVendorSlice,
  addSM: AddSalesManSlice,
  allsalesman: SalesManSlice,
  industrylist: IndustrySlice,
  addindustry: AddIndustrySlice,
  businesslist: BusinessSlice,
  weekdayslist: WeekDaysListSlice,
  custtypelist: CustTypeListSlice,
  fbtypelist: FBTypeListSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }), // Correctly setting middleware,
});

export const persistor = persistStore(store);
