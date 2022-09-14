function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Gestion du submit
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    const firstnameValue = document.getElementById("prenom").value;
    const lastnameValue = document.getElementById("nom").value;
    const emailValue = document.getElementById("email").value;
    const messageValue = document.getElementById("message").value;
    console.log({ firstnameValue, lastnameValue, emailValue, messageValue });
    e.preventDefault();
});