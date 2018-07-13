import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// Metamask is running and in the browser
	web3 = new  Web3(window.web3.currentProvider);
} else {
	// We are on the browser or no metamask
	const provider = new Web3.providers.HttpProvider(
	'https://rinkeby.infura.io/hztpQ6ikuvm1cpdy6sjW'
	);

	web3 = new Web3(provider);

}

export default web3;