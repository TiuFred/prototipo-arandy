/* global React, Icon, Sidebar, Topbar, StatusBadge */
// Fluxo do Coordenador · Lucca Freitas
// Capacidades: cadastrar professores · listar/filtrar provas · participação ·
// submissões · submissão individual · indicadores por questão · relatório consolidado.

// ─── Helpers de gráfico ────────────────────────────────────────
const BarChart = ({ data, max = 100, height = 240, goodHigh = false }) => {
  const W = 720, H = height;
  const padL = 40, padR = 12, padT = 18, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const ticks = [0, 25, 50, 75, 100];
  const barGap = 10;
  const barW = (innerW - barGap * (data.length - 1)) / data.length;
  const colorFor = v => goodHigh
    ? (v >= 70 ? 'var(--ip-verde)' : v >= 50 ? 'var(--ip-laranja)' : 'var(--ip-vermelho)')
    : (v > 60 ? 'var(--ip-vermelho)' : v > 40 ? 'var(--ip-laranja)' : 'var(--ip-verde)');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height, display: 'block', fontFamily: 'var(--ip-font-body)' }}>
      {ticks.map(t => {
        const y = padT + innerH - (t / max) * innerH;
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="var(--ip-border)" strokeWidth="1"
                  strokeDasharray={t === 0 ? null : '3 4'} opacity={t === 0 ? 1 : .65}/>
            <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="var(--ip-text-2)">{t}%</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.v / max) * innerH;
        const x = padL + i * (barW + barGap);
        const y = padT + innerH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={4} ry={4} fill={colorFor(d.v)}/>
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ip-text)">{d.v}%</text>
            <text x={x + barW / 2} y={padT + innerH + 18} textAnchor="middle" fontSize="11" fill="var(--ip-text-2)" fontWeight="500">{d.l}</text>
          </g>
        );
      })}
    </svg>
  );
};

const Donut = ({ segments, size = 140, thickness, center }) => {
  const total = segments.reduce((s, x) => s + x.v, 0) || 1;
  const sw = thickness || Math.max(8, Math.round(size * 0.11));
  const r = (size - sw) / 2 - 1;          // keep the stroke fully inside the viewBox
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {/* track */}
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--ip-surface)" strokeWidth={sw}/>
      {/* value arcs (skip any segment that just represents the empty remainder) */}
      {segments.map((s, i) => {
        const frac = s.v / total;
        const len = frac * C;
        const off = -(acc / total) * C;
        acc += s.v;
        if (s.color === 'var(--ip-surface)' || s.v <= 0) return null;
        return (
          <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
            stroke={s.color} strokeWidth={sw}
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={off}
            strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}/>
        );
      })}
      {center && (
        <>
          <text x={size/2} y={size/2 - (center.bottom ? size * 0.06 : 0)} textAnchor="middle" dominantBaseline="central"
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: Math.round(size * 0.24), fill: 'var(--ip-text)' }}>{center.top}</text>
          {center.bottom && (
            <text x={size/2} y={size/2 + size * 0.16} textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: Math.round(size * 0.12), fill: 'var(--ip-text-2)' }}>{center.bottom}</text>
          )}
        </>
      )}
    </svg>
  );
};

// ─── Contexto da prova (compartilhado pelo detalhe) ────────────
const PROVA_CTX = {
  titulo: 'Avaliação Bimestral · Funções',
  disc: 'Matemática',
  turma: '9ºA',
  professor: "Sophia Sant'ana",
  aplicada: '24/06/2025',
  questoes: 10,
  total: 27, enviadas: 23, andamento: 2, naoIniciou: 2,
};

const iniciaisDe = (n) => n.trim().split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

// Cabeçalho + abas do detalhe de uma prova
const CoordExamHeader = ({ active }) => {
  const c = PROVA_CTX;
  const meta = [
    { i: Icon.Folder,   t: c.disc },
    { i: Icon.Users,    t: 'Turma ' + c.turma },
    { i: Icon.User,     t: c.professor },
    { i: Icon.Calendar, t: 'Aplicada em ' + c.aplicada },
  ];
  const kpis = [
    { l: 'Alunos',          v: String(c.total),                 icon: Icon.Users,         color: 'var(--ip-azul)' },
    { l: 'Enviadas',        v: `${c.enviadas}/${c.total}`,      icon: Icon.CheckCircle,   color: 'var(--ip-verde)' },
    { l: 'Em andamento',    v: String(c.andamento),             icon: Icon.Clock,         color: 'var(--ip-laranja)' },
    { l: 'Não iniciaram',   v: String(c.naoIniciou),            icon: Icon.AlertTriangle, color: 'var(--ip-vermelho)' },
  ];
  const tabs = [
    { key: 'participacao', label: 'Participação' },
    { key: 'submissoes',   label: 'Submissões' },
    { key: 'indicadores',  label: 'Indicadores por questão' },
  ];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Voltar</button>
            <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>Provas &rsaquo; {c.titulo}</span>
          </div>
          <h1 style={{ fontSize: 24 }}>{c.titulo}</h1>
          <div style={{ marginTop: 6, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--ip-text-2)' }}>
            {meta.map((m, i) => { const I = m.i; return (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><I size={14}/>{m.t}</span>
            ); })}
          </div>
        </div>
        <button className="ip-btn ip-btn--primary"><Icon.BarChart size={16}/>Gerar relatório</button>
      </div>

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
  );
};

// ─── 10 · Provas (listar & filtrar) ────────────────────────────
const provasCoord = [
  { titulo: 'Avaliação Bimestral · Funções',     disc: 'Matemática', prof: "Sophia Sant'ana", turma: '9ºA', aplicada: '24/06/2025', enviadas: 23, total: 27, status: 'Em correção' },
  { titulo: 'Interpretação de Texto · Crônica',  disc: 'Português',  prof: 'Carla Mendes',    turma: '9ºB', aplicada: '22/06/2025', enviadas: 25, total: 25, status: 'Corrigida' },
  { titulo: 'Equações do 2º grau',               disc: 'Matemática', prof: 'João Vieira',     turma: '8ºA', aplicada: '20/06/2025', enviadas: 28, total: 30, status: 'Em correção' },
  { titulo: 'Análise Sintática · Período composto', disc: 'Português', prof: 'Renata Cardoso', turma: '9ºC', aplicada: '18/06/2025', enviadas: 26, total: 28, status: 'Corrigida' },
  { titulo: 'Trigonometria aplicada',            disc: 'Matemática', prof: "Sophia Sant'ana", turma: '9ºB', aplicada: '14/06/2025', enviadas: 24, total: 25, status: 'Corrigida' },
  { titulo: 'Concordância Verbal',               disc: 'Português',  prof: 'Carla Mendes',    turma: '7ºA', aplicada: '30/06/2025', enviadas: 0,  total: 29, status: 'Programada' },
];

const discPill = (d) => (
  <span className="ip-pill" style={d === 'Português'
    ? { background: 'var(--ip-laranja-50)', color: '#B65E00' }
    : { background: 'var(--ip-info-50)', color: '#0B4D8A' }}>{d}</span>
);

const ScreenCoordProvas = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="coordenador" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Provas" subtitle="Avaliações aplicadas na instituição." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
        <div className="ip-shell__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 24 }}>Avaliações</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>Acompanhe a participação e os resultados de cada prova.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="ip-field-wrap" style={{ width: 280 }}>
                <span className="ip-field-icon"><Icon.Search size={18}/></span>
                <input className="ip-input" placeholder="Buscar por prova ou professor…" style={{ height: 40 }}/>
              </div>
              <button className="ip-btn ip-btn--ghost"><Icon.Folder size={14}/>Disciplina<Icon.ChevronDown size={14}/></button>
              <button className="ip-btn ip-btn--ghost"><Icon.Users size={14}/>Turma<Icon.ChevronDown size={14}/></button>
              <button className="ip-btn ip-btn--ghost"><Icon.Filter size={14}/>Status<Icon.ChevronDown size={14}/></button>
            </div>
          </div>

          {/* KPIs reais */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
              { l: 'Provas aplicadas', v: '6', icon: Icon.FileText,   c: 'var(--ip-azul)' },
              { l: 'Em correção',      v: '2', icon: Icon.Clock,      c: 'var(--ip-laranja)' },
              { l: 'Corrigidas',       v: '3', icon: Icon.CheckCircle, c: 'var(--ip-verde)' },
              { l: 'Programadas',      v: '1', icon: Icon.Calendar,   c: 'var(--ip-info)' },
            ].map((s, i) => { const I = s.icon; return (
              <div key={i} className="ip-stat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><div className="ip-stat__label">{s.l}</div><div className="ip-stat__value">{s.v}</div></div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.c + '14', color: s.c, display: 'grid', placeItems: 'center' }}><I size={22}/></div>
              </div>
            ); })}
          </div>

          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="ip-table">
              <thead>
                <tr>
                  <th>Prova</th>
                  <th>Disciplina</th>
                  <th>Professor</th>
                  <th>Turma</th>
                  <th>Aplicada em</th>
                  <th>Participação</th>
                  <th>Status</th>
                  <th style={{ width: 110 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {provasCoord.map((r, i) => {
                  const pct = Math.round((r.enviadas / r.total) * 100);
                  return (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center' }}><Icon.FileText size={20}/></div>
                          <div style={{ fontWeight: 600 }}>{r.titulo}</div>
                        </div>
                      </td>
                      <td>{discPill(r.disc)}</td>
                      <td>{r.prof}</td>
                      <td><span className="ip-pill">{r.turma}</span></td>
                      <td>{r.aplicada}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 70, height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                            <div style={{ width: pct + '%', height: '100%', background: pct === 100 ? 'var(--ip-verde)' : 'var(--ip-azul)' }}/>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.enviadas}/{r.total}</span>
                        </div>
                      </td>
                      <td><StatusBadge status={r.status}/></td>
                      <td><button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Eye size={14}/>Ver</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' }}>
              <span className="ip-muted" style={{ fontSize: 13 }}>Mostrando 6 de 48 provas</span>
              <div className="ip-pag">
                <button className="ip-pag__btn"><Icon.ChevronLeft size={16}/></button>
                <button className="ip-pag__btn ip-pag__btn--active">1</button>
                <button className="ip-pag__btn">2</button>
                <button className="ip-pag__btn">3</button>
                <button className="ip-pag__btn"><Icon.ChevronRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 26 · Professores (cadastrar) ──────────────────────────────
const ScreenCoordProfessores = () => {
  const [lista, setLista] = React.useState([
    { nome: "Sophia Sant'ana", email: 'sophia.santana@institutoponte.org.br', disc: 'Matemática', turmas: '9ºA, 9ºB, 8ºA', ativo: true },
    { nome: 'Carla Mendes',    email: 'carla.mendes@institutoponte.org.br',   disc: 'Português',  turmas: '9ºB, 7ºA',       ativo: true },
    { nome: 'João Vieira',     email: 'joao.vieira@institutoponte.org.br',    disc: 'Matemática', turmas: '8ºA, 7ºB',       ativo: true },
    { nome: 'Renata Cardoso',  email: 'renata.cardoso@institutoponte.org.br', disc: 'Português',  turmas: '9ºC',            ativo: true },
    { nome: 'Marcos Pereira',  email: 'marcos.pereira@institutoponte.org.br', disc: 'Matemática', turmas: '—',              ativo: false },
  ]);
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [disc, setDisc] = React.useState('Matemática');
  const [ativo, setAtivo] = React.useState(true);
  const cadastrar = () => {
    if (!nome.trim()) return;
    setLista([{ nome: nome.trim(), email: email.trim(), disc, turmas: '—', ativo }, ...lista]);
    setNome(''); setEmail('');
  };

  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="coordenador" activeKey="professores"/>
        <main className="ip-shell__main">
          <Topbar title="Professores" subtitle="Gerencie o corpo docente e cadastre novos professores." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
          <div className="ip-shell__body" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'flex-start' }}>
            {/* Lista */}
            <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
                <h2>Corpo docente ({lista.length})</h2>
                <div className="ip-field-wrap" style={{ width: 240 }}>
                  <span className="ip-field-icon"><Icon.Search size={16}/></span>
                  <input className="ip-input" placeholder="Buscar professor…" style={{ height: 36, paddingLeft: 38 }}/>
                </div>
              </div>
              <table className="ip-table">
                <thead>
                  <tr><th>Professor</th><th>Disciplina</th><th>Turmas</th><th>Status</th><th style={{ width: 60 }}></th></tr>
                </thead>
                <tbody>
                  {lista.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="ip-avatar" style={{ width: 36, height: 36, fontSize: 12 }}>{iniciaisDe(p.nome)}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{p.nome}</div>
                            <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>{p.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{discPill(p.disc)}</td>
                      <td style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>{p.turmas}</td>
                      <td><span className={"ip-badge " + (p.ativo ? 'ip-badge--ok' : 'ip-badge--draft')}>{p.ativo ? 'Ativo' : 'Inativo'}</span></td>
                      <td><button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.MoreVertical size={16}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cadastro */}
            <aside style={{ position: 'sticky', top: 24 }}>
              <div className="ip-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center' }}><Icon.User size={18}/></div>
                  <h2>Cadastrar professor</h2>
                </div>
                <p className="ip-muted" style={{ fontSize: 13, marginBottom: 18 }}>O professor receberá um convite por e-mail para definir a senha.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="ip-field">
                    <label className="ip-field-label">Nome completo</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.User size={20}/></span>
                      <input className="ip-input" placeholder="Ex.: Mariana Lopes" value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">E-mail institucional</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.Mail size={20}/></span>
                      <input className="ip-input" placeholder="nome@institutoponte.org.br" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">Disciplina</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.Folder size={20}/></span>
                      <select className="ip-select" value={disc} onChange={e => setDisc(e.target.value)}>
                        <option>Matemática</option>
                        <option>Português</option>
                      </select>
                    </div>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">Status</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {[{ v: true, l: 'Ativo' }, { v: false, l: 'Inativo' }].map(s => {
                        const on = ativo === s.v;
                        return (
                          <button key={s.l} onClick={() => setAtivo(s.v)} style={{
                            flex: 1, height: 44, borderRadius: 12, cursor: 'pointer',
                            fontFamily: 'var(--ip-font-body)', fontSize: 14, fontWeight: 600,
                            border: '1.5px solid ' + (on ? 'var(--ip-azul)' : 'var(--ip-border)'),
                            background: on ? 'var(--ip-azul-50)' : '#fff',
                            color: on ? 'var(--ip-azul-700)' : 'var(--ip-text)',
                          }}>{s.l}</button>
                        );
                      })}
                    </div>
                  </div>
                  <button className="ip-btn ip-btn--primary" style={{ height: 46, marginTop: 4 }} onClick={cadastrar}>
                    <Icon.Plus size={16}/>Cadastrar professor
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 11 · Relatório consolidado de desempenho ──────────────────
const bandaDe = (n) => n >= 90 ? { l: 'Excelente', cls: 'ip-badge--ok' }
  : n >= 70 ? { l: 'Bom', cls: 'ip-badge--ok' }
  : n >= 50 ? { l: 'Regular', cls: 'ip-badge--warn' }
  : { l: 'Atenção', cls: 'ip-badge--err' };

const ScreenCoordRelatorio = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="coordenador" activeKey="relatorios"/>
      <main className="ip-shell__main">
        <Topbar title="Relatório consolidado" subtitle="Desempenho da turma na avaliação." userName="Lucca Freitas" userRole="Coordenador Pedagógico"/>
        <div className="ip-shell__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Voltar</button>
                <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>Provas &rsaquo; {PROVA_CTX.titulo} &rsaquo; Relatório</span>
              </div>
              <h1 style={{ fontSize: 24 }}>{PROVA_CTX.titulo} · {PROVA_CTX.turma}</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>{PROVA_CTX.disc} · aplicada em {PROVA_CTX.aplicada} · {PROVA_CTX.enviadas} submissões</p>
            </div>
            <button className="ip-btn ip-btn--primary"><Icon.Download size={16}/>Exportar PDF</button>
          </div>

          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
            <div className="ip-card" style={{ padding: 20 }}>
              <div className="ip-stat__label">Média geral da turma</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
                <Donut size={104} center={{ top: '72,4', bottom: '/ 100' }} segments={[
                  { v: 72, color: 'var(--ip-verde)' },
                  { v: 28, color: 'var(--ip-surface)' },
                ]}/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="ip-badge ip-badge--ok">Bom desempenho</span>
                  <span style={{ fontSize: 12, color: 'var(--ip-text-2)', lineHeight: 1.4 }}>72% de aproveitamento médio</span>
                </div>
              </div>
            </div>

            <div className="ip-card" style={{ padding: 20 }}>
              <div className="ip-stat__label">Desempenho por faixa</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {[
                  { l: '90–100', v: 18, n: 4,  c: 'var(--ip-verde)' },
                  { l: '70–89',  v: 44, n: 10, c: 'var(--ip-amarelo)' },
                  { l: '50–69',  v: 26, n: 6,  c: 'var(--ip-laranja)' },
                  { l: '0–49',   v: 12, n: 3,  c: 'var(--ip-vermelho)' },
                ].map((r, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span>{r.l}</span><span style={{ color: 'var(--ip-text-2)' }}>{r.v}% · {r.n} alunos</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                      <div style={{ width: (r.v * 2) + '%', height: '100%', background: r.c }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ip-card" style={{ padding: 20 }}>
              <div className="ip-stat__label">Questões com mais erros</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {[
                  { n: 'Q6', a: 'Funções quadráticas', v: '72%' },
                  { n: 'Q4', a: 'Sistemas lineares',    v: '65%' },
                  { n: 'Q9', a: 'Progressões',          v: '61%' },
                  { n: 'Q7', a: 'Função afim',          v: '48%' },
                  { n: 'Q3', a: 'Equações 2º grau',     v: '42%' },
                ].map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ip-vermelho-50)', color: '#A1241B', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.n} · {q.a}</span>
                    <span style={{ fontWeight: 600, color: 'var(--ip-vermelho)' }}>{q.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ip-card" style={{ padding: 20 }}>
              <div className="ip-stat__label">Resumo geral</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, fontSize: 13 }}>
                {[
                  { l: 'Total de alunos', v: '27',      icon: Icon.Users },
                  { l: 'Submissões',      v: '23',      icon: Icon.CheckCircle, c: 'var(--ip-verde)' },
                  { l: 'Não enviaram',    v: '4',       icon: Icon.AlertTriangle, c: 'var(--ip-laranja)' },
                  { l: 'Maior nota',      v: '98,0',    icon: Icon.Award, c: 'var(--ip-amarelo)' },
                  { l: 'Menor nota',      v: '38,0',    icon: Icon.TrendingUp, c: 'var(--ip-vermelho)' },
                ].map((r, i) => { const I = r.icon; return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <I size={14} color={r.c || 'var(--ip-text-2)'}/>
                    <span style={{ flex: 1 }}>{r.l}</span>
                    <span style={{ fontWeight: 600 }}>{r.v}</span>
                  </div>
                ); })}
              </div>
            </div>
          </div>

          {/* Tabela de alunos */}
          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
              <h2>Desempenho individual dos alunos</h2>
              <div className="ip-field-wrap" style={{ width: 240 }}>
                <span className="ip-field-icon"><Icon.Search size={16}/></span>
                <input className="ip-input" placeholder="Buscar aluno…" style={{ height: 36, paddingLeft: 38 }}/>
              </div>
            </div>
            <table className="ip-table">
              <thead>
                <tr>
                  <th>#</th><th>Aluno</th><th>Nota (/100)</th><th>Aproveitamento</th>
                  <th>Acertos</th><th>Erros</th><th>Desempenho</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: 1, name: 'Ana Clara Silva',     nota: 98.0, acertos: 49, erros: 1 },
                  { n: 2, name: 'João Pedro Santos',   nota: 87.0, acertos: 44, erros: 6 },
                  { n: 3, name: 'Maria Eduarda Lima',  nota: 76.0, acertos: 38, erros: 12 },
                  { n: 4, name: 'Lucas Gabriel Souza', nota: 68.0, acertos: 34, erros: 16 },
                  { n: 5, name: 'Fernanda Oliveira',   nota: 55.0, acertos: 28, erros: 22 },
                  { n: 6, name: 'Rafael Martins',      nota: 42.0, acertos: 21, erros: 29 },
                  { n: 7, name: 'Beatriz Cardoso',     nota: 38.0, acertos: 19, erros: 31 },
                ].map(s => {
                  const color = s.nota >= 70 ? 'var(--ip-verde)' : s.nota >= 50 ? 'var(--ip-laranja)' : 'var(--ip-vermelho)';
                  const b = bandaDe(s.nota);
                  return (
                    <tr key={s.n}>
                      <td style={{ color: 'var(--ip-text-2)' }}>{s.n}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="ip-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{iniciaisDe(s.name)}</div>
                          <span style={{ fontWeight: 500 }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{s.nota.toFixed(1).replace('.', ',')}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 120, height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                            <div style={{ width: s.nota + '%', height: '100%', background: color }}/>
                          </div>
                          <span style={{ fontWeight: 600, color, fontVariantNumeric: 'tabular-nums' }}>{s.nota.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td>{s.acertos}</td>
                      <td>{s.erros}</td>
                      <td><span className={"ip-badge " + b.cls}>{b.l}</span></td>
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

Object.assign(window, {
  BarChart, Donut, PROVA_CTX, CoordExamHeader, iniciaisDe, discPill, bandaDe,
  ScreenCoordProvas, ScreenCoordProfessores, ScreenCoordRelatorio,
  // Aliases de compatibilidade com referências antigas
  ScreenMetricasGerais: ScreenCoordProvas, ScreenRelatorio: ScreenCoordRelatorio,
});
