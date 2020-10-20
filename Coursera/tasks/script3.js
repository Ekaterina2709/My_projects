'use strict';

// Код валидации формы
function validateForm(arg) {
    var inputs = document.querySelectorAll('input');
    inputs.forEach((element => {
        element.addEventListener('blur', validateInput, true);
        element.addEventListener('focus', remove, true)
    }));


    var button = document.querySelector('button');
    button.addEventListener('click', buttonSubmit);

    function validateInput() {
        switch (this.dataset.validator) {
            case 'letters':
                let lettersMatch = !this.value.match(/^[a-zа-яё]+$/i);
                this.classList.toggle(arg.inputErrorClass, lettersMatch);
                break;
            case 'number':
                if (this.dataset.validatorMin &&
                    this.dataset.validatorMax) {
                    let numberMinMaxMatch = this.value.length === 0 || isNaN(this.value) ||
                        Number(this.value) < this.dataset.validatorMin ||
                        Number(this.value) > this.dataset.validatorMax;
                    this.classList.toggle(arg.inputErrorClass, numberMinMaxMatch);
                } else {
                    let numberMatch = !this.value.match(/^-?\d+$/i)
                    this.classList.toggle(arg.inputErrorClass, numberMatch);
                }
                break;
            case 'regexp':
                let regexpMatch = !this.value.match(this.dataset.validatorPattern)
                this.classList.toggle(arg.inputErrorClass, regexpMatch);
                break;
        }
    }

    function remove() {
        if (this.classList.contains(arg.inputErrorClass)) {
            this.classList.remove(arg.inputErrorClass);
        }
    }

    function buttonSubmit(el) {
        el.preventDefault();
        var  empty =elem => elem.value.length === 0;
        var form = document.querySelector(arg.formId);

        if (inputs.some(empty)) {
            inputs.forEach(e => {
                if (e.dataset.hasOwnProperty('required')) validateInput.call(e);
                else if (e.value.length === 0) e.classList.remove(arg.inputErrorClass);
            });
        }
        var isNotValid = elem => elem.classList.contains(arg.inputErrorClass);

        form.classList.toggle(arg.formValidClass, !inputs.some(isNotValid));
        form.classList.toggle(arg.formInvalidClass, inputs.some(isNotValid));


    }
}
