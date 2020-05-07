import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import Layout from "./Layout";
import {
    HashRouter as Router,
} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Router>
              <Layout/>
          </Router>
      </div>
  );
}

export default App;
