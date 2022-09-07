function getButtons() {
	const keyboard = document.querySelector('div.Keyboard')
	return keyboard.querySelectorAll('button')
}

function setButtonHighlight(button, highlight) {
	if (highlight) {
		button.classList.add('highlight')
	} else {
		button.classList.remove('highlight')
	}
}

function setAllButtonsHighlight(highlight) {
	operatorButtons.forEach(button => {
		setButtonHighlight(button, highlight)
	})
}

function setButtonDisabled(button, disable) {
		button.disabled = disable;
}

function setAllButtonsStatus() {
	getButtons().forEach(button => setButtonDisabled(button, false))
	if (digitCount(Calculator.getDisplay()) >= MAX_DIGITS_ON_SCREEN && !Calculator.getToBeUpdated()) {
		numberButtons.forEach(button => {
			setButtonDisabled(button, true)
		})
		setButtonDisabled(commaButton, true)
	}
	if (Calculator.getDisplay().includes('.')) setButtonDisabled(commaButton, true)
	if (Calculator.getDisplay() == 'ERROR') {
		getButtons().forEach(button => {
			setButtonDisabled(button, true)
		})
		setButtonDisabled(clearButton, false)
	}
	if (Calculator.getToBeUpdated() || Number(Calculator.getDisplay()) == 0) {
		setButtonDisabled(plusMinusButton, true)
	}
	if (Calculator.getDisplay() == '0') {
		setButtonDisabled(num0Button, true)
	}
}
