/* global React, Icon, Sidebar, Topbar, StatusBadge */
// Professor screens for Instituto Ponte · Avalia

// ─── 1. Login ──────────────────────────────────────────────────
const ScreenLogin = () => {
  const [remember, setRemember] = React.useState(true);
  const [showPwd, setShowPwd] = React.useState(false);
  return (
  <div className="ip-app" style={{ height: '100%', display: 'flex' }}>
    {/* Left visual */}
    <div style={{
      flex: '0 0 46%',
      background: 'linear-gradient(155deg, #6B6FA2 0%, #4F537F 75%)',
      color: '#fff',
      padding: '56px 64px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* logo + brand */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, zIndex: 2, alignItems: 'flex-start' }}>
        <div style={{ background: '#efefef', padding: '14px 20px', borderRadius: 14, display: 'inline-flex', boxShadow: '0 6px 20px rgba(0,0,0,.12)' }}>
          <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 56, width: 'auto', display: 'block' }}/>
        </div>
        <span style={{ fontSize: 13, opacity: .85, letterSpacing: '.8px', textTransform: 'uppercase', paddingLeft: 4, fontWeight: 500 }}>Instituto Ponte</span>
      </div>

      {/* Hero */}
      <div style={{ margin: 'auto 0', maxWidth: 520, zIndex: 2 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(249,178,51,.18)',
          border: '1px solid rgba(249,178,51,.35)',
          color: '#F9B233',
          fontSize: 12, fontWeight: 600,
          letterSpacing: '.4px',
          marginBottom: 22,
        }}>
          <Icon.FileText size={14}/>
          Avaliações remotas · Instituto Ponte
        </span>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: '#fff', letterSpacing: '-.5px' }}>
          Avaliações <span style={{ color: '#F9B233' }}>centralizadas</span>,
          <br/>correção <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
            isonômica
            <svg width="100%" height="10" viewBox="0 0 240 10" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: -6 }}>
              <path d="M2 6 C 60 2, 120 9, 238 4" stroke="#F9B233" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </span>.
        </h1>
        <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.65, opacity: .85, maxWidth: 460 }}>
          Crie, aplique e corrija provas em um único ambiente. Reduza o trabalho operacional e acompanhe o desempenho da turma com dados confiáveis.
        </p>

        {/* Feature pillars (real platform capabilities, not synthetic metrics) */}
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: Icon.PlusSquare,  t: 'Crie provas em minutos',         d: 'Editor de questões objetivas e discursivas, com banco reutilizável.' },
            { icon: Icon.Users,       t: 'Correção isonômica por questão', d: 'Veja todas as respostas anonimizadas e aplique critérios padronizados.' },
            { icon: Icon.BarChart,    t: 'Insights pedagógicos em tempo real', d: 'Métricas de acerto e gargalos por questão para apoiar a coordenação.' },
          ].map((f, i) => {
            const I = f.icon;
            return (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,.12)',
                  border: '1px solid rgba(255,255,255,.18)',
                  display: 'grid', placeItems: 'center',
                  color: '#F9B233',
                  flexShrink: 0,
                }}>
                  <I size={18}/>
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{f.t}</div>
                  <div style={{ fontSize: 13, opacity: .75, lineHeight: 1.5, marginTop: 2 }}>{f.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* decorative shapes */}
      <div style={{ position: 'absolute', right: -120, top: -120, width: 340, height: 340, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.12)' }}/>
      <div style={{ position: 'absolute', right: -200, top: -200, width: 480, height: 480, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.06)' }}/>
      <div style={{ position: 'absolute', left: -60, bottom: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(249,178,51,.18), transparent 65%)' }}/>
      <div style={{ position: 'absolute', right: 50, top: 120, width: 14, height: 14, borderRadius: 4, background: '#F9B233', transform: 'rotate(15deg)', opacity: .8 }}/>
      <div style={{ position: 'absolute', right: 200, top: 90, width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,.4)' }}/>
    </div>

    {/* Right form */}
    <div style={{ flex: 1, padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff' }}>
      <div style={{ maxWidth: 420, width: '100%', margin: '0 auto' }}>
        <h1 className="ip-display" style={{ fontSize: 32 }}>Seja bem-vindo(a)!</h1>
        <p className="ip-muted" style={{ marginTop: 8, fontSize: 16 }}>Efetue o login para acessar a plataforma.</p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="ip-field">
            <label className="ip-field-label">E-mail</label>
            <div className="ip-field-wrap">
              <span className="ip-field-icon"><Icon.Mail size={20}/></span>
              <input className="ip-input" defaultValue="sophia.santana@institutoponte.org.br"/>
            </div>
          </div>
          <div className="ip-field">
            <label className="ip-field-label">Senha</label>
            <div className="ip-field-wrap">
              <span className="ip-field-icon"><Icon.Lock size={20}/></span>
              <input className="ip-input" type={showPwd ? 'text' : 'password'} defaultValue="sophia2025"/>
              <span
                role="button"
                aria-label={showPwd ? 'Ocultar senha' : 'Exibir senha'}
                onClick={() => setShowPwd(v => !v)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: showPwd ? 'var(--ip-azul)' : 'var(--ip-text-2)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                {showPwd ? <Icon.EyeOff size={20}/> : <Icon.Eye size={20}/>}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label
              role="button"
              aria-pressed={remember}
              onClick={() => setRemember(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ip-text-2)', cursor: 'pointer', userSelect: 'none' }}>
              <span style={{
                width: 18, height: 18, borderRadius: 4,
                border: remember ? '1.5px solid var(--ip-azul)' : '1.5px solid var(--ip-border-2)',
                background: remember ? 'var(--ip-azul)' : '#fff',
                display: 'grid', placeItems: 'center',
                transition: 'background .15s ease, border-color .15s ease',
              }}>
                {remember && <Icon.CheckSquare size={12} color="#fff"/>}
              </span>
              Mantenha-me conectada
            </label>
          </div>

          <button className="ip-btn ip-btn--cta" style={{ height: 48, marginTop: 8, width: '100%', fontSize: 15 }}>
            Entrar na plataforma
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ip-text-3)', fontSize: 12, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--ip-border)' }}/>OU<div style={{ flex: 1, height: 1, background: 'var(--ip-border)' }}/>
          </div>

          <div role="button" style={{
            border: '1px solid var(--ip-border)',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            gap: 14,
            cursor: 'pointer',
            alignItems: 'center',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center' }}>
              <Icon.User size={22}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Para candidatos</div>
              <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>Acesso via link único enviado por e-mail</div>
            </div>
            <Icon.ChevronRight size={20} color="var(--ip-text-2)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// ─── 2. Minhas Provas ──────────────────────────────────────────
const provasRows = [
  { id: 5, name: 'Avaliação Bimestral · Funções',          bim: '1º Bimestre · 90 questões', turma: '9ºC', created: '13/06/2025 · 14:35', status: 'Pendente de Correção' },
  { id: 4, name: 'Recuperação · Equações do 2º grau',      bim: '1º Bimestre · 12 questões', turma: '8ºA', created: '13/06/2025 · 14:45', status: 'Corrigida' },
  { id: 3, name: 'Trabalho · Trigonometria aplicada',      bim: '1º Bimestre · 6 questões',  turma: '9ºB', created: '12/06/2025 · 13:00', status: 'Pendente de Correção' },
  { id: 2, name: 'Quiz · Progressões aritméticas',         bim: '1º Bimestre · 10 questões', turma: '7ºA', created: '11/06/2025 · 12:00', status: 'Corrigida' },
  { id: 1, name: 'Diagnóstica · Geometria plana',          bim: '1º Bimestre · 8 questões',  turma: '9ºA', created: '07/06/2025 · 09:00', status: 'Corrigida' },
  { id: 6, name: 'Simulado · ENEM bloco 1',                bim: '2º Bimestre · 45 questões', turma: '9ºA', created: '20/06/2025 · 08:15', status: 'Programada' },
  { id: 7, name: 'Esboço · Sistemas lineares',             bim: '— em edição —',             turma: '—',   created: '21/06/2025 · 16:40', status: 'Rascunho' },
];

const ScreenMinhasProvas = () => {
  const [tab, setTab] = React.useState('Todas');
  const tabs = ['Todas', 'Pendentes de Correção', 'Corrigidas', 'Programadas', 'Rascunhos'];
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar
            title="Olá, Sophia 👋"
            subtitle="Gerencie suas provas e visualize o progresso das correções."
          />
          <div className="ip-shell__body">
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 24 }}>Minhas Provas</h1>
                <p className="ip-muted" style={{ marginTop: 4 }}>32 provas · 3 aguardando correção</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div className="ip-field-wrap" style={{ width: 320 }}>
                  <span className="ip-field-icon"><Icon.Search size={18}/></span>
                  <input className="ip-input" placeholder="Buscar por título ou turma…" style={{ height: 40 }}/>
                </div>
                <button className="ip-btn ip-btn--ghost"><Icon.Folder size={16}/>Disciplina<Icon.ChevronDown size={14}/></button>
                <button className="ip-btn ip-btn--ghost"><Icon.Filter size={16}/>Filtros</button>
                <button className="ip-btn ip-btn--cta"><Icon.PlusSquare size={16}/>Nova Prova</button>
              </div>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
              {[
                { l: 'Pendentes de correção', v: '3',   icon: Icon.Clock,        color: 'var(--ip-laranja)' },
                { l: 'Provas corrigidas',     v: '24',  icon: Icon.CheckCircle,  color: 'var(--ip-verde)' },
                { l: 'Programadas',           v: '4',   icon: Icon.Calendar,     color: 'var(--ip-info)' },
                { l: 'Turmas ativas',         v: '6',   icon: Icon.Users,        color: 'var(--ip-azul)' },
              ].map((s, i) => {
                const I = s.icon;
                return (
                  <div key={i} className="ip-stat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="ip-stat__label">{s.l}</div>
                      <div className="ip-stat__value">{s.v}</div>
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color + '14', color: s.color, display: 'grid', placeItems: 'center' }}>
                      <I size={24}/>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table card */}
            <div className="ip-card">
              <div className="ip-tabs" style={{ padding: '0 16px' }}>
                {tabs.map(t => (
                  <div key={t} className={"ip-tab " + (t === tab ? 'ip-tab--active' : '')} onClick={() => setTab(t)}>
                    {t} {t === 'Pendentes de Correção' && <span style={{ background: 'var(--ip-laranja)', color: '#fff', borderRadius: 999, padding: '1px 7px', fontSize: 11, fontWeight: 700, marginLeft: 6 }}>3</span>}
                  </div>
                ))}
              </div>
              <table className="ip-table">
                <thead>
                  <tr>
                    <th>Título da Prova</th>
                    <th>Turma</th>
                    <th>Data de Criação</th>
                    <th>Status</th>
                    <th style={{ width: 220 }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {provasRows.map(r => (
                    <tr key={r.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center' }}>
                            <Icon.FileText size={20}/>
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{r.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>{r.bim}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="ip-pill">{r.turma}</span></td>
                      <td>{r.created}</td>
                      <td><StatusBadge status={r.status}/></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {(r.status === 'Pendente de Correção' || r.status === 'Em correção') && (
                            <button className="ip-btn ip-btn--primary ip-btn--sm"><Icon.Edit2 size={14}/>Corrigir</button>
                          )}
                          {r.status === 'Rascunho' && (
                            <button className="ip-btn ip-btn--primary ip-btn--sm"><Icon.Edit2 size={14}/>Editar</button>
                          )}
                          <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Eye size={14}/>Visualizar</button>
                          <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" aria-label="Mais"><Icon.MoreVertical size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' }}>
                <span className="ip-muted" style={{ fontSize: 13 }}>Mostrando 1–7 de 32 provas</span>
                <div className="ip-pag">
                  <button className="ip-pag__btn"><Icon.ChevronLeft size={16}/></button>
                  <button className="ip-pag__btn ip-pag__btn--active">1</button>
                  <button className="ip-pag__btn">2</button>
                  <button className="ip-pag__btn">3</button>
                  <button className="ip-pag__btn">4</button>
                  <button className="ip-pag__btn"><Icon.ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 3. Criar Prova ────────────────────────────────────────────
const ScreenCriarProva = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Criar Prova" subtitle="Configure detalhes, adicione questões e publique para sua turma."/>
        <div className="ip-shell__body" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'flex-start' }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="ip-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h2>Informações da prova</h2>
              <div className="ip-field">
                <label className="ip-field-label">Título da prova</label>
                <input className="ip-input ip-input--bare" defaultValue="Avaliação de Matemática · 2º Bimestre"/>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="ip-field">
                  <label className="ip-field-label">Disciplina</label>
                  <div className="ip-field-wrap">
                    <span className="ip-field-icon"><Icon.Folder size={20}/></span>
                    <select className="ip-select"><option>Matemática · 9º ano</option></select>
                  </div>
                </div>
                <div className="ip-field">
                  <label className="ip-field-label">Turma</label>
                  <div className="ip-field-wrap">
                    <span className="ip-field-icon"><Icon.Users size={20}/></span>
                    <select className="ip-select"><option>9ºA · 27 alunos</option></select>
                  </div>
                </div>
                <div className="ip-field">
                  <label className="ip-field-label">Início</label>
                  <div className="ip-field-wrap">
                    <span className="ip-field-icon"><Icon.Calendar size={20}/></span>
                    <input className="ip-input" defaultValue="24/06/2025 · 14:00"/>
                  </div>
                </div>
                <div className="ip-field">
                  <label className="ip-field-label">Duração</label>
                  <div className="ip-field-wrap">
                    <span className="ip-field-icon"><Icon.Clock size={20}/></span>
                    <input className="ip-input" defaultValue="01h 30min"/>
                  </div>
                </div>
              </div>
              <div className="ip-field">
                <label className="ip-field-label">Descrição e instruções gerais</label>
                <textarea className="ip-textarea" defaultValue="Esta avaliação contempla os conteúdos de funções afim, quadrática e sistemas lineares. Leia com atenção cada enunciado. Não é permitido o uso de calculadora."/>
              </div>
            </div>

            {/* Questões */}
            <div className="ip-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Questões (3)</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Download size={14}/>Importar</button>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Database size={14}/>Do banco</button>
                </div>
              </div>

              {/* Question type picker */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[
                  { l: 'Objetiva', d: 'Múltipla escolha · correção automática', icon: Icon.CheckSquare, active: true },
                  { l: 'Discursiva', d: 'Resposta em texto · correção isonômica', icon: Icon.Edit2 },
                ].map((t, i) => {
                  const I = t.icon;
                  return (
                    <div key={i} style={{
                      padding: 14, borderRadius: 12,
                      border: '1.5px solid ' + (t.active ? 'var(--ip-azul)' : 'var(--ip-border)'),
                      background: t.active ? 'var(--ip-azul-50)' : '#fff',
                      display: 'flex', gap: 12, alignItems: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: t.active ? 'var(--ip-azul)' : 'var(--ip-surface)', color: t.active ? '#fff' : 'var(--ip-text)', display: 'grid', placeItems: 'center' }}>
                        <I size={20}/>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{t.l}</div>
                        <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>{t.d}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Question list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  {
                    n: 1, type: 'Objetiva', peso: '1,0',
                    body: 'Um pacote de biscoitos custa R$ 4,50. Se Paulo comprou uma certa quantidade desses pacotes e pagou um total de R$ 27,00, quantos pacotes de biscoitos ele comprou?',
                    options: [
                      { a: 'A', t: '4 pacotes' },
                      { a: 'B', t: '5 pacotes' },
                      { a: 'C', t: '6 pacotes', correct: true },
                      { a: 'D', t: '7 pacotes' },
                    ]
                  },
                  {
                    n: 2, type: 'Discursiva', peso: '2,0',
                    body: 'Demonstre, de forma algébrica, a fórmula resolutiva para uma equação do 2º grau ax² + bx + c = 0.',
                  },
                  {
                    n: 3, type: 'Objetiva', peso: '1,0',
                    body: 'Em uma função afim f(x) = ax + b, com a > 0, o gráfico é representado por:',
                    options: [
                      { a: 'A', t: 'Reta crescente', correct: true },
                      { a: 'B', t: 'Reta decrescente' },
                      { a: 'C', t: 'Parábola côncava para cima' },
                      { a: 'D', t: 'Hipérbole' },
                    ]
                  }
                ].map(q => (
                  <div key={q.n} style={{ border: '1px solid var(--ip-border)', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>{q.n}</span>
                        <span className="ip-badge ip-badge--azul">{q.type}</span>
                        <span className="ip-badge">Peso {q.peso}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.Edit2 size={16}/></button>
                        <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.Trash2 size={16}/></button>
                      </div>
                    </div>
                    <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55 }}>{q.body}</p>
                    {q.options && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
                        {q.options.map(o => (
                          <div key={o.a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: o.correct ? 'var(--ip-verde-50)' : 'var(--ip-surface)', fontSize: 13 }}>
                            <span style={{ width: 22, height: 22, borderRadius: '50%', background: o.correct ? 'var(--ip-verde)' : '#fff', color: o.correct ? '#fff' : 'var(--ip-text)', border: o.correct ? 0 : '1px solid var(--ip-border)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700 }}>{o.a}</span>
                            <span>{o.t}</span>
                            {o.correct && <Icon.CheckCircle size={14} color="var(--ip-verde)"/>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="ip-btn ip-btn--ghost" style={{ marginTop: 16, width: '100%', height: 48, borderStyle: 'dashed' }}>
                <Icon.Plus size={18}/> Adicionar questão
              </button>
            </div>

            {/* Action row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <button className="ip-btn ip-btn--ghost"><Icon.ChevronLeft size={16}/>Voltar</button>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="ip-btn ip-btn--ghost"><Icon.Save size={16}/>Salvar rascunho</button>
                <button className="ip-btn ip-btn--cta"><Icon.Send size={16}/>Publicar prova</button>
                <button className="ip-btn ip-btn--primary">Continuar <Icon.ChevronRight size={16}/></button>
              </div>
            </div>
          </div>

          {/* Right preview / config aside */}
          <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="ip-card" style={{ padding: 18 }}>
              <h2 style={{ marginBottom: 12 }}>Resumo</h2>
              {[
                { l: 'Total de questões', v: '3' },
                { l: 'Objetivas',          v: '2' },
                { l: 'Discursivas',        v: '1' },
                { l: 'Pontuação total',    v: '4,0 pts' },
                { l: 'Duração estimada',   v: '90 min' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px dashed var(--ip-border)' : 0, fontSize: 13 }}>
                  <span className="ip-muted">{r.l}</span>
                  <span style={{ fontWeight: 600 }}>{r.v}</span>
                </div>
              ))}
            </div>

            <div className="ip-card" style={{ padding: 18 }}>
              <h2 style={{ marginBottom: 12 }}>Configurações</h2>
              {[
                { l: 'Embaralhar questões',          on: true },
                { l: 'Permitir anexar arquivo',      on: true },
                { l: 'Permitir QR code (foto mobile)', on: true },
                { l: 'Mostrar tempo restante',       on: true },
                { l: 'Liberar gabarito ao final',    on: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px dashed var(--ip-border)' : 0 }}>
                  <span style={{ fontSize: 13 }}>{s.l}</span>
                  <div style={{
                    width: 38, height: 22, borderRadius: 999,
                    background: s.on ? 'var(--ip-azul)' : 'var(--ip-border-2)',
                    position: 'relative', cursor: 'pointer'
                  }}>
                    <span style={{ position: 'absolute', top: 2, left: s.on ? 18 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .15s' }}/>
                  </div>
                </div>
              ))}
            </div>

            <div className="ip-card" style={{ padding: 16, background: 'var(--ip-amarelo-50)', borderColor: 'var(--ip-amarelo)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon.AlertTriangle size={20} color="#C88800"/>
                <div style={{ fontSize: 13, color: '#7A4F00', lineHeight: 1.5 }}>
                  Após <strong>publicar</strong> a prova, o link será gerado e não será possível editar a estrutura das questões.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  </div>
);

Object.assign(window, { ScreenLogin, ScreenMinhasProvas, ScreenCriarProva });
