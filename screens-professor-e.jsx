/* global React, Icon, Sidebar, Topbar, StatusBadge, window */
// Professor · relatório consolidado · publicar (link) · nova questão objetiva · QR Code
const { PROF_PROVA, ProfExamHeader, QRCodeBox, iniciaisP, ScreenProvaVisaoGeral } = window;

const bandaDeP = (n) => n >= 90 ? { l: 'Excelente', cls: 'ip-badge--ok' }
  : n >= 70 ? { l: 'Bom', cls: 'ip-badge--ok' }
  : n >= 50 ? { l: 'Regular', cls: 'ip-badge--warn' }
  : { l: 'Atenção', cls: 'ip-badge--err' };

// ─── 37 · Relatório consolidado (professor) ────────────────────
const DonutP = ({ segments, size = 92 }) => {
  const total = segments.reduce((s, x) => s + x.v, 0);
  let acc = 0; const r = size / 2 - 11; const C = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--ip-surface)" strokeWidth={16}/>
      {segments.map((sg, i) => {
        const len = (sg.v / total) * C; const off = -((acc / total) * C); acc += sg.v;
        return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={sg.color} strokeWidth={16}
          strokeDasharray={`${len} ${C - len}`} strokeDashoffset={off} transform={`rotate(-90 ${size/2} ${size/2})`}/>;
      })}
    </svg>
  );
};

const ScreenProfRelatorio = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Relatório consolidado" subtitle="Desempenho da turma na avaliação."/>
        <div className="ip-shell__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Voltar</button>
                <span style={{ fontSize: 13, color: 'var(--ip-text-2)' }}>{PROF_PROVA.titulo} &rsaquo; Relatório</span>
              </div>
              <h1 style={{ fontSize: 24 }}>{PROF_PROVA.titulo} · {PROF_PROVA.turma}</h1>
              <p className="ip-muted" style={{ marginTop: 4 }}>{PROF_PROVA.disc} · aplicada em {PROF_PROVA.aplicada} · {PROF_PROVA.enviadas} submissões</p>
            </div>
            <button className="ip-btn ip-btn--primary"><Icon.Download size={16}/>Exportar PDF</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
            <div className="ip-card" style={{ padding: 20 }}>
              <div className="ip-stat__label">Média geral da turma</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                <DonutP size={92} segments={[{ v: 72, color: 'var(--ip-verde)' }, { v: 28, color: 'var(--ip-surface)' }]}/>
                <div>
                  <div className="ip-stat__value" style={{ fontSize: 26 }}>72,4</div>
                  <span className="ip-badge ip-badge--ok">Bom desempenho</span>
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
                  { l: 'Total de alunos', v: '27',   icon: Icon.Users },
                  { l: 'Submissões',      v: '23',   icon: Icon.CheckCircle, c: 'var(--ip-verde)' },
                  { l: 'Não enviaram',    v: '4',    icon: Icon.AlertTriangle, c: 'var(--ip-laranja)' },
                  { l: 'Maior nota',      v: '98,0', icon: Icon.Award, c: 'var(--ip-amarelo)' },
                  { l: 'Menor nota',      v: '38,0', icon: Icon.TrendingUp, c: 'var(--ip-vermelho)' },
                ].map((r, i) => { const I = r.icon; return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <I size={14} color={r.c || 'var(--ip-text-2)'}/><span style={{ flex: 1 }}>{r.l}</span><span style={{ fontWeight: 600 }}>{r.v}</span>
                  </div>
                ); })}
              </div>
            </div>
          </div>

          <div className="ip-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ip-border)' }}>
              <h2>Desempenho individual dos alunos</h2>
              <div className="ip-field-wrap" style={{ width: 240 }}>
                <span className="ip-field-icon"><Icon.Search size={16}/></span>
                <input className="ip-input" placeholder="Buscar aluno…" style={{ height: 36, paddingLeft: 38 }}/>
              </div>
            </div>
            <table className="ip-table ip-table--compact">
              <thead><tr><th>#</th><th>Aluno</th><th>Nota (/100)</th><th>Aproveitamento</th><th>Acertos</th><th>Erros</th><th>Desempenho</th></tr></thead>
              <tbody>
                {[
                  { n: 1, name: 'Ana Clara Silva',     nota: 98.0, acertos: 49, erros: 1 },
                  { n: 2, name: 'João Pedro Santos',   nota: 87.0, acertos: 44, erros: 6 },
                  { n: 3, name: 'Maria Eduarda Lima',  nota: 76.0, acertos: 38, erros: 12 },
                  { n: 4, name: 'Lucas Gabriel Souza', nota: 68.0, acertos: 34, erros: 16 },
                  { n: 5, name: 'Fernanda Oliveira',   nota: 55.0, acertos: 28, erros: 22 },
                  { n: 6, name: 'Rafael Martins',      nota: 42.0, acertos: 21, erros: 29 },
                ].map(sg => {
                  const color = sg.nota >= 70 ? 'var(--ip-verde)' : sg.nota >= 50 ? 'var(--ip-laranja)' : 'var(--ip-vermelho)';
                  const b = bandaDeP(sg.nota);
                  return (
                    <tr key={sg.n}>
                      <td style={{ color: 'var(--ip-text-2)' }}>{sg.n}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="ip-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{iniciaisP(sg.name)}</div>
                          <span style={{ fontWeight: 500 }}>{sg.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{sg.nota.toFixed(1).replace('.', ',')}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 120, height: 6, borderRadius: 999, background: 'var(--ip-surface)', overflow: 'hidden' }}>
                            <div style={{ width: sg.nota + '%', height: '100%', background: color }}/>
                          </div>
                          <span style={{ fontWeight: 600, color, fontVariantNumeric: 'tabular-nums' }}>{sg.nota.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td>{sg.acertos}</td>
                      <td>{sg.erros}</td>
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

// ─── 38 · Publicar prova (modal · gera link) ───────────────────
const ScreenPublicarProva = () => (
  <div className="ip-app" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
    <div style={{ height: '100%', filter: 'blur(2px) saturate(.9)', pointerEvents: 'none' }}>
      <ScreenProvaVisaoGeral/>
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,22,45,.55)', display: 'grid', placeItems: 'center', zIndex: 50, padding: 24 }}>
      <div className="ip-card" style={{ width: 560, padding: 0, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.25)' }}>
        <div style={{ padding: '24px 28px 18px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--ip-verde-50)', border: '1.5px solid var(--ip-verde)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Icon.CheckCircle size={26} color="var(--ip-verde)"/>
          </div>
          <div>
            <h1 style={{ fontSize: 20, lineHeight: 1.25 }}>Prova publicada!</h1>
            <p className="ip-muted" style={{ marginTop: 4, fontSize: 13 }}>{PROF_PROVA.titulo} · {PROF_PROVA.turma} já está disponível para os alunos.</p>
          </div>
        </div>
        <hr className="ip-divider" style={{ margin: 0 }}/>
        <div style={{ padding: '20px 28px' }}>
          <label className="ip-field-label" style={{ display: 'block', marginBottom: 8 }}>Link de acesso da turma</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 0, padding: '11px 14px', background: 'var(--ip-surface)', borderRadius: 10, fontSize: 13, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{PROF_PROVA.link}</div>
            <button className="ip-btn ip-btn--primary"><Icon.Copy size={16}/>Copiar</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            <button className="ip-btn ip-btn--ghost" style={{ height: 44 }}><Icon.QrCode size={16}/>Ver QR Code</button>
            <button className="ip-btn ip-btn--ghost" style={{ height: 44 }}><Icon.Mail size={16}/>Enviar por e-mail</button>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 14, padding: '12px 14px', borderRadius: 10, background: 'var(--ip-azul-50)', border: '1px solid var(--ip-azul-100)', fontSize: 13, lineHeight: 1.5, color: 'var(--ip-text)' }}>
            <Icon.Clock size={18} color="var(--ip-azul-700)" style={{ flexShrink: 0 }}/>
            <div>O link fica ativo durante a janela de realização: <strong>{PROF_PROVA.janela}</strong>. Após publicar, a estrutura das questões não pode mais ser editada.</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 28px 24px', borderTop: '1px solid var(--ip-border)' }}>
          <button className="ip-btn ip-btn--ghost">Fechar</button>
          <button className="ip-btn ip-btn--cta"><Icon.Eye size={16}/>Ver prova publicada</button>
        </div>
      </div>
    </div>
  </div>
);

// ─── 39 · Nova questão objetiva ────────────────────────────────
const ObjToolbarBtn = ({ icon: I, active }) => (
  <button className="ip-toolbar__btn" style={active ? { background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)' } : null}><I size={16}/></button>
);

const ScreenNovaQuestaoObjetiva = () => {
  const alts = [
    { a: 'A', t: '4 pacotes', correct: false },
    { a: 'B', t: '5 pacotes', correct: false },
    { a: 'C', t: '6 pacotes', correct: true },
    { a: 'D', t: '7 pacotes', correct: false },
  ];
  return (
    <div className="ip-app" style={{ height: '100%' }}>
      <div className="ip-shell">
        <Sidebar role="professor" activeKey="provas"/>
        <main className="ip-shell__main">
          <Topbar title="Criar Nova Prova" subtitle="Avaliação de Matemática · 2º Bimestre · 9ºA"/>
          <div className="ip-shell__body" style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>
            <div className="ip-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon.CheckSquare size={22}/></div>
                <div>
                  <h1 style={{ fontSize: 20 }}>Nova questão objetiva</h1>
                  <p className="ip-muted" style={{ fontSize: 13, marginTop: 2 }}>Questão 5 de 5 · múltipla escolha · correção automática</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm">Cancelar</button>
                  <button className="ip-btn ip-btn--primary ip-btn--sm"><Icon.Save size={14}/>Salvar</button>
                </div>
              </div>

              {/* Enunciado */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
                  <h2 style={{ fontSize: 16 }}>Enunciado da questão</h2>
                </div>
                <div style={{ border: '1px solid var(--ip-border)', borderRadius: 12, overflow: 'hidden' }}>
                  <div className="ip-toolbar" style={{ borderRadius: 0 }}>
                    <ObjToolbarBtn icon={Icon.Bold}/><ObjToolbarBtn icon={Icon.Italic}/><ObjToolbarBtn icon={Icon.Underline}/>
                    <div className="ip-toolbar__sep"/>
                    <ObjToolbarBtn icon={Icon.Image}/><ObjToolbarBtn icon={Icon.Code}/>
                    <div style={{ flex: 1 }}/>
                    <span style={{ fontSize: 12, color: 'var(--ip-text-2)', alignSelf: 'center', padding: '0 8px' }}>118 caracteres</span>
                  </div>
                  <div style={{ padding: '16px', minHeight: 90, fontSize: 14, lineHeight: 1.7 }}>
                    <p>Um pacote de biscoitos custa R$ 4,50. Se Paulo pagou um total de R$ 27,00, quantos pacotes ele comprou?</p>
                  </div>
                </div>
              </div>

              {/* Alternativas */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
                  <h2 style={{ fontSize: 16 }}>Alternativas <span className="ip-muted" style={{ fontWeight: 400, fontSize: 13 }}>· marque a correta</span></h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {alts.map(o => (
                    <div key={o.a} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, border: '1.5px solid ' + (o.correct ? 'var(--ip-verde)' : 'var(--ip-border)'), background: o.correct ? 'var(--ip-verde-50)' : '#fff' }}>
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: o.correct ? 'var(--ip-verde)' : 'var(--ip-surface)', color: o.correct ? '#fff' : 'var(--ip-text)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{o.a}</span>
                      <input className="ip-input ip-input--bare" defaultValue={o.t} style={{ flex: 1, border: 0, background: 'transparent', height: 32 }}/>
                      <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ color: o.correct ? 'var(--ip-verde)' : 'var(--ip-text-2)' }}>
                        <Icon.CheckCircle size={16}/>{o.correct ? 'Correta' : 'Marcar correta'}
                      </button>
                      <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm"><Icon.Trash2 size={16}/></button>
                    </div>
                  ))}
                  <button className="ip-btn ip-btn--ghost" style={{ borderStyle: 'dashed', height: 44 }}><Icon.Plus size={16}/>Adicionar alternativa</button>
                </div>
              </div>

              {/* Peso + QR */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, alignItems: 'flex-end' }}>
                <div className="ip-field">
                  <label className="ip-field-label">Peso da questão</label>
                  <div className="ip-field-wrap">
                    <span className="ip-field-icon"><Icon.Award size={20}/></span>
                    <input className="ip-input" defaultValue="1,0"/>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, background: 'var(--ip-azul-50)', borderRadius: 12, border: '1px solid var(--ip-azul-100)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon.QrCode size={20}/></div>
                  <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>
                    <strong>Anexo via QR Code</strong>
                    <div style={{ color: 'var(--ip-text-2)' }}>Permitir que o aluno anexe foto/arquivo a esta questão.</div>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 999, background: 'var(--ip-border-2)', position: 'relative', cursor: 'pointer' }}>
                    <span style={{ position: 'absolute', top: 2, left: 2, width: 20, height: 20, borderRadius: '50%', background: '#fff' }}/>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
              <button className="ip-btn ip-btn--ghost">Cancelar</button>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="ip-btn ip-btn--ghost"><Icon.Save size={16}/>Salvar como modelo</button>
                <button className="ip-btn ip-btn--cta"><Icon.Plus size={16}/>Adicionar questão</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── 40 · QR Code da questão (modal · professor consulta) ──────
const ScreenQRCodeProf = () => (
  <div className="ip-app" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
    <div style={{ height: '100%', filter: 'blur(2px) saturate(.9)', pointerEvents: 'none' }}>
      <ScreenProvaVisaoGeral/>
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,22,45,.55)', display: 'grid', placeItems: 'center', zIndex: 50, padding: 24 }}>
      <div className="ip-card" style={{ width: 460, padding: 0, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.25)' }}>
        <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ip-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon.QrCode size={20}/></div>
            <div>
              <h1 style={{ fontSize: 18 }}>QR Code de acesso</h1>
              <p className="ip-muted" style={{ fontSize: 12 }}>{PROF_PROVA.titulo} · {PROF_PROVA.turma}</p>
            </div>
          </div>
          <button className="ip-btn ip-btn--ghost ip-btn--icon"><Icon.X size={18}/></button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ padding: 16, border: '1px solid var(--ip-border)', borderRadius: 16 }}>
            <QRCodeBox size={200} seed={11}/>
          </div>
          <p className="ip-muted" style={{ fontSize: 13, textAlign: 'center', lineHeight: 1.5 }}>
            Os alunos podem escanear este código para abrir a prova no celular, ou usar o link direto.
          </p>
          <div style={{ width: '100%', padding: '10px 12px', background: 'var(--ip-surface)', borderRadius: 8, fontSize: 12, fontFamily: 'monospace', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{PROF_PROVA.link}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '16px 28px 22px', borderTop: '1px solid var(--ip-border)' }}>
          <button className="ip-btn ip-btn--ghost" style={{ flex: 1 }}><Icon.Copy size={16}/>Copiar link</button>
          <button className="ip-btn ip-btn--primary" style={{ flex: 1 }}><Icon.Download size={16}/>Baixar QR</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenProfRelatorio, ScreenPublicarProva, ScreenNovaQuestaoObjetiva, ScreenQRCodeProf });
