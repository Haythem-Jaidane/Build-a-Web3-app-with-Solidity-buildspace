const main = async () => {
        const [owner , randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();
	console.log("Contract deployed to:",waveContract.address);
	console.log("Contract deployed by:",owner.address);

	let waveCount;
	waveCount = await waveContract.getTotalWaves();

	let waveTxn = await waveContract.addWave();
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();

	waveTxn = await waveContract.connect(randomPerson).addWave();
	await waveTxn.wait();


	waveCount = await waveContract.getTotalWaves();

	waveTxn = await waveContract.subtractWave();
        waveCount = await waveContract.getTotalWaves();
        
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
