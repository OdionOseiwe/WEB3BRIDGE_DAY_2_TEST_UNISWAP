import { ethers } from "hardhat";
require("dotenv").config({ path: ".env" });

async function main() {
    
    const UNIaddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const amountIn = 100;
    const amountOutMin = 10; 

    const helpers = require("@nomicfoundation/hardhat-network-helpers");
    const DAIHOLDER = "0x3b74B91360d7c1B59DC157dCfe01aBae72557df2";
    await helpers.impersonateAccount(DAIHOLDER);
    const impersonatedSigner = await ethers.getSigner(DAIHOLDER);

    
    const DAI = await ethers.getContractAt(
        "IERC20",
        DAIAddress,
        impersonatedSigner
    );
    const UNI = await ethers.getContractAt("IERC20", UNIaddress);
    const ROUTER = await ethers.getContractAt(
        "Iuniswap",
        UNIRouter,
        impersonatedSigner
    );
    await DAI.approve(UNIRouter, amountIn);

    const DAIBalbefore = await DAI.balanceOf(DAIHOLDER);
    const daiBalbefore = await DAI.balanceOf(DAIHOLDER);

    console.log("balance before swap", DAIBalbefore, daiBalbefore);

    const deadline = Math.floor(Date.now() / 1000);
    
    ROUTER.swapExactTokensForTokens(amountIn, amountOutMin, [DAIAddress,UNIaddress], DAIHOLDER, deadline);

    const uniBalafter = await UNI.balanceOf(impersonatedSigner.address);
    const daiBalAfter = await DAI.balanceOf(DAIHOLDER);

    console.log("balance before swap", uniBalafter, daiBalAfter);
    
}


    


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});