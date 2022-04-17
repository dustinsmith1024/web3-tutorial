const Web3 = require("web3");

// 2d5a943bebc6448fba0618f4fc50ab56

const rpcURL = "https://mainnet.infura.io/v3/2d5a943bebc6448fba0618f4fc50ab56";

const web3 = new Web3(rpcURL);

// console.log(web3);

const account = "0x700c5a626613059cbdb3345733fe01eea06a9bdc";

web3.eth.getBalance(account, (err, wei) => {
  let balance = web3.utils.fromWei(wei, "ether");
  console.log(balance);
});

web3.eth
  .getTransaction(
    "0xc1602fd70b358d2bcf83f3c1a13cb6cb11efbf7837ef0cbf2bba496150b8d56f"
  )
  .then(console.log);

web3.eth
  .getPastLogs({
    fromBlock: "14545470",
    address: "0x9e3319636e2126e3c0bc9e3134AEC5e1508A46c7",
  })
  .then((res) => {
    res.forEach((rec) => {
      console.log(rec.blockNumber, rec.transactionHash, rec.topics);
    });
  })
  .catch((err) => console.log("getPastLogs failed", err));

