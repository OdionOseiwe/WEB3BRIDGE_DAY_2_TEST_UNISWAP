import { ethers } from "hardhat";
require("dotenv").config({ path: ".env" });

async function main() {
    
    const USDAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";;
    const deadline = Math.floor(Date.now() / 1000);

    const helpers = require("@nomicfoundation/hardhat-network-helpers");
    const USDTHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    await helpers.impersonateAccount(USDTHolder);
    const impersonatedSigner = await ethers.getSigner(USDTHolder);

 
    const wethAdress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    
    const WETH = await ethers.getContractAt(
        "IERC20",
        wethAdress,
        impersonatedSigner
    )

    const ROUTER = await ethers.getContractAt(
        "Iuniswap",
        UNIRouter,
        impersonatedSigner
    );

    const amountOut = 2000;

    await WETH.approve(UNIRouter, amountOut);

    const usdtBalbefore = await WETH.balanceOf(USDTHolder);
    const ethbalbefore = await impersonatedSigner.getBalance();
    console.log("beforeUsdt...." , usdtBalbefore);
    console.log("beforeWeth", ethbalbefore);


    /////////////////////////////////////////////////////////swapETHForExactTokens//////////////////////////////
    const _value = ethers.utils.parseUnits("1");
   

    ROUTER.swapETHForExactTokens(amountOut, [wethAdress, USDAddress], USDTHolder, deadline, { value: _value });

    const usdtBalafter = await WETH.balanceOf(USDTHolder);
    const ethbalafter= await impersonatedSigner.getBalance();
    console.log("afterUsdt...." , usdtBalafter);
    console.log("afterWeth", ethbalafter);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
  