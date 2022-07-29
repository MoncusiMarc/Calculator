class calculator {
	constructor(number) {
		this.displayNumber = String(number)
		this.savedNumber = ''
		this.savedOperation = undefined
		this.displayToBeUpdated = false
	}
	getDisplay() {
		return this.displayNumber
	}

	getSavedNumber() {
		return this.savedNumber
	}

	getSavedOperation() {
		return this.savedOperation
	}

	getToBeUpdated() {
		return this.displayToBeUpdated
	}

	setDisplay(number) {
		this.displayNumber = String(number)
	}

	setSavedNumber(number) {
		this.savedNumber = String(number)
	}

	setSavedOperation(operation) {
		this.savedOperation = operation
	}

	setToBeUpdated(boolean) {
		this.displayToBeUpdated = boolean
	}

	updateDisplay() {
		const display = document.getElementById('Display')
		display.innerText = this.displayNumber.replace('.', ',')
	}

	clearing() {
		this.displayNumber = '0'
		this.savedNumber = ''
		this.savedOperation = undefined
		this.displayToBeUpdated = false
	}

	insertNumber(number) {
		if (this.displayNumber == 'ERROR') return
		if (digitCount(this.displayNumber) >= MAX_DIGITS_ON_SCREEN && !this.displayToBeUpdated) return
		if (this.displayNumber == '0' || this.displayToBeUpdated) {
			this.displayNumber = number
			this.displayToBeUpdated = false
		} else this.displayNumber += number
	}

	insertComma() {
		if (this.displayNumber == 'ERROR') return
		if (this.displayNumber.includes('.')) return
		if (digitCount(this.displayNumber) >= MAX_DIGITS_ON_SCREEN && !this.displayToBeUpdated) return
		if (this.displayToBeUpdated) {
			this.displayNumber = 0
			this.displayToBeUpdated = false
		}
		this.displayNumber += '.'
	}

	insertNegation() {
		if (this.displayNumber == 'ERROR') return
		if (Number(this.displayNumber) == '0' || this.displayToBeUpdated) return
		this.displayNumber.charAt(this.displayNumber.length - 1) == '.'
			? (this.displayNumber = String(this.displayNumber * -1) + '.')
			: (this.displayNumber = String(this.displayNumber * -1))
	}
	insertOperator(operator) {
		if (this.displayNumber == 'ERROR') return
		if (this.displayToBeUpdated) {
			if (this.savedNumber == '') this.savedNumber = this.displayNumber
		} else {
			if (this.savedNumber == '') {
				this.savedNumber = this.displayNumber
			} else {
				this.displayNumber = evaluate()
				console.log(this.displayNumber)
				if (this.displayNumber != 'ERROR') {
					this.savedNumber = this.displayNumber
				}
			}
		}
		this.savedOperation = operator
		this.displayToBeUpdated = true
	}
	calculate() {
		if (this.displayNumber == 'ERROR') return
		if (this.displayToBeUpdated) {
			this.displayNumber = 'ERROR'
			return
		}
		this.displayNumber = evaluate()
		this.savedNumber = ''
		this.savedOperation = undefined
		this.displayToBeUpdated = true
	}
}
