const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer, deployer1, deployer2, deployer3 } =
    await getNamedAccounts();
  const chainId = network.config.chainId;
  const seller = "0xF2D436aF71c57B2eDA53395258508B172fC51cB6";
  const inspector = "0x46AC4E93DF816925Dc7F8c0d20ABc5e8EF567d7D";
  const lender = "0x4Aa1fb94Cc512d2839d281F4765D1A2B263c906b";
  const args = [
    "0xd893E8e301aD01CbdA3Af6ada504981e89D43953",
    seller,
    inspector,
    lender,
  ];
  const realEstate = await deploy("Escrow", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`);

  if (chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(realEstate.address, args);
  }
};
module.exports.tags = ["escrow"];
