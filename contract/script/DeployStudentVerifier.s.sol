// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {StudentVerifier} from "src/StudentVerifier.sol";

contract DeployStudentVerifierScript is Script {
    StudentVerifier public studentVerifier;

    function setUp() public {}

    function run() public {
        vm.broadcast();
        studentVerifier = new StudentVerifier();
        console.log(
            "StudentVerifier deployed at address: ",
            address(studentVerifier)
        );
    }
}
