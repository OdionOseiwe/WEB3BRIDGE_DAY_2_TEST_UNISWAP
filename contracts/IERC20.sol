// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function approve(address _spender, uint _value) external;

    function balanceOf(address who) external view returns (uint256 balance);
}
