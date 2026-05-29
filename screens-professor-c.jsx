/* global React, Icon, Sidebar, Topbar, StatusBadge */

// ─── 7. Dashboard ──────────────────────────────────────────────
const ScreenDashboard = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="dashboard"/>
      <main className="ip-shell__main">
        <Topbar title="Olá, Sophia 👋" subtitle="Aqui está o resumo da sua semana letiva."/>
        <div className="ip-shell__body">
          {/* Welcome row */}
          <div style={{
            background: 'linear-gradient(110deg, var(--ip-azul) 0%, #5A5F95 60%, #4F537F 100%)',
            color: '#fff', borderRadius: 16, padding: '22px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 20, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ maxWidth: 580, zIndex: 2 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '.6px', padding: '4px 10px',
                background: 'rgba(249,178,51,.18)', color: '#F9B233',
                borderRadius: 999,
              }}>
                <Icon.Calendar size={12}/>Semana de 22–28 jun
              </span>
              <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 24, color: '#fff', marginTop: 8, lineHeight: 1.25 }}>
                3 provas para corrigir e 1 publicação programada para amanhã.
              </h1>
              <p style={{ marginTop: 6, fontSize: 14, opacity: .85 }}>
                Mantenha o ritmo.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, zIndex: 2 }}>
              <button className="ip-btn ip-btn--cta"><Icon.PlusSquare size={16}/>Nova prova</button>
              <button className="ip-btn ip-btn--ghost" style={{ background: 'rgba(255,255,255,.12)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}><Icon.Edit2 size={16}/>Corrigir agora</button>
            </div>
            {/* decoration */}
            <div style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.12)' }}/>
            <div style={{ position: 'absolute', right: 120, bottom: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,178,51,.22), transparent 70%)' }}/>
          </div>

          {/* Body grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
            {/* Agenda */}
            <div className="ip-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2>Agenda desta semana</h2>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
                  <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.ChevronLeft size={14}/></button>
                  <span style={{ fontWeight: 500 }}>22–28 jun · 2025</span>
                  <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.ChevronRight size={14}/></button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                {[
                  { d: 'Seg', n: 22, items: [{ c: 'var(--ip-azul)',    t: '9ºA · prova' }] },
                  { d: 'Ter', n: 23, items: [], today: true },
                  { d: 'Qua', n: 24, items: [{ c: 'var(--ip-amarelo)', t: 'Publicar 9ºA' }, { c: 'var(--ip-verde)', t: 'Reunião' }] },
                  { d: 'Qui', n: 25, items: [] },
                  { d: 'Sex', n: 26, items: [{ c: 'var(--ip-laranja)', t: 'Correção 8ºA' }] },
                  { d: 'Sáb', n: 27, items: [] },
                  { d: 'Dom', n: 28, items: [] },
                ].map((day, i) => (
                  <div key={i} style={{
                    background: day.today ? 'var(--ip-azul-100)' : 'var(--ip-surface)',
                    borderRadius: 12, padding: 10, minHeight: 110,
                    border: day.today ? '1.5px solid var(--ip-azul)' : '1px solid transparent',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: 'var(--ip-text-2)', textTransform: 'uppercase', fontWeight: 600 }}>{day.d}</span>
                      <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: day.today ? 'var(--ip-azul-700)' : 'var(--ip-text)' }}>{day.n}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {day.items.map((it, j) => (
                        <div key={j} style={{
                          background: '#fff', borderLeft: '3px solid ' + it.c,
                          padding: '4px 6px', borderRadius: 4,
                          fontSize: 11, color: 'var(--ip-text)',
                          lineHeight: 1.3,
                        }}>{it.t}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Upcoming list */}
              <hr className="ip-divider" style={{ margin: '18px 0' }}/>
              <h2 style={{ fontSize: 14, marginBottom: 10 }}>Próximas atividades</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { t: 'Publicar · Avaliação 9ºA', d: 'Amanhã, 14:00', tag: 'Programada', c: 'var(--ip-info-50)', tc: '#0B4D8A', icon: Icon.Calendar },
                  { t: 'Corrigir · 27 respostas pendentes', d: 'Recomendado até sexta', tag: 'Urgente', c: 'var(--ip-laranja-50)', tc: '#B65E00', icon: Icon.AlertTriangle },
                  { t: 'Revisar critérios · Recuperação 8ºA', d: 'Em rascunho · 3 questões', tag: 'Rascunho', c: '#ECECEC', tc: '#555', icon: Icon.Edit2 },
                ].map((row, i) => {
                  const I = row.icon;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, border: '1px solid var(--ip-border)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: row.c, color: row.tc, display: 'grid', placeItems: 'center' }}><I size={18}/></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{row.t}</div>
                        <div className="ip-muted" style={{ fontSize: 12 }}>{row.d}</div>
                      </div>
                      <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: row.c, color: row.tc, fontWeight: 600 }}>{row.tag}</span>
                      <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.ChevronRight size={16}/></button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Compact KPI stack */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { l: 'Correções pendentes', v: '3',  icon: Icon.Clock,       c: 'var(--ip-laranja)' },
                  { l: 'Provas publicadas',   v: '24', icon: Icon.CheckCircle, c: 'var(--ip-verde)' },
                ].map((s, i) => {
                  const I = s.icon;
                  return (
                    <div key={i} className="ip-stat" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="ip-stat__label" style={{ fontSize: 12 }}>{s.l}</div>
                        <div style={{ width: 32, height: 32, borderRadius: 10, background: s.c + '14', color: s.c, display: 'grid', placeItems: 'center' }}>
                          <I size={16}/>
                        </div>
                      </div>
                      <div className="ip-stat__value" style={{ fontSize: 26, marginTop: 0 }}>{s.v}</div>
                    </div>
                  );
                })}
              </div>

              {/* Activity feed */}
              <div className="ip-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h2>Atividade recente</h2>
                  <a style={{ fontSize: 13, color: 'var(--ip-azul)', cursor: 'pointer' }}>Ver tudo</a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { who: 'Ana Clara Silva',    act: 'enviou a prova', target: '9ºA · Bimestral', t: 'há 12 min', c: 'var(--ip-verde)' },
                    { who: 'Pedro Henrique',     act: 'iniciou',         target: '9ºA · Bimestral', t: 'há 25 min', c: 'var(--ip-azul)' },
                    { who: 'Você',               act: 'publicou',        target: 'Recuperação 8ºA', t: 'há 2 h',    c: 'var(--ip-amarelo)' },
                    { who: 'Mariana Costa',      act: 'salvou rascunho', target: '9ºB · Trabalho',  t: 'ontem',     c: 'var(--ip-info)' },
                  ].map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.c + '22', color: a.c, display: 'grid', placeItems: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700 }}>{a.who.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.45 }}>
                        <div><strong>{a.who}</strong> <span style={{ color: 'var(--ip-text-2)' }}>{a.act}</span> <strong>{a.target}</strong></div>
                        <span style={{ fontSize: 11, color: 'var(--ip-text-3)' }}>{a.t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 8. Minhas Turmas ──────────────────────────────────────────
const turmasData = [
  { nome: '9ºA',  disc: 'Matemática · Manhã',   alunos: 27, media: 82, provas: 5, ativa: true,  cor: '#6B6FA2' },
  { nome: '9ºB',  disc: 'Matemática · Manhã',   alunos: 25, media: 75, provas: 4, ativa: true,  cor: '#2196F3' },
  { nome: '9ºC',  disc: 'Matemática · Tarde',   alunos: 28, media: 71, provas: 4, ativa: true,  cor: '#4CAF50' },
  { nome: '8ºA',  disc: 'Matemática · Manhã',   alunos: 30, media: 68, provas: 5, ativa: true,  cor: '#F9B233' },
  { nome: '7ºA',  disc: 'Matemática · Tarde',   alunos: 29, media: 77, provas: 4, ativa: true,  cor: '#FF9800' },
  { nome: '7ºB',  disc: 'Matemática · Tarde',   alunos: 29, media: 65, provas: 2, ativa: true,  cor: '#9C5DCB' },
];

const ScreenMinhasTurmas = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="turmas"/>
      <main className="ip-shell__main">
        <Topbar title="Minhas Turmas" subtitle="Acompanhe o desempenho de cada uma das suas turmas."/>
        <div className="ip-shell__body">
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <h1>Visão geral</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>6 turmas · 168 alunos · 24 provas aplicadas no bimestre</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="ip-field-wrap" style={{ width: 280 }}>
                <span className="ip-field-icon"><Icon.Search size={18}/></span>
                <input className="ip-input" placeholder="Buscar turma…" style={{ height: 40 }}/>
              </div>
              <button className="ip-btn ip-btn--ghost"><Icon.Filter size={16}/>Período</button>
              <button className="ip-btn ip-btn--cta"><Icon.PlusSquare size={16}/>Nova turma</button>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
              { l: 'Turmas ativas',  v: '6',   icon: Icon.Users,        c: 'var(--ip-azul)' },
              { l: 'Total de alunos', v: '168', icon: Icon.User,         c: 'var(--ip-info)' },
              { l: 'Média ponderada', v: '74%', icon: Icon.TrendingUp,   c: 'var(--ip-verde)' },
              { l: 'Em atenção',     v: '12',  icon: Icon.AlertTriangle, c: 'var(--ip-vermelho)' },
            ].map((s, i) => {
              const I = s.icon;
              return (
                <div key={i} className="ip-stat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="ip-stat__label">{s.l}</div>
                    <div className="ip-stat__value">{s.v}</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: s.c + '14', color: s.c, display: 'grid', placeItems: 'center' }}><I size={22}/></div>
                </div>
              );
            })}
          </div>

          {/* Turma grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {turmasData.map((t, i) => (
              <div key={i} className="ip-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Header banner */}
                <div style={{ height: 72, background: `linear-gradient(120deg, ${t.cor} 0%, ${t.cor}aa 100%)`, position: 'relative', padding: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ color: '#fff' }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 24, lineHeight: 1 }}>{t.nome}</div>
                    <div style={{ fontSize: 12, opacity: .85, marginTop: 4 }}>{t.disc}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '4px 10px', borderRadius: 999,
                    background: t.ativa ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.18)',
                    color: '#fff',
                  }}>{t.ativa ? 'Ativa' : 'Encerrada'}</span>
                  <div style={{ position: 'absolute', right: -30, bottom: -40, width: 120, height: 120, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.18)' }}/>
                </div>

                {/* Body */}
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {/* Avatar pile + alunos count */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex' }}>
                      {[0,1,2,3].map(k => (
                        <div key={k} style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: ['#6B6FA2','#F9B233','#4CAF50','#2196F3'][k],
                          marginLeft: k === 0 ? 0 : -8,
                          border: '2px solid #fff',
                          display: 'grid', placeItems: 'center',
                          color: '#fff', fontSize: 10, fontWeight: 700,
                        }}>{String.fromCharCode(65 + k * 2)}{String.fromCharCode(67 + k * 2)}</div>
                      ))}
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--ip-surface)', color: 'var(--ip-text-2)',
                        marginLeft: -8, border: '2px solid #fff',
                        display: 'grid', placeItems: 'center',
                        fontSize: 10, fontWeight: 700,
                      }}>+{t.alunos - 4}</div>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>{t.alunos} alunos</span>
                  </div>

                  {/* Stats mini-grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ background: 'var(--ip-surface)', borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>Média da turma</div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 20, color: t.media > 75 ? 'var(--ip-verde)' : t.media > 65 ? 'var(--ip-amarelo-700)' : 'var(--ip-laranja)' }}>{t.media}%</div>
                    </div>
                    <div style={{ background: 'var(--ip-surface)', borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>Provas aplicadas</div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 20 }}>{t.provas}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ip-text-2)', marginBottom: 4 }}>
                      <span>Progresso do bimestre</span>
                      <span>62%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                      <div style={{ width: '62%', height: '100%', background: t.cor }}/>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <button className="ip-btn ip-btn--primary ip-btn--sm" style={{ flex: 1 }}>Ver turma<Icon.ChevronRight size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 8b. Criar Turma ───────────────────────────────────────────
const avatarCor = ['#6B6FA2', '#F9B233', '#4CAF50', '#2196F3', '#FF9800', '#9C5DCB'];
const iniciais = (n) => n.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

const ScreenCriarTurma = () => {
  const [nomeTurma, setNomeTurma] = React.useState('');
  const [disciplina, setDisciplina] = React.useState('Matemática');
  const [turno, setTurno] = React.useState('Manhã');
  const [ativa, setAtiva] = React.useState(true);
  const [students, setStudents] = React.useState([
    { nome: 'Ana Clara Silva',      email: 'ana.silva@aluno.institutoponte.org.br' },
    { nome: 'Pedro Henrique Souza', email: 'pedro.souza@aluno.institutoponte.org.br' },
    { nome: 'Mariana Oliveira',     email: 'mariana.oliveira@aluno.institutoponte.org.br' },
  ]);
  const [novoNome, setNovoNome] = React.useState('');
  const [novoEmail, setNovoEmail] = React.useState('');

  const addStudent = () => {
    if (!novoNome.trim()) return;
    setStudents([...students, { nome: novoNome.trim(), email: novoEmail.trim() }]);
    setNovoNome(''); setNovoEmail('');
  };
  const removeStudent = (i) => setStudents(students.filter((_, k) => k !== i));

  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="turmas"/>
        <main className="ip-shell__main">
          <Topbar title="Criar Turma" subtitle="Defina os dados da turma e adicione os alunos."/>
          <div className="ip-shell__body" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>
            {/* Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Informações da turma */}
              <div className="ip-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2>Informações da turma</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
                  <div className="ip-field">
                    <label className="ip-field-label">Nome da turma</label>
                    <input className="ip-input ip-input--bare" placeholder="Ex.: 9º A" value={nomeTurma} onChange={e => setNomeTurma(e.target.value)}/>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">Disciplina</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.Folder size={20}/></span>
                      <select className="ip-select" value={disciplina} onChange={e => setDisciplina(e.target.value)}>
                        <option>Matemática</option>
                        <option>Português</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Turno */}
                <div className="ip-field">
                  <label className="ip-field-label">Turno</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['Manhã', 'Tarde', 'Noite'].map(t => {
                      const active = turno === t;
                      return (
                        <button key={t} onClick={() => setTurno(t)} style={{
                          flex: 1, height: 48, borderRadius: 12, cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          fontFamily: 'var(--ip-font-body)', fontSize: 14, fontWeight: 600,
                          border: '1.5px solid ' + (active ? 'var(--ip-azul)' : 'var(--ip-border)'),
                          background: active ? 'var(--ip-azul-50)' : '#fff',
                          color: active ? 'var(--ip-azul-700)' : 'var(--ip-text)',
                          transition: 'border-color .15s, background .15s, color .15s',
                        }}>
                          <Icon.Clock size={16}/>{t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status */}
                <div className="ip-field">
                  <label className="ip-field-label">Status da turma</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { v: true,  l: 'Ativa',   d: 'Recebe e realiza provas',  c: 'var(--ip-verde)',  cb: 'var(--ip-verde-50)',  ct: '#1F6F22', icon: Icon.CheckCircle },
                      { v: false, l: 'Inativa', d: 'Arquivada, sem atividades', c: 'var(--ip-border-2)', cb: 'var(--ip-surface)', ct: 'var(--ip-text-2)', icon: Icon.Archive },
                    ].map(s => {
                      const active = ativa === s.v;
                      const I = s.icon;
                      return (
                        <button key={s.l} onClick={() => setAtiva(s.v)} style={{
                          flex: 1, padding: '14px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                          display: 'flex', alignItems: 'center', gap: 12,
                          fontFamily: 'var(--ip-font-body)',
                          border: '1.5px solid ' + (active ? s.c : 'var(--ip-border)'),
                          background: active ? s.cb : '#fff',
                          transition: 'border-color .15s, background .15s',
                        }}>
                          <span style={{
                            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                            display: 'grid', placeItems: 'center',
                            background: active ? s.c : 'var(--ip-surface)',
                            color: active ? '#fff' : 'var(--ip-text-2)',
                          }}><I size={18}/></span>
                          <span>
                            <span style={{ display: 'block', fontWeight: 600, fontSize: 14, color: active ? s.ct : 'var(--ip-text)' }}>{s.l}</span>
                            <span style={{ display: 'block', fontSize: 12, color: 'var(--ip-text-2)' }}>{s.d}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Alunos */}
              <div className="ip-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h2>Alunos ({students.length})</h2>
                </div>

                {/* Add row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr auto', gap: 10, alignItems: 'flex-end', marginBottom: 18 }}>
                  <div className="ip-field">
                    <label className="ip-field-label">Nome do aluno</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.User size={20}/></span>
                      <input className="ip-input" placeholder="Nome completo" value={novoNome}
                        onChange={e => setNovoNome(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addStudent()}/>
                    </div>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">E-mail</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.Mail size={20}/></span>
                      <input className="ip-input" placeholder="nome@aluno.institutoponte.org.br" value={novoEmail}
                        onChange={e => setNovoEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addStudent()}/>
                    </div>
                  </div>
                  <button className="ip-btn ip-btn--primary" style={{ height: 44 }} onClick={addStudent}>
                    <Icon.Plus size={16}/>Adicionar
                  </button>
                </div>

                {/* Student list */}
                {students.length === 0 ? (
                  <div style={{ border: '1.5px dashed var(--ip-border-2)', borderRadius: 12, padding: '32px 16px', textAlign: 'center', color: 'var(--ip-text-2)' }}>
                    <Icon.Users size={28} color="var(--ip-text-3)"/>
                    <p style={{ marginTop: 8, fontSize: 13 }}>Nenhum aluno adicionado ainda.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {students.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--ip-border)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: avatarCor[i % avatarCor.length], color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{iniciais(s.nome)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.nome}</div>
                          <div style={{ fontSize: 12, color: 'var(--ip-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.email || '— sem e-mail —'}</div>
                        </div>
                        <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" aria-label="Remover aluno" onClick={() => removeStudent(i)}>
                          <Icon.Trash2 size={16}/>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <button className="ip-btn ip-btn--ghost"><Icon.ChevronLeft size={16}/>Voltar</button>
                <button className="ip-btn ip-btn--primary"><Icon.CheckCircle size={16}/>Criar turma</button>
              </div>
            </div>

            {/* Aside · preview + resumo */}
            <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Live preview card */}
              <div className="ip-card" style={{ overflow: 'hidden' }}>
                <div style={{ height: 72, background: 'linear-gradient(120deg, var(--ip-azul) 0%, #5A5F95 100%)', position: 'relative', padding: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ color: '#fff' }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, lineHeight: 1 }}>{nomeTurma || 'Nova turma'}</div>
                    <div style={{ fontSize: 12, opacity: .85, marginTop: 4 }}>{disciplina} · {turno}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,.22)', color: '#fff' }}>{ativa ? 'Ativa' : 'Inativa'}</span>
                  <div style={{ position: 'absolute', right: -30, bottom: -40, width: 120, height: 120, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.18)' }}/>
                </div>
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon.Users size={18} color="var(--ip-text-2)"/>
                  <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>{students.length} {students.length === 1 ? 'aluno' : 'alunos'}</span>
                </div>
              </div>

              {/* Resumo */}
              <div className="ip-card" style={{ padding: 18 }}>
                <h2 style={{ marginBottom: 12 }}>Resumo</h2>
                {[
                  { l: 'Nome da turma', v: nomeTurma || '—' },
                  { l: 'Disciplina',    v: disciplina },
                  { l: 'Turno',         v: turno },
                  { l: 'Status',        v: ativa ? 'Ativa' : 'Inativa' },
                  { l: 'Total de alunos', v: String(students.length) },
                ].map((r, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--ip-border)' : 0, fontSize: 13 }}>
                    <span className="ip-muted">{r.l}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="ip-card" style={{ padding: 16, background: 'var(--ip-azul-50)', borderColor: 'var(--ip-azul-100)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon.User size={20} color="var(--ip-azul-700)"/>
                  <div style={{ fontSize: 13, color: 'var(--ip-azul-700)', lineHeight: 1.5 }}>
                    Os alunos receberão acesso por <strong>e-mail</strong> assim que a turma for criada.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 9. Questões (minhas) ──────────────────────────────────────
const questoesMinhas = [
  { id: 1, tipo: 'Objetiva',   dif: 'Fácil',   topico: 'Funções afim',         used: 4, q: 'Em uma função afim f(x) = ax + b, com a > 0, o gráfico é representado por uma reta…', score: 96 },
  { id: 2, tipo: 'Discursiva', dif: 'Média',   topico: 'Geometria plana',      used: 3, q: 'Demonstre algébricamente a fórmula resolutiva da equação do 2º grau a partir da forma canônica…' },
  { id: 3, tipo: 'Objetiva',   dif: 'Difícil', topico: 'Trigonometria',         used: 1, q: 'O valor de sen(75º) pode ser calculado a partir da fórmula de adição de arcos. Assinale o valor…' },
  { id: 4, tipo: 'Discursiva', dif: 'Média',   topico: 'Sistemas lineares',     used: 0, q: 'Considere o sistema de equações lineares abaixo. Resolva pelo método do escalonamento de Gauss…', draft: true },
  { id: 5, tipo: 'Objetiva',   dif: 'Média',   topico: 'Progressões geométricas', used: 2, q: 'Uma PG tem razão q e termo inicial a₁. Sabendo que a₃ = 36 e a₆ = 972, determine…' },
  { id: 6, tipo: 'Objetiva',   dif: 'Fácil',   topico: 'Equações 1º grau',     used: 5, q: 'Resolva a equação 4(x + 2) − 3x = 18 e indique o valor correto de x:' },
];

const difColor = d => d === 'Fácil' ? 'var(--ip-verde)' : d === 'Média' ? 'var(--ip-amarelo)' : 'var(--ip-vermelho)';

const ScreenQuestoes = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="questoes"/>
      <main className="ip-shell__main">
        <Topbar title="Minhas Questões" subtitle="Sua biblioteca pessoal de questões reutilizáveis."/>
        <div className="ip-shell__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <h1>Biblioteca pessoal</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>48 questões · 12 reutilizadas neste bimestre · 3 rascunhos</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="ip-btn ip-btn--ghost"><Icon.Upload size={16}/>Importar</button>
              <button className="ip-btn ip-btn--cta"><Icon.PlusSquare size={16}/>Nova questão</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
            {/* Filter sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ip-card" style={{ padding: 16 }}>
                <div className="ip-field-wrap" style={{ marginBottom: 14 }}>
                  <span className="ip-field-icon"><Icon.Search size={18}/></span>
                  <input className="ip-input" placeholder="Buscar questões…" style={{ height: 40 }}/>
                </div>

                <h2 style={{ fontSize: 13, color: 'var(--ip-text-2)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 8 }}>Tipo</h2>
                {[
                  { l: 'Todas',       n: 48, active: true },
                  { l: 'Objetivas',   n: 32 },
                  { l: 'Discursivas', n: 16 },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 10px', borderRadius: 8,
                    background: f.active ? 'var(--ip-azul-100)' : 'transparent',
                    color: f.active ? 'var(--ip-azul-700)' : 'var(--ip-text)',
                    fontSize: 13, cursor: 'pointer', fontWeight: f.active ? 600 : 400,
                  }}>{f.l}<span style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>{f.n}</span></div>
                ))}

                <h2 style={{ fontSize: 13, color: 'var(--ip-text-2)', textTransform: 'uppercase', letterSpacing: '.6px', margin: '16px 0 8px' }}>Dificuldade</h2>
                {[
                  { l: 'Fácil',   c: 'var(--ip-verde)',    n: 14 },
                  { l: 'Média',   c: 'var(--ip-amarelo)',  n: 22 },
                  { l: 'Difícil', c: 'var(--ip-vermelho)', n: 12 },
                ].map((f, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', fontSize: 13, cursor: 'pointer' }}>
                    <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid ' + f.c, background: i === 1 ? f.c : '#fff', display: 'grid', placeItems: 'center' }}>
                      {i === 1 && <Icon.CheckSquare size={10} color="#fff"/>}
                    </span>
                    <span style={{ flex: 1 }}>{f.l}</span>
                    <span style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>{f.n}</span>
                  </label>
                ))}

                <h2 style={{ fontSize: 13, color: 'var(--ip-text-2)', textTransform: 'uppercase', letterSpacing: '.6px', margin: '16px 0 8px' }}>Tópicos</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Álgebra','Geometria','Trigonometria','Funções','Sistemas','Estatística'].map((tag, i) => (
                    <span key={i} style={{
                      fontSize: 11, padding: '4px 10px',
                      borderRadius: 999,
                      background: 'var(--ip-surface)',
                      color: 'var(--ip-text-2)',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                </div>

                <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ width: '100%', marginTop: 16 }}>Limpar filtros</button>
              </div>
            </aside>

            {/* Question list */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 13 }}>
                <span className="ip-muted">Mostrando 6 de 48 questões</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {questoesMinhas.map(q => (
                  <div key={q.id} className="ip-card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      {q.tipo === 'Objetiva' ? <Icon.CheckSquare size={20}/> : <Icon.Edit2 size={20}/>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                        <span className="ip-badge ip-badge--azul">{q.tipo}</span>
                        <span className="ip-badge" style={{ background: difColor(q.dif) + '22', color: difColor(q.dif) }}>{q.dif}</span>
                        <span className="ip-badge">{q.topico}</span>
                        {q.draft && <span className="ip-badge ip-badge--draft"><Icon.Edit2 size={12}/>Rascunho</span>}
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ip-text)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{q.q}</p>
                      <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--ip-text-2)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon.FileText size={12}/>Usada em {q.used} {q.used === 1 ? 'prova' : 'provas'}</span>
                        {q.score && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--ip-verde)' }}><Icon.TrendingUp size={12}/>{q.score}% acerto</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.Eye size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginação */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, fontSize: 13 }}>
                <span className="ip-muted">Página 1 de 8</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}><Icon.ChevronLeft size={16}/></button>
                  {[1, 2, 3].map(n => (
                    <button key={n} className={"ip-btn ip-btn--sm" + (n === 1 ? ' ip-btn--primary' : ' ip-btn--ghost')} style={{ minWidth: 34, justifyContent: 'center', padding: '0 10px' }}>{n}</button>
                  ))}
                  <span style={{ color: 'var(--ip-text-2)', padding: '0 4px' }}>…</span>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ minWidth: 34, justifyContent: 'center', padding: '0 10px' }}>8</button>
                  <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 10. Banco de Questões ─────────────────────────────────────
const bancoData = [
  { id: 'B-014', autor: 'Carla Mendes',     disc: 'Português',  dif: 'Média',   topic: 'Orações adjetivas',    used: 42, rate: 4.8, tipo: 'Discursiva' },
  { id: 'B-015', autor: 'João Vieira',      disc: 'Matemática', dif: 'Difícil', topic: 'Funções quadráticas',  used: 28, rate: 4.6, tipo: 'Objetiva' },
  { id: 'B-018', autor: 'Sophia Sant\'ana', disc: 'Matemática', dif: 'Média',   topic: 'Sistemas lineares',    used: 19, rate: 4.7, tipo: 'Objetiva' },
  { id: 'B-024', autor: 'Renata Cardoso',   disc: 'Português',  dif: 'Difícil', topic: 'Análise sintática',    used: 33, rate: 4.9, tipo: 'Discursiva' },
  { id: 'B-029', autor: 'Carla Mendes',     disc: 'Português',  dif: 'Fácil',   topic: 'Concordância verbal',  used: 47, rate: 4.7, tipo: 'Objetiva' },
];

const ScreenBancoQuestoes = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="banco"/>
      <main className="ip-shell__main">
        <Topbar title="Banco de Questões" subtitle="Repositório compartilhado do Instituto Ponte."/>
        <div className="ip-shell__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <h1>Catálogo institucional</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>730 questões · curadoria pela coordenação pedagógica · atualizado em 22 jun</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="ip-btn ip-btn--ghost"><Icon.Upload size={16}/>Contribuir</button>
              <button className="ip-btn ip-btn--cta"><Icon.PlusSquare size={16}/>Adicionar à prova</button>
            </div>
          </div>

          {/* Discipline strip */}
          <div className="ip-card" style={{ padding: 14, marginBottom: 16, display: 'flex', gap: 8, overflow: 'hidden' }}>
            {[
              { l: 'Todas',       n: 730, active: true, c: 'var(--ip-azul)' },
              { l: 'Matemática',  n: 412, c: 'var(--ip-info)' },
              { l: 'Português',   n: 318, c: 'var(--ip-laranja)' },
            ].map((d, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                borderRadius: 10,
                background: d.active ? d.c : 'var(--ip-surface)',
                color: d.active ? '#fff' : 'var(--ip-text)',
                display: 'flex', flexDirection: 'column', gap: 2,
                cursor: 'pointer', minWidth: 110,
                border: d.active ? 0 : '1px solid var(--ip-border)',
              }}>
                <span style={{ fontSize: 11, opacity: d.active ? .85 : 1, color: d.active ? '#fff' : 'var(--ip-text-2)', fontWeight: 500 }}>{d.l}</span>
                <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18 }}>{d.n.toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
            <div className="ip-field-wrap" style={{ flex: 1, maxWidth: 420 }}>
              <span className="ip-field-icon"><Icon.Search size={18}/></span>
              <input className="ip-input" placeholder="Buscar por enunciado, tópico ou autor…" style={{ height: 40 }}/>
            </div>
            <button className="ip-btn ip-btn--ghost"><Icon.Filter size={14}/>Dificuldade<Icon.ChevronDown size={14}/></button>
            <button className="ip-btn ip-btn--ghost"><Icon.User size={14}/>Autor<Icon.ChevronDown size={14}/></button>
            <button className="ip-btn ip-btn--ghost"><Icon.Sliders size={14}/>Tipo<Icon.ChevronDown size={14}/></button>
            <div style={{ flex: 1 }}/>
            <span className="ip-muted" style={{ fontSize: 13 }}>730 resultados</span>
          </div>

          {/* Table */}
          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="ip-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}><span style={{ width: 18, height: 18, borderRadius: 4, border: '1.5px solid var(--ip-border-2)', display: 'inline-block', verticalAlign: 'middle' }}/></th>
                  <th>Código & enunciado</th>
                  <th>Autor</th>
                  <th>Disciplina</th>
                  <th>Dificuldade</th>
                  <th>Uso</th>
                  <th>Avaliação</th>
                  <th style={{ width: 140 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {bancoData.map(q => (
                  <tr key={q.id}>
                    <td>
                      <span style={{
                        width: 18, height: 18, borderRadius: 4,
                        border: '1.5px solid var(--ip-border-2)',
                        display: 'inline-block', verticalAlign: 'middle',
                        background: q.id === 'B-018' ? 'var(--ip-azul)' : '#fff',
                      }}>
                        {q.id === 'B-018' && <Icon.CheckSquare size={14} color="#fff"/>}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 360 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ip-text-2)' }}>#{q.id}</span>
                          <span className="ip-badge ip-badge--azul">{q.tipo}</span>
                        </div>
                        <span style={{ fontSize: 13, color: 'var(--ip-text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.topic} · enunciado curto da questão para preview…</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700 }}>{q.autor.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                        <span style={{ fontSize: 13 }}>{q.autor}</span>
                      </div>
                    </td>
                    <td><span className="ip-pill">{q.disc}</span></td>
                    <td><span className="ip-badge" style={{ background: difColor(q.dif) + '22', color: difColor(q.dif) }}>{q.dif}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Icon.FileText size={14} color="var(--ip-text-2)"/>
                        <span style={{ fontWeight: 600 }}>{q.used}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon.Award size={14} color="var(--ip-amarelo)"/>
                        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{q.rate.toFixed(1).replace('.', ',')}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.Eye size={16}/></button>
                        <button className="ip-btn ip-btn--primary ip-btn--sm"><Icon.Plus size={14}/>Usar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--ip-border)', gap: 16 }}>
              <span className="ip-muted" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>1 questão selecionada</span>

              {/* Paginação */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                <span className="ip-muted" style={{ marginRight: 6, whiteSpace: 'nowrap' }}>Página 1 de 73</span>
                <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}><Icon.ChevronLeft size={16}/></button>
                {[1, 2, 3].map(n => (
                  <button key={n} className={"ip-btn ip-btn--sm" + (n === 1 ? ' ip-btn--primary' : ' ip-btn--ghost')} style={{ minWidth: 34, justifyContent: 'center', padding: '0 10px' }}>{n}</button>
                ))}
                <span style={{ color: 'var(--ip-text-2)', padding: '0 4px' }}>…</span>
                <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ minWidth: 34, justifyContent: 'center', padding: '0 10px' }}>73</button>
                <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.ChevronRight size={16}/></button>
              </div>

              <div style={{ display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
                <button className="ip-btn ip-btn--ghost ip-btn--sm">Limpar seleção</button>
                <button className="ip-btn ip-btn--cta ip-btn--sm"><Icon.PlusSquare size={14}/>Adicionar à prova</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 11. Perfil ─────────────────────────────────────────────────
const ScreenConfiguracoes = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor"/>
      <main className="ip-shell__main">
        <Topbar title="Perfil" subtitle="Suas informações exibidas para alunos e coordenação."/>
        <div className="ip-shell__body">
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Profile card */}
              <div className="ip-card" style={{ padding: 24 }}>
                <h2>Dados pessoais</h2>
                <p className="ip-muted" style={{ fontSize: 13, marginTop: 4, marginBottom: 18 }}>Edite seu nome, foto, e-mail institucional e bio.</p>

                <div style={{ display: 'flex', gap: 18, alignItems: 'center', padding: 16, background: 'var(--ip-surface)', borderRadius: 12, marginBottom: 22 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontWeight: 700, fontSize: 28, flexShrink: 0 }}>SS</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>Sophia Sant'ana</div>
                    <div className="ip-muted" style={{ fontSize: 13 }}>Matemática · Instituto Ponte · entrou em mar/2024</div>
                  </div>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Camera size={14}/>Trocar foto</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="ip-field">
                    <label className="ip-field-label">Nome completo</label>
                    <input className="ip-input ip-input--bare" defaultValue="Sophia Sant'ana de Oliveira"/>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">Como prefere ser chamada</label>
                    <input className="ip-input ip-input--bare" defaultValue="Sophia"/>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">E-mail institucional</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.Mail size={20}/></span>
                      <input className="ip-input" defaultValue="sophia.santana@institutoponte.org.br"/>
                    </div>
                  </div>
                  <div className="ip-field">
                    <label className="ip-field-label">Disciplina</label>
                    <div className="ip-field-wrap">
                      <span className="ip-field-icon"><Icon.Folder size={20}/></span>
                      <select className="ip-select"><option>Matemática</option></select>
                    </div>
                  </div>
                  <div className="ip-field" style={{ gridColumn: 'span 2' }}>
                    <label className="ip-field-label">Mini-biografia <span className="ip-muted" style={{ fontWeight: 400 }}>· exibida no perfil compartilhado</span></label>
                    <textarea className="ip-textarea" defaultValue="Mais de 12 anos lecionando Matemática para o Ensino Fundamental II. Acredito em aprendizagem ativa e em avaliações que valorizam o raciocínio, não a memória."/>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
                  <button className="ip-btn ip-btn--ghost">Descartar alterações</button>
                  <button className="ip-btn ip-btn--primary"><Icon.Save size={16}/>Salvar perfil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

Object.assign(window, { ScreenDashboard, ScreenMinhasTurmas, ScreenCriarTurma, ScreenQuestoes, ScreenBancoQuestoes, ScreenConfiguracoes });
