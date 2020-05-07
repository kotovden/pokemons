import React from 'react';
import 'antd/dist/antd.css';
import { HashRouter as Router } from 'react-router-dom';
import './App.scss';
import Layout from './Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
