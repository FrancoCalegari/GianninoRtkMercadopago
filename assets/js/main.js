document.addEventListener("DOMContentLoaded", function () {
    fetch("./assets/js/json/dvds.json")
        .then(response => response.json())
        .then(beats => {
            const libraryContainer = document.querySelector(".librarycontainer");
            beats.forEach(beat => {
                const card = document.createElement("div");
                card.classList.add("libraryCard");

                card.innerHTML = `
                    <div class="tbl-cell">
                        <section class="box-container">
                            <div class="box">
                                <div class="front" style="background-image: url('${beat.frontCover}');"></div>
                                <div class="back" style="background-image: url('${beat.backCover}');"></div>
                                <div class="left"></div>
                                <div class="right"></div>
                                <div class="top"></div>
                                <div class="bottom"></div>
                            </div>
                        </section>
                    </div>
                    <div class="buy-tag">Comprar</div>
                `;

                // Mostrar la etiqueta flotante al pasar el mouse
                card.addEventListener("mouseenter", () => {
                    card.querySelector(".buy-tag").style.opacity = "1";
                });

                // Ocultar la etiqueta flotante al salir del mouse
                card.addEventListener("mouseleave", () => {
                    card.querySelector(".buy-tag").style.opacity = "0";
                });

                libraryContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error cargando los beats:", error));
});

fetch("./assets/js/json/background.json")
    .then(response => response.json())
    .then(backgrounds => {
        const sections = document.querySelectorAll("section");
        let currentSectionIndex = 0;

        // Crear un div para el fondo con blur
        const backgroundDiv = document.createElement("div");
        backgroundDiv.style.position = "fixed";
        backgroundDiv.style.top = "0";
        backgroundDiv.style.left = "0";
        backgroundDiv.style.width = "100%";
        backgroundDiv.style.height = "100%";
        backgroundDiv.style.zIndex = "-10";
        backgroundDiv.style.filter = "blur(15px)";
        backgroundDiv.style.transition = "background-image 0.5s ease-in-out, transform 0.5s ease-in-out";
        backgroundDiv.style.transform = "scale(1.5)";
        document.body.appendChild(backgroundDiv);

        function changeBackgroundImage() {
            if (currentSectionIndex >= 0 && currentSectionIndex < backgrounds.length) {
                const backgroundImage = backgrounds[currentSectionIndex].backgroundImage;
                backgroundDiv.style.backgroundImage = `url('${backgroundImage}')`;
            }
        }

        document.addEventListener("scroll", () => {
            const sectionHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            currentSectionIndex = Math.floor(scrollPosition / sectionHeight);
            changeBackgroundImage();

            // Agregar animación de desplazamiento al fondo
            const scrollPercentage = (scrollPosition % sectionHeight) / sectionHeight;
            backgroundDiv.style.transform = `scale(1.3) translateY(${scrollPercentage * 5}%)`;
        });

        changeBackgroundImage();
    })
    .catch(error => console.error("Error cargando los fondos:", error));