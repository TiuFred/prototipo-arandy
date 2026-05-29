/* global React, Icon, Sidebar, Topbar, StatusBadge, window */
// Professor · detalhe de uma prova (drill-down) — espelha o fluxo do coordenador
// Cobre: visualizar dados da prova · participação · submissões · submissão individual · indicadores.

const iniciaisP = (n) => n.trim().split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

// ─── QR Code (placeholder determinístico — grade de quadrados) ──
const QRCodeBox = ({ size = 180, seed = 7 }) => {
  const N = 25;
  const cell = size / N;
  // PRNG determinístico
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const isFinder = (r, c) => {
    const inBox = (br, bc) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, N - 7) || inBox(N - 7, 0);
  };
  const finderCell = (r, c) => {
    const local = (br, bc) => { const rr = r - br, cc = c - bc; const ring = rr === 0 || rr === 6 || cc === 0 || cc === 6; const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4; return ring || core; };
    if (r < 7 && c < 7) return local(0, 0);
    if (r < 7 && c >= N - 7) return local(0, N - 7);
    if (r >= N - 7 && c < 7) return local(N - 7, 0);
    return false;
  };
  const cells = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    let on;
    if (isFinder(r, c)) on = finderCell(r, c);
    else on = rnd() > 0.55;
    if (on) cells.push(<rect key={r + '-' + c} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1A1A2E"/>);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', borderRadius: 8 }}>
      <rect x="0" y="0" width={size} height={size} fill="#fff"/>
      {cells}
    </svg>
  );
};

// ─── Contexto da prova do professor ────────────────────────────
const PROF_PROVA = {
  titulo: 'Avaliação Bimestral · Funções',
  disc: 'Matemática',
  turma: '9ºA',
  aplicada: '24/06/2025',
  janela: '24/06 · 14:00 → 24/06 · 15:30',
  duracao: '01h 30min',
  questoes: 10,
  objetivas: 7, discursivas: 3,
  total: 27, enviadas: 23, andamento: 2, naoIniciou: 2, corrigidas: 16,
  status: 'Em correção',
  link: 'institutoponte.arandu.app/p/av-funcoes-9a',
};

const ProfExamHeader = ({ active, onlyTitle }) => {
  const c = PROF_PROVA;
  const meta = [
    { i: Icon.Folder,   t: c.disc },
    { i: Icon.Users,    t: 'Turma ' + c.turma },
    { i: Icon.Calendar, t: c.aplicada },
    { i: Icon.Clock,    t: c.duracao },
  ];
  const kpis = [
    { l: 'Alunos',        v: String(c.total),            icon: Icon.Users,         color: 'var(--ip-azul)' },
    { l: 'Enviadas',      v: `${c.enviadas}/${c.total}`, icon: Icon.CheckCircle,   color: 'var(--ip-verde)' },
    { l: 'Em andamento',  v: String(c.andamento),        icon: Icon.Clock,         color: 'var(--ip-laranja)' },
    { l: 'Corrigidas',    v: `${c.corrigidas}/${c.enviadas}`, icon: Icon.Edit2,    color: 'var(--ip-info)' },
  ];
  const tabs = [
    { key: 'visao',        label: 'Visão geral' },
    { key: 'participacao', label: 'Participação' },
    { key: 'submissoes',   label: 'Submissões' },
    { key: 'indicadores',  label: 'Indicadores por questão' },
  ];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Minhas Provas</button>
            <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>Minhas Provas &rsaquo; {c.titulo}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 24 }}>{c.titulo}</h1>
            <StatusBadge status={c.status}/>
          </div>
          <div style={{ marginTop: 6, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--ip-text-2)' }}>
            {meta.map((m, i) => { const I = m.i; return (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><I size={14}/>{m.t}</span>
            ); })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ip-btn ip-btn--ghost"><Icon.Edit2 size={16}/>Corrigir</button>
          <button className="ip-btn ip-btn--primary"><Icon.BarChart size={16}/>Gerar relatório</button>
        </div>
      </div>

      {!onlyTitle && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
            {kpis.map((s, i) => { const I = s.icon; return (
              <div key={i} className="ip-stat" style={{ padding: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="ip-stat__label" style={{ fontSize: 12 }}>{s.l}</div>
                  <div className="ip-stat__value" style={{ fontSize: 22, marginTop: 2 }}>{s.v}</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + '14', color: s.color, display: 'grid', placeItems: 'center' }}><I size={18}/></div>
              </div>
            ); })}
          </div>

          <div className="ip-tabs" style={{ marginBottom: 14 }}>
            {tabs.map(t => (
              <button key={t.key} className={"ip-tab " + (t.key === active ? 'ip-tab--active' : '')}
                style={{ background: 'transparent', border: 0, borderBottom: '2px solid transparent', cursor: 'pointer', fontFamily: 'var(--ip-font-body)' }}>
                {t.label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

// ─── 32 · Prova · Visão geral ──────────────────────────────────
const provaQuestoesLista = [
  { n: 1, tipo: 'Objetiva',   peso: '1,0', cont: 'Função afim · gráfico' },
  { n: 2, tipo: 'Objetiva',   peso: '1,0', cont: 'Proporcionalidade' },
  { n: 3, tipo: 'Discursiva', peso: '2,0', cont: 'Equação do 2º grau' },
  { n: 4, tipo: 'Objetiva',   peso: '1,0', cont: 'Sistemas lineares' },
  { n: 5, tipo: 'Objetiva',   peso: '1,0', cont: 'Função quadrática · vértice' },
  { n: 6, tipo: 'Discursiva', peso: '2,0', cont: 'Funções quadráticas · raízes' },
];

const ScreenProvaVisaoGeral = () => {
  const c = PROF_PROVA;
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Detalhe da prova" subtitle="Dados, questões e acesso da avaliação."/>
          <div className="ip-shell__body">
            <ProfExamHeader active="visao"/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'flex-start' }}>
              {/* Esquerda */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="ip-card" style={{ padding: 20 }}>
                  <h2 style={{ marginBottom: 12 }}>Informações da prova</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                    {[
                      { l: 'Disciplina', v: c.disc },
                      { l: 'Turma', v: c.turma },
                      { l: 'Janela de realização', v: c.janela },
                      { l: 'Duração', v: c.duracao },
                    ].map((r, i) => (
                      <div key={i} style={{ background: 'var(--ip-surface)', borderRadius: 10, padding: '10px 12px' }}>
                        <div style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>{r.l}</div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ip-text-2)', textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 600, marginBottom: 6 }}>Instruções</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ip-text)' }}>Esta avaliação contempla funções afim, quadrática e sistemas lineares. Leia com atenção cada enunciado. Não é permitido o uso de calculadora.</p>
                </div>

                <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
                    <h2>Questões ({c.questoes})</h2>
                    <span className="ip-muted" style={{ fontSize: 13 }}>{c.objetivas} objetivas · {c.discursivas} discursivas</span>
                  </div>
                  <table className="ip-table ip-table--compact">
                    <thead><tr><th style={{ width: 50 }}>#</th><th>Conteúdo</th><th>Tipo</th><th>Peso</th></tr></thead>
                    <tbody>
                      {provaQuestoesLista.slice(0, 4).map(q => (
                        <tr key={q.n}>
                          <td><span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'inline-grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>{q.n}</span></td>
                          <td style={{ fontWeight: 500 }}>{q.cont}</td>
                          <td><span className="ip-badge ip-badge--azul">{q.tipo}</span></td>
                          <td style={{ fontWeight: 600 }}>{q.peso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: '10px 20px', borderTop: '1px solid var(--ip-border)' }}>
                    <span className="ip-muted" style={{ fontSize: 13 }}>… e mais {c.questoes - 4} questões</span>
                  </div>
                </div>
              </div>

              {/* Aside */}
              <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Link de acesso */}
                <div className="ip-card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <Icon.Link size={18} color="var(--ip-azul-700)"/>
                    <h2>Link de acesso</h2>
                  </div>
                  <p className="ip-muted" style={{ fontSize: 12, marginBottom: 10 }}>Compartilhe com os alunos da turma para realizarem a prova.</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0, padding: '9px 12px', background: 'var(--ip-surface)', borderRadius: 8, fontSize: 12, fontFamily: 'monospace', color: 'var(--ip-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.link}</div>
                    <button className="ip-btn ip-btn--ghost ip-btn--icon" aria-label="Copiar link"><Icon.Copy size={16}/></button>
                  </div>
                  <button className="ip-btn ip-btn--ghost" style={{ width: '100%', marginTop: 8 }}><Icon.QrCode size={16}/>Ver QR Code</button>
                </div>

                {/* Resumo */}
                <div className="ip-card" style={{ padding: 18 }}>
                  <h2 style={{ marginBottom: 10 }}>Resumo</h2>
                  {[
                    { l: 'Total de questões', v: String(c.questoes) },
                    { l: 'Pontuação total', v: '10,0 pts' },
                    { l: 'Participação', v: `${c.enviadas}/${c.total}` },
                    { l: 'Correção', v: `${c.corrigidas}/${c.enviadas}` },
                  ].map((r, i, arr) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--ip-border)' : 0, fontSize: 13 }}>
                      <span className="ip-muted">{r.l}</span><span style={{ fontWeight: 600 }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 33 · Prova · Participação ─────────────────────────────────
const partStatusP = {
  'Enviado':      { cls: 'ip-badge--ok',    icon: Icon.CheckCircle },
  'Em andamento': { cls: 'ip-badge--warn',  icon: Icon.Clock },
  'Não iniciou':  { cls: 'ip-badge--draft', icon: Icon.AlertTriangle },
};
const PartBadgeP = ({ s }) => { const m = partStatusP[s]; const I = m.icon; return <span className={"ip-badge " + m.cls}><I size={14}/>{s}</span>; };

const participacaoRowsP = [
  { name: 'Ana Clara Silva',     st: 'Enviado',      resp: 10, ini: '09:02', env: '09:48' },
  { name: 'João Pedro Santos',   st: 'Enviado',      resp: 10, ini: '09:00', env: '09:51' },
  { name: 'Maria Eduarda Lima',  st: 'Enviado',      resp: 10, ini: '09:03', env: '09:55' },
  { name: 'Lucas Gabriel Souza', st: 'Enviado',      resp: 10, ini: '09:01', env: '10:02' },
  { name: 'Fernanda Oliveira',   st: 'Enviado',      resp: 10, ini: '09:05', env: '10:05' },
  { name: 'Pedro Henrique Reis', st: 'Em andamento', resp: 6,  ini: '09:04', env: '—' },
  { name: 'Beatriz Cardoso',     st: 'Em andamento', resp: 3,  ini: '09:10', env: '—' },
  { name: 'Rafael Martins',      st: 'Não iniciou',  resp: 0,  ini: '—',     env: '—' },
  { name: 'Carolina Nunes',      st: 'Não iniciou',  resp: 0,  ini: '—',     env: '—' },
];

const ScreenProfParticipacao = () => {
  const c = PROF_PROVA;
  const seg = [
    { l: 'Enviado', v: c.enviadas, color: 'var(--ip-verde)' },
    { l: 'Em andamento', v: c.andamento, color: 'var(--ip-laranja)' },
    { l: 'Não iniciou', v: c.naoIniciou, color: 'var(--ip-border-2)' },
  ];
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Detalhe da prova" subtitle="Acompanhamento da avaliação."/>
          <div className="ip-shell__body">
            <ProfExamHeader active="participacao"/>
            <div className="ip-card" style={{ padding: 16, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2>Status de participação</h2>
                <span className="ip-muted" style={{ fontSize: 13 }}>{c.total} alunos no total</span>
              </div>
              <div style={{ display: 'flex', height: 16, borderRadius: 999, overflow: 'hidden', background: 'var(--ip-surface)' }}>
                {seg.map((s, i) => <div key={i} style={{ width: (s.v / c.total * 100) + '%', background: s.color }}/>)}
              </div>
              <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
                {seg.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color }}/>
                    <span style={{ color: 'var(--ip-text-2)' }}>{s.l}</span><span style={{ fontWeight: 700 }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="ip-table ip-table--compact">
                <thead><tr><th>Aluno</th><th>Status</th><th>Questões respondidas</th><th>Início</th><th>Envio</th></tr></thead>
                <tbody>
                  {participacaoRowsP.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="ip-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{iniciaisP(r.name)}</div>
                          <span style={{ fontWeight: 500 }}>{r.name}</span>
                        </div>
                      </td>
                      <td><PartBadgeP s={r.st}/></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 90, height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                            <div style={{ width: (r.resp / c.questoes * 100) + '%', height: '100%', background: r.resp === c.questoes ? 'var(--ip-verde)' : 'var(--ip-azul)' }}/>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.resp}/{c.questoes}</span>
                        </div>
                      </td>
                      <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ip-text-2)' }}>{r.ini}</td>
                      <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ip-text-2)' }}>{r.env}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 34 · Prova · Submissões ───────────────────────────────────
const submissoesRowsP = [
  { name: 'Ana Clara Silva',     env: '24/06 · 09:48', tempo: '46 min', resp: 10, corr: 'Corrigida',   nota: '9,8' },
  { name: 'João Pedro Santos',   env: '24/06 · 09:51', tempo: '51 min', resp: 10, corr: 'Corrigida',   nota: '8,7' },
  { name: 'Maria Eduarda Lima',  env: '24/06 · 09:55', tempo: '52 min', resp: 10, corr: 'Corrigida',   nota: '7,6' },
  { name: 'Lucas Gabriel Souza', env: '24/06 · 10:02', tempo: '61 min', resp: 10, corr: 'Em correção', nota: '—' },
  { name: 'Fernanda Oliveira',   env: '24/06 · 10:05', tempo: '60 min', resp: 9,  corr: 'Em correção', nota: '—' },
  { name: 'Gustavo Almeida',     env: '24/06 · 10:08', tempo: '63 min', resp: 10, corr: 'Em correção', nota: '—' },
  { name: 'Helena Ribeiro',      env: '24/06 · 10:11', tempo: '58 min', resp: 10, corr: 'Corrigida',   nota: '8,2' },
];

const ScreenProfSubmissoes = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Detalhe da prova" subtitle="Submissões recebidas."/>
        <div className="ip-shell__body">
          <ProfExamHeader active="submissoes"/>
          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
              <h2>Submissões ({PROF_PROVA.enviadas})</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <div className="ip-field-wrap" style={{ width: 240 }}>
                  <span className="ip-field-icon"><Icon.Search size={16}/></span>
                  <input className="ip-input" placeholder="Buscar aluno…" style={{ height: 36, paddingLeft: 38 }}/>
                </div>
                <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Filter size={14}/>Correção</button>
              </div>
            </div>
            <table className="ip-table ip-table--compact">
              <thead><tr><th>Aluno</th><th>Enviado em</th><th>Tempo</th><th>Respondidas</th><th>Correção</th><th>Nota</th><th style={{ width: 150 }}>Ações</th></tr></thead>
              <tbody>
                {submissoesRowsP.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="ip-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{iniciaisP(r.name)}</div>
                        <span style={{ fontWeight: 500 }}>{r.name}</span>
                      </div>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ip-text-2)' }}>{r.env}</td>
                    <td style={{ color: 'var(--ip-text-2)' }}>{r.tempo}</td>
                    <td>{r.resp}/{PROF_PROVA.questoes}</td>
                    <td><span className={"ip-badge " + (r.corr === 'Corrigida' ? 'ip-badge--ok' : 'ip-badge--warn')}>{r.corr}</span></td>
                    <td style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{r.nota}</td>
                    <td><button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Eye size={14}/>Ver submissão</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 35 · Submissão individual (professor) ─────────────────────
const submissaoQuestoesP = [
  {
    n: 1, tipo: 'Objetiva', peso: '1,0', ganho: '1,0', ok: true,
    enunciado: 'Em uma função afim f(x) = ax + b, com a > 0, o gráfico é representado por:',
    alternativas: [
      { a: 'A', t: 'Reta crescente', correta: true, marcada: true },
      { a: 'B', t: 'Reta decrescente' },
      { a: 'C', t: 'Parábola côncava para cima' },
      { a: 'D', t: 'Hipérbole' },
    ],
  },
  {
    n: 2, tipo: 'Objetiva', peso: '1,0', ganho: '0,0', ok: false,
    enunciado: 'Um pacote de biscoitos custa R$ 4,50. Pagando R$ 27,00 no total, quantos pacotes foram comprados?',
    alternativas: [
      { a: 'A', t: '4 pacotes' },
      { a: 'B', t: '5 pacotes', marcada: true },
      { a: 'C', t: '6 pacotes', correta: true },
      { a: 'D', t: '7 pacotes' },
    ],
  },
  {
    n: 3, tipo: 'Discursiva', peso: '2,0', ganho: '1,5', parcial: true,
    enunciado: 'Demonstre algebricamente a fórmula resolutiva da equação do 2º grau a partir da forma canônica.',
    resposta: 'Parti de ax² + bx + c = 0, dividi por a e completei o quadrado chegando a (x + b/2a)² = (b² − 4ac)/4a². Extraí a raiz, mas não justifiquei a condição de existência (Δ ≥ 0).',
    anexo: 'desenvolvimento_q3.jpg',
  },
];

const ScreenProfSubmissao = () => {
  const aluno = 'Maria Eduarda Lima';
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Submissão do aluno" subtitle="Respostas e correção."/>
          <div className="ip-shell__body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Voltar às submissões</button>
              <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>{PROF_PROVA.titulo} &rsaquo; Submissões &rsaquo; {aluno}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="ip-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="ip-avatar" style={{ width: 48, height: 48, fontSize: 16 }}>{iniciaisP(aluno)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18 }}>{aluno}</div>
                    <div className="ip-muted" style={{ fontSize: 13 }}>{PROF_PROVA.titulo} · {PROF_PROVA.turma} · enviada em 24/06 · 09:55</div>
                  </div>
                  <span className="ip-badge ip-badge--ok"><Icon.CheckCircle size={14}/>Corrigida</span>
                </div>

                {submissaoQuestoesP.map(q => (
                  <div key={q.n} className="ip-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>{q.n}</span>
                        <span className="ip-badge ip-badge--azul">{q.tipo}</span>
                        <span className="ip-badge">Peso {q.peso}</span>
                      </div>
                      <span className={"ip-badge " + (q.ok ? 'ip-badge--ok' : q.parcial ? 'ip-badge--warn' : 'ip-badge--err')}>
                        {q.ok ? <Icon.CheckCircle size={14}/> : q.parcial ? <Icon.AlertTriangle size={14}/> : <Icon.X size={14}/>}
                        {q.ganho} / {q.peso}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 14 }}>{q.enunciado}</p>
                    {q.alternativas ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {q.alternativas.map(o => {
                          const isCorrect = o.correta, isWrong = o.marcada && !o.correta;
                          const bg = isCorrect ? 'var(--ip-verde-50)' : isWrong ? 'var(--ip-vermelho-50)' : 'var(--ip-surface)';
                          const bd = isCorrect ? 'var(--ip-verde)' : isWrong ? 'var(--ip-vermelho)' : 'transparent';
                          return (
                            <div key={o.a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: bg, border: '1.5px solid ' + bd, fontSize: 13 }}>
                              <span style={{ width: 22, height: 22, borderRadius: '50%', background: isCorrect ? 'var(--ip-verde)' : isWrong ? 'var(--ip-vermelho)' : '#fff', color: (isCorrect || isWrong) ? '#fff' : 'var(--ip-text)', border: (isCorrect || isWrong) ? 0 : '1px solid var(--ip-border)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{o.a}</span>
                              <span style={{ flex: 1 }}>{o.t}</span>
                              {o.marcada && <span style={{ fontSize: 11, fontWeight: 600, color: isWrong ? 'var(--ip-vermelho)' : 'var(--ip-verde)' }}>marcou</span>}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        <div style={{ background: 'var(--ip-surface)', borderRadius: 10, padding: '14px 16px', fontSize: 14, lineHeight: 1.6 }}>
                          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--ip-text-2)', fontWeight: 600, marginBottom: 6 }}>Resposta do aluno</div>
                          {q.resposta}
                        </div>
                        {q.anexo && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, padding: '10px 12px', border: '1px solid var(--ip-border)', borderRadius: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--ip-verde-50)', color: 'var(--ip-verde)', display: 'grid', placeItems: 'center' }}><Icon.Image size={16}/></div>
                            <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{q.anexo}</span>
                            <span style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>anexado via QR Code</span>
                            <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.Maximize size={14}/></button>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                          <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.RefreshCw size={14}/>Atualizar correção</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="ip-card" style={{ padding: 20, textAlign: 'center' }}>
                  <div className="ip-stat__label">Nota final</div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 44, color: 'var(--ip-verde)', lineHeight: 1.1, marginTop: 4 }}>7,6</div>
                  <div className="ip-muted" style={{ fontSize: 13 }}>de 10,0</div>
                </div>
                <div className="ip-card" style={{ padding: 18 }}>
                  <h2 style={{ marginBottom: 12 }}>Resumo</h2>
                  {[
                    { l: 'Acertos', v: '8', icon: Icon.CheckCircle, c: 'var(--ip-verde)' },
                    { l: 'Erros', v: '2', icon: Icon.X, c: 'var(--ip-vermelho)' },
                    { l: 'Tempo gasto', v: '52 min', icon: Icon.Clock },
                    { l: 'Anexos', v: '1', icon: Icon.Image },
                  ].map((r, i, arr) => { const I = r.icon; return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--ip-border)' : 0, fontSize: 13 }}>
                      <I size={15} color={r.c || 'var(--ip-text-2)'}/><span style={{ flex: 1 }}>{r.l}</span><span style={{ fontWeight: 600 }}>{r.v}</span>
                    </div>
                  ); })}
                </div>
                <button className="ip-btn ip-btn--primary" style={{ width: '100%' }}><Icon.Edit2 size={16}/>Corrigir discursivas</button>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 36 · Prova · Indicadores por questão ──────────────────────
const indicadoresRowsP = [
  { q: 'Q1',  conteudo: 'Função afim · gráfico',        tipo: 'Objetiva',   acerto: 85 },
  { q: 'Q2',  conteudo: 'Proporcionalidade',            tipo: 'Objetiva',   acerto: 72 },
  { q: 'Q3',  conteudo: 'Equação do 2º grau',           tipo: 'Discursiva', acerto: 58 },
  { q: 'Q4',  conteudo: 'Sistemas lineares',            tipo: 'Objetiva',   acerto: 35 },
  { q: 'Q5',  conteudo: 'Função quadrática · vértice',  tipo: 'Objetiva',   acerto: 65 },
  { q: 'Q6',  conteudo: 'Funções quadráticas · raízes', tipo: 'Discursiva', acerto: 28 },
  { q: 'Q7',  conteudo: 'Função afim · coeficientes',   tipo: 'Objetiva',   acerto: 52 },
  { q: 'Q8',  conteudo: 'Inequações',                   tipo: 'Objetiva',   acerto: 78 },
  { q: 'Q9',  conteudo: 'Progressões',                  tipo: 'Objetiva',   acerto: 39 },
  { q: 'Q10', conteudo: 'Interpretação de gráficos',    tipo: 'Discursiva', acerto: 68 },
];

const ScreenProfIndicadores = () => {
  const enviadas = PROF_PROVA.enviadas;
  const media = Math.round(indicadoresRowsP.reduce((s, r) => s + r.acerto, 0) / indicadoresRowsP.length);
  const criticas = indicadoresRowsP.filter(r => r.acerto < 50);
  const pior = indicadoresRowsP.reduce((m, r) => r.acerto < m.acerto ? r : m, indicadoresRowsP[0]);
  const chips = [
    { l: 'Taxa média de acerto', v: media + '%', icon: Icon.TrendingUp, c: media >= 70 ? 'var(--ip-verde)' : media >= 50 ? 'var(--ip-laranja)' : 'var(--ip-vermelho)' },
    { l: 'Questão mais crítica', v: `${pior.q} · ${pior.acerto}%`, icon: Icon.AlertTriangle, c: 'var(--ip-vermelho)' },
    { l: 'Questões críticas (< 50%)', v: `${criticas.length} de ${indicadoresRowsP.length}`, icon: Icon.X, c: 'var(--ip-laranja)' },
  ];
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Detalhe da prova" subtitle="Indicadores por questão."/>
          <div className="ip-shell__body">
            <ProfExamHeader active="indicadores"/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
              {chips.map((s, i) => { const I = s.icon; return (
                <div key={i} className="ip-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: s.c + '14', color: s.c, display: 'grid', placeItems: 'center', flexShrink: 0 }}><I size={19}/></div>
                  <div>
                    <div className="ip-stat__label" style={{ fontSize: 12 }}>{s.l}</div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 19, marginTop: 1 }}>{s.v}</div>
                  </div>
                </div>
              ); })}
            </div>
            <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="ip-table ip-table--compact">
                <thead><tr><th>Questão</th><th>Conteúdo</th><th>Tipo</th><th>Taxa de acerto</th><th>Taxa de erro</th><th>Total de respostas</th></tr></thead>
                <tbody>
                  {indicadoresRowsP.map((r, i) => {
                    const erro = 100 - r.acerto;
                    const ac = r.acerto >= 70 ? 'var(--ip-verde)' : r.acerto >= 50 ? 'var(--ip-laranja)' : 'var(--ip-vermelho)';
                    return (
                      <tr key={i}>
                        <td><span className="ip-pill">{r.q}</span></td>
                        <td style={{ fontWeight: 500 }}>{r.conteudo}</td>
                        <td><span className="ip-badge ip-badge--azul">{r.tipo}</span></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 90, height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                              <div style={{ width: r.acerto + '%', height: '100%', background: ac }}/>
                            </div>
                            <span style={{ fontWeight: 600, color: ac, fontVariantNumeric: 'tabular-nums' }}>{r.acerto}%</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--ip-text-2)', fontVariantNumeric: 'tabular-nums' }}>{erro}%</td>
                        <td style={{ fontVariantNumeric: 'tabular-nums' }}>{enviadas} de {enviadas}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

Object.assign(window, {
  QRCodeBox, PROF_PROVA, ProfExamHeader, iniciaisP,
  ScreenProvaVisaoGeral, ScreenProfParticipacao, ScreenProfSubmissoes, ScreenProfSubmissao, ScreenProfIndicadores,
});
