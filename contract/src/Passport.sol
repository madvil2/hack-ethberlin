// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Passport {
    mapping(address => address[]) public userProofVerifier;

    function addVerifier(address _claim) public {
        userProofVerifier[msg.sender].push(_claim);
    }

    function getVerifier() public view returns (address[] memory) {
        return userProofVerifier[msg.sender];
    }

    function removeClaim(uint256 _index) public {
        require(
            _index < userProofVerifier[msg.sender].length,
            "Index out of bounds"
        );
        userProofVerifier[msg.sender][_index] = userProofVerifier[msg.sender][
            userProofVerifier[msg.sender].length - 1
        ];
        userProofVerifier[msg.sender].pop();
    }

    function getClaim(uint256 _index) public view returns (address) {
        require(
            _index < userProofVerifier[msg.sender].length,
            "Index out of bounds"
        );
        return userProofVerifier[msg.sender][_index];
    }

    function getVerifierCount() public view returns (uint256) {
        return getVerifierCount(msg.sender);
    }

    function getVerifierCount(address user) public view returns (uint256) {
        return userProofVerifier[user].length;
    }
}
