/* global React, ReactDOM, Icon,
          ScreenLogin, ScreenMinhasProvas, ScreenCriarProva,
          ScreenNovaQuestao, ScreenCorrecaoMacro, ScreenCorrecaoMicro,
          ScreenAvisoProva, ScreenQuestaoObjetiva, ScreenProvaEnviada,
          ScreenQuestaoDiscursiva, ScreenConfirmarEnvio,
          ScreenCoordProvas, ScreenCoordProfessores, ScreenCoordRelatorio,
          ScreenCoordParticipacao, ScreenCoordSubmissoes, ScreenCoordSubmissao, ScreenCoordIndicadores, ScreenCoordSelecaoProvas,
          ScreenDashboard, ScreenMinhasTurmas, ScreenCriarTurma, ScreenQuestoes,
          ScreenBancoQuestoes, ScreenConfiguracoes,
          ScreenProvaVisaoGeral, ScreenProfParticipacao, ScreenProfSubmissoes, ScreenProfSubmissao, ScreenProfIndicadores,
          ScreenProfRelatorio, ScreenPublicarProva, ScreenNovaQuestaoObjetiva, ScreenQRCodeProf,
          ScreenAnotacoes, ScreenAcessoLink, ScreenResultadoAluno, ScreenQRCodeAluno */

// ─── Hotspots compartilhados ──────────────────────────────────
// Sidebar do professor está presente em quase toda tela do prof.
const PROF_SIDEBAR_HOTSPOTS = [
  { text: 'Dashboard',         target: 'prof-dashboard',  area: 'sidebar' },
  { text: 'Minhas Turmas',     target: 'prof-turmas',     area: 'sidebar' },
  { text: 'Minhas Provas',     target: 'prof-provas',     area: 'sidebar' },
  { text: 'Banco de Questões', target: 'prof-banco',      area: 'sidebar' },
  { text: 'Questões',          target: 'prof-questoes',   area: 'sidebar' },
];
// Avatar do topbar -> Perfil
const PROF_AVATAR_HOTSPOT = [
  { selector: '.ip-topbar .ip-user', target: 'prof-config', label: 'Perfil' },
];

const withProfChrome = (hotspots) => [
  ...hotspots,
  ...PROF_AVATAR_HOTSPOT,
  ...PROF_SIDEBAR_HOTSPOTS,
];

// Sidebar do coordenador (Provas · Professores · Relatórios)
const COORD_SIDEBAR_HOTSPOTS = [
  { text: 'Provas',      target: 'coord-provas',      area: 'sidebar' },
  { text: 'Professores', target: 'coord-professores', area: 'sidebar' },
  { text: 'Relatórios',  target: 'coord-relatorio',   area: 'sidebar' },
];
const withCoordChrome = (hotspots) => [
  ...hotspots,
  ...COORD_SIDEBAR_HOTSPOTS,
];

// Abas + ações do detalhe de uma prova (telas 32-37)
const profExam = (self, extra = []) => withProfChrome([
  ...[
    { text: 'Visão geral',               target: 'prof-prova-visao' },
    { text: 'Participação',              target: 'prof-prova-participacao' },
    { text: 'Submissões',                target: 'prof-prova-submissoes' },
    { text: 'Indicadores por questão',   target: 'prof-prova-indicadores' },
  ].filter(t => t.target !== self),
  { text: 'Gerar relatório', target: 'prof-relatorio' },
  { text: 'Corrigir',        target: 'prof-corr-macro' },
  ...extra,
]);

// ─── Definição do fluxo ───────────────────────────────────────
// Cada tela: { id, component, props?, label, persona, hotspots: [{ text? | selector?, target, label? }] }
// Ordem importa para o navegador "Próxima/Anterior" do chrome.
const FLOW = [
  // ─────── Professor ────────────────────────────
  { id: 'prof-login', label: '01 · Login', persona: 'professor',
    component: 'ScreenLogin',
    hotspots: [
      { text: 'Entrar na plataforma', target: 'prof-provas' },
      { text: 'Para candidatos', target: 'aluno-acesso', label: 'Acesso do aluno' },
    ],
  },
  { id: 'prof-provas', label: '02 · Minhas Provas', persona: 'professor',
    component: 'ScreenMinhasProvas',
    hotspots: withProfChrome([
      { text: 'Nova Prova',  target: 'prof-criar' },
      { text: 'Corrigir',    target: 'prof-corr-macro' },
      { text: 'Visualizar',  target: 'prof-prova-visao' },
      { text: 'Editar',      target: 'prof-criar' },
    ]),
  },
  { id: 'prof-criar', label: '03 · Criar Prova', persona: 'professor',
    component: 'ScreenCriarProva',
    hotspots: withProfChrome([
      { text: 'Continuar',         target: 'prof-nova-questao' },
      { text: 'Adicionar questão', target: 'prof-nova-objetiva' },
      { text: 'Publicar prova',    target: 'prof-publicar' },
      { text: 'Salvar rascunho',   target: 'prof-provas' },
      { text: 'Voltar',            target: 'prof-provas' },
    ]),
  },
  { id: 'prof-nova-questao', label: '04 · Nova Questão Discursiva', persona: 'professor',
    component: 'ScreenNovaQuestao',
    hotspots: withProfChrome([
      { text: 'Salvar',    target: 'prof-criar' },
      { text: 'Cancelar',  target: 'prof-criar' },
      { text: 'Adicionar', target: 'prof-criar' },
    ]),
  },
  { id: 'prof-corr-macro', label: '05 · Correção Macro', persona: 'professor',
    component: 'ScreenCorrecaoMacro',
    hotspots: withProfChrome([
      // Clique em um card de resposta abre o micro
      { selector: '.ip-resposta-card', target: 'prof-corr-micro', label: 'Abrir resposta' },
      { text: 'Voltar à prova',  target: 'prof-provas' },
      { text: 'Concluir questão', target: 'prof-provas' },
    ]),
  },
  { id: 'prof-corr-micro', label: '06 · Correção Micro (modal)', persona: 'professor',
    component: 'ScreenCorrecaoMicro',
    hotspots: [
      { selector: '.ip-btn--icon', target: 'prof-corr-macro', label: 'Fechar' },
      { text: 'Concluir e próximo', target: 'prof-corr-macro' },
      { text: 'Pular por enquanto', target: 'prof-corr-macro' },
    ],
  },
  // Professor · extras (acessadas via sidebar)
  { id: 'prof-dashboard', label: '12 · Dashboard', persona: 'professor',
    component: 'ScreenDashboard',
    hotspots: withProfChrome([
      { text: 'Nova prova',     target: 'prof-criar' },
      { text: 'Corrigir agora', target: 'prof-corr-macro' },
    ]),
  },
  { id: 'prof-turmas', label: '13 · Minhas Turmas', persona: 'professor',
    component: 'ScreenMinhasTurmas',
    hotspots: withProfChrome([
      { text: 'Nova turma', target: 'prof-criar-turma' },
    ]),
  },
  { id: 'prof-criar-turma', label: '25 · Criar Turma', persona: 'professor',
    component: 'ScreenCriarTurma',
    hotspots: withProfChrome([
      { text: 'Criar turma', target: 'prof-turmas' },
      { text: 'Voltar',      target: 'prof-turmas' },
    ]),
  },
  { id: 'prof-questoes', label: '14 · Minhas Questões', persona: 'professor',
    component: 'ScreenQuestoes',
    hotspots: withProfChrome([
      { text: 'Nova questão', target: 'prof-nova-objetiva' },
    ]),
  },
  { id: 'prof-banco', label: '15 · Banco de Questões', persona: 'professor',
    component: 'ScreenBancoQuestoes',
    hotspots: withProfChrome([
      { text: 'Adicionar à prova', target: 'prof-criar' },
      { text: 'Usar',              target: 'prof-criar' },
    ]),
  },
  { id: 'prof-config', label: '16 · Perfil', persona: 'professor',
    component: 'ScreenConfiguracoes',
    hotspots: withProfChrome([]),
  },

  // Professor · detalhe da prova (drill-down) + publicar + nova questão objetiva + QR
  { id: 'prof-prova-visao', label: '32 · Prova · Visão geral', persona: 'professor',
    component: 'ScreenProvaVisaoGeral',
    hotspots: profExam('prof-prova-visao', [
      { text: 'Ver QR Code', target: 'prof-qrcode' },
    ]),
  },
  { id: 'prof-prova-participacao', label: '33 · Prova · Participação', persona: 'professor',
    component: 'ScreenProfParticipacao',
    hotspots: profExam('prof-prova-participacao'),
  },
  { id: 'prof-prova-submissoes', label: '34 · Prova · Submissões', persona: 'professor',
    component: 'ScreenProfSubmissoes',
    hotspots: profExam('prof-prova-submissoes', [
      { text: 'Ver submissão', target: 'prof-prova-submissao' },
    ]),
  },
  { id: 'prof-prova-submissao', label: '35 · Submissão individual', persona: 'professor',
    component: 'ScreenProfSubmissao',
    hotspots: withProfChrome([
      { text: 'Voltar às submissões', target: 'prof-prova-submissoes' },
      { text: 'Corrigir discursivas', target: 'prof-corr-macro' },
      { text: 'Atualizar correção',   target: 'prof-corr-micro' },
    ]),
  },
  { id: 'prof-prova-indicadores', label: '36 · Prova · Indicadores', persona: 'professor',
    component: 'ScreenProfIndicadores',
    hotspots: profExam('prof-prova-indicadores'),
  },
  { id: 'prof-relatorio', label: '37 · Relatório consolidado', persona: 'professor',
    component: 'ScreenProfRelatorio',
    hotspots: withProfChrome([
      { text: 'Voltar', target: 'prof-prova-visao' },
    ]),
  },
  { id: 'prof-publicar', label: '38 · Publicar prova (modal)', persona: 'professor',
    component: 'ScreenPublicarProva',
    hotspots: [
      { text: 'Ver prova publicada', target: 'prof-prova-visao' },
      { text: 'Ver QR Code',         target: 'prof-qrcode' },
      { text: 'Fechar',              target: 'prof-criar' },
    ],
  },
  { id: 'prof-nova-objetiva', label: '39 · Nova Questão Objetiva', persona: 'professor',
    component: 'ScreenNovaQuestaoObjetiva',
    hotspots: withProfChrome([
      { text: 'Salvar',            target: 'prof-criar' },
      { text: 'Cancelar',          target: 'prof-criar' },
      { text: 'Adicionar questão', target: 'prof-criar' },
    ]),
  },
  { id: 'prof-qrcode', label: '40 · QR Code de acesso (modal)', persona: 'professor',
    component: 'ScreenQRCodeProf',
    hotspots: [
      { text: 'Baixar QR',   target: 'prof-prova-visao' },
      { text: 'Copiar link', target: 'prof-prova-visao' },
      { selector: '.ip-btn--icon', target: 'prof-prova-visao', label: 'Fechar' },
    ],
  },

  // ─────── Aluno ──────────────────────────────
  { id: 'aluno-aviso-inicial', label: '18 · Aviso (estado inicial)', persona: 'aluno',
    component: 'ScreenAvisoProva', props: { checked: false },
    hotspots: [
      // Marcar o checkbox → versão "lida" (07)
      { text: 'Li e entendi', target: 'aluno-aviso', label: 'Marcar como lido' },
    ],
  },
  { id: 'aluno-aviso', label: '07 · Aviso & Instruções', persona: 'aluno',
    component: 'ScreenAvisoProva',
    hotspots: [
      { text: 'Iniciar Prova', target: 'aluno-questao' },
      { text: 'Li e entendi',  target: 'aluno-aviso-inicial', label: 'Desmarcar' },
    ],
  },
  { id: 'aluno-questao', label: '08 · Questão Objetiva (B)', persona: 'aluno',
    component: 'ScreenQuestaoObjetiva',
    hotspots: [
      { text: 'Próxima questão', target: 'aluno-discursiva' },
      { text: 'Voltar questão',  target: 'aluno-aviso' },
      { text: 'Finalizar Prova', target: 'aluno-confirmar' },
      { text: 'Fazer anotações', target: 'aluno-anotacoes' },
      // Selecionar alternativas → variações
      { selector: '.ip-radio:nth-of-type(1)', target: 'aluno-questao-a', label: 'Selecionar A' },
      { selector: '.ip-radio:nth-of-type(3)', target: 'aluno-questao-c', label: 'Selecionar C' },
      { selector: '.ip-radio:nth-of-type(4)', target: 'aluno-questao-d', label: 'Selecionar D' },
      { selector: '.ip-radio:nth-of-type(5)', target: 'aluno-questao-e', label: 'Selecionar E' },
    ],
  },
  { id: 'aluno-questao-a', label: '19 · Questão Objetiva (A)', persona: 'aluno',
    component: 'ScreenQuestaoObjetiva', props: { selected: 'A' },
    hotspots: [
      { text: 'Próxima questão', target: 'aluno-discursiva' },
      { text: 'Finalizar Prova', target: 'aluno-confirmar' },
      { text: 'Fazer anotações', target: 'aluno-anotacoes' },
      { selector: '.ip-radio:nth-of-type(2)', target: 'aluno-questao',   label: 'Selecionar B' },
      { selector: '.ip-radio:nth-of-type(3)', target: 'aluno-questao-c', label: 'Selecionar C' },
      { selector: '.ip-radio:nth-of-type(4)', target: 'aluno-questao-d', label: 'Selecionar D' },
      { selector: '.ip-radio:nth-of-type(5)', target: 'aluno-questao-e', label: 'Selecionar E' },
    ],
  },
  { id: 'aluno-questao-c', label: '20 · Questão Objetiva (C)', persona: 'aluno',
    component: 'ScreenQuestaoObjetiva', props: { selected: 'C' },
    hotspots: [
      { text: 'Próxima questão', target: 'aluno-discursiva' },
      { text: 'Finalizar Prova', target: 'aluno-confirmar' },
      { text: 'Fazer anotações', target: 'aluno-anotacoes' },
      { selector: '.ip-radio:nth-of-type(1)', target: 'aluno-questao-a', label: 'Selecionar A' },
      { selector: '.ip-radio:nth-of-type(2)', target: 'aluno-questao',   label: 'Selecionar B' },
      { selector: '.ip-radio:nth-of-type(4)', target: 'aluno-questao-d', label: 'Selecionar D' },
      { selector: '.ip-radio:nth-of-type(5)', target: 'aluno-questao-e', label: 'Selecionar E' },
    ],
  },
  { id: 'aluno-questao-d', label: '21 · Questão Objetiva (D)', persona: 'aluno',
    component: 'ScreenQuestaoObjetiva', props: { selected: 'D' },
    hotspots: [
      { text: 'Próxima questão', target: 'aluno-discursiva' },
      { text: 'Finalizar Prova', target: 'aluno-confirmar' },
      { text: 'Fazer anotações', target: 'aluno-anotacoes' },
      { selector: '.ip-radio:nth-of-type(1)', target: 'aluno-questao-a', label: 'Selecionar A' },
      { selector: '.ip-radio:nth-of-type(2)', target: 'aluno-questao',   label: 'Selecionar B' },
      { selector: '.ip-radio:nth-of-type(3)', target: 'aluno-questao-c', label: 'Selecionar C' },
      { selector: '.ip-radio:nth-of-type(5)', target: 'aluno-questao-e', label: 'Selecionar E' },
    ],
  },
  { id: 'aluno-questao-e', label: '22 · Questão Objetiva (E)', persona: 'aluno',
    component: 'ScreenQuestaoObjetiva', props: { selected: 'E' },
    hotspots: [
      { text: 'Próxima questão', target: 'aluno-discursiva' },
      { text: 'Finalizar Prova', target: 'aluno-confirmar' },
      { text: 'Fazer anotações', target: 'aluno-anotacoes' },
      { selector: '.ip-radio:nth-of-type(1)', target: 'aluno-questao-a', label: 'Selecionar A' },
      { selector: '.ip-radio:nth-of-type(2)', target: 'aluno-questao',   label: 'Selecionar B' },
      { selector: '.ip-radio:nth-of-type(3)', target: 'aluno-questao-c', label: 'Selecionar C' },
      { selector: '.ip-radio:nth-of-type(4)', target: 'aluno-questao-d', label: 'Selecionar D' },
    ],
  },
  { id: 'aluno-discursiva', label: '17 · Questão Discursiva', persona: 'aluno',
    component: 'ScreenQuestaoDiscursiva',
    hotspots: [
      { text: 'Voltar questão',  target: 'aluno-questao' },
      { text: 'Próxima questão', target: 'aluno-confirmar' },
      { text: 'Finalizar Prova', target: 'aluno-confirmar' },
      { text: 'Fazer anotações', target: 'aluno-anotacoes' },
      { text: 'Anexar via QR Code', target: 'aluno-qrcode' },
    ],
  },
  { id: 'aluno-anotacoes', label: '24 · Anotações da questão (modal)', persona: 'aluno',
    component: 'ScreenAnotacoes',
    hotspots: [
      { text: 'Voltar à prova',   target: 'aluno-questao' },
      { text: 'Salvar anotações', target: 'aluno-questao' },
    ],
  },
  { id: 'aluno-confirmar', label: '23 · Confirmar envio (modal)', persona: 'aluno',
    component: 'ScreenConfirmarEnvio',
    hotspots: [
      { text: 'Voltar à prova', target: 'aluno-discursiva' },
      { text: 'Enviar prova',   target: 'aluno-enviada' },
    ],
  },
  { id: 'aluno-enviada', label: '09 · Prova Enviada', persona: 'aluno',
    component: 'ScreenProvaEnviada',
    hotspots: [],
  },
  { id: 'aluno-acesso', label: '41 · Acesso via link', persona: 'aluno',
    component: 'ScreenAcessoLink',
    hotspots: [
      { text: 'Acessar prova', target: 'aluno-aviso' },
    ],
  },
  { id: 'aluno-resultado', label: '42 · Resultado e desempenho', persona: 'aluno',
    component: 'ScreenResultadoAluno',
    hotspots: [],
  },
  { id: 'aluno-qrcode', label: '43 · QR Code para foto (modal)', persona: 'aluno',
    component: 'ScreenQRCodeAluno',
    hotspots: [
      { text: 'Cancelar',      target: 'aluno-discursiva' },
      { text: 'Enviar daqui',  target: 'aluno-discursiva' },
      { selector: '.ip-btn--icon', target: 'aluno-discursiva', label: 'Fechar' },
    ],
  },

  // ─────── Coordenador ────────────────────────
  { id: 'coord-provas', label: '10 · Provas', persona: 'coordenador',
    component: 'ScreenCoordProvas',
    hotspots: withCoordChrome([
      { text: 'Ver',    target: 'coord-selecao' },
    ]),
  },
  { id: 'coord-selecao', label: '31 · Acompanhar provas', persona: 'coordenador',
    component: 'ScreenCoordSelecaoProvas',
    hotspots: withCoordChrome([
      { text: 'Participação', target: 'coord-participacao' },
      { text: 'Submissões',   target: 'coord-submissoes' },
      { text: 'Indicadores',  target: 'coord-indicadores' },
    ]),
  },
  { id: 'coord-professores', label: '26 · Professores', persona: 'coordenador',
    component: 'ScreenCoordProfessores',
    hotspots: withCoordChrome([]),
  },
  { id: 'coord-participacao', label: '27 · Prova · Participação', persona: 'coordenador',
    component: 'ScreenCoordParticipacao',
    hotspots: withCoordChrome([
      { text: 'Voltar',                  target: 'coord-provas' },
      { text: 'Submissões',              target: 'coord-submissoes' },
      { text: 'Indicadores por questão', target: 'coord-indicadores' },
      { text: 'Gerar relatório',         target: 'coord-relatorio' },
    ]),
  },
  { id: 'coord-submissoes', label: '28 · Prova · Submissões', persona: 'coordenador',
    component: 'ScreenCoordSubmissoes',
    hotspots: withCoordChrome([
      { text: 'Voltar',                  target: 'coord-provas' },
      { text: 'Participação',            target: 'coord-participacao' },
      { text: 'Indicadores por questão', target: 'coord-indicadores' },
      { text: 'Ver submissão',           target: 'coord-submissao' },
      { text: 'Gerar relatório',         target: 'coord-relatorio' },
    ]),
  },
  { id: 'coord-submissao', label: '29 · Submissão individual', persona: 'coordenador',
    component: 'ScreenCoordSubmissao',
    hotspots: withCoordChrome([
      { text: 'Voltar às submissões', target: 'coord-submissoes' },
    ]),
  },
  { id: 'coord-indicadores', label: '30 · Prova · Indicadores', persona: 'coordenador',
    component: 'ScreenCoordIndicadores',
    hotspots: withCoordChrome([
      { text: 'Voltar',          target: 'coord-provas' },
      { text: 'Participação',    target: 'coord-participacao' },
      { text: 'Submissões',      target: 'coord-submissoes' },
      { text: 'Gerar relatório', target: 'coord-relatorio' },
    ]),
  },
  { id: 'coord-relatorio', label: '11 · Relatório consolidado', persona: 'coordenador',
    component: 'ScreenCoordRelatorio',
    hotspots: withCoordChrome([
      { text: 'Voltar', target: 'coord-participacao' },
    ]),
  },
];

const PERSONA_COLOR = {
  professor:   { bg: 'var(--ip-azul)',    fg: '#fff', label: 'Professor' },
  aluno:       { bg: 'var(--ip-amarelo)', fg: '#2A1F00', label: 'Aluno' },
  coordenador: { bg: 'var(--ip-verde)',   fg: '#fff', label: 'Coordenador' },
};

// ─── Helpers ───────────────────────────────────────────────────
const findHotspot = (eventTarget, rootEl, hotspots) => {
  for (const h of hotspots) {
    // Selector match
    if (h.selector) {
      const hit = eventTarget.closest(h.selector);
      if (hit && rootEl.contains(hit)) return { hit, h };
    }
    // Text match — sobe a árvore até encontrar um clicável (button, label, a, [role=button])
    if (h.text) {
      let el = eventTarget;
      const needle = h.text.toLowerCase();
      while (el && el !== rootEl) {
        const tag = el.tagName;
        const isClickable = tag === 'BUTTON' || tag === 'A' || tag === 'LABEL' ||
                            el.getAttribute && el.getAttribute('role') === 'button';
        if (isClickable) {
          const txt = (el.textContent || '').trim().toLowerCase();
          if (txt.includes(needle)) return { hit: el, h };
        }
        el = el.parentElement;
      }
    }
  }
  return null;
};

// Resolve "ScreenFoo" (string) -> window.ScreenFoo (component)
const resolveComponent = (name) => (typeof window !== 'undefined' ? window[name] : null);

// ─── Auto-scale ───────────────────────────────────────────────
const useScale = (designW, designH, chromeH) => {
  const [scale, setScale] = React.useState(1);
  React.useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth - 32;
      const h = window.innerHeight - chromeH - 32;
      setScale(Math.min(w / designW, h / designH, 1));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [designW, designH, chromeH]);
  return scale;
};

// ─── Hotspot outlines (toggleable) ────────────────────────────
const HotspotOutlines = ({ stageRef, hotspots, scale, visible }) => {
  const [rects, setRects] = React.useState([]);
  React.useEffect(() => {
    if (!visible || !stageRef.current) { setRects([]); return; }
    // Defer to next frame so the screen has painted
    const tick = () => {
      const root = stageRef.current;
      if (!root) return;
      const stageRect = root.getBoundingClientRect();
      const out = [];
      const seen = new Set();
      for (const h of hotspots) {
        let els = [];
        if (h.selector) {
          els = Array.from(root.querySelectorAll(h.selector));
        } else if (h.text) {
          // Find buttons/labels/links whose trimmed text includes the needle
          const needle = h.text.toLowerCase();
          els = Array.from(root.querySelectorAll('button, a, label, [role="button"]'))
            .filter(el => (el.textContent || '').trim().toLowerCase().includes(needle));
        }
        for (const el of els) {
          if (seen.has(el)) continue;
          seen.add(el);
          const r = el.getBoundingClientRect();
          out.push({
            top: (r.top - stageRect.top) / scale,
            left: (r.left - stageRect.left) / scale,
            width: r.width / scale,
            height: r.height / scale,
            label: h.label || h.text || h.target,
          });
        }
      }
      setRects(out);
    };
    const id = setTimeout(tick, 30);
    return () => clearTimeout(id);
  }, [visible, hotspots, scale, stageRef]);

  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
      {rects.map((r, i) => (
        <div key={i} style={{
          position: 'absolute', top: r.top, left: r.left, width: r.width, height: r.height,
          outline: '2px solid #F9B233', outlineOffset: 2,
          background: 'rgba(249,178,51,.12)',
          borderRadius: 6,
        }}>
          <div style={{
            position: 'absolute', top: -22, left: 0,
            background: '#F9B233', color: '#2A1F00',
            fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
            whiteSpace: 'nowrap',
          }}>{r.label}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Chrome (bottom bar) ──────────────────────────────────────
const Chrome = ({ currentIdx, total, screen, onPrev, onNext, onJump, onTogglePicker, showHotspots, onToggleHotspots }) => {
  const persona = PERSONA_COLOR[screen.persona] || { bg: '#555', fg: '#fff', label: '' };
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, height: 64,
      background: 'rgba(14,15,28,.92)', backdropFilter: 'blur(8px)',
      color: '#fff', display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 20px', zIndex: 100,
      borderTop: '1px solid rgba(255,255,255,.08)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Persona pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: persona.bg, color: persona.fg,
        padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: persona.fg, opacity: .8 }}/>
        {persona.label}
      </div>

      {/* Title + counter */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, minWidth: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{screen.label}</span>
        <span style={{ fontSize: 11, opacity: .6 }}>Tela {currentIdx + 1} de {total}</span>
      </div>

      <div style={{ flex: 1 }}/>

      {/* Hotspots toggle */}
      <button onClick={onToggleHotspots} title="Mostrar áreas clicáveis (H)"
        style={{
          height: 36, padding: '0 12px', borderRadius: 8, border: 0, cursor: 'pointer',
          background: showHotspots ? 'var(--ip-amarelo)' : 'rgba(255,255,255,.08)',
          color: showHotspots ? '#2A1F00' : '#fff',
          display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500,
        }}>
        <Icon.Eye size={14}/> Hotspots
      </button>

      {/* Prev / Next */}
      <button onClick={onPrev} title="Tela anterior (←)"
        style={{ height: 36, width: 36, borderRadius: 8, border: 0, cursor: 'pointer',
                 background: 'rgba(255,255,255,.08)', color: '#fff', display: 'grid', placeItems: 'center' }}>
        <Icon.ChevronLeft size={18}/>
      </button>
      <button onClick={onNext} title="Próxima tela (→)"
        style={{ height: 36, width: 36, borderRadius: 8, border: 0, cursor: 'pointer',
                 background: 'rgba(255,255,255,.08)', color: '#fff', display: 'grid', placeItems: 'center' }}>
        <Icon.ChevronRight size={18}/>
      </button>

      {/* Picker */}
      <button onClick={onTogglePicker} title="Lista de telas (M)"
        style={{ height: 36, padding: '0 12px', borderRadius: 8, border: 0, cursor: 'pointer',
                 background: 'var(--ip-azul)', color: '#fff',
                 display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
        <Icon.Sliders size={14}/> Mapa do fluxo
      </button>
    </div>
  );
};

// ─── Screen picker (drawer/sheet) ─────────────────────────────
const ScreenPicker = ({ open, currentId, onClose, onJump }) => {
  if (!open) return null;
  const groups = {};
  for (const s of FLOW) {
    (groups[s.persona] ||= []).push(s);
  }
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
      zIndex: 200, display: 'grid', placeItems: 'center', padding: 24,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: 'min(880px, 100%)',
        maxHeight: '80vh', overflow: 'auto', padding: 28,
        boxShadow: '0 24px 80px rgba(0,0,0,.4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, margin: 0 }}>Mapa do fluxo</h2>
          <button onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 8, border: 0, background: '#f0f0f0', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <Icon.X size={16}/>
          </button>
        </div>
        {Object.entries(groups).map(([persona, list]) => {
          const p = PERSONA_COLOR[persona];
          return (
            <div key={persona} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.bg }}/>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5, color: '#666' }}>{p.label}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                {list.map(s => {
                  const active = s.id === currentId;
                  return (
                    <button key={s.id} onClick={() => onJump(s.id)}
                      style={{
                        textAlign: 'left', padding: '12px 14px', borderRadius: 10,
                        border: active ? `1.5px solid ${p.bg}` : '1px solid #e6e6e6',
                        background: active ? '#FFFBF0' : '#fff',
                        cursor: 'pointer', fontSize: 13, fontWeight: 500,
                        fontFamily: 'inherit', color: '#212121',
                      }}>
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div style={{ paddingTop: 12, borderTop: '1px solid #eee', fontSize: 12, color: '#777' }}>
          Atalhos: <kbd>←</kbd>/<kbd>→</kbd> navegar · <kbd>H</kbd> mostrar hotspots · <kbd>M</kbd> abrir/fechar este mapa · <kbd>Esc</kbd> fechar
        </div>
      </div>
    </div>
  );
};

// ─── PrototypeApp ─────────────────────────────────────────────
const PrototypeApp = () => {
  const initialId = (typeof window !== 'undefined' && window.location.hash)
    ? window.location.hash.slice(1)
    : (localStorage.getItem('arandu-proto-screen') || FLOW[0].id);
  const validInitial = FLOW.find(s => s.id === initialId) ? initialId : FLOW[0].id;

  const [currentId, setCurrentId] = React.useState(validInitial);
  const [showHotspots, setShowHotspots] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [flash, setFlash] = React.useState(null); // visual feedback when navigating
  const stageRef = React.useRef(null);

  const idx = FLOW.findIndex(s => s.id === currentId);
  const screen = FLOW[idx];
  const Component = resolveComponent(screen.component);
  const scale = useScale(1440, 1024, 64);

  // Persist + URL sync
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.location.hash = '#' + currentId;
    localStorage.setItem('arandu-proto-screen', currentId);
  }, [currentId]);

  // hashchange (back/forward buttons)
  React.useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (FLOW.find(s => s.id === id)) setCurrentId(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goTo = (id) => {
    if (!FLOW.find(s => s.id === id)) return;
    setCurrentId(id);
    setPickerOpen(false);
    setFlash(id);
    setTimeout(() => setFlash(null), 380);
  };
  const goPrev = () => goTo(FLOW[(idx - 1 + FLOW.length) % FLOW.length].id);
  const goNext = () => goTo(FLOW[(idx + 1) % FLOW.length].id);

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'h' || e.key === 'H') setShowHotspots(v => !v);
      else if (e.key === 'm' || e.key === 'M') setPickerOpen(v => !v);
      else if (e.key === 'Escape') setPickerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Click handler — intercept hotspots
  const onStageClickCapture = (e) => {
    if (!stageRef.current) return;
    const match = findHotspot(e.target, stageRef.current, screen.hotspots || []);
    if (match) {
      e.preventDefault();
      e.stopPropagation();
      goTo(match.h.target);
    }
    // se não bater, deixa o clique passar normalmente
  };

  if (!Component) {
    return <div style={{ padding: 32, fontFamily: 'system-ui' }}>Componente <code>{screen.component}</code> não encontrado.</div>;
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(circle at 30% 20%, #1d2042, #0b0c1c 70%)',
      display: 'grid', placeItems: 'center',
      paddingBottom: 64,
      overflow: 'hidden',
    }}>
      {/* Stage frame */}
      <div style={{ width: 1440 * scale, height: 1024 * scale, position: 'relative' }}>
        <div
          ref={stageRef}
          onClickCapture={onStageClickCapture}
          style={{
            width: 1440, height: 1024,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: '#fff',
            boxShadow: flash ? '0 0 0 3px var(--ip-amarelo), 0 24px 80px rgba(0,0,0,.5)' : '0 24px 80px rgba(0,0,0,.5)',
            transition: 'box-shadow .25s ease',
            borderRadius: 12 / scale,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Component {...(screen.props || {})}/>
          <HotspotOutlines stageRef={stageRef} hotspots={screen.hotspots || []} scale={scale} visible={showHotspots}/>
        </div>
      </div>

      <Chrome
        currentIdx={idx} total={FLOW.length}
        screen={screen}
        onPrev={goPrev} onNext={goNext}
        onTogglePicker={() => setPickerOpen(v => !v)}
        showHotspots={showHotspots}
        onToggleHotspots={() => setShowHotspots(v => !v)}
      />

      <ScreenPicker
        open={pickerOpen}
        currentId={currentId}
        onClose={() => setPickerOpen(false)}
        onJump={goTo}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<PrototypeApp/>);
