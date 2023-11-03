import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import HighlightsList from "./components/highlights-list.component";
import EditHighlight from "./components/edit-highlight.component";
import CreateHighlight from "./components/create-highlight.component";
import CreateUser from "./components/create-user.component";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path = "/" exact Component={HighlightsList} />
          <Route path = "/edit:id" Component={EditHighlight} />
          <Route path = "/create" Component={CreateHighlight} />
          <Route path = "/user" Component={CreateUser} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
