//Selecionando o elemento <canvas> pelo DOM e instanciando seu contexto gráfico.
const CANVAS = document.querySelector('canvas')
const CANVAS_CTX = CANVAS.getContext('2d')
//Definindo as dimensões do contexto.
function setUp(){
    CANVAS.width = CANVAS_CTX.width = window.innerWidth
    CANVAS.height = CANVAS_CTX.height = window.innerHeight
}
//Declarando os objetos
const MOUSE = {x : window.innerWidth/2}
const BOARD = {
    w : window.innerWidth,
    h : window.innerHeight,
    _gameOver : function(){
        CANVAS_CTX.fillStyle = 'red'
        CANVAS_CTX.fillRect(0, 0, this.w, this.h)
    },
    _draw : function(){
        CANVAS_CTX.fillStyle = 'black'
        CANVAS_CTX.fillRect(0, 0, this.w, this.h)
    }
}
const RACKET = {
    x : 0,
    w : 60,
    h : 15,
    y : BOARD.h - 150,
    _move : function(){
        this.x = MOUSE.x - this.w/2
    },
    _draw : function(){
        CANVAS_CTX.fillStyle = 'white'
        CANVAS_CTX.fillRect(this.x, this.y, this.w, this.h)
        this._move()
    }
}
const BALL = {
    r : 7,
    x : BOARD.w/2,
    y : BOARD.h/6,
    speed: 3,
    directionX : 1,
    directionY : -1,
    _checkPosition : function(){
        if(this.y < 0 + this.r){
            this._revertY()
        }
        else if(this.y > BOARD.h - this.r){
           this._restart()
           SCORE._restart()
           BOARD._gameOver()
        }
        else if ((this.x > BOARD.w - this.r) || (this.x < 0 + this.r)){
            this._revertX()
        }
        else if((this.x > RACKET.x && this.x < RACKET.x + RACKET.w)&&(this.y > RACKET.y - this.r && this.y < RACKET.y + RACKET.h - this.r)){
            this._revertY()
            SCORE._addPoint()
            this._addSpeed()
        }
    },
    _addSpeed : function(){
        if(this.speed < 10){this.speed+=0.5}
    },
    _restart : function(){
        this.speed = 3
        this.x = BOARD.w/2
        this.y = BOARD.h/6
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
        CANVAS_CTX.beginPath()
        CANVAS_CTX.arc(this.x, this.y, this.r, 0, 2*Math.PI, false)
        CANVAS_CTX.fill()
        this._move()
        this._checkPosition()
    }
}
const SCORE = {
    content : 0,
    _addPoint : function(){
        this.content++
    },
    _restart : function(){
        this.content = 0
    },
    _draw : function(){
        CANVAS_CTX.fillStyle = 'grey'
        CANVAS_CTX.font = 'bold 40px Arial'
        CANVAS_CTX.textAlign = 'center'
        CANVAS_CTX.textBaseline = 'top'
        CANVAS_CTX.fillText(`${this.content}`, BOARD.w/2, 40)
    }
}
//Função 'draw' --> Chama os métodos de desenho
function draw(){
    BOARD._draw()
    RACKET._draw()
    BALL._draw()
    SCORE._draw()    
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
CANVAS.addEventListener('mousemove', (e)=>{
    MOUSE.x = e.pageX
})
CANVAS.addEventListener('touchmove', (e)=>{
    MOUSE.x = e.targetTouches[0].pageX
})
