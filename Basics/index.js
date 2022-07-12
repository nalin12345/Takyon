//console.log("My first NodeJS application");
const {
Connection,
PublicKey,
clusterApiUrl,
Keypair,
LAMPORTS_PER_SOL,
Transaction,
Account,
} = require("@solana/web3.js");

//step-1 generating a new wallet keypair
const newPair = new Keypair();
console.log(newPair);

//Step-2 stroing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

//step-3 getting the wallet balance
const getWalletBalance = async() => {
try {
const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
const myWallet = await Keypair.fromSecretKey(secretKey);

const walletBalance = await connection.getBalance(
new PublicKey(myWallet.publicKey)
);
console.log('=> For wallet address '+ publicKey);
console.log('Wallet balance:' + parseInt(walletBalance)/LAMPORTS_PER_SOL + ' SOL');
} catch (err) {
console.log(err);
}
};

//step-4 air dropping sol (in terms of Lamports)
const airDropSol = async () => {
try {
const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
const walletKeyPair = await Keypair.fromSecretKey(secretKey);
console.log('--Airdropping 2 SOL --');
const fromAirDropSignature = await connection.requestAirdrop(
new PublicKey(walletKeyPair.publicKey),
2 * LAMPORTS_PER_SOL
);
await connection.confirmTransaction(fromAirDropSignature);
} catch (err) {
console.log(err);
}
};


//step-5 driver fucntion
const driverFunction = async () => {
await getWalletBalance();
await airDropSol();
await getWalletBalance();
}

driverFunction();


























