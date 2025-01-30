require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
const dotenv = require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    Sepolia:{
      url:process.env.ENDPOINT,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};

// npx hardhat ignition deploy ./ignition/modules/Lock.js --network 