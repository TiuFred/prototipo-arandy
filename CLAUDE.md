# Arandu — Instituto Ponte · Convenções do projeto

Plataforma web de **aplicação, correção e análise de provas**, com foco no professor.
Abrange **apenas Matemática e Português**.

Personas: **Sophia Sant'ana** (professora), **Mariana Oliveira** (aluna), **Lucca Freitas** (coordenador pedagógico).

---

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `Arandu Hi-Fi.html` | Arquivo principal — design canvas com todas as telas (abrir com show_to_user). |
| `Prototipo Arandu.html` | Protótipo **clicável** (uma tela por vez, navegação por hotspots). |
| `app.jsx` | Composição do design canvas (artboards). |
| `prototype-app.jsx` | Lógica do protótipo clicável (array `FLOW` + hotspots). |
| `styles.css` | Design tokens (variáveis `--ip-*`) e classes de componentes. |
| `icons.jsx` | Biblioteca de ícones Feather/Lucide (`Icon.Mail`, `Icon.Lock`, etc.). |
| `components.jsx` | Sidebar, Topbar (SEM sino), BrandLockup, StatusBadge… |
| `screens-professor-a.jsx` | Login, Minhas Provas, Criar Prova. |
| `screens-professor-b.jsx` | Nova Questão Discursiva, Correção Macro/Micro. |
| `screens-professor-c.jsx` | Dashboard, Minhas Turmas, Questões, Banco, Perfil. |
| `screens-aluno.jsx` | Aviso, Questão Objetiva, Prova Enviada, Questão Discursiva, Confirmar envio. |
| `screens-coordenador.jsx` | Métricas Gerais, Relatório. |
| `assets/arandu-logo.png` | Logo oficial (pill cinza #EFEFEF). |
| `design-canvas.jsx` | Starter component — **NÃO mexer**. |
| `refs/` | Wireframes originais do WAD. |

> Os `.jsx` são carregados via `<script type="text/babel" src>` e compilados no navegador.
> **Para rodar:** servir por HTTP (`python3 -m http.server 8000`) — duplo-clique em `file://` quebra o fetch dos `.jsx`.

---

## Sistema visual

- **Cores** (variáveis `--ip-*` em `styles.css`):
  - Azul Profundo `#6B6FA2` (estrutura)
  - Amarelo Ouro `#F9B233` (CTAs)
  - Auxiliares: verde, laranja, vermelho, info-azul.
- **Tipografia:** Poppins (títulos) + Inter (corpo).
- **Ícones:** Feather/Lucide 24px, traçados, todos em `icons.jsx`. Use SEMPRE `Icon.*` — não invente ícones novos sem adicioná-los ao `icons.jsx`.
- **Logo:** imagem em `assets/arandu-logo.png`, sempre dentro de uma pill cinza `#EFEFEF`, com "Instituto Ponte" em caps abaixo. **NUNCA** o "P amarelo" antigo nem texto "Arandu".
- **Todos os artboards são 1440×1024.**
- **Nome do usuário:** "Sophia Sant'ana" (sem "Profª.") — iniciais derivadas automaticamente.

---

## Estrutura do canvas

**Professor:** 01 Login · 02 Minhas Provas · 03 Criar Prova · 04 Nova Questão Discursiva · 05 Correção Macro · 06 Correção Micro (modal)
**Aluno:** 07 Aviso · 08 Questão Objetiva · 09 Prova Enviada
**Coordenador:** 10 Métricas Gerais · 11 Relatório de Desempenho
**Prof. extras:** 12 Dashboard · 13 Minhas Turmas · 14 Minhas Questões · 15 Banco de Questões · 16 Perfil
**Aluno extras:** 17 Questão Discursiva (botão "Anexar via QR Code")
**Aluno complementares:** 18 Aviso (estado inicial, checkbox vazio) · 19–22 Questão Objetiva (alternativas A/C/D/E selecionadas) · 23 Confirmar envio (modal)

> Manter a numeração existente. Telas novas vão em uma nova seção **no final** do canvas.

---

## Regras de conteúdo (importantes)

- **Sem dados sintéticos:** nada de "+12% vs período anterior", "12min economizados", "98% uptime". Só números que a plataforma realmente conseguirá calcular.
- **Sem funcionalidades não implementadas:** ajuda/suporte, atalhos redundantes, exportações fictícias, preferências inexistentes.
- **Sem ícone de notificações (sino)** em lugar algum. Não existe tela de notificações no produto.
- **Sidebar do professor NÃO tem item "Configurações".** O acesso ao Perfil (tela 16) é feito clicando no avatar+nome no canto superior direito do Topbar.

---

## Convenções de código

- Componentes de tela exportados para `window` via `Object.assign(window, { ... })` no fim de cada `screens-*.jsx`.
- Telas com variações usam **props com default que preserva a tela original**:
  - `ScreenAvisoProva({ checked = true })` → tela 18 usa `checked={false}`.
  - `ScreenQuestaoObjetiva({ selected = 'B' })` → telas 19–22 usam `selected="A|C|D|E"`.
- Ao adicionar/refinar navegação no protótipo: editar a array `FLOW` em `prototype-app.jsx`. Cada hotspot é `{ text?: 'rótulo do botão', selector?: '.classe', target: 'id-da-tela' }`.
- **Spacing:** preferir flex/grid com `gap`.
- Após editar, verificar carregando `Arandu Hi-Fi.html` (sem erros de console).
