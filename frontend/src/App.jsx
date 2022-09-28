import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./WavePortal.json";

export default function App() {
  
  const contractAddress = "0x9D9f79d14F8f4Fd6f70A11Ab392629F35FD17731"

  const contractABI = abi.abi;
  
  const wave = async () => {
    try{
        const {ethereum} = window;

	if(ethereum){
	    const provider = new ethers.providers.Web3Provider(ethereum);
	    const signer = provider.getSigner();
	    const wavePortalContract = new ethers.Contract(contractAddress, contractABI,signer);

	    let count = await wavePortalContract.getTotalWaves();
	    console.log("Retrieved total wave count ...",count.toNumber());

            const waveTxn = await wavePortalContract.addWave();
	    console.log("Mining...", waveTxn.hash);

	    await waveTxn.wait();
	    console.log("Mined -- ", waveTxn.hash);

	    count = await wavePortalContract.getTotalWaves();
	    console.log("Retrieved total wave count...",count.toNumber());
	}
	else{
	    console.log("Ethereum object doesn't exist!");
	}
     }
     catch(error){
         console.log(error);
     }

  }

  const [currentAccount,setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async() => {
      try{
          const { ethereum } = window;
          if(!ethereum){
              console.log("Make sure you have metamask!");
          }
          else{
	      console.log("We have the ethereum object",ethereum);
          }

          const accounts = await ethereum.request({ method:"eth_accounts"});

          if(accounts.lendth !== 0){
              const account = accounts[0];
	      console.log("Found an authorized account:",account);
	      setCurrentAccount(account)
          }
          else{
              console.log("No authorized account found")
          }
      }
      catch(error){
          console.log(error);
      }
  }

  const connectWallet = async() => {
      try{
          const {ethereum} = window;

	  if(!ethereum){
	      alert("Get MetaMask!");
	      return;
          }

	  const accounts = await ethereum.request({ method: "eth_requestAccounts"});
	      
	  console.log("Connected", accounts[0]);
	  setCurrentAccount(accounts[0]);
      }
      catch(error){
          console.log(error)
      }
   }

  useEffect(() => {
      checkIfWalletIsConnected();
  },[])
  
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

	{!currentAccount && (
	    <button className="waveButton" onClick={connectWallet}>
	        Connect Wallet
	    </button>
        )}
      </div>
    </div>
  );
}
