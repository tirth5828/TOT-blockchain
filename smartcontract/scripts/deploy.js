async function main() {
  let [owner, wallet] = await ethers.getSigners();
  console.log("Owner account:", owner.address);
  console.log("Account balance:", (await owner.getBalance()).toString());

  if(wallet == undefined){
    console.log("Wallet address is undefined, setting it to owner");
    wallet = owner;
  }

  const TokenFactory = await ethers.getContractFactory("Fragger");
  const token = await TokenFactory.deploy();
  await token.deployed();
  console.log("Token Address:", token.address);

  const EloRatingFactory = await ethers.getContractFactory("EloRating");
  const eloRating = await EloRatingFactory.deploy(token.address);
  await eloRating.deployed();
  console.log("EloRatingFactory Address:", eloRating.address);

  //Add minter ownership
  await token.addMinter(eloRating.address);

  //Quick testing
  // const initialBalance = await token.balanceOf(wallet.address);
  // console.log("Initial Balance: ", initialBalance);
  // const tx1 = await eloRating.updateRating(wallet.address, 10, 0, 0);
  // await tx1.wait();
  // const tx2 = await eloRating.connect(wallet).withdrawTokens();
  // await tx2.wait();
  // const finalBalance = await token.balanceOf(wallet.address);
  // console.log("Final Balance: ", finalBalance);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });