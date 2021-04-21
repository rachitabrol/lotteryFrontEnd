import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
   try {
      window.ethereum.enable().then(function() {
          // User has allowed account access to DApp...
      });
   } catch(e) {
      // User has denied account access to DApp...
   }

export default web3;
