import React from 'react';
import './App.css';
import Home from './components/home'
import Header from './components/header'
import FileUploader from './components/fileUploader'

function App() {
  return (
    <div className="App">
        <Header/>
        <FileUploader/>
        <Home/>
    </div>
  );
}

export default App;
