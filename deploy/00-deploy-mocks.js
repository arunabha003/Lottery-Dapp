const { network }=require("hardhat")
const { ethers } = require("hardhat")
const { developmentChains }=require("../helper-hardhat-config")

const BASE_FEE=ethers.utils.parseEther("0.25")
//costs 0.25 link per request

const GAS_PRICE_LINK=1e9

module.exports=async function({getNamedAccounts,deployments})
{
    const {deploy,log}= deployments
    const {deployer}= await getNamedAccounts()
    const args=[BASE_FEE,GAS_PRICE_LINK]

    const chainID = network.config.chainId 

    // if (chainId == 31337)
   
    if(developmentChains.includes(network.name))
    {
        log("Local network detected! Deploying mocks...")

        //deploy a mock vrfcoordinator..

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,           //constructor agr of the smart constrattor
        })
    }


    module.exports.tags =["all","mocks"]



}