# 🌱 Plantio Consciente

> Quiz interativo sobre sustentabilidade e agricultura consciente.

---

## 📋 Sobre o projeto

**Plantio Consciente** é um site de quiz educativo que testa e amplia o conhecimento do usuário sobre temas como agricultura orgânica, conservação do solo, compostagem, rotação de culturas, polinização e sistemas agroflorestais.

O projeto foi desenvolvido com HTML, CSS e JavaScript puros — sem frameworks ou bibliotecas externas — e funciona em qualquer navegador moderno.

---

## 🗂️ Estrutura de arquivos

```
plantio-consciente/
├── index.html   # Estrutura e conteúdo do quiz
├── style.css    # Estilização e responsividade
└── script.js    # Lógica de navegação, validação e pontuação
```

---

## ✨ Funcionalidades

- **6 perguntas** de múltipla escolha sobre sustentabilidade e agricultura
- **Navegação passo a passo** — uma pergunta por vez, com botões Anterior / Próxima
- **Barra de progresso** animada que acompanha o avanço no quiz
- **Validação** — impede avançar sem selecionar uma resposta
- **Resultado detalhado** com pontuação, feedback personalizado (4 níveis) e resumo de acertos/erros por tema
- **Botão de reinício** para tentar novamente
- **Design responsivo** — funciona em desktop e celular
- **Acessível** — uso semântico de `<fieldset>` / `<legend>`, `aria-live`, foco visível por teclado e respeito a `prefers-reduced-motion`

---

## 🎨 Design

| Elemento        | Valor                          |
|-----------------|--------------------------------|
| Verde-folha     | `#3A7D44`                      |
| Verde médio     | `#5CA86A`                      |
| Terra / madeira | `#8B5E3C`                      |
| Âmbar / dourado | `#D4A843`                      |
| Areia           | `#F0E6D3`                      |
| Fonte títulos   | Playfair Display (serif)       |
| Fonte corpo     | Inter (sans-serif)             |

---

## 🚀 Como usar

1. Baixe ou clone os três arquivos (`index.html`, `style.css`, `script.js`) na mesma pasta.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).
3. Nenhuma instalação, servidor ou conexão à internet é necessária (exceto para carregar as fontes do Google Fonts).

```bash
# Exemplo com servidor local simples (opcional)
npx serve .
# ou
python -m http.server 8000
```

---

## 📚 Temas abordados

| # | Tema |
|---|------|
| 1 | O que é agricultura orgânica |
| 2 | Conservação de água e solo (curvas de nível, mulching) |
| 3 | Compostagem |
| 4 | Rotação de culturas |
| 5 | Papel das abelhas na polinização |
| 6 | Sistemas agroflorestais |

---

## 🏆 Sistema de pontuação

| Acertos | Nível              | Mensagem                          |
|---------|--------------------|-----------------------------------|
| 6 / 6   | 🌳 Plantador Mestre | Conhecimento excelente!           |
| 4–5 / 6 | 🌿 Brotando forte  | Ótimo desempenho, revise o resto  |
| 2–3 / 6 | 🌱 Semente crescendo | No caminho certo, continue!     |
| 0–1 / 6 | 🪴 Hora de aprender | Explore o tema e tente de novo   |

---

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3** (variáveis, Grid, Flexbox, animações, media queries)
- **JavaScript** ES6+ (sem dependências)
- **Google Fonts** — Playfair Display + Inter

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais.# plantio-consciente
