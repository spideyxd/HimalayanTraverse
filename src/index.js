import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Faq from "./Component/Faq";
import Contact from "./Component/Contact";
import Blogs from "./Component/Blogs";
import Nearbytreks from "./Component/Nearbytreks";
import Treks from "./Component/Treks";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Feed from "./Component/Feed";
import Test from "./Component/Test";
import AllPost from "./Component/AllPost";
import Payment from "./Component/Payment";
import Rent from "./Component/Rent";
import AddressForm from "./Component/Address";
import AddBlogs from "./Component/AddBlogs";
import AddTreks from "./Component/AddTreks";
import PersonalProfile from "./Component/Dashboard";
import ProfileDetails from "./Component/ProfileDetails";
import HiddenGems from "./Component/HiddenGems";
import Chats from "./Component/Chats";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FindingTravelBuddy from "./Component/FindingTravelBuddy";
import AllChat from "./Component/AllChat";
import PeerDashboard from "./Component/PeerDashboard";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="549601688588-jip8et9fnckk14e72ieu55387hu0gh12.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="nearbytreks" element={<Nearbytreks />} />
          <Route path="treks" element={<Treks />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="feed" element={<Feed />} />
          <Route path="queries" element={<AllPost />} />
          <Route path="test" element={<Test />} />
          <Route path="rent" element={<Rent />} />
          <Route path="postBlogs" element={<AddBlogs />} />
          <Route path="addTreks" element={<AddTreks />} />
          <Route path="payment" element={<Payment />} />
          <Route path="address" element={<AddressForm />} />
          <Route path="profileDetails" element={<ProfileDetails />} />
          <Route path="dashboard" element={<PersonalProfile />} />
          <Route path="/chats/:participantId/:userId" element={<Chats />} />
          <Route path="AllChat" element={<AllChat />} />
          <Route path="PeerDashboard" element={<PeerDashboard />} />
          <Route path="HiddenGems" element={<HiddenGems />} />
          <Route path="FindingTravelBuddy" element={<FindingTravelBuddy />} />
          
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
