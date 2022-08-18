require("dotenv").config({ path: ".env" });
//import { BytesLike } from "ethers";
const { ethers } = require("hardhat");

async function main() {
    const ContractAddress = "0xfe6D1091620F802f12d80c1c4097Da992F38df2E";

    const Mama = await ethers.getContractAt("IStorage", ContractAddress); 

    const Amount = ethers.utils.parseEther("1");

    const deposit =  await Mama.desposit({ value: Amount });
    console.log("this is it", deposit);
    
    
    const bal = await Mama.pauseBal();
    console.log("balance of contract" , bal);
     
    /// transctionhash 0xe1ecbc608900625377ea1bd78abc5ff7f3d3e52512ab45692fd85698ae4203be


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});  