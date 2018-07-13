import web3 from './web3';
import Doc from './build/Doc.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Doc.interface), address);
};
