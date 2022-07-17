//inicializacion de variables
let tarjetasDestapadas =0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timepoRegresivoId = null;
let timerIncial = timer;

let winAudio = new Audio('../templates/static/resources/sounds/victory.wav');
let loseAudio = new Audio('../templates/static/resources/sounds/lose.wav');
let corrAudio = new Audio('../templates/static/resources/sounds/correcto.wav');
let erreAudio = new Audio('../templates/static/resources/sounds/error.wav');
let clicAudio = new Audio('../templates/static/resources/sounds/clicl.wav');

//html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    timepoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(timepoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000);
}

function bloquearTarjetas(){
    for(let i =0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="../templates/static/resources/images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}


//funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //mostrar primer numero
        clicAudio.play();
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="../templates/static/resources/images/${primerResultado}.png" alt="">`;
        
        //desabilitar primer boton
        tarjeta1.disabled = true;        
    }else if(tarjetasDestapadas == 2){
        //mostrar segundo numero

        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="../templates/static/resources/images/${segundoResultado}.png" alt="">`;;

        //desabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //encerar al contador de tarjetas destapadas
            tarjetasDestapadas =0;
            corrAudio.play();
            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                winAudio.play();
                clearInterval(timepoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} Felicidades Aci`;
                mostrarTiempo.innerHTML = `Te demoraste: ${timerIncial - timer} Segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} Felicidades Mov`;
            }
        }else{
            //mostrar momentaneamente y tapar
            setTimeout(()=>{
                erreAudio.play();
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}