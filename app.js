document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.querySelector('.table tbody');
    const cardButtons = document.querySelectorAll('.card_buttons .card');
    const form = document.querySelector('.formulario.cartas');
    let cardsData = [];

    // Cargar datos desde JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            cardsData = data;
            updateTable();
            setupCardButtons();
        })
        .catch(error => console.error('Error loading data:', error));

    // Actualizar la tabla con los datos del JSON
    function updateTable() {
        tbody.innerHTML = ''; // Limpiar la tabla
        cardsData.forEach(card => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${card.numero}</td>
                <td>${card.carta}</td>
                <td>${card.cantidad}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Configurar botones de las cartas
    function setupCardButtons() {
        cardButtons.forEach((button, index) => {
            const cardNumber = index + 1; // Para mapear el índice al número de la carta (1 a 13)
            const cardData = cardsData.find(card => card.numero === String(cardNumber));

            if (cardData) {
                // Si la carta está en los datos cargados (habilitar el contador)
                button.addEventListener('click', () => {
                    cardData.cantidad++;
                    updateTable();
                });
            } else {
                // Si la carta no está cargada, deshabilitar el botón hasta que se registre manualmente
                button.style.pointerEvents = 'none'; // Deshabilitar clic
                button.style.opacity = '0.5'; // Cambiar la opacidad para dar una apariencia deshabilitada
            }
        });
    }

    // Habilitar el botón de carta al registrarla manualmente
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const numero = document.getElementById('numero_carta').value;
        const palo = document.getElementById('tipo_carta').value;

        let existingCard = cardsData.find(card => card.numero === numero);

        if (existingCard) {
            // Si la carta ya existe en los datos, actualizamos el palo y reiniciamos su cantidad
            existingCard.carta = `${existingCard.carta} de ${palo}`;
            existingCard.cantidad = 0;
        } else {
            // Si la carta no existe, la añadimos a los datos y la habilitamos
            cardsData.push({
                numero: numero,
                carta: `${numero} de ${palo}`,
                cantidad: 0
            });

            const cardIndex = Number(numero) - 1; // El índice del botón correspondiente
            const button = cardButtons[cardIndex];
            button.style.pointerEvents = 'auto'; // Habilitar el clic
            button.style.opacity = '1'; // Restaurar la opacidad
            button.addEventListener('click', () => {
                let newCardData = cardsData.find(card => card.numero === numero);
                if (newCardData) {
                    newCardData.cantidad++;
                    updateTable();
                }
            });
        }

        updateTable();
        form.reset(); // Limpiar el formulario
    });

    // Manejo del inicio de sesión
    const loginForm = document.getElementById('registroForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('newUser').value;
            const password = document.getElementById('newPassword').value;

            // Verificar si el usuario es 'admin' y la contraseña '1234'
            if (username === 'admin' && password === '1234') {
                // Redirigir a index.html si el inicio de sesión es correcto
                window.location.href = '/index.html';
            } else {
                alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Manejo del inicio de sesión
    const loginForm = document.getElementById('registroForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('newUser').value;
            const password = document.getElementById('newPassword').value;

            // Verificar si el usuario es 'admin' y la contraseña '1234'
            if (username === 'admin' && password === '1234') {
                // Redirigir a index.html si el inicio de sesión es correcto
                window.location.href = 'index.html';
            } else {
                alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            }
        });
    }
});