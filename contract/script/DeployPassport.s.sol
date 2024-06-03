// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Passport} from "src/Passport.sol";
contract DeployPassportScript is Script {
    Passport public passport;

    function setUp() public {}

    function run() public {
        vm.broadcast();
         passport = new Passport();
        console.log("Passport deployed at address: ", address(passport));
    }
}
