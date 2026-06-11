/* ============================================================
   script.js — Plantio Consciente
   Lógica do quiz: navegação entre perguntas, validação,
   pontuação e exibição de resultado.
   Sem frameworks ou bibliotecas externas.
============================================================ */

// ============================================================
// 1. GABARITO
//    Chave: nome do campo (name="qN"), Valor: alternativa certa
// ============================================================
const GABARITO = {
  q1: 'b',  // agricultura orgânica evita agrotóxicos
  q2: 'c',  // curvas de nível + cobertura morta
  q3: 'b',  // compostagem = decomposição em adubo
  q4: 'b',  // rotação alterna culturas
  q5: 'b',  // abelhas = polinização
  q6: 'b',  // agroflorestas = integração árvores/cultivos
};

// Textos descritivos de cada pergunta (para o resumo no resultado)
const PERGUNTAS_LABELS = [
  'Agricultura orgânica',
  'Conservação de água e solo',
  'O que é compostagem',
  'Rotação de culturas',
  'Papel das abelhas',
  'Sistemas agroflorestais',
];

// Total de perguntas
const TOTAL = Object.keys(GABARITO).length;

// ============================================================
// 2. ESTADO DO QUIZ
// ============================================================
let currentIndex = 0;  // índice da pergunta atual (0 a TOTAL-1)

// ============================================================
// 3. REFERÊNCIAS AOS ELEMENTOS DO DOM
// ============================================================
const form          = document.getElementById('quizForm');
const cards         = document.querySelectorAll('.question-card');
const btnPrev       = document.getElementById('btnPrev');
const btnNext       = document.getElementById('btnNext');
const btnSubmit     = document.getElementById('btnSubmit');
const validationMsg = document.getElementById('validationMsg');
const progressFill  = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const resultPanel   = document.getElementById('resultPanel');
const resultIcon    = document.getElementById('resultIcon');
const resultTitle   = document.getElementById('resultTitle');
const resultScore   = document.getElementById('resultScore');
const resultMessage = document.getElementById('resultMessage');
const resultList    = document.getElementById('resultList');
const btnRestart    = document.getElementById('btnRestart');

// ============================================================
// 4. FUNÇÕES AUXILIARES
// ============================================================

/**
 * Retorna o valor selecionado para um campo de rádio,
 * ou null se nenhum estiver selecionado.
 * @param {string} fieldName - o atributo name do radio group
 */
function getRadioValue(fieldName) {
  const selected = form.querySelector(`input[name="${fieldName}"]:checked`);
  return selected ? selected.value : null;
}

/**
 * Atualiza a barra de progresso e o rótulo textual.
 * Progresso = perguntas visitadas + 1 / total
 */
function updateProgress() {
  const pct = ((currentIndex + 1) / TOTAL) * 100;
  progressFill.style.width = pct + '%';
  progressLabel.textContent = `Pergunta ${currentIndex + 1} de ${TOTAL}`;
}

/**
 * Exibe o cartão da pergunta correspondente ao índice atual
 * e atualiza os botões de navegação.
 */
function showCard(index) {
  // Oculta todos os cartões
  cards.forEach(c => c.classList.remove('active'));

  // Exibe o cartão correto
  cards[index].classList.add('active');

  // Gerencia visibilidade dos botões
  btnPrev.disabled = (index === 0);

  if (index < TOTAL - 1) {
    // Não é a última: mostra "Próxima", oculta "Enviar"
    btnNext.style.display = '';
    btnSubmit.style.display = 'none';
  } else {
    // Última pergunta: oculta "Próxima", mostra "Enviar"
    btnNext.style.display = 'none';
    btnSubmit.style.display = '';
  }

  // Limpa mensagem de erro ao trocar de pergunta
  validationMsg.textContent = '';

  updateProgress();
}

// ============================================================
// 5. NAVEGAÇÃO — BOTÃO "PRÓXIMA"
// ============================================================
btnNext.addEventListener('click', function () {
  const fieldName = `q${currentIndex + 1}`;
  const valor = getRadioValue(fieldName);

  // Valida se o usuário selecionou uma opção
  if (!valor) {
    validationMsg.textContent = '⚠️ Por favor, selecione uma resposta antes de continuar.';
    return;
  }

  // Avança para a próxima pergunta
  currentIndex++;
  showCard(currentIndex);
});

// ============================================================
// 6. NAVEGAÇÃO — BOTÃO "ANTERIOR"
// ============================================================
btnPrev.addEventListener('click', function () {
  if (currentIndex > 0) {
    currentIndex--;
    showCard(currentIndex);
  }
});

// ============================================================
// 7. ENVIO DO FORMULÁRIO — CÁLCULO DO RESULTADO
// ============================================================
form.addEventListener('submit', function (event) {
  // Evita o recarregamento padrão da página
  event.preventDefault();

  // Valida a última pergunta antes de enviar
  const lastField = `q${TOTAL}`;
  if (!getRadioValue(lastField)) {
    validationMsg.textContent = '⚠️ Por favor, selecione uma resposta antes de continuar.';
    return;
  }

  // --- Corrige as respostas ---
  let acertos = 0;
  const detalhes = []; // array de objetos { label, acertou }

  Object.entries(GABARITO).forEach(([campo, correto], i) => {
    const resposta = getRadioValue(campo);
    const acertou  = (resposta === correto);
    if (acertou) acertos++;
    detalhes.push({ label: PERGUNTAS_LABELS[i], acertou });
  });

  // --- Exibe o resultado ---
  mostrarResultado(acertos, detalhes);
});

// ============================================================
// 8. EXIBIÇÃO DO RESULTADO
// ============================================================
/**
 * Oculta o formulário, preenche e exibe o painel de resultado.
 * @param {number} acertos  - quantidade de respostas corretas
 * @param {Array}  detalhes - array com { label, acertou }
 */
function mostrarResultado(acertos, detalhes) {
  // Oculta o formulário
  form.style.display = 'none';

  // Define ícone, título e mensagem de acordo com a pontuação
  let icone, titulo, mensagem;
  const pct = acertos / TOTAL;

  if (pct === 1) {
    icone    = '🌳';
    titulo   = 'Plantador(a) Mestre!';
    mensagem = 'Parabéns! Você acertou tudo. Seu conhecimento sobre sustentabilidade e agricultura é excelente. Continue espalhando esse saber!';
  } else if (pct >= 0.67) {
    icone    = '🌿';
    titulo   = 'Brotando com força!';
    mensagem = 'Muito bem! Você tem um ótimo conhecimento sobre o tema. Revise os pontos que escaparam e continue aprendendo.';
  } else if (pct >= 0.33) {
    icone    = '🌱';
    titulo   = 'Semente em crescimento!';
    mensagem = 'Você está no caminho certo! Ainda há espaço para crescer. Que tal pesquisar mais sobre os tópicos que ficaram para trás?';
  } else {
    icone    = '🪴';
    titulo   = 'Hora de plantar mais conhecimento!';
    mensagem = 'Não desanime! Todo grande agricultor começa do solo. Explore o tema e tente novamente.';
  }

  resultIcon.textContent    = icone;
  resultTitle.textContent   = titulo;
  resultScore.textContent   = `Você acertou ${acertos} de ${TOTAL} perguntas.`;
  resultMessage.textContent = mensagem;

  // Monta a lista de acertos/erros por pergunta
  resultList.innerHTML = '';
  detalhes.forEach(({ label, acertou }) => {
    const li      = document.createElement('li');
    li.className  = acertou ? 'acerto' : 'erro';

    const badge   = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = acertou ? '✅' : '❌';

    const texto   = document.createTextNode(label);

    li.appendChild(badge);
    li.appendChild(texto);
    resultList.appendChild(li);
  });

  // Exibe o painel de resultado
  resultPanel.hidden = false;

  // Rola suavemente até o resultado
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Atualiza a barra de progresso para 100%
  progressFill.style.width = '100%';
  progressLabel.textContent = `Concluído! ${acertos}/${TOTAL}`;
}

// ============================================================
// 9. REINICIAR O QUIZ
// ============================================================
btnRestart.addEventListener('click', function () {
  // Reseta o estado
  currentIndex = 0;

  // Desmarca todos os rádios
  form.querySelectorAll('input[type="radio"]').forEach(r => {
    r.checked = false;
  });

  // Remove estilos de resultado das opções (se houver)
  form.querySelectorAll('.option-box').forEach(box => {
    box.classList.remove('correct', 'wrong');
  });

  // Oculta resultado e exibe formulário
  resultPanel.hidden = true;
  form.style.display = '';

  // Volta para a primeira pergunta
  showCard(0);

  // Rola ao topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 10. INICIALIZAÇÃO
//     Exibe a primeira pergunta ao carregar a página
// ============================================================
showCard(0);
