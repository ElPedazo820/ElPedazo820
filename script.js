// Datos simulados de restaurantes
const restaurantsData = [
    { id: 1, name: "La Cocina de Juana", description: "Auténtica comida casera con un toque gourmet.", imageUrl: "Juana.png", menuLink: "menuJuana.html" },
    { id: 2, name: "El Sabor del Mar", description: "Especialidades en pescados y mariscos frescos.", imageUrl: "El mar.jpg", menuLink: "menuMar.html" },
    { id: 3, name: "Parrilla Los Leños", description: "Deliciosas carnes asadas al estilo tradicional.", imageUrl: "Leña.jpg", menuLink: "menuParrilla.html" },
    { id: 4, name: "Verde Vida", description: "Restaurante vegano con ingredientes orgánicos.", imageUrl: "Vegan.jpg", menuLink: "menuVerde.html" },
    { id: 5, name: "Pasta Bella", description: "Pastas artesanales y pizzas al horno de leña.", imageUrl: "Pasta.png", menuLink: "menuPasta.html" }
];

// Correo fijo del restaurante
const restaurantEmail = "oscarjsaam@gmail.com";

// Inicialización de la página
document.addEventListener("DOMContentLoaded", () => {
    renderRestaurants();
    populateSelectOptions();
});

// Renderiza las tarjetas de restaurantes
function renderRestaurants() {
    const restaurantList = document.querySelector('.restaurants-scroll');
    restaurantList.innerHTML = ''; // Limpia contenido previo

    restaurantsData.forEach(restaurant => {
        const card = `
            <div class="restaurant-card">
                <img src="${restaurant.imageUrl}" alt="${restaurant.name} Image">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.description}</p>
                <a href="${restaurant.menuLink}" class="menu-link btn">Menú</a>
                <button class="btn" onclick="selectRestaurant(${restaurant.id})">Reservar</button>
            </div>`;
        restaurantList.innerHTML += card;
    });
}

// Llena el selector del formulario de reserva
function populateSelectOptions() {
    const select = document.getElementById('restaurant-select');
    select.innerHTML = ''; // Limpia opciones previas

    restaurantsData.forEach(restaurant => {
        const option = `<option value="${restaurant.id}">${restaurant.name}</option>`;
        select.innerHTML += option;
    });
}

// Al seleccionar un restaurante
function selectRestaurant(id) {
    document.getElementById('restaurant-select').value = id;
    scrollToSection('section3');
}

// Scroll suave a una sección
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Formulario inicial: obtiene el correo del usuario
document.getElementById('user-email-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = document.getElementById('user-email').value;

    if (!userEmail) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    sendEmails(userEmail);
});

// Envío automático de correos
function sendEmails(userEmail) {
    const hiddenFormsSection = document.getElementById('hidden-forms-section');

    // Formulario para el usuario
    const userForm = `
        <form action="https://formsubmit.co/${userEmail}" method="POST" style="display:none;">
            <input type="hidden" name="_next" value="">
            <input type="hidden" name="message" value="Gracias por tu reserva. Te contactaremos pronto.">
        </form>`;
    hiddenFormsSection.innerHTML += userForm;

    // Formulario para el restaurante
    const restaurantForm = `
        <form action="https://formsubmit.co/${restaurantEmail}" method="POST" style="display:none;">
            <input type="hidden" name="_next" value="">
            <input type="hidden" name="user-email" value="${userEmail}">
            <input type="hidden" name="message" value="Un usuario ha solicitado una reserva. Correo: ${userEmail}">
        </form>`;
    hiddenFormsSection.innerHTML += restaurantForm;

    // Enviar formularios
    hiddenFormsSection.querySelectorAll('form').forEach(form => form.submit());
    alert("Tu solicitud ha sido enviada. ¡Gracias por reservar!");
}
// Selección de elementos
const userEmailForm = document.getElementById("user-email-form");
const userEmailInput = document.getElementById("user-email");
const reservationFormSection = document.getElementById("reservation-form-section");
const hiddenUserEmail = document.getElementById("hidden-user-email");

// Evento cuando se envía el correo
userEmailForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userEmail = userEmailInput.value;
    if (!userEmail) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    // Asigna el correo al campo oculto en el formulario secundario
    hiddenUserEmail.value = userEmail;

    // Oculta el formulario de correo y muestra el formulario de reserva
    userEmailForm.classList.add("hidden");
    reservationFormSection.classList.add("show");
});
