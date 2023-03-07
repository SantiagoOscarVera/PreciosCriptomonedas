let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcbusd@ticker')  //<symbol>@ticker solamente para el precio, le ponemos el parametro symbols y le vamos añadiendo los precios qu querramos
let precio = document.getElementById('precio') // aca le pedimos que nos de el elemento por ID, con el html
let cripto = document.getElementById('nombre-cripto')
let cambio = document.getElementById('cambio')
let precio_anterior; // la dejamos como variable global
let precio_actual;
let cambio_anterior; // la dejamos como variable global
let cambio_actual;


ws.onmessage = (event)=> {
    let objeto = JSON.parse(event.data); //lo que nos devuelvo con websocket que sea en un json
    /* let change = objeto.P */

    precio_actual = (parseFloat(objeto.c).toFixed(2)) // es un string y yo lo convierto a numero con en el parseFloat y ademas que me de digitos de a 2 decimales
    cambio_actual = objeto.P

    precio_anterior > precio_actual ? precio.style.color ='red' : precio.style.color = '#5DB142'; // si el precio anterior es mayo al actual significa que bajo entonces se pone rojo, si el precio anterior es menor al actual se pone verde
    /* cambio >= 0 ? cambio.style.color = '#5DB142' : cambio.style.color ='red'; */
    cambio_anterior > cambio_actual ? cambio.style.color ='red' : cambio.style.color = '#5DB142';
    

    cripto.innerHTML = `${objeto.s}`; //le asignamos lo que esta en html
    precio.innerHTML = `USD ${objeto.c}`;
    cambio.innerHTML = `${objeto.P} %`;
    precio_anterior = (parseFloat(objeto.c).toFixed(2))
    cambio_anterior = objeto.P

    // Agregamos los datos a las celdas de la tabla
    document.getElementById("nombre-cripto").innerHTML = objeto.s;
    document.getElementById("precio").innerHTML = `$ ${parseFloat(objeto.c).toFixed(2)}`;
    document.getElementById("cambio").innerHTML = `${objeto.P}%`;
}// ahora abrimos para que nos conecte con el servidor
