const AiroutToken = artifacts.require("./AiroutToken.sol");

module.exports = function (deployer) {
  deployer.deploy(AiroutToken, 1000000000);
};
