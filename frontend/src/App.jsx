import React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
           <img className="MyImage" src="./Haythem.jpeg"></img>
           <div className="Greetings">Hey there!</div>
        </div>

        <div className="bio">
        I am Haythem Jaidane Computer Science student From Tunisia 🇹🇳 and Developper in embedded system software and I'm learning Web3 and Ai 
        </div>

        <button className="waveButton" onClick={wave}>
          Add Me
        </button>
      </div>
    </div>
  );
}
