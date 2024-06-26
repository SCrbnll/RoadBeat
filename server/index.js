import { Server } from 'socket.io';

const io = new Server();
let rooms = []; // Array para almacenar las salas de reproducción
let users = []; // Array para almacenar los usuarios por socket ID

io.on('connection', (socket) => {
  console.log(`connect: ${socket.id}`, socket.request.headers);

  socket.on('register_user', (nombre) => {
    if (nombre.trim().length > 0) {
      // Guardar el usuario en el array users
      users.push({ socketid: socket.id, usuario: nombre });
      console.log(`Usuario ${nombre} registrado con el socket ID: ${socket.id}`);
      console.log('Usuarios conectados: ', users);
    }
  });

  // Manejar el evento de desconexión del socket
  socket.on('disconnect', () => {
    // Obtener el nombre del usuario
    const user = users.find(user => user.socketid === socket.id);
    if (user) {
      console.log(`Usuario ${user.usuario} con el socket ID (${socket.id}) desconectado`);

      // Eliminar al usuario del objeto users
      users = users.filter(u => u.socketid !== socket.id);
      console.log('Usuarios conectados:', users);

      // Iterar sobre todas las salas para eliminar al usuario de ellas
      rooms.forEach(room => {
        const index = room.users.indexOf(socket.id);
        if (index !== -1) {
          room.users.splice(index, 1);
          if (socket.id === room.host) {
            // Si el usuario desconectado era el anfitrión, eliminar la sala
            rooms = rooms.filter(r => r.roomID !== room.roomID);
          }
        }
      });
      console.log('Salas:', rooms);
    }
  });

  // Manejar el evento 'join_room'
  socket.on('join_room', (roomID) => {
    if (roomID.trim().length > 0) {
      const user = users.find(user => user.socketid === socket.id);
      if (user) {
        console.log(`Usuario ${user.usuario} se une a la sala ${roomID}`);
        // Agregar el usuario a la sala
        const roomIndex = rooms.findIndex(room => room.roomID === roomID);
        if (roomIndex === -1) {
          // Si la sala no existe, la creamos
          rooms.push({
            roomID: roomID,
            host: socket.id,
            users: [socket.id],
            playlist: []
          });
        } else {
          // Si la sala ya existe, solo agregamos al usuario
          rooms[roomIndex].users.push(socket.id);
        }
        console.log(rooms);
      }
    }
  });

  // Manejar el evento 'leave_room'
  socket.on('leave_room', (roomID) => {
    const user = users.find(user => user.socketid === socket.id);
    if (user) {
      console.log(`Usuario ${user.usuario} abandona sala ${roomID}`);
      // Buscar la sala en el array de rooms
      const roomIndex = rooms.findIndex(r => r.roomID === roomID);
      if (roomIndex !== -1) {
        const room = rooms[roomIndex];
        const userIndex = room.users.indexOf(socket.id);
        if (userIndex !== -1) {
          room.users.splice(userIndex, 1);
          // Si el usuario que sale es el anfitrión, eliminar la sala
          if (socket.id === room.host) {
            rooms.splice(roomIndex, 1);
          }
        }
      }
      // Eliminar al usuario del array de usuarios
      users = users.filter(u => u.socketid !== socket.id);
    }
    console.log('Usuarios conectados: ', users);
    console.log('Salas:', rooms);
  });

  // Manejar el evento 'add_to_playlist'
  socket.on('add_to_playlist', (roomID, song) => {
    console.log(`Adding song to playlist in room ${roomID}:`, song);

    // Buscar la sala en el array de rooms
    const room = rooms.find(r => r.roomID === roomID);
    if (room) {
      // Agregar la canción a la playlist de la sala
      room.playlist.push({ ...song });
      io.to(socket.id).emit('playlist_data', room.playlist);
      console.log(`Información sala con code ${roomID}`, room);
    } else {
      console.error(`Room with ID ${roomID} not found`);
    }
  });
  
  // Manejar el evento 'send_playlist'
  socket.on('send_playlist', (roomID) => {
    const room = rooms.find(r => r.roomID === roomID);
    if (room) {
      // Enviar la lista de reproducción al cliente
      io.to(socket.id).emit('playlist_data', room.playlist);
    } else {
      console.error(`Room with ID ${roomID} not found`);
    }
  });

});

io.listen(3000);
