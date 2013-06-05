exports.init = function (socket) {
  if(socket.listeners('kinda:get_time') > 0) {
    console.error("kinda:get_time listener already defined for this socket!");
    process.exit(1);
  }
  
  socket.on('kinda:get_time', function(client_transmit_time) {
    socket.emit('kinda:time', { server_transmit_time : Date.now(),
                                client_transmit_time : client_transmit_time });
  });
};