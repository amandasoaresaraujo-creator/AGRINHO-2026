// Aguarda o carregamento total do DOM para garantir que os elementos do HTML já existem
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript do projeto Agrinho 2026 carregado com sucesso!");

    // ==========================================
    // 1. Inicialização de Funções
    // ==========================================
    configurarMenuMobile();
    configurarValidacaoFormulario();
    configurarAnimacoesScroll();
});

/**
 * Função para controlar o menu responsivo (se houver)
 */
function configurarMenuMobile() {
    const botaoMenu = document.querySelector(".btn-menu");
    const menuNav = document.querySelector(".nav-links");

    if (botaoMenu && menuNav) {
        botaoMenu.addEventListener("click", () => {
            menuNav.classList.toggle("ativo");
            botaoMenu.classList.toggle("aberto");
        });
    }
}

/**
 * Função para validar o formulário de contato ou inscrição
 */
function configurarValidacaoFormulario() {
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            // Captura os campos que deseja validar
            const campoNome = document.querySelector("#nome");
            const campoEmail = document.querySelector("#email");
            let formularioValido = true;

            // Validação simples do nome
            if (campoNome && campoNome.value.trim() === "") {
                alert("Por favor, preencha o campo Nome.");
                formularioValido = false;
            }

            // Validação simples do e-mail
            if (campoEmail && !campoEmail.value.includes("@")) {
                alert("Por favor, insira um e-mail válido.");
                formularioValido = false;
            }

            // Impede o envio do formulário se houver erros
            if (!formularioValido) {
                evento.preventDefault();
            } else {
                alert("Formulário enviado com sucesso! Obrigado por participar do Agrinho 2026.");
            }
        });
    }
}

/**
 * Função para criar animações simples ao rolar a página (Scroll)
 */
function configurarAnimacoesScroll() {
    const elementosAnimados = document.querySelectorAll(".animar-scroll");

    if (elementosAnimados.length > 0) {
        const checarScroll = () => {
            elementosAnimados.forEach((elemento) => {
                const elementoTopo = elemento.getBoundingClientRect().top;
                const alturaJanela = window.innerHeight * 0.85; // Dispara a animação um pouco antes do elemento chegar ao meio da tela

                if (elementoTopo < alturaJanela) {
                    elemento.classList.add("visivel");
                }
            });
        };

        // Executa uma vez ao carregar e depois a cada rolagem de página
        checarScroll();
        window.addEventListener("scroll", checarScroll);
    }
}
