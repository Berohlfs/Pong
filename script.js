//Selecionando o elemento <canvas> pelo DOM e instanciando seu contexto gráfico.
canvas = document.querySelector('canvas')
canvasCtx = canvas.getContext('2d')
//Definindo as dimensões do contexto.
function setUp(){
    canvas.width = canvasCtx.width = window.innerWidth
    canvas.height = canvasCtx.height = window.innerHeight
}
//Declarando os objetos
const mouse = {x : window.innerWidth/2}
const board = {
    w : window.innerWidth,
    h : window.innerHeight,
    _draw : function(){
        canvasCtx.fillStyle = 'black'
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}
const racket = {
    x : 0,
    w : 75,
    h : 6,
    _move : function(){
        this.x = mouse.x - this.w/2
    },
    _draw : function(){
        canvasCtx.fillStyle = 'white'
        canvasCtx.fillRect(this.x, board.h - 30, this.w, this.h)
        this._move()
    }
}
const ball = {
    r : 8,
    x : 50,
    y : 100,
    speed: 5,
    directionX : 1,
    directionY : 1,
    _checkPosition : function(){
        if((this.y > board.h - this.r) || (this.y < 0 + this.r)){
            this._revertY()
        }
        else if ((this.x > board.w - this.r) || (this.x < 0 + this.r)){
            this._revertX()
        }
    },
    _revertY : function(){
        this.directionY *= -1
    },
    _revertX : function(){
        this.directionX *= -1
    },
    _move : function (){
        this.x += this.directionX * this.speed
        this.y += this.directionY * this.speed
    },
    _draw : function(){
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false)
        canvasCtx.fill()
        this._move()
        this._checkPosition()
    }
}
const placar = {
    content : 0,
    _draw : function(){
        canvasCtx.fillStyle = 'grey'
        canvasCtx.font = 'bold 40px Arial'
        canvasCtx.textAlign = 'center'
        canvasCtx.textBaseline = 'top'
        canvasCtx.fillText(`${this.content}`, board.w/2, 40)
    }
}
//Função 'draw' --> Chama os métodos de desenho
function draw(){
    board._draw()
    racket._draw()
    ball._draw()
    placar._draw()    
}
//Animações
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
function main(){
    animateFrame(main)
    draw()
}
//Chamada de funções e eventListeners
setUp()
main()
canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.pageX
})
canvas.addEventListener('touchmove', (e)=>{
    mouse.x = e.targetTouches[0].pageX
    console.log(e)
})
