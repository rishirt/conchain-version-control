import web3 from './web3';
import DocFactory from './build/DocFactory.json';

const instance = new web3.eth.Contract(JSON.parse(
											DocFactory.interface),
											'0x1a795ce0abeb43f60388471c740a7a1212f9d7ba'
);

export default instance ;