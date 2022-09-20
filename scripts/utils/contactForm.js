/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const modal = document.getElementById('contact_modal');
const contact_modal = document.getElementById('contact_modal');

function displayModal() {
    main.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-hidden', false);
    modal.style.display = 'block';
    contact_modal.focus();
}

function closeModal() {
    modal.setAttribute('aria-hidden', true);
    main.setAttribute('aria-hidden', false);
    modal.style.display = 'none';
}

// Gestion du submit
const form = document.getElementById('formulaire-contact');
form.addEventListener('submit', e => {
    const firstnameValue = document.getElementById('prenom').value;
    const lastnameValue = document.getElementById('nom').value;
    const emailValue = document.getElementById('email').value;
    const messageValue = document.getElementById('message').value;
    console.log({ firstnameValue, lastnameValue, emailValue, messageValue });
    e.preventDefault();
});