const form_errors = [];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');
    const errorOutput = document.querySelector('#error-output');
    const infoOutput = document.querySelector('#info-output');
    const formErrorsField = document.querySelector('#form-errors');
    const textarea = document.querySelector('#comments');
    const counter = document.querySelector('#comment-counter');
    const maxLen = textarea ? textarea.maxLength || 200 : 0;

    function showError(message, field) {
        if (!errorOutput) return;
        errorOutput.textContent = message;
        errorOutput.classList.add('output-visible');
        if (field) field.classList.add('field-error', 'field-flash');
        form_errors.push({
            field: field ? field.name || field.id : '',
            message,
            time: new Date().toISOString()
        });
        setTimeout(() => {
            errorOutput.textContent = '';
            errorOutput.classList.remove('output-visible');
            if (field) field.classList.remove('field-flash');
        }, 2500);
    }

    function showInfo(message) {
        if (!infoOutput) return;
        infoOutput.textContent = message;
        infoOutput.classList.add('output-visible');
        setTimeout(() => {
            infoOutput.textContent = '';
            infoOutput.classList.remove('output-visible');
        }, 2500);
    }

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                const msg = firstInvalid.validationMessage || 'Please fix the highlighted field.';
                firstInvalid.focus();
                showError(msg, firstInvalid);
            }
        }
        if (formErrorsField) {
            formErrorsField.value = JSON.stringify(form_errors);
        }
    });

    const nameField = form.querySelector('#name');
    if (nameField && nameField.pattern) {
        const pattern = new RegExp('^' + nameField.pattern + '$');
        let lastGood = nameField.value;
        nameField.addEventListener('input', () => {
            const value = nameField.value;
            if (value === '' || pattern.test(value)) {
                lastGood = value;
            } else {
                nameField.value = lastGood;
                showError('You entered an illegal character in the name field.', nameField);
            }
        });
    }

    if (textarea) {
        function updateCounter() {
            const len = textarea.value.length;
            const remaining = maxLen - len;
            if (counter) {
                counter.textContent = `You can still type ${remaining >= 0 ? remaining : 0} characters.`;
                counter.classList.toggle('warning', remaining <= 20 && remaining >= 0);
                counter.classList.toggle('error', remaining < 0);
            }
            if (remaining < 0) {
                textarea.value = textarea.value.slice(0, maxLen);
                showError('You exceeded the maximum character limit.', textarea);
            }
        }
        textarea.addEventListener('input', updateCounter);
        textarea.addEventListener('focus', () => {
            showInfo(`You may enter up to ${maxLen} characters.`);
        }, { once: true });
        updateCounter();
    }
});
