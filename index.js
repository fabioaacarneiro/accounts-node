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

        if (action == "Criar Conta") {
            createAccount()
        } else if (action == "Consultar Saldo") {
            
        } else if (action == "Fazer Depósito")  {
            deposit()
        } else if (action == "Fazer um Saque") {
            //
        } else if (action == "Sair") {
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

        fs.writeFileSync(`accounts/${accountName}.json`, '{\n\t"balance": 0\n}', (err) => console.log(err))
        console.log("Parabéns, sua conta foi criada com sucesso!")
        operation()

    }).catch((err) => console.log(err))
}

// add an amount to user account
const deposit = () => {
    inquirer.prompt([{
        name: "accountName",
        message: "Qual o nome da sua conta?"
    }]).then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([{
            name: "amount",
            message: "Quanto você deseja depositar?"
        }]).then((answer) => {
            const amount = answer['amount']

            // add amount
            addAmmount(accountName, amount)
            operation()
        }).catch((err) => console.log(err))
        
    }).catch((err) => console.log(err))
}

const checkAccount = (accountName) => {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Esta conta não existe!"))
        return false
    }
    return true
}

const addAmmount = (accountName, amount) => {
    const accountData = getAccount(accountName)
    
    if (!amount) {
        console.log(chalk.bgRed("Ocorreu um erro, tente outra vez mais tarde"))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => {
        console.log(err)
    })

    console.log(chalk.green(`Foi depositado o valor R$${amount} em sua conta!`))
}

const getAccount = (accountName) => {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "UTF-8",
        flag: "r"
    })

    return JSON.parse(accountJSON)
}

operation()