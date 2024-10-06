
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/home.jsx"
import Result from "./Pages/result.jsx"
import Layout from "./Layout.jsx"
import React, { Component, useEffect, useState } from "react";

function App() {
 

  return (
    
    <Router>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Result />} />
          </Route>
        </Routes>
      </div>
    </Router>
  
  );
}

export default App
