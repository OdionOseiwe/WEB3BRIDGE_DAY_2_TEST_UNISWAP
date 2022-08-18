// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IStorage {
    function desposit() external payable;

    function pauseBal() external view returns (uint);
}
