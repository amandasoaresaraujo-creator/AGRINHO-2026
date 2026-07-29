/* ==========================================================================
   AGROSUSTENTÁVEL - INTELIGÊNCIA E ANIMAÇÕES DA PÁGINA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar todas as funções de animação e interatividade
    initScrollAnimations();
    initHeroParallax();
    initFormValidation();
    initInteractiveTools();
});

/* ==========================================================================
   1. ANIMAÇÕES AO ROLAR A PÁGINA (SCROLL REVEAL EFFECT)
   ========================================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.card, .challenge-box, .feature-item, .introduction, .solutions-container article, .tool-box'
    );

    // Configura o estilo inicial via JS para não poluir o CSS
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

    // Executa uma vez ao carregar e depois no scroll
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
}

/* ==========================================================================
   2. EFEITO PARALLAX SUAVE NO BANNER PRINCIPAL
   ========================================================================== */
function initHeroParallax() {
    const hero = document.querySelector('.hero-banner');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            // Desloca sutilmente o fundo do banner criando profundidade
            hero.style.backgroundPositionY = `${scrollValue * 0.4}px`;
        });
    }
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

            // Animação de envio bem-sucedido
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.textContent = "Enviando... 🌾";
            button.style.backgroundColor = "#4A5D4E";

            setTimeout(() => {
                button.textContent = "Mensagem Enviada com Sucesso!";
                button.style.backgroundColor = "#2C3E2F";
                form.reset();
                
                // Reseta o botão após 3 segundos
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
   4. FERRAMENTAS INTERATIVAS (QUIZ, CALCULADORA E GALERIA)
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
            const irrigacao Inteligente = confirm("Sua propriedade utiliza sensores de irrigação inteligente?\n\n[OK] para Sim\n[Cancelar] para Não");
            
            if (irrigacaoInteligente) {
                alert("Parabéns! Sua pegada hídrica é otimizada. Você economiza em média até 40% de água comparado ao método tradicional. 💧");
            } else {
                alert("Atenção: Métodos tradicionais podem gerar desperdício. Considere migrar para gotejamento ou sensores inteligentes para proteger o lençol freático.");
            }
        });
    }

    // --- LÓGICA DA GALERIA OVERLAY ---
    const galeriaBtn = document.querySelector('#galeria button');
    if (galeriaBtn) {
        galeriaBtn.addEventListener('click', () => {
            // Criando o elemento Overlay dinamicamente
            const overlay = document.createElement('div');
            
            // Estilização do Overlay diretamente via JS para manter o CSS limpo
            Object.assign(overlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(44, 62, 47, 0.95)', // Verde escuro com transparência
                zIndex: '2000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: '0',
                transition: 'opacity 0.4s ease'
            });

            // Conteúdo do Modal (Imagem conceitual e botão de fechar)
            overlay.innerHTML = `
                <div style="text-align: center; color: #FAF8F5; max-width: 80%; font-family: 'Montserrat', sans-serif;">
                    <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&q=80&w=800" 
                         alt="Tecnologia no Campo" 
                         style="max-width: 100%; max-height: 60vh; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-bottom: 20px;">
                    <h3>Tecnologia e Natureza em Harmonia</h3>
                    <p style="font-family: 'Open Sans', sans-serif; margin: 10px 0 20px 0; opacity: 0.8;">Lavoura monitorada por sistemas inteligentes de conservação ambiental.</p>
                    <button id="close-overlay" style="background-color: #8C6239; padding: 12px 30px;">Fechar Galeria</button>
                </div>
            `;

            document.body.appendChild(overlay);

            // Transição de entrada (Fade-in)
            setTimeout(() => { overlay.style.opacity = '1'; }, 10);

            // Evento para fechar
            overlay.querySelector('#close-overlay').addEventListener('click', () => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 400);
            });
        });
    }
}
