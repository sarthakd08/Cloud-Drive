import React from "react"
import Signup from "./authentication/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import Profile from './profile/Profile'
import Login from "./authentication/Login"
import PrivateRoute from "./authentication/PrivateRoute"
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from "./authentication/UpdateProfile"
import NavbarComponent from "./navbar/Navbar";

function App() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              {/* Drive */}
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

              {/* Profile */}
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />

              {/* Authentication */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App
