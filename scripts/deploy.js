const main = async () => {

        

        const [owner , randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

        const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();

	console.log("Deploying contracts with account: ", deployer.address);
	console.log("Account balance: ",accountBalance.toString());

	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();

	console.log("WavePortal address: ",waveContract.address);
        
	try{
	     waveTnx = await waveContract.connect(randomPerson).subtractWave();
	}catch(error){
		console.log("you are not allowed to execute this function");
	}
	waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	}catch(error){
		console.log(error);
		progress.exit(1);
	}
};

runMain();
