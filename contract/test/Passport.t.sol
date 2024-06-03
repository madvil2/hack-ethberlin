// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Passport} from "../src/Passport.sol";

contract PassportTest is Test {
    Passport public passport;

    function setUp() public {
        passport = new Passport();
    }

  
}
