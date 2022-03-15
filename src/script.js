class Calculadora {
    constructor(operadorAnterElement, operadorAtualElement) {
        this.operadorAnterElement = operadorAnterElement
        this.operadorAtualElement = operadorAtualElement
        this.limpar()
    }

    limpar() {
        this.operadorAtual = ''
        this.operadorAnter = ''
        this.operation = undefined
    }

    delete() {
        this.operadorAtual = this.operadorAtual.toString().slice(0, -1)
    }

    addNumero(numero) {
        if (numero == '.' && this.operadorAtual.includes('.')) {
            return
        }
        this.operadorAtual = this.operadorAtual.toString() + numero.toString()
    }

    selectOperador(operador) {
        if (this.operadorAtual == ''){
            return
        }
        if (this.operadorAnter != ''){
            this.computar()
        }
        this.operador = operador
        this.operadorAnter = this.operadorAtual
        this.operadorAtual = ''
    }

    computar() {
        let computacao
        const anter = parseFloat(this.operadorAnter)
        const atual = parseFloat(this.operadorAtual)
        if (isNaN(anter) || isNaN(atual)) {
            return
        }
        switch (this.operador) {
            case '+':
                computacao = anter + atual
                break
            case '-':
                computacao = anter - atual
                break
            case '*':
                computacao = anter * atual
                break
            case '÷':
                computacao = anter / atual
                break
            default:
                return
        }
        this.operadorAtual = computacao
        this.operador = undefined
        this.operadorAnter = ''
    }

    displayNum(numero) {
        const numString = numero.toString()
        const integerDigits = parseFloat(numString.split('.')[0])
        const decimalDigits = numString.split('.')[1]
        const numFloat = parseFloat(numero)
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    atualizarDisplay() {
        this.operadorAtualElement.innerText = this.displayNum(this.operadorAtual)
        if (this.operador != null) {
            this.operadorAnterElement.innerText = `${this.displayNum(this.operadorAnter)} ${this.operador}`
        } else {
            this.operadorAnterElement.innerText = ''
        }
        
    }
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const igualButton = document.querySelector('[data-igual]')
const deleteButton = document.querySelector('[data-delete]')
const limparButton = document.querySelector('[data-limpar]')
const operadorAnterElement = document.querySelector('[data-operador-anter]')
const operadorAtualElement = document.querySelector('[data-operador-atual]')


const calculadora = new Calculadora(operadorAnterElement, operadorAtualElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.addNumero(button.innerText)
        calculadora.atualizarDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.selectOperador(button.innerText)
        calculadora.atualizarDisplay()
    })
})

igualButton.addEventListener('click', () => {
    calculadora.computar()
    calculadora.atualizarDisplay()
})

limparButton.addEventListener('click', () => {
    calculadora.limpar()
    calculadora.atualizarDisplay()
})

deleteButton.addEventListener('click', () => {
    calculadora.delete()
    calculadora.atualizarDisplay()
})