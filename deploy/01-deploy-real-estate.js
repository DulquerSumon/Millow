const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const realEstate = await deploy("RealEstate", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`);

  if (chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(realEstate.address, []);
  }
};
