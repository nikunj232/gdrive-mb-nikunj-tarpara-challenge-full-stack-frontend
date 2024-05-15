import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
//  import ProtectedRoute from './ProtectedRoute';
import { isUserLoggedIn } from '../helper/authFunctions';
import Home from '../views/Home';
import RiskReport from '../views/RiskReport';

const AppRouter = () => {

  return (
    <Router>
      <Routes>
        {/* <Route exact path="/"  element={<Home/>}/> */}
        <Route path='/'>
          <Route exact path="/"  element={<Home/>}/>
          <Route path="/risk-report"  element={<RiskReport/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
