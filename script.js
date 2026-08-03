AMANDA CAROLINE SOARES DE ARAUJO <amanda.soares.araujo@escola.pr.gov.br>
	
qua., 29 de jul., 12:02 (há 5 dias)
	
	
para amandasoares9595
/* ==========================================================================
   AGROSUSTENTÁVEL - INTELIGÊNCIA E ANIMAÇÕES DA PÁGINA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
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
   2. VALIDAÇÃO E ANIMAÇÃO DO FORMULÁRIO DE CONTATO
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
   3. FERRAMENTAS INTERATIVAS (QUIZ, CALCULADORA INTEGRADOS E GALERIA LOCAL)
   ========================================================================== */
function initInteractiveTools() {
   
    // --- LÓGICA DO QUIZ DINÂMICO ---
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.getElementById('quiz-container');

    if (startQuizBtn && quizContainer) {
        startQuizBtn.addEventListener('click', () => {
            startQuizBtn.style.display = 'none';
            quizContainer.innerHTML = `
                <div class="interactive-component">
                    <p style="font-size: 14px; margin-bottom: 10px; font-weight: 600;">Qual das seguintes opções é uma prática de agricultura regenerativa?</p>
                    <label class="quiz-option"><input type="radio" name="quiz-q" value="incorrect1"> Uso intensivo de defensivos químicos</label>
                    <label class="quiz-option"><input type="radio" name="quiz-q" value="correct"> Rotação de culturas e plantio direto</label>
                    <label class="quiz-option"><input type="radio" name="quiz-q" value="incorrect2"> Desmatamento planejado</label>
                    <button type="button" id="submit-quiz-btn" style="margin-top: 10px; padding: 6px 15px;">Responder</button>
                    <div id="quiz-result" class="result-box"></div>
                </div>
            `;

            document.getElementById('submit-quiz-btn').addEventListener('click', () => {
                const selected = document.querySelector('input[name="quiz-q"]:checked');
                const resultDiv = document.getElementById('quiz-result');
                if (!selected) {
                    resultDiv.textContent = "Por favor, selecione uma resposta.";
                    return;
                }
                if (selected.value === 'correct') {
                    resultDiv.innerHTML = "Correto! 🌱 A rotação de culturas restaura os nutrientes do solo naturalmente.";
                    resultDiv.style.color = "#4A5D4E";
                } else {
                    resultDiv.innerHTML = "Incorreto. Tente novamente! Práticas sustentáveis recuperam a terra.";
                    resultDiv.style.color = "#8C6239";
                }
            });
        });
    }

    // --- LÓGICA DA CALCULADORA DE IMPACTO DINÂMICA ---
    const startCalcBtn = document.getElementById('start-calc-btn');
    const calcContainer = document.getElementById('calc-container');

    if (startCalcBtn && calcContainer) {
        startCalcBtn.addEventListener('click', () => {
            startCalcBtn.style.display = 'none';
            calcContainer.innerHTML = `
                <div class="interactive-component">
                    <div style="margin-bottom: 10px;">
                        <label for="calc-agua">Manejo de Irrigação:</label>
                        <select id="calc-agua">
                            <option value="tradicional">Tradicional (Por Aspersão Comum)</option>
                            <option value="inteligente">Inteligente (Sensores / Gotejamento)</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <label for="calc-energia">Matriz de Energia utilizada:</label>
                        <select id="calc-energia">
                            <option value="rede">Rede Elétrica Comum / Diesel</option>
                            <option value="limpa">Solar / Biomassa / Renovável</option>
                        </select>
                    </div>
                    <button type="button" id="submit-calc-btn" style="padding: 6px 15px;">Analisar Impacto</button>
                    <div id="calc-result" class="result-box" style="margin-top: 15px; font-weight: normal; color: #2C3E2F;"></div>
                </div>
            `;

            document.getElementById('submit-calc-btn').addEventListener('click', () => {
                const agua = document.getElementById('calc-agua').value;
                const energia = document.getElementById('calc-energia').value;
                const resultDiv = document.getElementById('calc-result');

                let mensagemAgua = agua === 'inteligente'
                    ? "✓ Seu manejo hídrico economiza até 40% de água. Excelente!"
                    : "✗ O sistema tradicional consome excessivamente. Considere sensores.";
               
                let mensagemEnergia = energia === 'limpa'
                    ? "✓ Sua pegada de carbono é reduzida devido ao uso de energias renováveis."
                    : "✗ Alto impacto em emissões de carbono. A transição solar seria vantajosa.";

                resultDiv.innerHTML = `<p>${mensagemAgua}</p><p style="margin-top: 5px;">${mensagemEnergia}</p>`;
            });
        });
    }

    // --- LÓGICA DO MODAL DA GALERIA ---
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

    const mainGalleryBtn = document.querySelector('#open-gallery-btn');
    if (mainGalleryBtn) {
        mainGalleryBtn.addEventListener('click', () => {
            openImageModal('assets/galeria_sustentavel.jpg', 'Produção e Conservação Integrada');
        });
    }

    const thumbImg = document.querySelector('.thumb-trigger');
    if (thumbImg) {
        thumbImg.addEventListener('click', () => {
            const largeImageSrc = thumbImg.getAttribute('data-full');
            const imgAltText = thumbImg.getAttribute('alt');
            openImageModal(largeImageSrc, imgAltText);
        });
    }
}
