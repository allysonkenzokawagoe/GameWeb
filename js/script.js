document.getElementById('game').hidden = true;
document.getElementById('gameover').hidden = true;

let player = document.getElementById('player');
let enemy = document.getElementById('enemy');
const playerScore = document.querySelector('#playerScore');
const txtTempo = document.querySelector('#txtTempo');
const btnReiniciar = document.querySelector('#btnReiniciar');

let tempoJogador = 0;
let scoreJogador = 0;

function iniciar() {
    document.getElementById('game').hidden = false;
    document.getElementById('menu').hidden = true;
    document.getElementById('gameover').hidden = true;

    var name = document.getElementById('nome').innerHTML = document.getElementById('name').value;

    setTimeout(() => {
        time();
        score();
    }, 0)

    velEnemy(enemy);
}

const time = () => {
    const tempoTime = setInterval(() => {
        tempoJogador = txtTempo.innerHTML;
        tempoJogador++;
        txtTempo.innerHTML = tempoJogador;
    }, 1000);
}

const score = () => {
    const scorePlayer = setInterval(() => {
        if(tempoJogador <= 15) {
            scoreJogador += 2;
        } else if(tempoJogador <= 30) {
            scoreJogador += 4;
        } else if(tempoJogador <= 45) {
            scoreJogador += 8
        }
        playerScore.innerHTML = scoreJogador;
    }, 10);
}

const velEnemy= (elemento, retardo = 0) => {
    const velocidade = setInterval(() => {
        if(tempoJogador <= 15) {
            elemento.style.animation = `enemy 1.2s infinite linear`;
            scoreJogador += 2;
        } else if(tempoJogador <= 30) {
            elemento.style.animation = `enemy 1s infinite linear`;
            scoreJogador += 4;
        } else if(tempoJogador <= 45) {
            elemento.style.animation = `enemy 0.8s infinite linear`;
            scoreJogador += 8;
        } else if(tempoJogador <= 60) {
            elemento.style.animation = `enemy 0.5s infinite linear`;
            scoreJogador += 16;
        }
    })
}

const pular = (event) => {
    if(event.key === ' ') {
        player.classList.add('jump');

        setTimeout(() => {
            player.classList.remove('jump');
        }, 400)
    }
    
}

document.addEventListener('keydown', pular);

const controlePartida = setInterval(() => {
        let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
        let enemyLeft = enemy.offsetLeft;

        if(enemyLeft <= 110 && enemyLeft > 45 && playerBottom <= 70) {
            gameOver();
            scoreJogador = 0
            playerScore.innerHTML = scoreJogador;
            tempoJogador = 0;
            txtTempo.innerHTML = tempoJogador;
        }
        
},10)

const reinicarPartida = () => {
    location.reload(true);
}

btnReiniciar.addEventListener('click', reinicarPartida);

function gameOver() {
    document.getElementById('game').hidden = true;
    document.getElementById('gameover').hidden = false;

    document.getElementById('finalScore').innerHTML = scoreJogador;
}