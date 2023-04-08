import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const DATA_FORM_STORAGE_KEY = 'feedback-form-state';

let formData = onRestoreDataField();

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onTextInput, 500));

function onSubmitForm(e) {
    e.preventDefault();

    const {
        elements: { email, message },
    } = form;

    console.log({email: email.value, message: message.value});

    clearFormData();
}

function onTextInput(e) {
    formData[e.target.name] = e.target.value;

    setDataForm(formData);
}

function setDataForm() {
    sessionStorage.setItem(DATA_FORM_STORAGE_KEY, JSON.stringify(formData));
}

function onRestoreDataField() {
    if (!sessionStorage.getItem(DATA_FORM_STORAGE_KEY)) {
        return {};
    }

    const savedDataForm = JSON.parse(sessionStorage.getItem(DATA_FORM_STORAGE_KEY));

    if (savedDataForm.email) {
        form.email.value = savedDataForm.email;
    }

    if (savedDataForm.message) {
        form.message.value = savedDataForm.message;
    }

    return { ...savedDataForm };
}

function clearFormData() {
    sessionStorage.removeItem(DATA_FORM_STORAGE_KEY);
    form.reset();
    formData = {};
}