document.addEventListener('DOMContentLoaded', () => {
    // Selectores para el catálogo y el modal
    const catalogo = document.getElementById('catalogo');
    const modal = document.getElementById('lightbox-modal');
    const modalImage = document.getElementById('imagen-modal');
    const closeBtn = document.querySelector('.cerrar-modal');
    const phoneNumber = '944420523'; 

    /**
     * Alterna la visibilidad de los paneles de detalles o galería
     */
    const toggleVisibility = (targetId, forceClose = false) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            if (forceClose) {
                targetElement.classList.add('oculto');
            } else {
                targetElement.classList.toggle('oculto');
            }
        }
    };

    /**
     * Función para generar y enviar mensaje automático por WhatsApp (Formato Corporativo).
     */
    function enviarWhatsApp(nombre, modelo, anio) {
        const mensaje = `SOLICITUD DE ADQUISICIÓN - [Hnos Ventura]
Estimados,
Requiero información y cotización formal para el siguiente equipo:
        
* **Equipo:** ${nombre.toUpperCase()}
* **Modelo:** ${modelo}
* **Año:** ${anio}
        
Por favor, confírmenme la disponibilidad actual y los términos de crédito/compra.
Gracias.`;

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`, '_blank');
    }

    // --- Lógica de Delegación de Eventos en el Catálogo ---
    catalogo.addEventListener('click', (event) => {
        const target = event.target;
        const targetId = target.dataset.target;
        const machineryCard = target.closest('.maquinaria');

        if (!machineryCard) return; 

        if (target.classList.contains('btn-detalles')) {
            toggleVisibility(targetId);
            const galeriaId = machineryCard.querySelector('.btn-galeria').dataset.target;
            if (galeriaId) toggleVisibility(galeriaId, true);

        } else if (target.classList.contains('btn-cerrar-detalles')) {
            toggleVisibility(targetId, true);

        } else if (target.classList.contains('btn-galeria')) {
            toggleVisibility(targetId);
            const detallesId = machineryCard.querySelector('.btn-detalles').dataset.target;
            if (detallesId) toggleVisibility(detallesId, true);

        } else if (target.classList.contains('btn-adquirir-wa')) {
            const nombre = machineryCard.dataset.nombre;
            const modelo = machineryCard.dataset.modelo;
            const anio = machineryCard.dataset.anio;
            enviarWhatsApp(nombre, modelo, anio);
        }
        // --- LÓGICA LIGHTBOX: Abrir Modal ---
        else if (target.tagName === 'IMG' && target.closest('.galeria')) {
            modal.classList.remove('oculto-modal');
            modalImage.src = target.src;
            modalImage.alt = target.alt;
            // APLICAR EFECTOS MODERNOS
            document.body.classList.add('modal-abierto'); 
            document.body.style.overflow = 'hidden'; 
        }
    });

    // --- Lógica LIGHTBOX: Cerrar Modal ---
    
    const closeModal = () => {
        modal.classList.add('oculto-modal');
        document.body.classList.remove('modal-abierto');
        document.body.style.overflow = '';
    };

    // 1. Cerrar al hacer clic en el botón X
    closeBtn.addEventListener('click', closeModal);

    // 2. Cerrar al hacer clic fuera de la imagen (en el área oscura del modal)
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});