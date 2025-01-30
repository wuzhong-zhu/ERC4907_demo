# ERC4907_demo
This project demonstrates the deployment of an ERC4907 smart contract using Hardhat and the Sepolia testnet. It also includes a web application that interacts with the deployed contract. In order to run the project, you'll need to set up a few development dependencies, deploy the smart contract, and then serve the web app locally.

## Prerequisites
To run this project, you need the following development dependencies installed on your machine:

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)
- [Hardhat](https://hardhat.org/) or [Remix](https://remix.ethereum.org/) for smart contract deployment

Additionally, you’ll need a browser with [MetaMask](https://metamask.io/) installed.

This example is deployed to the Sepolia Testnet, but you can switch to another network if needed.

In the `hardhat/env` file, you'll find the Sepolia endpoint and a private key. Make sure to rename the file to `.env` intead and modify these values to match your own configuration before deploying your smart contract.

## Setup

### Install dependencies:
Navigate to the Hardhat directory and run:
```bash
cd hardhat
npm install
```
### Prepare the smart contract:
After installing the required packages, compile and deploy the smart contract with the following commands:

```bash
npx hardhat compile
npx hardhat ignition deploy ./ignition/modules/ERC4907.js --network Sepolia
```
If everything runs successfully, you'll see output similar to this:
```bash
[ ERC4907 ] successfully deployed 🚀
Deployed Addresses
ERC4907#ERC4907 - 0x5a5269324E12034869a6dCd7C41FdcE73C88F094
```
At this point, your smart contract is successfully deployed!

## Running the Web Application
Navigate to the web app directory:
```
cd ../webapp
```
Install the necessary packages:
```
npm install
```
Start the server:
```
node server.js
```
Your web application will now be accessible at: `http://localhost:3000/`

![alt text](https://github.com/wuzhong-zhu/ERC4907_demo/blob/main/Screenshot_final.png?raw=true)

