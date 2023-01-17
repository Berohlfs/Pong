//Selecionando o elemento <canvas> pelo DOM e instanciando um contexto 2D.
const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')
//Definindo as dimensões do elemento e do contexto.
function setUp() {
    canvas.width = canvasCtx.width = window.innerWidth
    canvas.height = canvasCtx.height = window.innerHeight
}
//Objetos
const mouse = {x : 0, y : 0}
const campo = {
    w: window.innerWidth,
    h: window.innerHeight,
    _draw: function () {
        canvasCtx.fillStyle = 'green'
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}
const linha = {
    w: 4,
    h: campo.h,
    _draw: function () {
        canvasCtx.fillStyle = 'white'
        canvasCtx.fillRect(campo.w / 2 - this.w / 2, 0, this.w, this.h)
    }
}
const raquete1 = {
    w: 6,
    h: 90,
    y: 0,
    _move : function(){
        this.y = mouse.y - this.h/2
    },
    _draw: function () {
        canvasCtx.fillRect(10, this.y, this.w, this.h)
        this._move()
    }
}
const raquete2 = {
    w: 6,
    h: 90,
    y: 0,
    _move : function(){
        this.y = bolinha.y - this.h/2
    },
    _draw: function () {
        canvasCtx.fillRect(campo.w - this.w - 10, this.y, this.w, this.h)
        this._move()
    }
}
const placar = {
    player1: '7',
    player2: '5',
    _draw: function () {
        canvasCtx.fillStyle = 'darkgreen'
        canvasCtx.textAlign = 'center'
        canvasCtx.font = 'bold 60px Arial'
        canvasCtx.textBaseline = 'top'
        canvasCtx.fillText(this.player1, canvas.width / 4, 30)
        canvasCtx.fillText(this.player2, canvas.width / 4 + canvas.width / 2, 30)
    }
}
const bolinha = {
    r: 10,
    x: 80,
    y: 70,
    speed: 1,
    _move: function () {
        this.x += 1 * this.speed
        this.y += 1 * this.speed
    },
    _draw: function () {
        canvasCtx.fillStyle = 'white'
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()
        this._move()
    }
}
//Chamadas de métodos de desenho
function draw() {
    campo._draw()
    linha._draw()
    raquete1._draw()
    raquete2._draw()
    placar._draw()
    bolinha._draw()
}
//Acionando as animações
window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()
// function main(){
//     animateFrame(main)
//     draw()
// }
//Chamadas de funções e eventListeners
setUp()
main()
canvas.addEventListener('mousemove', (e)=>{
    mouse.y = e.pageY
})