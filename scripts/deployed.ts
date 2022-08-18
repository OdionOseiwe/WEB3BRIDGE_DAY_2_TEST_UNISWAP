import { ethers } from "hardhat";

async function main() {
  
  console.log("deploying....");
  
  const Mama = await ethers.getContractFactory("MaMaGSavingCompany");
  const mama = await Mama.deploy();

  await mama.deployed();

  console.log('this is it', mama.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
