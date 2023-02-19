const Fragger = require("../smartcontract/artifacts/contracts/Fragger.sol/Fragger.json");
const EloRating = require("../smartcontract/artifacts/contracts/EloRating.sol/EloRating.json");
const ethers = require("ethers");
const { Wallet } = require("ethers");
require("dotenv").config()

const providerRPC = {
    mantle_testnet: {
        name: "Mantle Testnet",
        rpc: "https://rpc.testnet.mantle.xyz/",
        chainId: 5001
    }
}
const provider = new ethers.JsonRpcProvider(
    providerRPC.mantle_testnet.rpc,
    {
        chainId: providerRPC.mantle_testnet.chainId,
        name: providerRPC.mantle_testnet.name,
    }
)
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider)
const token = new ethers.Contract(process.env.TOKEN_ADDRESS, Fragger.abi, wallet);
const eloRating = new ethers.Contract(process.env.ELORATING_ADDRESS, EloRating.abi, wallet);

const getCreditedBalance = async (address) => {
    const balance = ethers.formatEther(await token.balanceOf(address));
    console.log(`The balance of ${address} is: ${balanceFrom} ETH`);
    return balance;
};

const getBalance = async (address) => {
    const balance = ethers.formatEther(await eloRating.tokenBalances(address));
    console.log(`The balance of ${address} is: ${balanceFrom} ETH`);
    return balance;
};


const getTotalSupply = async() => {
    let totalSupply = ethers.formatEther(await  token.totalSupply());
    return totalSupply
}

const updateRating = async(address, easy, medium, hard) => {
    const receipt =  await eloRating.updateRating(address, easy, medium, hard);
    await receipt.wait();
}

const withdrawTokens = async() => {
    const receipt = await eloRating.withdrawTokens();
    await receipt.wait();
}

(async () => {
    let totalSupply = await getTotalSupply();
    console.log("Total supply: ", totalSupply);
    
    await getRewardTokens(wallet.address);

    totalSupply = await getTotalSupply();
    console.log("Total supply: ", totalSupply);
})();
