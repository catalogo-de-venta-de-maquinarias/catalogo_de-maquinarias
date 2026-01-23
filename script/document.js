document.addEventListener('DOMContentLoaded', () => {
    const catalogo = document.getElementById('catalogo');
    const modal = document.getElementById('lightbox-modal');
    const modalImage = document.getElementById('imagen-modal');
    const closeBtn = document.querySelector('.cerrar-modal');
    const phoneNumber = '944420523'; 

    // VARIABLES PARA LA NAVEGACIÓN
    const prevBtn = document.querySelector('.prev-modal');
    const nextBtn = document.querySelector('.next-modal');
    let imagenesGaleria = [];
    let indiceActual = 0;

    const actualizarImagenModal = () => {
        modalImage.src = imagenesGaleria[indiceActual].src;
        modalImage.alt = imagenesGaleria[indiceActual].alt;
    };

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

    function enviarWhatsApp(nombre, modelo, anio) {
        const mensaje = `SOLICITUD DE ADQUISICIÓN - [Hnos Ventura]\nEquipo: ${nombre}\nModelo: ${modelo}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`, '_blank');
    }

    catalogo.addEventListener('click', (event) => {
        const target = event.target;
        const machineryCard = target.closest('.maquinaria');
        if (!machineryCard) return; 

        const targetId = target.dataset.target;

        if (target.classList.contains('btn-detalles')) {
            toggleVisibility(targetId);
            const galeriaId = machineryCard.querySelector('.btn-galeria').dataset.target;
            toggleVisibility(galeriaId, true);
        } else if (target.classList.contains('btn-galeria')) {
            toggleVisibility(targetId);
            const detallesId = machineryCard.querySelector('.btn-detalles').dataset.target;
            toggleVisibility(detallesId, true);
        } else if (target.classList.contains('btn-adquirir-wa')) {
            enviarWhatsApp(machineryCard.dataset.nombre, machineryCard.dataset.modelo, machineryCard.dataset.anio);
        }
        
        // --- LÓGICA LIGHTBOX ACTUALIZADA ---
        else if (target.tagName === 'IMG' && target.closest('.galeria')) {
            const contenedorGaleria = target.closest('.galeria');
            imagenesGaleria = Array.from(contenedorGaleria.querySelectorAll('img'));
            indiceActual = imagenesGaleria.indexOf(target);

            modal.classList.remove('oculto-modal');
            actualizarImagenModal();
            document.body.classList.add('modal-abierto'); 
            document.body.style.overflow = 'hidden'; 
        }
    });

    // Eventos de las flechas
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceActual = (indiceActual - 1 + imagenesGaleria.length) % imagenesGaleria.length;
        actualizarImagenModal();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceActual = (indiceActual + 1) % imagenesGaleria.length;
        actualizarImagenModal();
    });

    const closeModal = () => {
        modal.classList.add('oculto-modal');
        document.body.classList.remove('modal-abierto');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('oculto-modal')) return;
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "Escape") closeModal();
    });
});