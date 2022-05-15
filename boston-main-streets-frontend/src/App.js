import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { initMapBoundary } from "./reducers/mapBoundaryReducer";
import { initMapDistricts } from "./reducers/mapDistrictsReducer";
import { initBusiness } from "./reducers/businessReducer";
import { initUser } from "./reducers/userReducer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import UploadPage from "./pages/UploadPage";

import './style.css';

const App = () => {

  // redux states
  const user = useSelector(({user}) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    // set map boundary data
    dispatch(initMapBoundary())

    // set map districts data
    dispatch(initMapDistricts())

    // set business data
    dispatch(initBusiness())

    // set user status
    dispatch(initUser())
    console.log(user);
  }, [dispatch])

  return (
    <Switch>
      <Route path={"/signup"}>
        {(!user) ? <SignUpPage /> : <Redirect to={"/"} />}
      </Route>
      <Route path={"/login"}>
        {(!user) ? <LoginPage /> : <Redirect to={"/"} />}
      </Route>
      
      <Route path={"/upload"}>
        <UploadPage />
      </Route>
      <Route path={"/"}>
        <MainPage />
      </Route>
      <div className="my-component" />
    </Switch>
  )
}

export default App