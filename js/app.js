document.addEventListener('DOMContentLoaded',()=>{
//ALAPVÁLTOZÓK
const racs = document.querySelector('.racs')
const negyzetek = document.querySelectorAll('.racs div')
const eredmeny = document.querySelector('span')
const inditoGomb = document.querySelector('.start')
const stopGomb = document.querySelector('.stop')
const ujraGomb = document.querySelector('.Ujra')
const felgomb = document.getElementById("fel");
const jobbgomb = document.getElementById("jobb");
const balgomb = document.getElementById("bal");
const legomb = document.getElementById("le");

const szelesseg = 10
let aktindex = 0
let almaIndex = 0
let aktkigyo = [2,1,0]

let irany = 1
let pont = 0
let sebesseg = 0.8

let idozetes = 0
let intervallum = 0
/////////////////////
///JÁTÉK INDÍTÁSA///
///////////////////
function startGame()
{
    console.log('startGame()')  
    aktkigyo.forEach(index=>negyzetek[index].classList.remove('kigyo'))
    negyzetek[almaIndex].classList.remove('alma')

    clearInterval(intervallum)
    pont = 0
    randomApple()

    irany = 1
    eredmeny.innerText = pont
    idozetes = 1000
    aktkigyo = [2,1,0]
    aktindex = 0
    aktkigyo.forEach(index=>negyzetek[index].classList.add('kigyo'))

    

    console.log(negyzetek)

    console.log('startGame()' + aktkigyo + ' ' + irany)

    intervallum = setInterval(mozgasVezerles, idozetes)
}

function randomApple()
{

do{
  almaIndex =Math.floor(Math.random()*negyzetek.length)
}while(negyzetek[almaIndex].classList.contains('kigyo'))

negyzetek[almaIndex].classList.add('alma')
}

function mozgasVezerles()
{
    console.log('mozgasVezerles()')

       //////////////////////////
      ///Utolsó elem levétele///
     //////////////////////////
    const farok = aktkigyo.pop()

    negyzetek[farok].classList.remove('kigyo')

    if(irany === -szelesseg && aktkigyo[0] -szelesseg < 0)
    {
        aktkigyo.unshift(aktkigyo[0]+90)
    }
    else if(aktkigyo[0] + szelesseg >= 100 && irany === szelesseg)
    {
        aktkigyo.unshift(aktkigyo[0]-90)
    }
    else
    {
        ///////////////////////////////////
       ///Kígyó első elemének számítása///
      ///////////////////////////////////
        aktkigyo.unshift(aktkigyo[0]+irany)
    }

    //error 99
    if(aktkigyo[0]=== +100 && irany === +1){
        aktkigyo.unshift(aktkigyo[0]-10)
    }

    
    
    
    
    
    if(negyzetek[aktkigyo[0]].classList.contains('alma')){
    
        //alma levétele
        negyzetek[aktkigyo[0]].classList.remove('alma')

       //pontok növelése
       pont++
       eredmeny.textContent=pont
      //kígyó növelése
      negyzetek[farok].classList.add('kigyo')
      aktkigyo.push(farok)
     //alma újragenerálása
     randomApple()
     
        //sebesség növelése
        clearInterval(intervallum)
        idozetes = idozetes*sebesseg
        intervallum = setInterval(mozgasVezerles,idozetes)

    }
    negyzetek[aktkigyo[0]].classList.add('kigyo')
}

function stopGame()
{
    console.log('stopGame()')
    clearInterval(intervallum)
}

function resetGame()
{

console.log('resetGame()')

clearInterval(intervallum)

negyzetek[almaIndex].classList.remove('alma')

aktkigyo.forEach(index=>negyzetek[index].classList.remove('kigyo'))

pont = 0

}

function control(e)
{
    if(e.keyCode === 39){
        //jobb:39 bal:37 fel:38 le:40
        irany = 1

    }
    else if(e.keyCode === 37)
    {
        irany = -1
    }
    else if(e.keyCode === 38)
    {
        irany = -szelesseg
    }
    else if(e.keyCode === 40)
    {
        irany = +szelesseg
    }

}

function simulateArrowKeyPress(keyCode) {
    const event = new KeyboardEvent("keydown", {
        key: keyCode,
    });
    document.dispatchEvent(event);
}

document.addEventListener('keyup',control)

/////////////////////////
//
/////////////////////////
inditoGomb.addEventListener('click',startGame)

/////////////////////////
//
/////////////////////////
stopGomb.addEventListener('click',stopGame)

ujraGomb.addEventListener('click',resetGame)

    felgomb.addEventListener("click", function () {
        simulateArrowKeyPress("ArrowUp");
    });

    jobbgomb.addEventListener("click", function () {
        simulateArrowKeyPress("ArrowRight");
    });

    balgomb.addEventListener("click", function () {
        simulateArrowKeyPress("ArrowLeft");
    });

    legomb.addEventListener"click", function () {
        simulateArrowKeyPress("ArrowDown");
    });
});
