/* global React, Icon, window */
// Aluno · acesso via link · resultado e desempenho · QR Code para foto
const { QRCodeBox } = window;

// ─── 41 · Acesso via link ──────────────────────────────────────
const ScreenAcessoLink = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-prova-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div className="ip-prova-top">
        <div className="ip-prova-top__brand">
          <div style={{ background: '#efefef', padding: '6px 12px', borderRadius: 10, display: 'inline-flex' }}>
            <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 28, width: 'auto', display: 'block' }}/>
          </div>
          <h1>Avaliação Online · Matemática</h1>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 40 }}>
        <div className="ip-card" style={{ width: '100%', maxWidth: 560, padding: 36, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, margin: '0 auto', borderRadius: 16, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center' }}>
            <Icon.Link size={30}/>
          </div>
          <h1 className="ip-display" style={{ fontSize: 24, marginTop: 16 }}>Você foi convidada para uma prova</h1>
          <p className="ip-muted" style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6 }}>
            Confirme seus dados para acessar a avaliação pelo link recebido.
          </p>

          <div style={{ marginTop: 22, padding: 18, background: 'var(--ip-surface)', borderRadius: 14, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { l: 'Prova', v: 'Avaliação Bimestral · Funções', icon: Icon.FileText },
              { l: 'Professora', v: "Sophia Sant'ana", icon: Icon.User },
              { l: 'Turma', v: '9ºA · Matemática', icon: Icon.Users },
              { l: 'Janela', v: '24/06 · 14:00 → 15:30', icon: Icon.Calendar },
              { l: 'Duração', v: '01h 30min', icon: Icon.Clock },
            ].map((r, i) => { const I = r.icon; return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><I size={18}/></div>
                <span style={{ fontSize: 12, color: 'var(--ip-text-2)', width: 90, flexShrink: 0 }}>{r.l}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{r.v}</span>
              </div>
            ); })}
          </div>

          <div className="ip-field" style={{ marginTop: 18, textAlign: 'left' }}>
            <label className="ip-field-label">Seu nome completo</label>
            <div className="ip-field-wrap">
              <span className="ip-field-icon"><Icon.User size={20}/></span>
              <input className="ip-input" defaultValue="Mariana Oliveira"/>
            </div>
          </div>

          <button className="ip-btn ip-btn--cta" style={{ width: '100%', height: 50, marginTop: 16, fontSize: 15 }}>
            Acessar prova<Icon.ChevronRight size={18}/>
          </button>
          <p className="ip-muted" style={{ fontSize: 12, marginTop: 12 }}>
            Ao acessar, você verá as instruções antes de iniciar. O cronômetro só começa ao clicar em "Iniciar Prova".
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── 42 · Resultado e desempenho do aluno ──────────────────────
const resultadoQuestoes = [
  { n: 1,  tipo: 'Objetiva',   ok: true,    ganho: '1,0', peso: '1,0', cont: 'Função afim · gráfico' },
  { n: 2,  tipo: 'Objetiva',   ok: true,    ganho: '1,0', peso: '1,0', cont: 'Proporcionalidade' },
  { n: 3,  tipo: 'Discursiva', parcial: true, ganho: '1,5', peso: '2,0', cont: 'Equação do 2º grau' },
  { n: 4,  tipo: 'Objetiva',   ok: false,   ganho: '0,0', peso: '1,0', cont: 'Sistemas lineares' },
  { n: 5,  tipo: 'Objetiva',   ok: true,    ganho: '1,0', peso: '1,0', cont: 'Função quadrática' },
  { n: 6,  tipo: 'Discursiva', ok: true,    ganho: '2,0', peso: '2,0', cont: 'Funções quadráticas' },
];

const ScreenResultadoAluno = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-prova-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div className="ip-prova-top" style={{ background: 'var(--ip-azul)' }}>
        <div className="ip-prova-top__brand">
          <div style={{ background: '#efefef', padding: '6px 12px', borderRadius: 10, display: 'inline-flex' }}>
            <img src="assets/arandu-logo.png" alt="Arandu" style={{ height: 28, width: 'auto', display: 'block' }}/>
          </div>
          <h1>Resultado da Avaliação</h1>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(255,255,255,.15)', borderRadius: 999, fontSize: 13, color: '#fff' }}>
          <Icon.User size={16}/> Mariana Oliveira · 9ºA
        </span>
      </div>

      <div style={{ padding: '32px 56px', flex: 1 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Hero nota */}
          <div className="ip-card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 56, color: 'var(--ip-verde)', lineHeight: 1 }}>7,6</div>
              <div className="ip-muted" style={{ fontSize: 13, marginTop: 4 }}>de 10,0</div>
              <span className="ip-badge ip-badge--ok" style={{ marginTop: 8 }}>Bom desempenho</span>
            </div>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--ip-border)' }}/>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 20 }}>Avaliação Bimestral · Funções</h1>
              <p className="ip-muted" style={{ fontSize: 13, marginTop: 4 }}>Matemática · 9ºA · Profª. Sophia Sant'ana · corrigida em 26/06/2025</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
                {[
                  { l: 'Acertos', v: '8', c: 'var(--ip-verde)', icon: Icon.CheckCircle },
                  { l: 'Erros', v: '2', c: 'var(--ip-vermelho)', icon: Icon.X },
                  { l: 'Tempo', v: '52 min', c: 'var(--ip-azul)', icon: Icon.Clock },
                ].map((s, i) => { const I = s.icon; return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--ip-surface)', borderRadius: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: s.c + '18', color: s.c, display: 'grid', placeItems: 'center' }}><I size={17}/></div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>{s.l}</div>
                      <div style={{ fontWeight: 700, fontFamily: 'Poppins' }}>{s.v}</div>
                    </div>
                  </div>
                ); })}
              </div>
            </div>
          </div>

          {/* Desempenho por questão */}
          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
              <h2>Desempenho por questão</h2>
              <span className="ip-muted" style={{ fontSize: 13 }}>Gabarito liberado pela professora</span>
            </div>
            <table className="ip-table ip-table--compact">
              <thead><tr><th style={{ width: 50 }}>#</th><th>Conteúdo</th><th>Tipo</th><th>Resultado</th><th>Pontos</th></tr></thead>
              <tbody>
                {resultadoQuestoes.map(q => {
                  const cls = q.ok ? 'ip-badge--ok' : q.parcial ? 'ip-badge--warn' : 'ip-badge--err';
                  const txt = q.ok ? 'Correta' : q.parcial ? 'Parcial' : 'Incorreta';
                  const ic = q.ok ? <Icon.CheckCircle size={14}/> : q.parcial ? <Icon.AlertTriangle size={14}/> : <Icon.X size={14}/>;
                  return (
                    <tr key={q.n}>
                      <td><span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'inline-grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>{q.n}</span></td>
                      <td style={{ fontWeight: 500 }}>{q.cont}</td>
                      <td><span className="ip-badge ip-badge--azul">{q.tipo}</span></td>
                      <td><span className={"ip-badge " + cls}>{ic}{txt}</span></td>
                      <td style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{q.ganho} / {q.peso}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding: '10px 20px', borderTop: '1px solid var(--ip-border)' }}>
              <span className="ip-muted" style={{ fontSize: 13 }}>… e mais 4 questões</span>
            </div>
          </div>

          {/* Feedback */}
          <div className="ip-card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon.MessageCircle size={20}/></div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Comentário da professora</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ip-text)' }}>Bom trabalho, Mariana! Revise a resolução de sistemas lineares (questão 4) e a condição de existência (Δ ≥ 0) na demonstração da fórmula de Bhaskara.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── 43 · QR Code para foto (modal · aluno) ────────────────────
const ScreenQRCodeAluno = () => (
  <div className="ip-app" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
    <div style={{ height: '100%', filter: 'blur(2px) saturate(.9)', pointerEvents: 'none' }}>
      <ScreenQuestaoDiscursiva/>
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,22,45,.55)', display: 'grid', placeItems: 'center', zIndex: 50, padding: 24 }}>
      <div className="ip-card" style={{ width: 460, padding: 0, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.25)' }}>
        <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ip-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon.QrCode size={20}/></div>
            <div>
              <h1 style={{ fontSize: 18 }}>Anexar foto da resolução</h1>
              <p className="ip-muted" style={{ fontSize: 12 }}>Questão 9 · Geometria analítica</p>
            </div>
          </div>
          <button className="ip-btn ip-btn--ghost ip-btn--icon"><Icon.X size={18}/></button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ padding: 16, border: '1px solid var(--ip-border)', borderRadius: 16 }}>
            <QRCodeBox size={196} seed={23}/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {[
              { n: 1, t: 'Abra a câmera do celular e aponte para o código' },
              { n: 2, t: 'Tire a foto da sua resolução manuscrita' },
              { n: 3, t: 'O arquivo é anexado automaticamente à questão' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</span>
                <span style={{ lineHeight: 1.4 }}>{s.t}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', borderRadius: 10, background: 'var(--ip-azul-50)', border: '1px solid var(--ip-azul-100)', fontSize: 13 }}>
            <Icon.Smartphone size={18} color="var(--ip-azul-700)"/>
            <span style={{ flex: 1 }}>Aguardando envio pelo celular…</span>
            <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--ip-azul-100)', borderTopColor: 'var(--ip-azul)' }}/>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '16px 28px 22px', borderTop: '1px solid var(--ip-border)' }}>
          <button className="ip-btn ip-btn--ghost" style={{ flex: 1 }}>Cancelar</button>
          <button className="ip-btn ip-btn--ghost" style={{ flex: 1 }}><Icon.Upload size={16}/>Enviar daqui</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenAcessoLink, ScreenResultadoAluno, ScreenQRCodeAluno });
