//Selecionando o elemento <canvas> pelo DOM e instanciando um contexto 2D.
const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')
//Definindo as dimensões do elemento e do contexto.
function setUp(){
    canvas.width = canvasCtx.width = 330
    canvas.height = canvasCtx.height = 230
}
setUp()
//Objetos
const campo = {
    w : canvas.width,
    h : canvas.height,
    draw : function(){
        canvasCtx.fillStyle = 'green'
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}
const linha = {
    w : 2,
    h : campo.h,
    draw: function (){
        canvasCtx.fillStyle = 'white'
        canvasCtx.fillRect(campo.w/2 - this.w/2, 0, this.w, this.h)
    }
}
const raquete1 = {
    w : 6,
    h : 50,
    y : 130,
    draw : function(){
        canvasCtx.fillRect(10, this.y, this.w, this.h)
    }
}
const raquete2 = {
    w : 6,
    h : 50,
    y : 70,
    draw : function(){
        canvasCtx.fillRect(campo.w - this.w - 10, this.y, this.w, this.h)
    }
}
const placar = {
    player1 : '7',
    player2 : '5',
    draw : function(){
        canvasCtx.fillStyle = 'darkgreen'
        canvasCtx.textAlign = 'center'
        canvasCtx.font = 'bold 60px Arial'
        canvasCtx.textBaseline = 'top'
        canvasCtx.fillText(this.player1, canvas.width/4, 30)
        canvasCtx.fillText(this.player2, canvas.width/4 + canvas.width/2, 30)
    }
}
const bolinha = {
    r : 5,
    x : 80, 
    y : 70,
    draw : function(){
        canvasCtx.fillStyle = 'white'
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false)
        canvasCtx.fill()
    }
}
//Chamando as funções de desenho
function draw(){
    campo.draw()
    linha.draw()
    raquete1.draw()
    raquete2.draw()
    placar.draw()
    bolinha.draw()
}
draw()