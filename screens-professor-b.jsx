/* global React, Icon, Sidebar, Topbar, StatusBadge */

// ─── 4. Nova questão discursiva ────────────────────────────────
const ToolbarBtn = ({ icon: I, active }) => (
  <button className="ip-toolbar__btn" style={active ? { background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)' } : null}>
    <I size={16}/>
  </button>
);
const ToolbarSep = () => <div className="ip-toolbar__sep"/>;

const ScreenNovaQuestao = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Criar Nova Prova" subtitle="Avaliação de Matemática · 2º Bimestre · 9ºA"/>
        <div className="ip-shell__body" style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>
          <div className="ip-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                <Icon.Edit2 size={22}/>
              </div>
              <div>
                <h1 style={{ fontSize: 20 }}>Nova questão discursiva</h1>
                <p className="ip-muted" style={{ fontSize: 13, marginTop: 2 }}>Questão 4 de 5 · Peso configurável após salvar</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button className="ip-btn ip-btn--ghost ip-btn--sm">Cancelar</button>
                <button className="ip-btn ip-btn--primary ip-btn--sm"><Icon.Save size={14}/>Salvar</button>
              </div>
            </div>

            {/* Step 1: enunciado */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
                <h2 style={{ fontSize: 16 }}>Enunciado da questão</h2>
              </div>

              <div style={{ border: '1px solid var(--ip-border)', borderRadius: 12, overflow: 'hidden' }}>
                <div className="ip-toolbar" style={{ borderRadius: 0 }}>
                  <select style={{ border: 0, background: 'transparent', fontSize: 13, padding: '0 8px', height: 28, borderRadius: 6, fontFamily: 'inherit' }}>
                    <option>Parágrafo</option><option>Título</option>
                  </select>
                  <ToolbarSep/>
                  <ToolbarBtn icon={Icon.Bold}/>
                  <ToolbarBtn icon={Icon.Italic}/>
                  <ToolbarBtn icon={Icon.Underline}/>
                  <ToolbarSep/>
                  <ToolbarBtn icon={Icon.List}/>
                  <ToolbarSep/>
                  <ToolbarBtn icon={Icon.AlignLeft} active/>
                  <ToolbarBtn icon={Icon.AlignCenter}/>
                  <ToolbarBtn icon={Icon.AlignRight}/>
                  <ToolbarBtn icon={Icon.AlignJustify}/>
                  <ToolbarSep/>
                  <ToolbarBtn icon={Icon.Link}/>
                  <ToolbarBtn icon={Icon.Image}/>
                  <ToolbarBtn icon={Icon.Code}/>
                  <div style={{ flex: 1 }}/>
                  <span style={{ fontSize: 12, color: 'var(--ip-text-2)', alignSelf: 'center', padding: '0 8px' }}>342 caracteres</span>
                </div>
                <div style={{ padding: '18px 16px', minHeight: 180, fontSize: 14, lineHeight: 1.7 }}>
                  <p>No trecho: <em>"Os livros, que estavam sobre a mesa, foram doados à biblioteca"</em>, classifique a oração adjetiva em destaque e explique como a presença das vírgulas altera o sentido da frase em comparação a uma versão sem elas.</p>
                  <p style={{ marginTop: 10 }}>Justifique sua resposta com base na função das orações adjetivas explicativas e restritivas, citando ao menos um exemplo adicional.</p>
                </div>
              </div>
            </div>

            {/* Step 2: media */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
                <h2 style={{ fontSize: 16 }}>Inserção de mídia <span className="ip-muted" style={{ fontWeight: 400, fontSize: 13 }}>· opcional</span></h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ border: '1.5px dashed var(--ip-border-2)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--ip-text-2)', cursor: 'pointer' }}>
                  <Icon.Upload size={24} color="var(--ip-azul)"/>
                  <div style={{ fontWeight: 600, color: 'var(--ip-text)' }}>Inserir mídia</div>
                  <div style={{ fontSize: 12, textAlign: 'center' }}>Arraste ou clique · PNG, JPG, PDF até 10MB</div>
                </div>
                <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: 'repeating-linear-gradient(45deg, #ECECEC, #ECECEC 8px, #F5F5F5 8px, #F5F5F5 16px)', minHeight: 140, display: 'grid', placeItems: 'center' }}>
                  <div style={{ textAlign: 'center', color: 'var(--ip-text-2)', fontFamily: 'monospace', fontSize: 12 }}>
                    <Icon.Image size={32} color="var(--ip-text-3)"/>
                    <div style={{ marginTop: 8 }}>diagrama_oracoes_adjetivas.png</div>
                    <div style={{ fontSize: 11 }}>1.2 MB · 1080×720</div>
                  </div>
                  <button style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: '#fff', border: 0, cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,.15)' }}>
                    <Icon.X size={14}/>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: QR code option */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
                <h2 style={{ fontSize: 16 }}>Permitir anexação via QR Code</h2>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 14, background: 'var(--ip-azul-50)', borderRadius: 12, border: '1px solid var(--ip-azul-100)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                  <Icon.QrCode size={22}/>
                </div>
                <div style={{ flex: 1, fontSize: 13, lineHeight: 1.5 }}>
                  <strong>Permitido para esta questão.</strong>
                  <div style={{ color: 'var(--ip-text-2)' }}>Os alunos poderão anexar imagens ou documentos à resposta escaneando um QR Code durante a prova.</div>
                </div>
                <div style={{
                  width: 44, height: 24, borderRadius: 999,
                  background: 'var(--ip-azul)',
                  position: 'relative', cursor: 'pointer'
                }}>
                  <span style={{ position: 'absolute', top: 2, left: 22, width: 20, height: 20, borderRadius: '50%', background: '#fff' }}/>
                </div>
              </div>
            </div>

            {/* Step 4: critérios */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
                <h2 style={{ fontSize: 16 }}>Critérios de avaliação <span className="ip-muted" style={{ fontWeight: 400, fontSize: 13 }}>· apoia correção isonômica</span></h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { l: 'Classifica corretamente a oração adjetiva', p: '1,0' },
                  { l: 'Explica o papel das vírgulas com clareza', p: '1,0' },
                  { l: 'Cita exemplo adicional pertinente', p: '0,5' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid var(--ip-border)', borderRadius: 10, fontSize: 13 }}>
                    <span style={{ width: 20, height: 20, borderRadius: 4, background: 'var(--ip-verde)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon.CheckSquare size={14}/></span>
                    <span style={{ flex: 1 }}>{c.l}</span>
                    <span style={{ fontWeight: 600 }}>{c.p} pts</span>
                    <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" style={{ width: 28, height: 28 }}><Icon.Trash2 size={14}/></button>
                  </div>
                ))}
                <button className="ip-btn ip-btn--ghost" style={{ borderStyle: 'dashed', height: 44 }}><Icon.Plus size={16}/> Adicionar critério</button>
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

// ─── 5. Correção Isonômica — visão macro ───────────────────────
const respostas27 = [
  { id: 1, text: 'A oração em destaque é uma oração adjetiva explicativa. As vírgulas indicam que todos os livros do contexto estavam sobre a mesa e foram doados. Sem elas, a oração se tornaria restritiva.', flag: null },
  { id: 2, text: 'É adjetiva explicativa. Sem vírgulas, viraria restritiva.', flag: 'curta' },
  { id: 3, text: 'A oração "que estavam sobre a mesa" é adjetiva. Quando colocada entre vírgulas, ela explica algo já definido; sem elas, restringe o sentido aos livros específicos sobre a mesa.', flag: null },
  { id: 4, text: 'Explicativa, pois adiciona uma informação acessória. Já a versão sem vírgulas restringiria o universo de livros doados apenas àqueles que estavam sobre a mesa.', flag: null },
  { id: 5, text: 'Trata-se de uma oração adjetiva. As vírgulas mudam o sentido pois separam uma informação adicional.', flag: null },
  { id: 6, text: 'É uma oração subordinada substantiva objetiva direta. As vírgulas servem apenas para dar pausa na leitura.', flag: 'errada' },
  { id: 7, text: 'Adjetiva explicativa. Sem vírgulas, vira restritiva, mudando o sentido: nem todos os livros foram doados, apenas os da mesa.', flag: null },
  { id: 8, text: 'Oração adjetiva explicativa. As vírgulas atuam como elementos isolacionais. Exemplo: "Meu irmão, que mora em São Paulo, virá nas férias" — sugere que tenho apenas um irmão.', flag: 'destaque' },
  { id: 9, text: 'Eu acho que é explicativa porque tem vírgula. Mas não sei dizer direito o motivo.', flag: 'curta' },
];

const flagStyle = {
  curta:    { color: '#B65E00', bg: 'var(--ip-laranja-50)', label: 'Resp. curta' },
  errada:   { color: '#A1241B', bg: 'var(--ip-vermelho-50)', label: 'Possível erro' },
  destaque: { color: '#1F6F22', bg: 'var(--ip-verde-50)', label: 'Destaque' },
};

const ScreenCorrecaoMacro = () => (
  <div className="ip-app" style={{ height: '100%' }}>
    <div className="ip-shell">
      <Sidebar role="professor" activeKey="provas"/>
      <main className="ip-shell__main">
        <Topbar title="Correção Isonômica" subtitle="Avaliação Bimestral · Português · 9ºC"/>
        <div className="ip-shell__body">
          {/* Top context bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Voltar à prova</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', fontSize: 13, color: 'var(--ip-text-2)' }}>
              Progresso de correção
            </div>
            <div style={{ width: 200, height: 8, borderRadius: 999, background: 'var(--ip-surface)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, width: '32%', background: 'linear-gradient(90deg, var(--ip-azul), var(--ip-amarelo))' }}/>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600 }}>9/27</span>
            <button className="ip-btn ip-btn--cta ip-btn--sm">Concluir questão</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
            {/* Question navigator */}
            <aside style={{ position: 'sticky', top: 24, alignSelf: 'flex-start' }}>
              <div className="ip-card" style={{ padding: 16 }}>
                <h2 style={{ fontSize: 14, marginBottom: 12 }}>Questões da prova</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    { n: 1, t: 'Objetiva',   s: 'ok' },
                    { n: 2, t: 'Objetiva',   s: 'ok' },
                    { n: 3, t: 'Discursiva', s: 'ok' },
                    { n: 4, t: 'Discursiva', s: 'current' },
                    { n: 5, t: 'Discursiva', s: 'pending' },
                    { n: 6, t: 'Objetiva',   s: 'pending' },
                  ].map(q => (
                    <div key={q.n} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px',
                      borderRadius: 8,
                      background: q.s === 'current' ? 'var(--ip-azul-50)' : 'transparent',
                      border: q.s === 'current' ? '1.5px solid var(--ip-azul)' : '1px solid transparent',
                      cursor: 'pointer'
                    }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: q.s === 'ok' ? 'var(--ip-verde)' : q.s === 'current' ? 'var(--ip-azul)' : 'var(--ip-surface)',
                        color: q.s === 'pending' ? 'var(--ip-text-2)' : '#fff',
                        display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700
                      }}>{q.s === 'ok' ? <Icon.CheckCircle size={14}/> : q.n}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Questão {q.n}</span>
                      <span style={{ fontSize: 11, color: 'var(--ip-text-2)', marginLeft: 'auto' }}>{q.t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ip-card" style={{ padding: 16, marginTop: 12 }}>
                <h2 style={{ fontSize: 14, marginBottom: 10 }}>Filtros</h2>
                {[
                  { l: 'Todas',          n: 27, active: true },
                  { l: 'Não corrigidas', n: 18 },
                  { l: 'Marcadas',       n: 1 },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 10px', borderRadius: 8,
                    background: f.active ? 'var(--ip-azul-100)' : 'transparent',
                    color: f.active ? 'var(--ip-azul-700)' : 'var(--ip-text)',
                    fontSize: 13, cursor: 'pointer'
                  }}>
                    {f.l}
                    <span style={{ background: f.active ? 'var(--ip-azul)' : 'var(--ip-surface)', color: f.active ? '#fff' : 'var(--ip-text-2)', padding: '1px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{f.n}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div>
              {/* Question header */}
              <div className="ip-card" style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon.FileText size={22}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="ip-badge ip-badge--azul">Questão 04</span>
                      <span className="ip-badge">Discursiva</span>
                      <span className="ip-badge">Peso 2,0</span>
                    </div>
                    <h1 style={{ fontSize: 18 }}>Leia o trecho a seguir e assinale a oração adjetiva em destaque, justificando o papel das vírgulas.</h1>
                    <p className="ip-muted" style={{ marginTop: 6, fontSize: 13 }}>Gabarito: explicativa · As vírgulas separam informação adicional; sem elas, a oração se torna restritiva.</p>
                  </div>
                </div>
              </div>

              {/* Isonomic grid header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon.Users size={20} color="var(--ip-azul)"/>
                  <div>
                    <div style={{ fontWeight: 600 }}>Respostas dos alunos (27)</div>
                    <div className="ip-muted" style={{ fontSize: 12 }}>Visualização anônima · Clique em uma resposta para abrir a correção individual.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Sliders size={14}/>Ordenar por</button>
                  <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Filter size={14}/>Filtrar</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {respostas27.map((r, i) => {
                  return (
                    <div key={r.id} className="ip-resposta-card" style={{
                      background: '#fff',
                      borderRadius: 12,
                      border: '1px solid var(--ip-border)',
                      padding: 14,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      minHeight: 180,
                      position: 'relative',
                      transition: 'border-color .15s, box-shadow .15s',
                      cursor: 'pointer',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontSize: 12, color: 'var(--ip-text-2)',
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            padding: '3px 9px',
                            borderRadius: 999,
                            background: 'var(--ip-surface)',
                            fontSize: 11,
                            fontWeight: 600,
                            fontVariantNumeric: 'tabular-nums',
                            lineHeight: 1,
                            flexShrink: 0,
                          }}>
                            <span style={{ opacity: .55 }}>#</span>
                            <span>{String(r.id).padStart(2,'0')}</span>
                          </span>
                          Aluno anônimo
                        </span>
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ip-text)', flex: 1 }}>{r.text}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--ip-border)', paddingTop: 8 }}>
                        <span style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>{i < 6 ? 'Aguardando nota' : 'Nota: ' + (8.5 - i * 0.2).toFixed(1)}</span>
                        {i < 6 ? (
                          <button className="ip-btn ip-btn--ghost ip-btn--icon ip-btn--sm" style={{ width: 28, height: 28, background: 'var(--ip-azul-100)', color: 'var(--ip-azul-700)' }}><Icon.Maximize size={14}/></button>
                        ) : (
                          <button className="ip-btn ip-btn--ghost ip-btn--sm" style={{ height: 28 }}><Icon.RefreshCw size={13}/>Atualizar</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                <button className="ip-btn ip-btn--ghost">Carregar mais 18 respostas</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

// ─── 6. Correção Isonômica — visão micro (modal) ───────────────
const ScreenCorrecaoMicro = () => (
  <div className="ip-app" style={{ height: '100%', background: 'rgba(33,33,33,.55)', display: 'grid', placeItems: 'center', padding: 24 }}>
    <div style={{
      background: '#fff', borderRadius: 20,
      width: '100%', maxWidth: 1080,
      maxHeight: '100%',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 30px 80px rgba(0,0,0,.25)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 22px', borderBottom: '1px solid var(--ip-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--ip-azul)', color: '#fff', display: 'grid', placeItems: 'center' }}>
            <Icon.Edit2 size={18}/>
          </div>
          <div>
            <h1 style={{ fontSize: 18 }}>Correção Isonômica · Questão 04</h1>
            <p className="ip-muted" style={{ fontSize: 12 }}>Aluno 5 de 30 · autoria oculta para isonomia</p>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.ChevronLeft size={14}/>Anterior</button>
          <button className="ip-btn ip-btn--ghost ip-btn--sm">Próximo<Icon.ChevronRight size={14}/></button>
          <div style={{ width: 1, height: 22, background: 'var(--ip-border)', margin: '0 6px' }}/>
          <button className="ip-btn ip-btn--ghost ip-btn--icon"><Icon.X size={18}/></button>
        </div>
      </div>

      {/* Question enunciado */}
      <div style={{ padding: '16px 22px', background: 'var(--ip-azul-50)', borderBottom: '1px solid var(--ip-border)' }}>
        <div style={{ fontSize: 12, color: 'var(--ip-azul-700)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 }}>Enunciado · Questão 03</div>
        <p style={{ fontSize: 14, lineHeight: 1.6 }}>
          No trecho: <em>"Os livros, que estavam sobre a mesa, foram doados à biblioteca"</em>, classifique a oração adjetiva em destaque e explique como a presença das vírgulas altera o sentido da frase em comparação a uma versão sem elas.
        </p>
      </div>

      {/* Body grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, flex: 1, minHeight: 360 }}>
        {/* Answer */}
        <div style={{ padding: 22, borderRight: '1px solid var(--ip-border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ip-surface)', display: 'grid', placeItems: 'center' }}>
              <Icon.User size={16} color="var(--ip-text-2)"/>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Resposta do aluno</div>
              <div style={{ fontSize: 11, color: 'var(--ip-text-2)' }}>Submetida em 13/06/2025 · 14:35 · 312 caracteres</div>
            </div>
          </div>
          <div style={{ flex: 1, background: 'var(--ip-surface)', borderRadius: 12, padding: 16, fontSize: 14, lineHeight: 1.7, color: 'var(--ip-text)' }}>
            <p>A oração é adjetiva explicativa. As vírgulas indicam que todos os livros do contexto estavam sobre a mesa e todos foram doados.</p>
            <p style={{ marginTop: 10 }}>Se eu retirasse as vírgulas, ela se tornaria restritiva, sugerindo que apenas aqueles específicos livros que estavam na mesa foram doados, excluindo outros que pudessem estar em lugares diferentes.</p>
            <p style={{ marginTop: 10 }}>Exemplo: <em>"As crianças, que estavam na escola, fizeram a prova"</em> — todas as crianças estavam na escola e fizeram a prova.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="ip-btn ip-btn--ghost ip-btn--sm"><Icon.Folder size={14}/>Anexo (1)</button>
          </div>
        </div>

        {/* Grading */}
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="ip-field-label" style={{ marginBottom: 8, display: 'block' }}>Critérios atendidos</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { l: 'Classifica corretamente a oração adjetiva', v: '1,0 / 1,0', checked: true },
                { l: 'Explica o papel das vírgulas com clareza', v: '0,8 / 1,0', checked: true, partial: true },
                { l: 'Cita exemplo adicional pertinente', v: '0,5 / 0,5', checked: true },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--ip-surface)', borderRadius: 8, fontSize: 13 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 4, background: c.partial ? 'var(--ip-amarelo)' : 'var(--ip-verde)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                    <Icon.CheckSquare size={12}/>
                  </span>
                  <span style={{ flex: 1 }}>{c.l}</span>
                  <span style={{ fontWeight: 600 }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ip-field">
            <label className="ip-field-label">Nota final (0,0 — 10,0)</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input className="ip-input ip-input--bare" defaultValue="8,5" style={{ width: 110, fontFamily: 'var(--ip-font-display)', fontSize: 22, fontWeight: 700, textAlign: 'center' }}/>
              <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--ip-surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, width: '85%', background: 'linear-gradient(90deg, var(--ip-vermelho) 0%, var(--ip-amarelo) 50%, var(--ip-verde) 100%)' }}/>
              </div>
              <span className="ip-badge ip-badge--ok">Acima da média</span>
            </div>
          </div>

          <div className="ip-field" style={{ flex: 1 }}>
            <label className="ip-field-label">Feedback para o aluno</label>
            <textarea className="ip-textarea" style={{ minHeight: 90 }} defaultValue="Boa resposta! Você classificou corretamente como explicativa e justificou bem o papel das vírgulas. Para alcançar a nota máxima, deixe ainda mais claro o contraste com a versão restritiva."/>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 22px', borderTop: '1px solid var(--ip-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon.User size={16} color="var(--ip-text-2)"/>
          <span className="ip-muted" style={{ fontSize: 13 }}>Aluno 5 de 30</span>
          <div style={{ width: 120, height: 6, borderRadius: 999, background: 'var(--ip-surface)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, width: '17%', background: 'var(--ip-azul)' }}/>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ip-btn ip-btn--ghost">Pular por enquanto</button>
          <button className="ip-btn ip-btn--success"><Icon.CheckCircle size={16}/>Concluir e próximo</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenNovaQuestao, ScreenCorrecaoMacro, ScreenCorrecaoMicro });
