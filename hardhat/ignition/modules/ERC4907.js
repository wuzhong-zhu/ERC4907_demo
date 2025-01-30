const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("ERC4907", (m) => {
  const token = m.contract("ERC4907",["rentableNFT","RNFT"]);

  return { token };
});

module.exports = TokenModule;

//npx hardhat compule
//npx hardhat ignition deploy ./ignition/modules/ERC4907.js --network Sepolia

//0x721EB6CeEcD5b5e6B8F79ad4A103D1A3a6B42831
//0x935e26C71284C736B18999764f069700A00ecF99