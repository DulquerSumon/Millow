const { ethers } = require("hardhat");
const { getNamedAccounts } = require("hardhat");
async function mint() {
  const { deployer } = await getNamedAccounts();
  const realEstate = await ethers.getContractAt(
    "RealEstate",
    "0xd893E8e301aD01CbdA3Af6ada504981e89D43953",
    deployer
  );
  console.log(`Minting 3 properties...\n`);

  for (let i = 0; i < 3; i++) {
    const transaction = await realEstate.mint(
      `https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${
        i + 1
      }.json`
    );
    await transaction.wait();
    const totalSupply = await realEstate.totalSupply();
    console.log(totalSupply.toString());
  }
  console.log("minted!");
}

mint()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
