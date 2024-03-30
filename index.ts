#! /usr/bin/env node

import inquirer from "inquirer";

let myBalance = 10000; //Dollar
let myPin = 5678;

async function main() {
    try {
        const pinAnswer = await inquirer.prompt([
            {
                name: "pin",
                message: "Enter Your pin Number",
                type: "number"
            }
        ]);

        if (pinAnswer.pin === myPin) {
            console.log(`Correct pin code!!!`);

            const operationAns = await inquirer.prompt([
                {
                    name: "operation",
                    message: "Please select an option",
                    type: "list",
                    choices: ["withdraw", "check balance", "fast cash"]
                }
            ]);

            if (operationAns.operation === "withdraw") {
                const amountAns = await inquirer.prompt([
                    {
                        name: "amount",
                        message: "Enter your amount",
                        type: "number"
                    }
                ]);

                if (amountAns.amount > myBalance) {
                    console.log(`Insufficient balance`);
                } else {
                    myBalance -= amountAns.amount;
                    console.log(`Your remaining balance is: ${myBalance}`);
                }
            } else if (operationAns.operation === "check balance") {
                console.log(`Your balance is: ${myBalance}`);
            } else if (operationAns.operation === "fast cash") {
                const fastcashAns = await inquirer.prompt([
                    {
                        name: "cash",
                        message: "Select cash amount",
                        type: "list",
                        choices: [1000, 2000, 5000, 8000, 10000]
                    }
                ]);

                if (myBalance >= fastcashAns.cash) {
                    myBalance -= fastcashAns.cash;
                    console.log(`Your remaining balance is: ${myBalance}`);
                } else {
                    console.log(`Insufficient balance`);
                }
            }
        } else {
            console.log(`Incorrect pin code`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();