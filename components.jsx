/* global React, Icon */
// Shared UI primitives for the Instituto Ponte prototype.

const Logo = ({ height = 36 }) => (
  <img
    src="assets/arandu-logo.png"
    alt="Arandu"
    style={{ height, width: 'auto', display: 'block' }}
  />
);

const BrandLockup = ({ inverted = false }) => (
  <div className="ip-sidebar__brand" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6, color: inverted ? '#fff' : 'var(--ip-text)', padding: '8px 4px 28px' }}>
    <div style={{ background: '#efefef', padding: '8px 12px', borderRadius: 10, display: 'inline-flex' }}>
      <Logo height={32}/>
    </div>
    <span style={{
      fontSize: 11, fontWeight: 600, opacity: .6,
      fontFamily: 'var(--ip-font-body)',
      textTransform: 'uppercase', letterSpacing: '.8px',
      paddingLeft: 4,
    }}>Instituto Ponte</span>
  </div>
);

const NavItem = ({ icon: I, label, active, badge }) => (
  <div role="button" tabIndex={0} className={"ip-nav-item " + (active ? "ip-nav-item--active" : "")} style={{ cursor: 'pointer' }}>
    <I size={20} />
    <span style={{ flex: 1 }}>{label}</span>
    {badge != null ? (
      <span style={{
        background: active ? 'var(--ip-amarelo)' : 'rgba(255,255,255,.18)',
        color: active ? '#2A1F00' : '#fff',
        fontSize: 11, fontWeight: 700,
        padding: '2px 8px', borderRadius: 999,
      }}>{badge}</span>
    ) : null}
  </div>
);

const Sidebar = ({ role = 'professor', activeKey }) => {
  const items = role === 'professor' ? [
    { key: 'dashboard', label: 'Dashboard', icon: Icon.Home },
    { key: 'turmas', label: 'Minhas Turmas', icon: Icon.Users },
    { key: 'provas', label: 'Minhas Provas', icon: Icon.FileText, badge: 3 },
    { key: 'questoes', label: 'Questões', icon: Icon.HelpCircle },
    { key: 'banco', label: 'Banco de Questões', icon: Icon.Database },
  ] : [
    { key: 'provas', label: 'Provas', icon: Icon.FileText },
    { key: 'professores', label: 'Professores', icon: Icon.Users },
    { key: 'relatorios', label: 'Relatórios', icon: Icon.BarChart },
  ];
  return (
    <aside className="ip-sidebar">
      <BrandLockup inverted />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {items.map(it => (
          <div key={it.key} style={{ paddingLeft: it.indent ? 16 : 0 }}>
            <NavItem icon={it.icon} label={it.label} active={it.key === activeKey} badge={it.badge}/>
          </div>
        ))}
      </div>
    </aside>
  );
};

const Topbar = ({ title, subtitle, userName = "Sophia Sant'ana", userRole = "Professora · Matemática" }) => {
  const initials = userName.replace(/^Prof[ªºo°.]*\s*/i, '').split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return (
  <header className="ip-topbar">
    <div className="ip-topbar__title-wrap">
      <div className="ip-topbar__title">{title}</div>
      {subtitle ? <div className="ip-topbar__subtitle">{subtitle}</div> : null}
    </div>
    <div className="ip-topbar__right">
      <div className="ip-user">
        <div className="ip-avatar">{initials}</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{userName}</span>
          <span style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>{userRole}</span>
        </div>
        <Icon.ChevronDown size={16}/>
      </div>
    </div>
  </header>
  );
};

// Status pills (matches the WAD status taxonomy)
const StatusBadge = ({ status }) => {
  const map = {
    'Pendente':            { cls: 'ip-badge--warn',  icon: Icon.Clock },
    'Rascunho':            { cls: 'ip-badge--draft', icon: Icon.Edit2 },
    'Programada':          { cls: 'ip-badge--info',  icon: Icon.Calendar },
    'Publicada':           { cls: 'ip-badge--azul',  icon: Icon.Send },
    'Realizada':           { cls: 'ip-badge--azul',  icon: Icon.CheckCircle },
    'Em correção':         { cls: 'ip-badge--warn',  icon: Icon.Edit2 },
    'Pendente de Correção':{ cls: 'ip-badge--warn',  icon: Icon.Clock },
    'Corrigida':           { cls: 'ip-badge--ok',    icon: Icon.CheckCircle },
  };
  const m = map[status] || { cls: 'ip-badge--draft', icon: Icon.Clock };
  const I = m.icon;
  return (
    <span className={"ip-badge " + m.cls}>
      <I size={14}/>{status}
    </span>
  );
};

// Question-palette dot states (aluno screens)
const QuestionDot = ({ n, state = 'idle' }) => (
  <div className={"ip-question-dot ip-question-dot--" + state}>{n}</div>
);

Object.assign(window, { Logo, BrandLockup, Sidebar, Topbar, NavItem, StatusBadge, QuestionDot });
