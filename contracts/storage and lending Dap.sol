// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MaMaGSavingCompany {
    mapping(address => uint) public balances;
    mapping(address => uint) public NofDeposit;

    address[] allDespositors;

    event deposited(address despositor, uint amount);

    event borrowed(address borrower, uint amount);

    /// not allowed to withdraw more than your what you deposited
    error CustomWithdrawal();

    function desposit() external payable {
        require(msg.value == 1 ether, "must equal to 1 ether");
        balances[msg.sender] += msg.value;
        if (balances[msg.sender] < 0) {
            allDespositors.push(msg.sender);
        }
        NofDeposit[msg.sender]++;
        emit deposited(msg.sender, msg.value);
    }

    function borrow() external {
        for (uint i = 0; i < allDespositors.length; i++) {
            require(msg.sender == allDespositors[i], "not a member");
        }
        require(NofDeposit[msg.sender] == 10, "not consistent");
        uint amountToBorrow = calucalatePauseBal();

        (bool send, ) = payable(msg.sender).call{value: amountToBorrow}("");
        require(send, "failed");

        emit borrowed(msg.sender, amountToBorrow);
    }

    function withdrawfull() external {
        for (uint i = 0; i < allDespositors.length; i++) {
            require(msg.sender == allDespositors[i], "not a member");
        }
        require(msg.sender != address(0), "zero address");
        uint withdrawAmount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool send, ) = payable(msg.sender).call{value: withdrawAmount}("");
        require(send, "failed");
    }

    function CustomWithDraw(uint amount) external {
        for (uint i = 0; i < allDespositors.length; i++) {
            require(msg.sender == allDespositors[i], "not a member");
        }
        require(msg.sender != address(0), "zero address");
        if (amount > balances[msg.sender]) {
            revert CustomWithdrawal();
        }
        uint replaceAmount = balances[msg.sender] - amount;
        balances[msg.sender] = replaceAmount;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "failed");
    }

    function pauseBal() external view returns (uint) {
        return address(this).balance;
    }

    function calucalatePauseBal() internal view returns (uint) {
        uint bal = address(this).balance;
        return (bal * 80) / 100;
    }
}
