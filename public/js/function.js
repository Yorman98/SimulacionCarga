
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
  import { getDatabase, ref, onValue, set  } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCIFSlS--5jK18AaE2dbLzJOSbJHpx3Y6o",
    authDomain: "procesocarga-f9337.firebaseapp.com",
    projectId: "procesocarga-f9337",
    storageBucket: "procesocarga-f9337.appspot.com",
    messagingSenderId: "425991122650",
    appId: "1:425991122650:web:bbdd6603207f037361ffe3"
  };


  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);



let btn = document.querySelector('.interruptor');
let btnconfir = document.querySelector('.confirmar-carga');
let inter = document.querySelector('.interruptor.off');
let bomb = document.querySelector('.bombillo');
let showStock = document.querySelector('.stock');

/*Trae el valor por defecto de la base de datos */
let cargado = ref(db, 'cargado/');
let confirmCar = ref(db, 'confirmarCarga/');
let stock = ref(db, 'stock/');

reset();



/*Trayendo valor de firebase*/

onValue(cargado, (snapshot) => {
    cargado = snapshot.val();
    if (cargado) {
        bomb.src = "./img/bombillo-on.png";
    } else {
        bomb.src = "./img/bombillo-off.png";
    }
});

onValue(confirmCar, (snapshot) => {
    confirmCar = snapshot.val();
    
    if (confirmCar) {
        btnconfir.src = "./img/on.png"
    } else {
        btnconfir.src = "./img/off.png"
    }
});

onValue(stock, (snapshot) => {
    stock = snapshot.val();
     showStock.textContent = stock.toString();
});

function reset() {
    btn.classList.remove('int-on');
    inter.src = "./img/off.png";
    set(ref(db, 'cargado/'), false);
    set(ref(db, 'confirmarCarga/'), false);
}

btn.addEventListener('click', function () {
 
    if (stock > 0) {
         inter.src = "./img/on.png";
            
    document.querySelector('.caja').classList.add('cinta-on')
    setTimeout(() => {
        set(ref(db, 'cargado/'), true);
     }, 5000);
    } else {
        alert('No hay stock, Almacen en carga');
        set(ref(db, 'stock/'), 5);

    }
   
})


 btnconfir.addEventListener('click', function () {
    
    if(cargado) set(ref(db, 'confirmarCarga/'), true);

    if (confirmCar == true && cargado == true) {
    
        document.querySelector('.caja').classList.remove('cinta-on');
        
        set(ref(db, 'stock/'), stock-1);
    setTimeout(() => {
        reset();
     }, 3000);
    }else {
        alert('Aun no se ha completado el cargamento')
    }
})  

