//modulos externos
import inquirer from "inquirer"
import chalk from "chalk"

//modulos internos
import fs from "fs"

(function operation() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "O que você deseja fazer? ",
        choices: [
            "Criar Conta",
            "Consultar Saldo",
            "Fazer Depósito",
            "Fazer um Saque",
            "Sair",
        ],
    }]).then((answer) => {
        const action = answer['action']

        if (action == "Criar Conta") createAccount()
        
    }).catch((err) => console.log(err))
})()

//create an account
const createAccount = () => {
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))
}