const { ethers } = require("hardhat");
const { getNamedAccounts } = require("hardhat");
async function listing() {
  const { deployer } = await getNamedAccounts();
  const escrow = await ethers.getContractAt(
    "Escrow",
    "0x9998c51a542732e16AF13F48D2Bc8d88A9B5c5C0",
    deployer
  );
  console.log(`Listing 3 properties...\n`);
  const realEstate = await ethers.getContractAt(
    "RealEstate",
    "0xd893E8e301aD01CbdA3Af6ada504981e89D43953",
    deployer
  );
  for (let i = 0; i < 3; i++) {
    const approve = await realEstate.approve(escrow.address, i + 1);
    await approve.wait();
  }
  const buyer = "0x46AC4E93DF816925Dc7F8c0d20ABc5e8EF567d7D";
  const list = await escrow.list(1, tokens(20), buyer, tokens(10));
  await list.wait();

  const list2 = await escrow.list(2, tokens(15), buyer, tokens(5));
  await list2.wait();

  const list3 = await escrow.list(3, tokens(10), buyer, tokens(5));
  await list3.wait();

  console.log(`Finished.`);
}
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

listing()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
