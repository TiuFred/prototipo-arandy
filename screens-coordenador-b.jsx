/* global React, Icon, Sidebar, Topbar, StatusBadge, window */
// Coordenador · detalhe de uma prova (drill-down)
// Depende de helpers expostos por screens-coordenador.jsx
const { CoordExamHeader, BarChart, PROVA_CTX, iniciaisDe } = window;

const partStatus = {
  'Enviado':       { cls: 'ip-badge--ok',    icon: Icon.CheckCircle },
  'Em andamento':  { cls: 'ip-badge--warn',  icon: Icon.Clock },
  'Não iniciou':   { cls: 'ip-badge--draft', icon: Icon.AlertTriangle },
};
const PartBadge = ({ s }) => {
  const m = partStatus[s]; const I = m.icon;
  return <span className={"ip-badge " + m.cls}><I size={14}/>{s}</span>;
};

// ─── 27 · Prova · Participação dos alunos ──────────────────────
const participacaoRows = [
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

const ScreenCoordParticipacao = () => {
  const c = PROVA_CTX;
  const seg = [
    { l: 'Enviado',      v: c.enviadas,   color: 'var(--ip-verde)' },
    { l: 'Em andamento', v: c.andamento,  color: 'var(--ip-laranja)' },
    { l: 'Não iniciou',  v: c.naoIniciou, color: 'var(--ip-border-2)' },
  ];
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="coordenador" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Provas" subtitle="Acompanhamento da avaliação." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
          <div className="ip-shell__body">
            <CoordExamHeader active="participacao"/>

            {/* Barra de participação */}
            <div className="ip-card" style={{ padding: 16, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2>Status de participação</h2>
                <span className="ip-muted" style={{ fontSize: 13 }}>{c.total} alunos no total</span>
              </div>
              <div style={{ display: 'flex', height: 16, borderRadius: 999, overflow: 'hidden', background: 'var(--ip-surface)' }}>
                {seg.map((s, i) => (
                  <div key={i} style={{ width: (s.v / c.total * 100) + '%', background: s.color }} title={`${s.l}: ${s.v}`}/>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 24, marginTop: 14 }}>
                {seg.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color }}/>
                    <span style={{ color: 'var(--ip-text-2)' }}>{s.l}</span>
                    <span style={{ fontWeight: 700 }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabela */}
            <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="ip-table ip-table--compact">
                <thead>
                  <tr><th>Aluno</th><th>Status</th><th>Questões respondidas</th><th>Início</th><th>Envio</th></tr>
                </thead>
                <tbody>
                  {participacaoRows.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="ip-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{iniciaisDe(r.name)}</div>
                          <span style={{ fontWeight: 500 }}>{r.name}</span>
                        </div>
                      </td>
                      <td><PartBadge s={r.st}/></td>
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

// ─── 28 · Prova · Submissões ───────────────────────────────────
const submissoesRows = [
  { name: 'Ana Clara Silva',     env: '24/06 · 09:48', tempo: '46 min', resp: 10, corr: 'Corrigida',  nota: '9,8' },
  { name: 'João Pedro Santos',   env: '24/06 · 09:51', tempo: '51 min', resp: 10, corr: 'Corrigida',  nota: '8,7' },
  { name: 'Maria Eduarda Lima',  env: '24/06 · 09:55', tempo: '52 min', resp: 10, corr: 'Corrigida',  nota: '7,6' },
  { name: 'Lucas Gabriel Souza', env: '24/06 · 10:02', tempo: '61 min', resp: 10, corr: 'Em correção', nota: '—' },
  { name: 'Fernanda Oliveira',   env: '24/06 · 10:05', tempo: '60 min', resp: 9,  corr: 'Em correção', nota: '—' },
  { name: 'Gustavo Almeida',     env: '24/06 · 10:08', tempo: '63 min', resp: 10, corr: 'Em correção', nota: '—' },
  { name: 'Helena Ribeiro',      env: '24/06 · 10:11', tempo: '58 min', resp: 10, corr: 'Corrigida',  nota: '8,2' },
];

const ScreenCoordSubmissoes = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="coordenador" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Provas" subtitle="Acompanhamento da avaliação." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
        <div className="ip-shell__body">
          <CoordExamHeader active="submissoes"/>

          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
              <h2>Submissões ({PROVA_CTX.enviadas})</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <div className="ip-field-wrap" style={{ width: 240 }}>
                  <span className="ip-field-icon"><Icon.Search size={16}/></span>
                  <input className="ip-input" placeholder="Buscar aluno…" style={{ height: 36, paddingLeft: 38 }}/>
                </div>
                <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Filter size={14}/>Correção</button>
              </div>
            </div>
            <table className="ip-table">
              <thead>
                <tr><th>Aluno</th><th>Enviado em</th><th>Tempo</th><th>Respondidas</th><th>Correção</th><th>Nota</th><th style={{ width: 150 }}>Ações</th></tr>
              </thead>
              <tbody>
                {submissoesRows.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="ip-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{iniciaisDe(r.name)}</div>
                        <span style={{ fontWeight: 500 }}>{r.name}</span>
                      </div>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ip-text-2)' }}>{r.env}</td>
                    <td style={{ color: 'var(--ip-text-2)' }}>{r.tempo}</td>
                    <td>{r.resp}/{PROVA_CTX.questoes}</td>
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

// ─── 29 · Submissão individual ─────────────────────────────────
const submissaoQuestoes = [
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
  },
];

const ScreenCoordSubmissao = () => {
  const aluno = 'Maria Eduarda Lima';
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="coordenador" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Provas" subtitle="Submissão do aluno." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
          <div className="ip-shell__body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Voltar às submissões</button>
              <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>Provas &rsaquo; {PROVA_CTX.titulo} &rsaquo; Submissões &rsaquo; {aluno}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'flex-start' }}>
              {/* Respostas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="ip-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="ip-avatar" style={{ width: 48, height: 48, fontSize: 16 }}>{iniciaisDe(aluno)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18 }}>{aluno}</div>
                    <div className="ip-muted" style={{ fontSize: 13 }}>{PROVA_CTX.titulo} · {PROVA_CTX.turma} · enviada em 24/06 · 09:55</div>
                  </div>
                  <span className="ip-badge ip-badge--ok"><Icon.CheckCircle size={14}/>Corrigida</span>
                </div>

                {submissaoQuestoes.map(q => (
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
                          const isCorrect = o.correta;
                          const isWrongPick = o.marcada && !o.correta;
                          const bg = isCorrect ? 'var(--ip-verde-50)' : isWrongPick ? 'var(--ip-vermelho-50)' : 'var(--ip-surface)';
                          const bd = isCorrect ? 'var(--ip-verde)' : isWrongPick ? 'var(--ip-vermelho)' : 'transparent';
                          return (
                            <div key={o.a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: bg, border: '1.5px solid ' + bd, fontSize: 13 }}>
                              <span style={{ width: 22, height: 22, borderRadius: '50%', background: isCorrect ? 'var(--ip-verde)' : isWrongPick ? 'var(--ip-vermelho)' : '#fff', color: (isCorrect || isWrongPick) ? '#fff' : 'var(--ip-text)', border: (isCorrect || isWrongPick) ? 0 : '1px solid var(--ip-border)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{o.a}</span>
                              <span style={{ flex: 1 }}>{o.t}</span>
                              {o.marcada && <span style={{ fontSize: 11, fontWeight: 600, color: isWrongPick ? 'var(--ip-vermelho)' : 'var(--ip-verde)' }}>marcou</span>}
                              {isCorrect && <Icon.CheckCircle size={15} color="var(--ip-verde)"/>}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ background: 'var(--ip-surface)', borderRadius: 10, padding: '14px 16px', fontSize: 14, lineHeight: 1.6, color: 'var(--ip-text)' }}>
                        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--ip-text-2)', fontWeight: 600, marginBottom: 6 }}>Resposta do aluno</div>
                        {q.resposta}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Resumo */}
              <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="ip-card" style={{ padding: 20, textAlign: 'center' }}>
                  <div className="ip-stat__label">Nota final</div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 44, color: 'var(--ip-verde)', lineHeight: 1.1, marginTop: 4 }}>7,6</div>
                  <div className="ip-muted" style={{ fontSize: 13 }}>de 10,0</div>
                </div>
                <div className="ip-card" style={{ padding: 18 }}>
                  <h2 style={{ marginBottom: 12 }}>Resumo da submissão</h2>
                  {[
                    { l: 'Acertos',        v: '8',      icon: Icon.CheckCircle, c: 'var(--ip-verde)' },
                    { l: 'Erros',          v: '2',      icon: Icon.X, c: 'var(--ip-vermelho)' },
                    { l: 'Tempo gasto',    v: '52 min', icon: Icon.Clock },
                    { l: 'Questões',       v: '10',     icon: Icon.FileText },
                  ].map((r, i, arr) => { const I = r.icon; return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--ip-border)' : 0, fontSize: 13 }}>
                      <I size={15} color={r.c || 'var(--ip-text-2)'}/>
                      <span style={{ flex: 1 }}>{r.l}</span>
                      <span style={{ fontWeight: 600 }}>{r.v}</span>
                    </div>
                  ); })}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="ip-btn ip-btn--ghost" style={{ flex: 1 }}><Icon.ChevronLeft size={16}/>Anterior</button>
                  <button className="ip-btn ip-btn--ghost" style={{ flex: 1 }}>Próximo<Icon.ChevronRight size={16}/></button>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 30 · Prova · Indicadores por questão ──────────────────────
const indicadoresRows = [
  { q: 'Q1',  conteudo: 'Função afim · gráfico',        tipo: 'Objetiva',   acerto: 85, total: 23 },
  { q: 'Q2',  conteudo: 'Proporcionalidade',            tipo: 'Objetiva',   acerto: 72, total: 23 },
  { q: 'Q3',  conteudo: 'Equação do 2º grau',           tipo: 'Discursiva', acerto: 58, total: 23 },
  { q: 'Q4',  conteudo: 'Sistemas lineares',            tipo: 'Objetiva',   acerto: 35, total: 22 },
  { q: 'Q5',  conteudo: 'Função quadrática · vértice',  tipo: 'Objetiva',   acerto: 65, total: 23 },
  { q: 'Q6',  conteudo: 'Funções quadráticas · raízes', tipo: 'Discursiva', acerto: 28, total: 21 },
  { q: 'Q7',  conteudo: 'Função afim · coeficientes',   tipo: 'Objetiva',   acerto: 52, total: 23 },
  { q: 'Q8',  conteudo: 'Inequações',                   tipo: 'Objetiva',   acerto: 78, total: 23 },
  { q: 'Q9',  conteudo: 'Progressões',                  tipo: 'Objetiva',   acerto: 39, total: 22 },
  { q: 'Q10', conteudo: 'Interpretação de gráficos',    tipo: 'Discursiva', acerto: 68, total: 23 },
];

const ScreenCoordIndicadores = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="coordenador" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Provas" subtitle="Indicadores de desempenho por questão." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
        <div className="ip-shell__body">
          <CoordExamHeader active="indicadores"/>

          {/* Resumo enxuto — indicadores calculáveis */}
          {(() => {
            const media = Math.round(indicadoresRows.reduce((s, r) => s + r.acerto, 0) / indicadoresRows.length);
            const criticas = indicadoresRows.filter(r => r.acerto < 50);
            const pior = indicadoresRows.reduce((m, r) => r.acerto < m.acerto ? r : m, indicadoresRows[0]);
            const chips = [
              { l: 'Taxa média de acerto', v: media + '%', icon: Icon.TrendingUp, c: media >= 70 ? 'var(--ip-verde)' : media >= 50 ? 'var(--ip-laranja)' : 'var(--ip-vermelho)' },
              { l: 'Questão mais crítica', v: `${pior.q} · ${pior.acerto}%`, icon: Icon.AlertTriangle, c: 'var(--ip-vermelho)' },
              { l: 'Questões críticas (< 50%)', v: `${criticas.length} de ${indicadoresRows.length}`, icon: Icon.X, c: 'var(--ip-laranja)' },
            ];
            return (
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
            );
          })()}

          {/* Tabela de indicadores */}
          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="ip-table ip-table--compact">
              <thead>
                <tr>
                  <th>Questão</th><th>Conteúdo</th><th>Tipo</th>
                  <th>Taxa de acerto</th><th>Taxa de erro</th><th>Total de respostas</th>
                </tr>
              </thead>
              <tbody>
                {indicadoresRows.map((r, i) => {
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
                      <td style={{ fontVariantNumeric: 'tabular-nums' }}>{r.total} de {PROVA_CTX.enviadas}</td>
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

Object.assign(window, { ScreenCoordParticipacao, ScreenCoordSubmissoes, ScreenCoordSubmissao, ScreenCoordIndicadores });

// ─── 31 · Acompanhar provas (galeria · liga às 3 telas) ────────
const provasGaleria = [
  { titulo: 'Avaliação Bimestral · Funções',        disc: 'Matemática', prof: "Sophia Sant'ana", turma: '9ºA', aplicada: '24/06/2025', enviadas: 23, total: 27, status: 'Em correção' },
  { titulo: 'Interpretação de Texto · Crônica',     disc: 'Português',  prof: 'Carla Mendes',    turma: '9ºB', aplicada: '22/06/2025', enviadas: 25, total: 25, status: 'Corrigida' },
  { titulo: 'Equações do 2º grau',                  disc: 'Matemática', prof: 'João Vieira',     turma: '8ºA', aplicada: '20/06/2025', enviadas: 28, total: 30, status: 'Em correção' },
  { titulo: 'Análise Sintática · Período composto', disc: 'Português',  prof: 'Renata Cardoso',  turma: '9ºC', aplicada: '18/06/2025', enviadas: 26, total: 28, status: 'Corrigida' },
  { titulo: 'Trigonometria aplicada',               disc: 'Matemática', prof: "Sophia Sant'ana", turma: '9ºB', aplicada: '14/06/2025', enviadas: 24, total: 25, status: 'Corrigida' },
  { titulo: 'Concordância Verbal',                  disc: 'Português',  prof: 'Carla Mendes',    turma: '7ºA', aplicada: '02/07/2025', enviadas: 0,  total: 29, status: 'Programada' },
];

const galDiscStyle = (d) => d === 'Português'
  ? { background: 'var(--ip-laranja-50)', color: '#B65E00' }
  : { background: 'var(--ip-info-50)', color: '#0B4D8A' };

const ScreenCoordSelecaoProvas = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="coordenador" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Provas" subtitle="Selecione uma prova para acompanhar." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
        <div className="ip-shell__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 24 }}>Acompanhar provas</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>Escolha uma prova para ver participação, submissões ou indicadores por questão.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="ip-field-wrap" style={{ width: 260 }}>
                <span className="ip-field-icon"><Icon.Search size={18}/></span>
                <input className="ip-input" placeholder="Buscar prova ou professor…" style={{ height: 40 }}/>
              </div>
              <button className="ip-btn ip-btn--ghost"><Icon.Folder size={14}/>Disciplina<Icon.ChevronDown size={14}/></button>
              <button className="ip-btn ip-btn--ghost"><Icon.Filter size={14}/>Status<Icon.ChevronDown size={14}/></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {provasGaleria.map((p, i) => {
              const pct = Math.round((p.enviadas / p.total) * 100);
              const programada = p.status === 'Programada';
              return (
                <div key={i} className="ip-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '16px 18px 14px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="ip-pill" style={galDiscStyle(p.disc)}>{p.disc}</span>
                      <StatusBadge status={p.status}/>
                    </div>
                    <div>
                      <h2 style={{ fontSize: 16, lineHeight: 1.3 }}>{p.titulo}</h2>
                      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, color: 'var(--ip-text-2)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Icon.User size={14}/>{p.prof}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Icon.Users size={14}/>Turma {p.turma} · <Icon.Calendar size={14}/>{p.aplicada}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                        <span className="ip-muted">Participação</span>
                        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{p.enviadas}/{p.total} enviadas</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                        <div style={{ width: pct + '%', height: '100%', background: pct === 100 ? 'var(--ip-verde)' : 'var(--ip-azul)' }}/>
                      </div>
                    </div>
                  </div>
                  {/* 3 entradas para o detalhe da prova */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--ip-border)' }}>
                    {[
                      { l: 'Participação', icon: Icon.Users },
                      { l: 'Submissões',   icon: Icon.FileText },
                      { l: 'Indicadores',  icon: Icon.BarChart },
                    ].map((b, k) => { const I = b.icon; return (
                      <button key={k} disabled={programada} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                        padding: '12px 4px', cursor: programada ? 'not-allowed' : 'pointer',
                        background: 'transparent', border: 0,
                        borderLeft: k > 0 ? '1px solid var(--ip-border)' : 0,
                        color: programada ? 'var(--ip-text-3)' : 'var(--ip-azul-700)',
                        fontFamily: 'var(--ip-font-body)', fontSize: 12, fontWeight: 600,
                        opacity: programada ? .5 : 1,
                      }}>
                        <I size={17}/>{b.l}
                      </button>
                    ); })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  </div>
);

Object.assign(window, { ScreenCoordSelecaoProvas });
