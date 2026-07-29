}/* ==========================================================================
   AGROSUSTENTÁVEL - INTELIGÊNCIA E ANIMAÇÕES DA PÁGINA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initHeroParallax();
    initFormValidation();
    initInteractiveTools();
});

/* ==========================================================================
   1. ANIMAÇÕES AO ROLAR A PÁGINA (SCROLL REVEAL EFFECT)
   ========================================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .challenge-box, .feature-item, .introduction, .solutions-container article, .tool-box');

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight * 0.85;
        animatedElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
}

/* ==========================================================================
   2. EFEITO PARALLAX SUAVE NO BANNER PRINCIPAL (DESATIVADO PARA A IMAGEM NO CONTEÚDO)
   ========================================================================== */
function initHeroParallax() {
    // Parallax mantido estruturalmente caso queira adicionar dinamicidade à seção futuramente
}

/* ==========================================================================
   3. VALIDAÇÃO E ANIMAÇÃO DO FORMULÁRIO DE CONTATO
   ========================================================================== */
function initFormValidation() {
    const form = document.querySelector('.contact-form-container form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (nome === "" || email === "") {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.textContent = "Enviando... 🌾";
            button.style.backgroundColor = "#4A5D4E";

            setTimeout(() => {
                button.textContent = "Mensagem Enviada com Sucesso!";
                button.style.backgroundColor = "#2C3E2F";
                form.reset();
                
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    button.style.backgroundColor = "#8C6239";
                }, 3000);
            }, 1500);
        });
    }
}

/* ==========================================================================
   4. FERRAMENTAS INTERATIVAS (QUIZ, CALCULADORA E GALERIA ADAPTADA COM IMAGENS LOCAIS)
   ========================================================================== */
function initInteractiveTools() {
    // --- LÓGICA DO QUIZ ---
    const quizBtn = document.querySelector('#quiz button');
    if (quizBtn) {
        quizBtn.addEventListener('click', () => {
            const resposta = confirm("Pergunta do Quiz:\nA agricultura de precisão ajuda a economizar água e insumos no campo?\n\n[OK] para Sim\n[Cancelar] para Não");
            if (resposta) {
                alert("Correto! A tecnologia permite aplicar a quantidade exata necessária, evitando desperdícios. 🌱");
            } else {
                alert("Incorreto. A agricultura de precisão é uma das maiores aliadas da economia de recursos!");
            }
        });
    }

    // --- LÓGICA DA CALCULADORA DE IMPACTO ---
    const calcBtn = document.querySelector('#calculadora button');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const irrigacaoInteligente = confirm("Sua propriedade utiliza sensores de irrigação inteligente?\n\n[OK] para Sim\n[Cancelar] para Não");
            if (irrigacaoInteligente) {
                alert("Parabéns! Sua pegada hídrica é otimizada. Você economiza em média até 40% de água comparado ao método tradicional. 💧");
            } else {
                alert("Atenção: Métodos tradicionais podem gerar desperdício. Considere migrar para gotejamento ou sensores inteligentes para proteger o lençol freático.");
            }
        });
    }

    // --- LÓGICA DO MODAL DA GALERIA (ABRE IMAGENS DA PASTA ASSETS) ---
    const openImageModal = (imageSource, descriptionText) => {
        const overlay = document.createElement('div');
        
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(44, 62, 47, 0.95)',
            zIndex: '2000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0',
            transition: 'opacity 0.4s ease'
        });

        overlay.innerHTML = `
            <div style="text-align: center; color: #FAF8F5; max-width: 80%; font-family: 'Montserrat', sans-serif;">
                <img src="${imageSource}" alt="${descriptionText}" class="modal-image-view">
                <h3>${descriptionText}</h3>
                <p style="font-family: 'Open Sans', sans-serif; margin: 10px 0 20px 0; opacity: 0.8;">Inovação aplicada diretamente nos ecossistemas agrícolas produtivos.</p>
                <button id="close-overlay" style="background-color: #8C6239; padding: 12px 30px;">Fechar Visualização</button>
            </div>
        `;

        document.body.appendChild(overlay);
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);

        overlay.querySelector('#close-overlay').addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 400);
        });
    };

    // Abre ao clicar no botão geral da galeria
    const mainGalleryBtn = document.querySelector('#open-gallery-btn');
    if (mainGalleryBtn) {
        mainGalleryBtn.addEventListener('click', () => {
            openImageModal('assets/galeria_sustentavel.jpg', 'Produção e Conservação Integrada');
        });
    }

    // Abre ao clicar diretamente na miniatura
    const thumbImg = document.querySelector('.thumb-trigger');
    if (thumbImg) {
        thumbImg.addEventListener('click', () => {
            const largeImageSrc = thumbImg.getAttribute('data-full');
            const imgAltText = thumbImg.getAttribute('alt');
            openImageModal(largeImageSrc, imgAltText);
        });
    }
}

