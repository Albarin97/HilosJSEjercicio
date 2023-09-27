function solicitud(datos) {

    return new Promise(resolve => setTimeout(resolve, datos));
    console.log('Funcion No Asincrona');
}

async function f(){
    console.log('Inicio De Funcion Asincrona');

    await solicitud(2000);

    console.log('Terminamos Ejecucion De Funcion Asincrona');
}

function bigFunction() {
    console.log('Funcion normal ejecutada');
    let result = 0;
    for (let index = 0; index < 1e7; index++) {
        result += index;
    }
    console.log('Funcion normal Terminada', result);
}
//f();
//bigFunction();

const COUNTER_P = document.getElementById('counter');
let counter =0;
document.getElementById('btn-counter').addEventListener('click', async (e) => {
    await setTimeout(()=>{
        counter++;
        COUNTER_P.textContent = counter;
    },2000);
});