//modulos externos
import inquirer from "inquirer"
import chalk from "chalk"

//modulos internos
import fs from "fs"

const operation = () => {
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
        if (action == "Consultar Salcdo") //
        if (action == "Fazer Depósito") //
        if (action == "Fazer um Saque") //
        if (action == "Sair") {
            console.log(chalk.bgBlue.black("Obrigado por usar o Accounts"))
            process.exit()
        }

    }).catch((err) => console.log(err))
}

//create an account
const createAccount = () => {
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))
    buildAccount()
}

const buildAccount = () => {
    inquirer.prompt([{
        name: "accountName",
        message: "Digite um nome para a sua conta:",
    }]).then((answer) => {
        const accountName = answer["accountName"]
        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }
        
        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Esta conta já existe, use outro nome"))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{\n\t"blance": 0\n}', (err) => console.log(err))
        console.log("Parabéns, sua conta foi criada com sucesso!")
        operation()

    }).catch((err) => console.log(err))
}

operation()