/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard,
          ScreenLogin, ScreenMinhasProvas, ScreenCriarProva,
          ScreenNovaQuestao, ScreenCorrecaoMacro, ScreenCorrecaoMicro,
          ScreenAvisoProva, ScreenQuestaoObjetiva, ScreenProvaEnviada,
          ScreenQuestaoDiscursiva, ScreenConfirmarEnvio, ScreenAnotacoes,
          ScreenCoordProvas, ScreenCoordProfessores, ScreenCoordRelatorio,
          ScreenCoordParticipacao, ScreenCoordSubmissoes, ScreenCoordSubmissao, ScreenCoordIndicadores, ScreenCoordSelecaoProvas,
          ScreenProvaVisaoGeral, ScreenProfParticipacao, ScreenProfSubmissoes, ScreenProfSubmissao, ScreenProfIndicadores,
          ScreenProfRelatorio, ScreenPublicarProva, ScreenNovaQuestaoObjetiva, ScreenQRCodeProf,
          ScreenAcessoLink, ScreenResultadoAluno, ScreenQRCodeAluno,
          ScreenDashboard, ScreenMinhasTurmas, ScreenCriarTurma, ScreenQuestoes,
          ScreenBancoQuestoes, ScreenConfiguracoes */

const App = () => (
  <DesignCanvas
    title="Arandu · Protótipos hi-fi"
    subtitle="Sistema de provas remotas · Instituto Ponte · sprint 3"
  >
    <DCSection
      id="prof"
      title="Fluxo do Professor"
      subtitle="Persona principal · Sophia Sant'ana · da criação à correção isonômica"
    >
      <DCArtboard id="prof-login" label="01 · Login" width={1440} height={1024}>
        <div data-screen-label="Prof · Login" style={{ width: '100%', height: '100%' }}>
          <ScreenLogin/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-provas" label="02 · Minhas Provas" width={1440} height={1024}>
        <div data-screen-label="Prof · Minhas Provas" style={{ width: '100%', height: '100%' }}>
          <ScreenMinhasProvas/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-criar" label="03 · Criar Prova" width={1440} height={1024}>
        <div data-screen-label="Prof · Criar Prova" style={{ width: '100%', height: '100%' }}>
          <ScreenCriarProva/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-nova-questao" label="04 · Nova Questão Discursiva" width={1440} height={1024}>
        <div data-screen-label="Prof · Nova Questão" style={{ width: '100%', height: '100%' }}>
          <ScreenNovaQuestao/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-corr-macro" label="05 · Correção Isonômica · Macro" width={1440} height={1024}>
        <div data-screen-label="Prof · Correção macro" style={{ width: '100%', height: '100%' }}>
          <ScreenCorrecaoMacro/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-corr-micro" label="06 · Correção Isonômica · Micro (modal)" width={1440} height={1024}>
        <div data-screen-label="Prof · Correção micro" style={{ width: '100%', height: '100%' }}>
          <ScreenCorrecaoMicro/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="aluno"
      title="Fluxo do Aluno"
      subtitle="Persona Mariana Oliveira · realização da prova com tempo, anotações e navegação livre"
    >
      <DCArtboard id="aluno-aviso-inicial" label="18 · Aviso & Instruções · estado inicial" width={1440} height={1024}>
        <div data-screen-label="Aluno · Aviso (não lido)" style={{ width: '100%', height: '100%' }}>
          <ScreenAvisoProva checked={false}/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-aviso" label="07 · Aviso & Instruções" width={1440} height={1024}>
        <div data-screen-label="Aluno · Aviso" style={{ width: '100%', height: '100%' }}>
          <ScreenAvisoProva/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-questao" label="08 · Questão Objetiva" width={1440} height={1024}>
        <div data-screen-label="Aluno · Questão" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestaoObjetiva/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-enviada" label="09 · Prova Enviada" width={1440} height={1024}>
        <div data-screen-label="Aluno · Enviada" style={{ width: '100%', height: '100%' }}>
          <ScreenProvaEnviada/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="coord"
      title="Fluxo do Coordenador"
      subtitle="Persona Lucca Freitas · gestão de provas, professores e desempenho"
    >
      <DCArtboard id="coord-provas" label="10 · Provas (listar & filtrar)" width={1440} height={1024}>
        <div data-screen-label="Coord · Provas" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordProvas/>
        </div>
      </DCArtboard>

      <DCArtboard id="coord-relatorio" label="11 · Relatório consolidado" width={1440} height={1024}>
        <div data-screen-label="Coord · Relatório" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordRelatorio/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="prof-extra"
      title="Professor · Áreas complementares"
      subtitle="Demais itens da barra lateral · dashboard, turmas, repositório de questões e configurações"
    >
      <DCArtboard id="prof-dashboard" label="12 · Dashboard" width={1440} height={1024}>
        <div data-screen-label="Prof · Dashboard" style={{ width: '100%', height: '100%' }}>
          <ScreenDashboard/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-turmas" label="13 · Minhas Turmas" width={1440} height={1024}>
        <div data-screen-label="Prof · Minhas Turmas" style={{ width: '100%', height: '100%' }}>
          <ScreenMinhasTurmas/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-questoes" label="14 · Minhas Questões" width={1440} height={1024}>
        <div data-screen-label="Prof · Minhas Questões" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestoes/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-banco" label="15 · Banco de Questões" width={1440} height={1024}>
        <div data-screen-label="Prof · Banco de Questões" style={{ width: '100%', height: '100%' }}>
          <ScreenBancoQuestoes/>
        </div>
      </DCArtboard>

      <DCArtboard id="prof-config" label="16 · Perfil" width={1440} height={1024}>
        <div data-screen-label="Prof · Perfil" style={{ width: '100%', height: '100%' }}>
          <ScreenConfiguracoes/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="aluno-extras"
      title="Aluno · Telas complementares"
      subtitle="Variações dentro do fluxo de realização da prova"
    >
      <DCArtboard id="aluno-discursiva" label="17 · Questão Discursiva" width={1440} height={1024}>
        <div data-screen-label="Aluno · Questão Discursiva" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestaoDiscursiva/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-questao-a" label="19 · Questão Objetiva · alternativa A" width={1440} height={1024}>
        <div data-screen-label="Aluno · Questão (A)" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestaoObjetiva selected="A"/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-questao-c" label="20 · Questão Objetiva · alternativa C" width={1440} height={1024}>
        <div data-screen-label="Aluno · Questão (C)" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestaoObjetiva selected="C"/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-questao-d" label="21 · Questão Objetiva · alternativa D" width={1440} height={1024}>
        <div data-screen-label="Aluno · Questão (D)" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestaoObjetiva selected="D"/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-questao-e" label="22 · Questão Objetiva · alternativa E" width={1440} height={1024}>
        <div data-screen-label="Aluno · Questão (E)" style={{ width: '100%', height: '100%' }}>
          <ScreenQuestaoObjetiva selected="E"/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-confirmar" label="23 · Confirmar envio (modal)" width={1440} height={1024}>
        <div data-screen-label="Aluno · Confirmar envio" style={{ width: '100%', height: '100%' }}>
          <ScreenConfirmarEnvio/>
        </div>
      </DCArtboard>

      <DCArtboard id="aluno-anotacoes" label="24 · Anotações da questão (modal)" width={1440} height={1024}>
        <div data-screen-label="Aluno · Anotações" style={{ width: '100%', height: '100%' }}>
          <ScreenAnotacoes/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="prof-gestao"
      title="Professor · Gestão de turmas"
      subtitle="Criação e manutenção de turmas a partir de Minhas Turmas"
    >
      <DCArtboard id="prof-criar-turma" label="25 · Criar Turma" width={1440} height={1024}>
        <div data-screen-label="Prof · Criar Turma" style={{ width: '100%', height: '100%' }}>
          <ScreenCriarTurma/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="coord-detalhe"
      title="Coordenador · Professores e detalhe da prova"
      subtitle="Cadastro de docentes e drill-down de uma avaliação: participação → submissões → indicadores"
    >
      <DCArtboard id="coord-professores" label="26 · Professores (cadastrar)" width={1440} height={1024}>
        <div data-screen-label="Coord · Professores" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordProfessores/>
        </div>
      </DCArtboard>

      <DCArtboard id="coord-participacao" label="27 · Prova · Participação" width={1440} height={1024}>
        <div data-screen-label="Coord · Participação" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordParticipacao/>
        </div>
      </DCArtboard>

      <DCArtboard id="coord-submissoes" label="28 · Prova · Submissões" width={1440} height={1024}>
        <div data-screen-label="Coord · Submissões" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordSubmissoes/>
        </div>
      </DCArtboard>

      <DCArtboard id="coord-submissao" label="29 · Submissão individual" width={1440} height={1024}>
        <div data-screen-label="Coord · Submissão" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordSubmissao/>
        </div>
      </DCArtboard>

      <DCArtboard id="coord-indicadores" label="30 · Prova · Indicadores por questão" width={1440} height={1024}>
        <div data-screen-label="Coord · Indicadores" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordIndicadores/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="coord-hub"
      title="Coordenador · Acompanhar provas"
      subtitle="Galeria de todas as provas — cada card abre Participação, Submissões ou Indicadores"
    >
      <DCArtboard id="coord-selecao" label="31 · Acompanhar provas (galeria)" width={1440} height={1024}>
        <div data-screen-label="Coord · Acompanhar provas" style={{ width: '100%', height: '100%' }}>
          <ScreenCoordSelecaoProvas/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="prof-detalhe"
      title="Professor · Detalhe da prova"
      subtitle="Drill-down a partir de Minhas Provas: visão geral → participação → submissões → indicadores → relatório"
    >
      <DCArtboard id="prof-prova-visao" label="32 · Prova · Visão geral" width={1440} height={1024}>
        <div data-screen-label="Prof · Prova Visão geral" style={{ width: '100%', height: '100%' }}>
          <ScreenProvaVisaoGeral/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-prova-participacao" label="33 · Prova · Participação" width={1440} height={1024}>
        <div data-screen-label="Prof · Participação" style={{ width: '100%', height: '100%' }}>
          <ScreenProfParticipacao/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-prova-submissoes" label="34 · Prova · Submissões" width={1440} height={1024}>
        <div data-screen-label="Prof · Submissões" style={{ width: '100%', height: '100%' }}>
          <ScreenProfSubmissoes/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-prova-submissao" label="35 · Submissão individual" width={1440} height={1024}>
        <div data-screen-label="Prof · Submissão" style={{ width: '100%', height: '100%' }}>
          <ScreenProfSubmissao/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-prova-indicadores" label="36 · Prova · Indicadores por questão" width={1440} height={1024}>
        <div data-screen-label="Prof · Indicadores" style={{ width: '100%', height: '100%' }}>
          <ScreenProfIndicadores/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-relatorio" label="37 · Relatório consolidado" width={1440} height={1024}>
        <div data-screen-label="Prof · Relatório" style={{ width: '100%', height: '100%' }}>
          <ScreenProfRelatorio/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-publicar" label="38 · Publicar prova (modal · link)" width={1440} height={1024}>
        <div data-screen-label="Prof · Publicar" style={{ width: '100%', height: '100%' }}>
          <ScreenPublicarProva/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-nova-objetiva" label="39 · Nova Questão Objetiva" width={1440} height={1024}>
        <div data-screen-label="Prof · Nova Questão Objetiva" style={{ width: '100%', height: '100%' }}>
          <ScreenNovaQuestaoObjetiva/>
        </div>
      </DCArtboard>
      <DCArtboard id="prof-qrcode" label="40 · QR Code de acesso (modal)" width={1440} height={1024}>
        <div data-screen-label="Prof · QR Code" style={{ width: '100%', height: '100%' }}>
          <ScreenQRCodeProf/>
        </div>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="aluno-extra-b"
      title="Aluno · Acesso e resultado"
      subtitle="Entrada por link · QR Code para foto · resultado e desempenho liberados"
    >
      <DCArtboard id="aluno-acesso" label="41 · Acesso via link" width={1440} height={1024}>
        <div data-screen-label="Aluno · Acesso via link" style={{ width: '100%', height: '100%' }}>
          <ScreenAcessoLink/>
        </div>
      </DCArtboard>
      <DCArtboard id="aluno-resultado" label="42 · Resultado e desempenho" width={1440} height={1024}>
        <div data-screen-label="Aluno · Resultado" style={{ width: '100%', height: '100%' }}>
          <ScreenResultadoAluno/>
        </div>
      </DCArtboard>
      <DCArtboard id="aluno-qrcode" label="43 · QR Code para foto (modal)" width={1440} height={1024}>
        <div data-screen-label="Aluno · QR Code" style={{ width: '100%', height: '100%' }}>
          <ScreenQRCodeAluno/>
        </div>
      </DCArtboard>
    </DCSection>
  </DesignCanvas>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
