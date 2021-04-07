//Referencias del HTML
const lblOn      = document.querySelector('#lblOn');
const lblOff     = document.querySelector('#lblOff');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');




// Cliente que utiliza la aplicacion
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    lblOn.style.display = '';
    lblOff.style.display = 'none';
});

socket.on('disconnect', () => {
    // console.log('Desconectado');
    lblOn.style.display = 'none';
    lblOff.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    });
});