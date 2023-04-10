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

    if (!email.value || !message.value) {
    alert(`Будь ласка, заповніть всі обов'язкові поля`);
    return;
    }
    
    clearFormData();
}

function onTextInput(e) {
    formData[e.target.name] = e.target.value;

    setDataForm(formData);
}

function setDataForm() {
    localStorage.setItem(DATA_FORM_STORAGE_KEY, JSON.stringify(formData));
}

function onRestoreDataField() {
    if (!localStorage.getItem(DATA_FORM_STORAGE_KEY)) {
        return {};
    }

    const savedDataForm = JSON.parse(localStorage.getItem(DATA_FORM_STORAGE_KEY));

    if (savedDataForm.email) {
        form.email.value = savedDataForm.email;
    }

    if (savedDataForm.message) {
        form.message.value = savedDataForm.message;
    }

    return { ...savedDataForm };
}

function clearFormData() {
    localStorage.removeItem(DATA_FORM_STORAGE_KEY);
    form.reset();
    formData = {};
}