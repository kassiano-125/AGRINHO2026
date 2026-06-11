
  let currentWater = 50;
  let currentIndex = 0;
  let showForest = false;
  const totalQuestions = 20;
  function iniciarJogo() {
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('lab-view').style.display = 'flex';
}

  const frasesAcerto = [
    "Eta orgulho! Ocê entende mesmo desse assunto, sô!",
    "Isso aí! Mais água limpinha pro nosso tanque, bão demais!",
    "Maravilha! Desse jeito a chuva chega de ror de rápido!",
    "Nuuh, acertou na mosca! O chão até deu uma refrescada agora!",
    "Uai, ocê é estudado mesmo nisso, hein? Gostei de ver!",
    "Certinho! As maceira no pasto já tão até agradecendo!",
    "Aí sim, meu filho! Desse jeito o rio num seca nunca!"
  ];

  const frasesErro = [
    "Eita, essa não... Desse jeito a terra vai esturricar todinha!",
    "Ih, complicou... Vamos prestar atenção pra não secar o poço!",
    "Crendiospai! Essa passou longe... Mas desanima não, vamo focar!",
    "Susto da gota! Essa aí num deu certo não, o tanque esvaziou um tico.",
    "Ih, rapaz... Essa resposta tá mais seca que o rabo do tatu!",
    "Uai, achei que essa cê sabia! Mas vamo que vamo, errou feio não."
  ];

  const frasesProxima = [
    "Bora pra próxima pergunta pra juntar mais água pro nosso trem!",
    "Me ajuda com mais essa aqui pra trazer as nuvens de chuva!",
    "Segura o rojão e vamo pra próxima! O que ocê acha dessa aqui?",
    "Toca o barco! Solta o palpite na próxima aí, meu jovem!",
    "Mais uma pra conta! Dá uma olhada nessa aqui que tá vindo...",
    "Vamo que vamo, deixa o cansaço bater não! Próxima questão!"
  ];

  const questions = [
    { q: "Qual a porcentagem de água doce no planeta?", a: ["~3%", "50%", "10%"], correct: 0 },
    { q: "O que mais consome água no Brasil?", a: ["Indústria", "Agricultura", "Doméstico"], correct: 1 },
    { q: "A água é um recurso finito?", a: ["Sim", "Não", "Só no mar"], correct: 0 },
    { q: "Onde fica o maior reservatório de água doce?", a: ["Nuvens", "Geleiras", "Rios"], correct: 1 },
    { q: "Qual o maior oceano do mundo?", a: ["Atlântico", "Índico", "Pacífico"], correct: 2 },
    { q: "O Brasil detém quanto da água doce mundial?", a: ["~12%", "~2%", "~30%"], correct: 0 },
    { q: "O que é água de reuso?", a: ["Água mineral", "Esgoto tratado", "Água da chuva"], correct: 1 },
    { q: "Escovar dentes com torneira aberta gasta?", a: ["2L", "12L", "80L"], correct: 1 },
    { q: "O que é dessalinização?", a: ["Tirar o sal", "Pôr sal", "Limpar rios"], correct: 0 },
    { q: "Qual rio é o maior em volume do mundo?", a: ["Nilo", "Amazonas", "Mississipi"], correct: 1 },
    { q: "A floresta ajuda a chover?", a: ["Sim", "Não", "Só no mar"], correct: 0 },
    { q: "O que é biodiversidade?", a: ["Rochas", "Tipos de vida", "Lixo"], correct: 1 },
    { q: "Principal poluição dos rios?", a: ["Peixes", "Lixo e esgoto", "Sol"], correct: 1 },
    { q: "O vidro demora quanto tempo para sumir?", a: ["100 anos", "1000 anos", "Indeterminado"], correct: 2 },
    { q: "O que é coleta seletiva?", a: ["Separar lixo", "Queimar lixo", "Rio"], correct: 0 },
    { q: "Economizar água poupa energia?", a: ["Sim", "Não", "Não sei"], correct: 0 },
    { q: "Qual o pH da água pura?", a: ["pH 7", "pH 1", "pH 14"], correct: 0 },
    { q: "Manguezais são?", a: ["Desertos", "Berçários", "Lixões"], correct: 1 },
    { q: "Banho de 15 min gasta cerca de?", a: ["135L", "10L", "50L"], correct: 0 },
    { q: "Qual a melhor forma de lavar o carro?", a: ["Mangueira", "Balde", "Chuva"], correct: 1 }
  ];

  function toggleView() {
    showForest = !showForest;
    const lab = document.getElementById('lab-view');
    const forest = document.getElementById('forest-view');
    const btn = document.getElementById('theme-switcher');
    const arrow = document.getElementById('arrow-indicator');
    const nEsq = document.getElementById('nuvem-esq');
    const nDir = document.getElementById('nuvem-dir');

    if (showForest) {
      lab.style.display = 'none';
      forest.style.display = 'flex';
      btn.innerText = "Voltar para Perguntas";
      arrow.style.display = 'none';
      
      // Ativa a exibição e posiciona as nuvens espreitando nas laterais
      nEsq.style.display = 'block';
      nDir.style.display = 'block';
      setTimeout(() => {
        nEsq.style.transform = "translateX(200px)";
        nDir.style.transform = "translateX(-200px)";
      }, 50);
      
      updateTrees();
    } else {
      lab.style.display = 'flex';
      forest.style.display = 'none';
      btn.innerText = "Ver Plantação de Maçãs";
      
      // Recolhe e esconde as nuvens ao voltar
      nEsq.style.transform = "translateX(0px)";
      nDir.style.transform = "translateX(0px)";
      setTimeout(() => {
        nEsq.style.display = 'none';
        nDir.style.display = 'none';
      }, 500);
      
      checkGameEnd();
    }
  }

  function loadQuestion() {
    if (currentIndex >= totalQuestions || currentWater >= 100) {
      checkGameEnd();
      return;
    }
    const qData = questions[currentIndex];
    document.getElementById('question-num').innerText = `Pergunta ${currentIndex + 1} de ${totalQuestions}`;
    document.getElementById('question').innerText = qData.q;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    qData.a.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'opt-btn';
      b.innerText = opt;
      b.onclick = () => checkAnswer(i);
      optionsDiv.appendChild(b);
    });
  }

  function checkAnswer(i) {
    const qData = questions[currentIndex];
    const statusDiv = document.getElementById('status');
    const dialogo = document.getElementById('dialogo-ze');
    const buttons = document.querySelectorAll('.opt-btn');

    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    if (i === qData.correct) {
      currentWater = Math.min(currentWater + 5, 100);
      statusDiv.innerHTML = "<span style='color:#2ecc71'> CORRETO!</span>";
      const rIdx = Math.floor(Math.random() * frasesAcerto.length);
      dialogo.innerText = frasesAcerto[rIdx];
    } else {
      currentWater = Math.max(currentWater - 5, 0);
      const correctText = qData.a[qData.correct];
      statusDiv.innerHTML = `<span style='color:#ff7675'> ERRADO...</span><br><span style='color:#ffeaa7; font-size: 0.95rem;'>A resposta certa era: <b>${correctText}</b></span>`;
      const rIdx = Math.floor(Math.random() * frasesErro.length);
      dialogo.innerText = frasesErro[rIdx];
    }

    updateUI();
    currentIndex++;

    setTimeout(() => {
      statusDiv.innerText = "";
      if(currentWater < 100) {
         const rIdx = Math.floor(Math.random() * frasesProxima.length);
         dialogo.innerText = frasesProxima[rIdx];
      }
      loadQuestion();
    }, 2000);
  }

  function checkGameEnd() {
    const card = document.getElementById('quiz-card');
    const arrow = document.getElementById('arrow-indicator');
    const dialogo = document.getElementById('dialogo-ze');

    if (currentWater >= 100) {
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      dialogo.innerText = "Nossa senhora! Juntamos água demais! Clica lá em cima pra ir ver a plantação de macieiras e fazer chover!";
      if (!showForest) arrow.style.display = 'block';
    } else if (currentIndex >= totalQuestions) {
      document.getElementById('fail-message').style.display = 'block';
    }
  }

  function updateUI() {
    document.getElementById('liquido').style.height = currentWater + '%';
    document.getElementById('porcentagem-vidro').innerHTML = "Água<br>" + currentWater + '%';
  }

  function updateTrees() {
    const scaleFactor = 0.5 + (currentWater / 100) * 0.5;
    const trees = document.querySelectorAll('.tree');
    trees.forEach(tree => {
      tree.style.transform = `scale(${scaleFactor})`;
    });

    if (currentWater >= 100) {
      document.getElementById('action-button').style.display = "block";
    }
  }

  function handleAction() {
    const btn = document.getElementById('action-button');
    if (btn.innerText === "FAZER CHOVER") {
      btn.style.display = 'none';
      
      document.getElementById('game-body').classList.add('chuva-ativa');

      // CALCULO DE CENTRALIZAÇÃO PERFEITO EM JAVASCRIPT
      const nEsq = document.getElementById('nuvem-esq');
      const nDir = document.getElementById('nuvem-dir');
      
      // Posição exata do meio da tela considerando a largura de cada nuvem (350px)
      // Uma vai encostar na outra bem na metade (50vw)
      nEsq.style.transform = "translateX(calc(50vw))"; 
      nDir.style.transform = "translateX(calc(-50vw))";

      // Espera as nuvens colidirem no centro (2.5 segundos)
      setTimeout(() => {
        makeItRain();
        
        // Frutos aparecem após o início da tormenta
        setTimeout(() => {
          showFruits();
          btn.innerText = "COLHER MAÇÃS VERMELHAS";
          btn.style.display = 'block';
        }, 3000);

      }, 2500);
       }
else {
  btn.style.opacity = '0';
btn.style.transform = 'translateX(-50%) scale(0.8)';
// Colhe as maçãs uma por uma
document.querySelectorAll('.fruit').forEach((fruta, i) => {
  setTimeout(() => {
    fruta.style.transform = 'translateY(100px) scale(0)';
    fruta.style.opacity = '0';
  }, i * 100);
});

  document.getElementById('game-body')
    .classList.remove('chuva-ativa');

  document.getElementById('game-body')
    .classList.add('sol-ativo');

  document.getElementById('nuvem-esq').style.opacity = '0';
  document.getElementById('nuvem-dir').style.opacity = '0';

  setTimeout(() => {
    document.getElementById('victory-message').style.display = 'block';
  }, 3500);
}
}
  function makeItRain() {

  const liquido = document.getElementById('liquido');
  const porcentagem = document.getElementById('porcentagem-vidro');

let nivel = currentWater;

  const esvaziar = setInterval(() => {
    nivel -= 2;

    liquido.style.height = nivel + '%';
    porcentagem.innerHTML = "Água<br>" + nivel + "%";

if (nivel <= 0) {
  clearInterval(esvaziar);

  document.getElementById('vidro').style.opacity = '0';
  document.getElementById('porcentagem-vidro').style.opacity = '0';
}
  }, 60);

    // Aumentado o número de gotas para 300 e espalhado por 100% da largura da tela (0 a 100vw)
    for (let i = 0; i < 300; i++) {
      setTimeout(() => {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain';
        
        // Chuva cai pareia por toda a extensão horizontal da janela
        rainDrop.style.left = (Math.random() * 100) + 'vw';
        // Velocidades levemente variadas para dar profundidade natural
        rainDrop.style.animationDuration = (Math.random() * 0.4 + 0.4) + 's';
        
        document.body.appendChild(rainDrop);
        setTimeout(() => rainDrop.remove(), 1000);
      }, i * 10);
    }
  }

  function showFruits() {
    const fruits = document.querySelectorAll('.fruit');
    fruits.forEach(f => {
      f.style.opacity = '1';
      f.style.transform = 'scale(1)';
    });
  }

  updateUI();
  loadQuestion();
