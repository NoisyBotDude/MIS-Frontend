import React from "react"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
  
} from "react-router-dom";

import Home from "./sections/Home/Home"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Events from "./sections/Events/Events"
import NotFound from "./sections/NotFound/NotFound"
import About from "./sections/About/About";
import Stories from "./sections/Stories/Stories";
import People from "./sections/People/People";
import Placement from "./sections/Placement/Placement";
import Job from "./sections/Job/Job";
import News from "./sections/News/News";
import Visitor from "./sections/Visitor/Visitor";
import Form from "./sections/Form/Form"
import StudentProfile from "./sections/Users/Student/StudentProfile/StudentProfile";
import StudentSignUp from "./sections/Users/Student/StudentAuthentication/StudentSignUp";
import StudentLogin from "./sections/Users/Student/StudentAuthentication/StudentLogin"
import Admin from "./sections/Users/Admin/Admin";
import Students from "./sections/Users/Admin/Students/Students";
import Companies from "./sections/Users/Admin/Companies/Companies";
import Settings from "./sections/Users/Admin/Settings/Settings";
import Training from "./sections/Users/Admin/Training/Training";
import Trainings from "./sections/Users/Visitor/Trainings/Trainings"
import AdminLogout from "./sections/Users/Admin/logout"
import DataCollect from "./sections/Users/Admin/DataCollect/DataCollect";

function App() {
 
  return (

    <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/events" component={Events}/>
          <Route path="/about" component={About}/>
          <Route path="/stories" component={Stories}/>
          <Route path="/people" component={People}/>
          <Route path="/placements" component={Placement}/>
          <Route path="/jobs" component={Job}/>
          <Route path="/news" component={News}/>
          <Route path="/visitors" component={Visitor}/>
          <Route path="/admin" component={Form}/>
          <Route path="/student-signup" component={StudentSignUp}/>
          <Route path="/student-login" component={StudentLogin}/>
          <Route path="/student/:roll" component={StudentProfile}/>
          <Route path="/trainings" component={Trainings}/>
          <Route path="/admin-console/:username/dashboard/" component={Admin}/>
          <Route path="/admin-console/:username/students/" component={Students}/>
          <Route path="/admin-console/:username/companies" component={Companies}/>
          <Route path="/admin-console/:username/settings" component={Settings}/>
          <Route path="/admin-console/:username/training" component={Training}/>
          <Route path="/admin-console/logout" component={AdminLogout}/>
          <Route path="/admin-console/:username/DataCollect" component={DataCollect}/>
          
          <Route path="*" component={NotFound}/>
        </Switch>
        {/* <Footer /> */}
      
    </Router>
    
    
  );
}

export default App;