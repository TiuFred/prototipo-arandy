/* global React, Icon */

// ─── A1. Aviso da Prova ────────────────────────────────────────
// `checked` controla o estado da caixa "Li e entendi". Default true
// preserva a tela 07. Tela 18 usa checked={false} (estado inicial).
const ScreenAvisoProva = ({ checked = true }) => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-prova-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div className="ip-prova-top">
        <div className="ip-prova-top__brand">
          <div style={{ background: '#efefef', padding: '6px 12px', borderRadius: 10, display: 'inline-flex' }}>
            <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 28, width: 'auto', display: 'block' }}/>
          </div>
          <h1>Avaliação Online · Português</h1>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(255,255,255,.15)', borderRadius: 999, fontSize: 13 }}>
          <Icon.User size={16}/> Mariana Oliveira · 9ºA
        </span>
      </div>

      <div style={{ padding: '40px 56px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 880, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { l: 'Professora', v: 'Sophia Sant\'ana', icon: Icon.User },
            { l: 'Turma',      v: '9ºA · Matemática',  icon: Icon.Users },
            { l: 'Data',       v: '24 jun · 14:00',    icon: Icon.Calendar },
          ].map((it, i) => {
            const I = it.icon;
            return (
              <div key={i} style={{
                background: '#fff', borderRadius: 14, padding: 16,
                display: 'flex', gap: 14, alignItems: 'center',
                border: '1px solid var(--ip-border)',
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center' }}>
                  <I size={22}/>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--ip-text-2)', fontWeight: 500 }}>{it.l}</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{it.v}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="ip-card" style={{ width: '100%', maxWidth: 880, padding: 28 }}>
          <h1 style={{ fontSize: 22 }}>Olá, Mariana! Antes de começar…</h1>
          <p className="ip-muted" style={{ marginTop: 6, marginBottom: 22 }}>
            Leia atentamente as instruções abaixo. Você pode iniciar a prova quando estiver pronta.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: Icon.Clock,         t: 'Tempo de duração',     d: '01h 30min após iniciar. O cronômetro continua mesmo se você atualizar a página.', color: 'var(--ip-azul)' },
              { icon: Icon.Sliders,       t: 'Tipo de questões',     d: '8 objetivas + 2 discursivas. Cada questão pode ter peso diferente.', color: 'var(--ip-azul)' },
              { icon: Icon.Compass,       t: 'Navegação livre',      d: 'Você pode pular e voltar a qualquer questão usando o painel lateral.', color: 'var(--ip-azul)' },
              { icon: Icon.Edit2,         t: 'Marcar para revisão',  d: 'Marque questões que deseja revisitar antes de finalizar.', color: 'var(--ip-amarelo)' },
              { icon: Icon.Folder,        t: 'Anexação de arquivo',  d: 'Algumas questões permitem anexo via QR Code (foto pelo celular).', color: 'var(--ip-amarelo)' },
              { icon: Icon.CheckCircle,   t: 'Envio da prova',       d: 'Suas respostas são salvas automaticamente. Confirme o envio ao terminar.', color: 'var(--ip-verde)' },
            ].map((row, i) => {
              const I = row.icon;
              return (
                <div key={i} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: 14, borderRadius: 12, background: 'var(--ip-azul-50)',
                  border: '1px solid var(--ip-azul-100)',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: row.color, color: row.color === 'var(--ip-amarelo)' ? '#2A1F00' : '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <I size={20}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{row.t}</div>
                    <p style={{ fontSize: 13, color: 'var(--ip-text-2)', marginTop: 2, lineHeight: 1.5 }}>{row.d}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, padding: 16, borderRadius: 12, border: '1.5px dashed var(--ip-amarelo)', background: 'var(--ip-amarelo-50)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Icon.AlertTriangle size={20} color="#C88800"/>
              <div style={{ fontSize: 13, color: '#7A4F00' }}>
                Após clicar em <strong>Iniciar Prova</strong>, o cronômetro começa imediatamente e não pode ser pausado.
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: checked ? 'var(--ip-text)' : 'var(--ip-text-2)' }}>
              {checked ? (
                <span style={{ width: 18, height: 18, borderRadius: 4, background: 'var(--ip-azul)', display: 'grid', placeItems: 'center' }}><Icon.CheckSquare size={12} color="#fff"/></span>
              ) : (
                <span style={{ width: 18, height: 18, borderRadius: 4, background: '#fff', border: '1.5px solid var(--ip-azul)' }}/>
              )}
              Li e entendi
            </label>
          </div>

          <button
            className="ip-btn ip-btn--cta"
            disabled={!checked}
            style={{
              width: '100%', height: 52, marginTop: 16, fontSize: 16,
              opacity: checked ? 1 : 0.45,
              cursor: checked ? 'pointer' : 'not-allowed',
            }}
          >
            Iniciar Prova
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── A2. Questão Objetiva ──────────────────────────────────────
// `selected` controla qual alternativa aparece marcada. Default 'B'
// preserva a tela 08. Telas 19-22 variam para A, C, D e E.
const ScreenQuestaoObjetiva = ({ selected = 'B' }) => {
  const [timeVisible, setTimeVisible] = React.useState(true);
  const [marked, setMarked] = React.useState(false);
  return (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-prova-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Top */}
      <div className="ip-prova-top">
        <div className="ip-prova-top__brand">
          <div style={{ background: '#efefef', padding: '6px 12px', borderRadius: 10, display: 'inline-flex' }}>
            <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 28, width: 'auto', display: 'block' }}/>
          </div>
          <h1>Avaliação · Matemática · 2º Bimestre</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="ip-prova-top__timer">
            <Icon.Clock size={22} color="var(--ip-amarelo)"/>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span className="t" style={timeVisible ? null : { letterSpacing: 4, color: 'rgba(255,255,255,.55)' }}>
                {timeVisible ? '01:22:10' : '••:••:••'}
              </span>
              <span style={{ fontSize: 11, opacity: .75 }}>Tempo restante</span>
            </div>
            <button
              onClick={() => setTimeVisible(v => !v)}
              aria-label={timeVisible ? 'Ocultar tempo' : 'Mostrar tempo'}
              style={{
                width: 32, height: 32, marginLeft: 6, borderRadius: 8,
                background: 'rgba(255,255,255,.12)', border: 0, color: '#fff',
                cursor: 'pointer', display: 'grid', placeItems: 'center',
              }}
            >
              {timeVisible ? <Icon.Eye size={16}/> : <Icon.EyeOff size={16}/>}
            </button>
          </div>
          <button className="ip-btn ip-btn--cta"><Icon.Send size={16}/>Finalizar Prova</button>
        </div>
      </div>

      {/* Sub-bar progress */}
      <div style={{ padding: '12px 32px', background: '#fff', borderBottom: '1px solid var(--ip-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>Progresso</span>
          <div style={{ width: 320, height: 8, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, var(--ip-azul), var(--ip-amarelo))' }}/>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>4 / 10 respondidas</span>
        </div>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 12, color: 'var(--ip-text-2)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ip-verde)' }}/>Respondida</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ip-amarelo)' }}/>Marcada</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ip-azul)' }}/>Atual</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, flex: 1 }}>
        {/* Question */}
        <div className="ip-question-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: marked ? 'var(--ip-amarelo)' : 'var(--ip-azul)', color: marked ? '#2A1F00' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, transition: 'color .15s ease' }}>5</span>
            <div>
              <div style={{ fontFamily: 'var(--ip-font-display)', fontWeight: 600, fontSize: 16 }}>Questão 5 de 10</div>
              <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>Objetiva · Peso 1,0 · Funções afim</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <button
                className={"ip-btn ip-btn--sm" + (marked ? " ip-btn--cta" : " ip-btn--ghost")}
                aria-pressed={marked}
                onClick={() => setMarked(v => !v)}>
                <Icon.Edit2 size={14}/>{marked ? 'Marcada para revisão' : 'Marcar para revisão'}
              </button>
            </div>
          </div>

          <div style={{ fontSize: 15, lineHeight: 1.7, padding: '10px 0' }}>
            <p>O coeficiente angular indica que, a cada unidade somada em <em>x</em>, o valor de <em>f(x)</em> varia em uma quantidade constante. A intersecção com o eixo das ordenadas ocorre em um ponto específico.</p>
            <p style={{ marginTop: 10 }}>Considere a função afim <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>f(x) = 3x − 6</span>. Sobre o gráfico dessa função no plano cartesiano, é <strong>correto</strong> afirmar que:</p>
            <div style={{ marginTop: 14, padding: 16, background: 'var(--ip-azul-50)', borderRadius: 10, border: '1px dashed var(--ip-azul-100)', fontFamily: 'Georgia, serif', textAlign: 'center', fontSize: 18 }}>
              f(x) = 3x − 6
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
            {[
              { a: 'A', t: 'A reta é decrescente e intercepta o eixo y em (0, −6).' },
              { a: 'B', t: 'A reta é crescente e tem raiz em x = 2.' },
              { a: 'C', t: 'A reta tem coeficiente linear igual a 3.' },
              { a: 'D', t: 'A reta passa pela origem (0, 0).' },
              { a: 'E', t: 'A reta é paralela ao eixo x.' },
            ].map(o => (
              <div key={o.a} className={"ip-radio" + (o.a === selected ? ' ip-radio--selected' : '')}>
                <span className="ip-radio__letter">{o.a}</span>
                <span style={{ flex: 1 }}>{o.t}</span>
                <span className="ip-radio__dot"/>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--ip-border)' }}>
            <button className="ip-btn ip-btn--ghost"><Icon.ChevronLeft size={16}/>Voltar questão</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ip-verde)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ip-verde)' }}/>
              Salvo automaticamente · há 2s
            </div>
            <button className="ip-btn ip-btn--primary">Próxima questão<Icon.ChevronRight size={16}/></button>
          </div>
        </div>

        {/* Navigation panel */}
        <aside className="ip-question-card" style={{ alignSelf: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 14 }}>Navegação</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {[
              'answered','answered','answered','marked','current',
              'idle','idle','idle','idle','idle',
            ].map((s, i) => (
              <div key={i} className={"ip-question-dot ip-question-dot--" + s}>{i + 1}</div>
            ))}
          </div>

          <hr className="ip-divider" style={{ margin: '16px 0' }}/>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ justifyContent: 'flex-start' }}>
              <Icon.Edit2 size={14}/>Fazer anotações
            </button>
            <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ justifyContent: 'flex-start' }}>
              <Icon.Eye size={14}/>Revisar marcadas (1)
            </button>
          </div>

          {/* Anotações pad */}
          <hr className="ip-divider" style={{ margin: '16px 0' }}/>
          <h2 style={{ fontSize: 13, marginBottom: 8, color: 'var(--ip-text-2)' }}>Anotações desta questão</h2>
          <div style={{ background: 'var(--ip-amarelo-50)', borderRadius: 10, padding: 12, fontSize: 13, minHeight: 90, lineHeight: 1.5, border: '1px dashed var(--ip-amarelo)' }}>
            <p>a &gt; 0 → reta crescente</p>
            <p>x = 6 / 3 = 2 → raiz da função</p>
            <p style={{ marginTop: 4, color: 'var(--ip-text-2)' }}>__</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
);
};

// ─── A3. Prova Enviada ─────────────────────────────────────────
const ScreenProvaEnviada = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-prova-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div className="ip-prova-top" style={{ background: 'var(--ip-azul)' }}>
        <div className="ip-prova-top__brand">
          <div style={{ background: '#efefef', padding: '6px 12px', borderRadius: 10, display: 'inline-flex' }}>
            <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 28, width: 'auto', display: 'block' }}/>
          </div>
          <h1>Avaliação Online</h1>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 40 }}>
        <div className="ip-card" style={{ width: '100%', maxWidth: 540, padding: 40, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Confetti dots */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[
              [40,60,'var(--ip-amarelo)'],[120,30,'var(--ip-verde)'],[220,80,'var(--ip-azul)'],
              [380,40,'var(--ip-amarelo)'],[460,90,'var(--ip-verde)'],
              [60,180,'var(--ip-azul)'],[480,200,'var(--ip-amarelo)'],
              [30,320,'var(--ip-verde)'],[490,340,'var(--ip-azul)'],
            ].map(([x,y,c],i)=>(<div key={i} style={{position:'absolute',left:x,top:y,width:8,height:8,borderRadius:2,background:c,opacity:.5,transform:`rotate(${i*45}deg)`}}/>))}
          </div>

          <div style={{
            width: 96, height: 96, margin: '0 auto', borderRadius: '50%',
            background: 'var(--ip-verde-50)',
            border: '3px solid var(--ip-verde)',
            display: 'grid', placeItems: 'center',
            position: 'relative',
          }}>
            <Icon.CheckCircle size={50} color="var(--ip-verde)" strokeWidth={2.4}/>
          </div>

          <h1 className="ip-display" style={{ fontSize: 28, marginTop: 18 }}>Prova enviada com sucesso!</h1>
          <p className="ip-muted" style={{ marginTop: 8, fontSize: 15 }}>
            Boa, Mariana! Sua avaliação foi recebida e está aguardando correção da Profª. Sophia.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
            marginTop: 24, padding: 16,
            background: 'var(--ip-surface)', borderRadius: 12,
          }}>
            {[
              { l: 'Questões respondidas', v: '10/10' },
              { l: 'Tempo utilizado',     v: '01:24:32' },
              { l: 'Submetida em',        v: '24 jun · 15:24' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--ip-font-display)', fontWeight: 700, fontSize: 18 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--ip-text-2)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 22, alignItems: 'center', padding: 12, background: 'var(--ip-azul-50)', borderRadius: 12, fontSize: 13, textAlign: 'left', border: '1px solid var(--ip-azul-100)' }}>
            <Icon.Mail size={20} color="var(--ip-azul)"/>
            <div style={{ flex: 1 }}>Você será notificada por e-mail assim que o resultado estiver disponível.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── A4. Questão Discursiva ────────────────────────────────────
const AlunoToolbarBtn = ({ icon: I, active }) => (
  <button className="ip-toolbar__btn" style={active ? { background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)' } : null}>
    <I size={16}/>
  </button>
);
const AlunoToolbarSep = () => <div className="ip-toolbar__sep"/>;

const ScreenQuestaoDiscursiva = () => {
  const [timeVisible, setTimeVisible] = React.useState(true);
  const [chars, setChars] = React.useState(184);
  const [marked, setMarked] = React.useState(false);
  return (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-prova-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Top */}
      <div className="ip-prova-top">
        <div className="ip-prova-top__brand">
          <div style={{ background: '#efefef', padding: '6px 12px', borderRadius: 10, display: 'inline-flex' }}>
            <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 28, width: 'auto', display: 'block' }}/>
          </div>
          <h1>Avaliação · Matemática · 2º Bimestre</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="ip-prova-top__timer">
            <Icon.Clock size={22} color="var(--ip-amarelo)"/>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span className="t" style={timeVisible ? null : { letterSpacing: 4, color: 'rgba(255,255,255,.55)' }}>
                {timeVisible ? '00:48:22' : '••:••:••'}
              </span>
              <span style={{ fontSize: 11, opacity: .75 }}>Tempo restante</span>
            </div>
            <button
              onClick={() => setTimeVisible(v => !v)}
              aria-label={timeVisible ? 'Ocultar tempo' : 'Mostrar tempo'}
              style={{
                width: 32, height: 32, marginLeft: 6, borderRadius: 8,
                background: 'rgba(255,255,255,.12)', border: 0, color: '#fff',
                cursor: 'pointer', display: 'grid', placeItems: 'center',
              }}
            >
              {timeVisible ? <Icon.Eye size={16}/> : <Icon.EyeOff size={16}/>}
            </button>
          </div>
          <button className="ip-btn ip-btn--cta"><Icon.Send size={16}/>Finalizar Prova</button>
        </div>
      </div>

      {/* Sub-bar progress */}
      <div style={{ padding: '12px 32px', background: '#fff', borderBottom: '1px solid var(--ip-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>Progresso</span>
          <div style={{ width: 320, height: 8, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '70%', background: 'linear-gradient(90deg, var(--ip-azul), var(--ip-amarelo))' }}/>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>7 / 10 respondidas</span>
        </div>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 12, color: 'var(--ip-text-2)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ip-verde)' }}/>Respondida</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ip-amarelo)' }}/>Marcada</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ip-azul)' }}/>Atual</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, flex: 1 }}>
        {/* Question */}
        <div className="ip-question-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: marked ? 'var(--ip-amarelo)' : 'var(--ip-azul)', color: marked ? '#2A1F00' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, transition: 'color .15s ease' }}>9</span>
            <div>
              <div style={{ fontFamily: 'var(--ip-font-display)', fontWeight: 600, fontSize: 16 }}>Questão 9 de 10</div>
              <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>Discursiva · Peso 2,0 · Geometria analítica</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <button
                className={"ip-btn ip-btn--sm" + (marked ? " ip-btn--cta" : " ip-btn--ghost")}
                aria-pressed={marked}
                onClick={() => setMarked(v => !v)}>
                <Icon.Edit2 size={14}/>{marked ? 'Marcada para revisão' : 'Marcar para revisão'}
              </button>
            </div>
          </div>

          {/* Enunciado */}
          <div style={{ fontSize: 15, lineHeight: 1.7, padding: '10px 0' }}>
            <p>Considere os pontos <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>A(1, 2)</span>, <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>B(5, 6)</span> e <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>C(7, 2)</span> no plano cartesiano.</p>
            <p style={{ marginTop: 10 }}>Determine a equação da reta que passa por <em>A</em> e <em>B</em>, e em seguida calcule a distância do ponto <em>C</em> a essa reta. <strong>Justifique cada passo do desenvolvimento</strong>.</p>
            <div style={{ marginTop: 14, padding: 16, background: 'var(--ip-azul-50)', borderRadius: 10, border: '1px dashed var(--ip-azul-100)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <Icon.Image size={28} color="var(--ip-azul-700)"/>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>plano_cartesiano_q9.png</div>
                <div style={{ fontSize: 12, color: 'var(--ip-text-2)' }}>Clique para ampliar · figura de apoio</div>
              </div>
            </div>
          </div>

          {/* Editor de resposta */}
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ip-text)' }}>Sua resposta</label>
              <span style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>Sem limite de caracteres · use a barra para formatar</span>
            </div>
            <div style={{ border: '1px solid var(--ip-border)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              <div className="ip-toolbar" style={{ borderRadius: 0 }}>
                <select style={{ border: 0, background: 'transparent', fontSize: 13, padding: '0 8px', height: 28, borderRadius: 6, fontFamily: 'inherit' }}>
                  <option>Parágrafo</option><option>Título</option>
                </select>
                <AlunoToolbarSep/>
                <AlunoToolbarBtn icon={Icon.Bold}/>
                <AlunoToolbarBtn icon={Icon.Italic}/>
                <AlunoToolbarBtn icon={Icon.Underline}/>
                <AlunoToolbarSep/>
                <AlunoToolbarBtn icon={Icon.List}/>
                <AlunoToolbarSep/>
                <AlunoToolbarBtn icon={Icon.AlignLeft} active/>
                <AlunoToolbarBtn icon={Icon.AlignCenter}/>
                <AlunoToolbarBtn icon={Icon.AlignRight}/>
                <AlunoToolbarSep/>
                <AlunoToolbarBtn icon={Icon.Code}/>
                <div style={{ flex: 1 }}/>
                <span style={{ fontSize: 12, color: 'var(--ip-text-2)', alignSelf: 'center', padding: '0 8px' }}>{chars} caracteres</span>
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setChars((e.currentTarget.textContent || '').length)}
                style={{ padding: '18px 16px', minHeight: 220, fontSize: 14, lineHeight: 1.7, outline: 'none', cursor: 'text' }}>
                <p><strong>1) Coeficiente angular:</strong></p>
                <p>m = (6 − 2) / (5 − 1) = 4/4 = 1</p>
                <p style={{ marginTop: 10 }}><strong>2) Equação da reta AB</strong> usando o ponto A(1, 2):</p>
                <p>y − 2 = 1·(x − 1) → <em>y = x + 1</em></p>
                <p style={{ marginTop: 10 }}><strong>3) Distância de C(7, 2) à reta x − y + 1 = 0:</strong></p>
                <p><br/></p>
              </div>
            </div>
          </div>

          {/* Anexar resposta */}
          <div style={{ marginTop: 16 }}>
            <div style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: 14, background: 'var(--ip-azul-50)',
              borderRadius: 12, border: '1px solid var(--ip-azul-100)',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon.QrCode size={22}/>
              </div>
              <div style={{ flex: 1, fontSize: 13, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600, color: 'var(--ip-text)' }}>Anexar resposta manuscrita</div>
                <div style={{ color: 'var(--ip-text-2)' }}>Tire foto do seu desenvolvimento pelo celular escaneando um QR Code. Ideal para cálculos e gráficos.</div>
              </div>
              <button className="ip-btn ip-btn--primary">
                <Icon.QrCode size={16}/>Anexar via QR Code
              </button>
            </div>

            {/* Anexo já enviado (estado opcional) */}
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', background: '#fff',
              border: '1px solid var(--ip-border)', borderRadius: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--ip-verde-50)', color: 'var(--ip-verde)', display: 'grid', placeItems: 'center' }}>
                <Icon.Image size={18}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>desenvolvimento_q9.jpg</div>
                <div style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>Enviado pelo celular · 1.8 MB · há 4 min</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ip-verde)', fontWeight: 600 }}>
                <Icon.CheckCircle size={14}/> Anexado
              </span>
              <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" style={{ width: 28, height: 28 }}><Icon.X size={14}/></button>
            </div>
          </div>

          {/* Footer nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--ip-border)' }}>
            <button className="ip-btn ip-btn--ghost"><Icon.ChevronLeft size={16}/>Voltar questão</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ip-verde)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ip-verde)' }}/>
              Salvo automaticamente · há 3s
            </div>
            <button className="ip-btn ip-btn--primary">Próxima questão<Icon.ChevronRight size={16}/></button>
          </div>
        </div>

        {/* Navigation panel */}
        <aside className="ip-question-card" style={{ alignSelf: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 14 }}>Navegação</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {[
              'answered','answered','answered','answered','answered',
              'answered','marked','answered','current','idle',
            ].map((s, i) => (
              <div key={i} className={"ip-question-dot ip-question-dot--" + s}>{i + 1}</div>
            ))}
          </div>

          <hr className="ip-divider" style={{ margin: '16px 0' }}/>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ justifyContent: 'flex-start' }}>
              <Icon.Edit2 size={14}/>Fazer anotações
            </button>
            <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ justifyContent: 'flex-start' }}>
              <Icon.Eye size={14}/>Revisar marcadas (1)
            </button>
          </div>

          {/* Anotações pad */}
          <hr className="ip-divider" style={{ margin: '16px 0' }}/>
          <h2 style={{ fontSize: 13, marginBottom: 8, color: 'var(--ip-text-2)' }}>Anotações desta questão</h2>
          <div style={{ background: 'var(--ip-amarelo-50)', borderRadius: 10, padding: 12, fontSize: 13, minHeight: 90, lineHeight: 1.5, border: '1px dashed var(--ip-amarelo)' }}>
            <p>d = |ax₀ + by₀ + c| / √(a² + b²)</p>
            <p>reta: x − y + 1 = 0 → a=1, b=−1, c=1</p>
            <p style={{ marginTop: 4, color: 'var(--ip-text-2)' }}>__</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
);
};

// ─── A5. Confirmar envio da prova (modal) ──────────────────────
const ScreenConfirmarEnvio = () => (
  <div className="ip-app" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
    {/* Estado da prova por baixo (esmaecido) */}
    <div style={{ height: '100%', filter: 'blur(2px) saturate(0.85)', pointerEvents: 'none' }}>
      <ScreenQuestaoObjetiva/>
    </div>

    {/* Backdrop + modal */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(20, 22, 45, .55)',
      display: 'grid', placeItems: 'center',
      zIndex: 50, padding: 24,
    }}>
      <div className="ip-card" style={{
        width: 520, padding: 0, overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,.25)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '24px 28px 18px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'var(--ip-amarelo-50)',
            border: '1.5px solid var(--ip-amarelo)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>
            <Icon.AlertTriangle size={26} color="#C88800"/>
          </div>
          <div>
            <h1 style={{ fontSize: 20, lineHeight: 1.25 }}>Tem certeza que deseja enviar?</h1>
            <p className="ip-muted" style={{ marginTop: 4, fontSize: 13 }}>
              Depois de enviada, você não poderá mais editar suas respostas.
            </p>
          </div>
        </div>

        <hr className="ip-divider" style={{ margin: 0 }}/>

        {/* Resumo da prova */}
        <div style={{ padding: '18px 28px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
            padding: 14, background: 'var(--ip-surface)', borderRadius: 12,
          }}>
            {[
              { l: 'Respondidas',  v: '9 / 10', c: 'var(--ip-verde)' },
              { l: 'Sem resposta', v: '1',      c: 'var(--ip-vermelho)' },
              { l: 'Marcadas',     v: '1',      c: 'var(--ip-amarelo)' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--ip-font-display)', fontWeight: 700, fontSize: 20, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--ip-text-2)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Alerta de questões não respondidas */}
          <div style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            marginTop: 14, padding: '12px 14px',
            borderRadius: 10,
            background: 'var(--ip-vermelho-50)',
            border: '1px solid var(--ip-vermelho)',
          }}>
            <Icon.AlertTriangle size={18} color="var(--ip-vermelho)" style={{ flexShrink: 0, marginTop: 1 }}/>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: '#7A1F1F' }}>
              Você ainda tem <strong>1 questão sem resposta</strong> (questão 10). Questões não respondidas serão pontuadas como zero.
            </div>
          </div>

          {/* Tempo restante */}
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            marginTop: 10, padding: '10px 14px',
            borderRadius: 10, background: 'var(--ip-azul-50)',
            border: '1px solid var(--ip-azul-100)',
            fontSize: 13,
          }}>
            <Icon.Clock size={18} color="var(--ip-azul-700)"/>
            <div style={{ flex: 1, color: 'var(--ip-text)' }}>
              Tempo restante de prova: <strong>01h 22min</strong>. Você pode voltar e revisar antes de enviar.
            </div>
          </div>
        </div>

        {/* Ações */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'flex-end',
          padding: '16px 28px 24px',
          borderTop: '1px solid var(--ip-border)',
        }}>
          <button className="ip-btn ip-btn--ghost">
            <Icon.ChevronLeft size={16}/>Voltar à prova
          </button>
          <button className="ip-btn ip-btn--cta">
            <Icon.Send size={16}/>Enviar prova
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── A6. Anotações da questão (modal em destaque) ──────────────
const ScreenAnotacoes = () => (
  <div className="ip-app" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
    {/* Estado da prova por baixo (esmaecido) */}
    <div style={{ height: '100%', filter: 'blur(2px) saturate(0.85)', pointerEvents: 'none' }}>
      <ScreenQuestaoObjetiva/>
    </div>

    {/* Backdrop + modal */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(20, 22, 45, .55)',
      display: 'grid', placeItems: 'center',
      zIndex: 50, padding: 24,
    }}>
      <div className="ip-card" style={{
        width: 720, padding: 0, overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,.25)',
        display: 'flex', flexDirection: 'column', maxHeight: '88%',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '22px 28px 18px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'var(--ip-amarelo-50)',
            border: '1.5px solid var(--ip-amarelo)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>
            <Icon.Edit2 size={26} color="#C88800"/>
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, lineHeight: 1.25 }}>Anotações da questão</h1>
            <p className="ip-muted" style={{ marginTop: 4, fontSize: 13 }}>
              Questão 5 de 10 · Objetiva · Funções afim · suas anotações são privadas e não são enviadas.
            </p>
          </div>
        </div>

        <hr className="ip-divider" style={{ margin: 0 }}/>

        {/* Editor em destaque */}
        <div style={{ padding: '20px 28px', flex: 1, overflow: 'auto' }}>
          <div style={{ border: '1px solid var(--ip-border)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
            <div className="ip-toolbar" style={{ borderRadius: 0 }}>
              <AlunoToolbarBtn icon={Icon.Bold}/>
              <AlunoToolbarBtn icon={Icon.Italic}/>
              <AlunoToolbarBtn icon={Icon.Underline}/>
              <AlunoToolbarSep/>
              <AlunoToolbarBtn icon={Icon.List}/>
              <AlunoToolbarSep/>
              <AlunoToolbarBtn icon={Icon.Code}/>
              <div style={{ flex: 1 }}/>
              <span style={{ fontSize: 12, color: 'var(--ip-text-2)', alignSelf: 'center', padding: '0 8px' }}>62 caracteres</span>
            </div>
            <div style={{ padding: '20px 18px', minHeight: 280, fontSize: 15, lineHeight: 1.8, background: 'var(--ip-amarelo-50)' }}>
              <p>a &gt; 0 → reta crescente</p>
              <p>x = 6 / 3 = 2 → raiz da função</p>
              <p style={{ marginTop: 6, color: 'var(--ip-text-2)' }}>|cursor|</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'center', padding: 12, background: 'var(--ip-azul-50)', borderRadius: 12, fontSize: 13, border: '1px solid var(--ip-azul-100)' }}>
            <Icon.Eye size={18} color="var(--ip-azul-700)"/>
            <div style={{ flex: 1, color: 'var(--ip-text)' }}>
              As anotações ficam vinculadas a esta questão e aparecem no painel lateral enquanto você resolve a prova.
            </div>
          </div>
        </div>

        {/* Ações */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'flex-end',
          padding: '16px 28px 22px',
          borderTop: '1px solid var(--ip-border)',
        }}>
          <button className="ip-btn ip-btn--ghost">
            <Icon.ChevronLeft size={16}/>Voltar à prova
          </button>
          <button className="ip-btn ip-btn--cta">
            <Icon.CheckCircle size={16}/>Salvar anotações
          </button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenAvisoProva, ScreenQuestaoObjetiva, ScreenProvaEnviada, ScreenQuestaoDiscursiva, ScreenConfirmarEnvio, ScreenAnotacoes });
