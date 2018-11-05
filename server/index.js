const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongojs = require('mongojs');

const ObjectID = mongojs.ObjectID;
const db = mongojs(process.env.MONGO_URL || 'mongodb://localhost:27017/local');
const app = express();
const server = http.Server(app);
const io = socketio(server);
const { UsersList } = require('./users');
const usersList = new UsersList();
// Mapping objects to easily map sockets and users.
const clients = {};
const users = {};

// This represents a unique chatroom.

io.on('connection', socket => {
  clients[socket.id] = socket;
  let room;
  socket.on('userJoined', ({ userId, chatId }) => {
    room = chatId;
    return onUserJoined(userId, chatId, socket);
  });
  socket.on('message', ({ message, chatId }) => {
    console.log(chatId);
    return onMessageReceived(message, chatId, socket);
  });
  socket.on('disconnect', () => {
    const user = usersList.removeUser(socket.id);

    if (user) {
      console.log(`${user.name} disconnected`);
      io.to(room).emit('updateUserList', usersList.getUSerList(room));
    }
  });
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, chatId, socket) {
  try {
    socket.join(chatId);

    if (!usersList.getUser(socket.id)) {
      usersList.addUser(socket.id, userId, chatId);
      io.to(chatId).emit('updateUserList', usersList.getUSerList(chatId));

      const user = db.collection('users').insert({}, (err, user) => {
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
        _sendExistingMessages(socket, chatId);
      });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(socket, chatId);
    }
  } catch (err) {
    console.error(err);
  }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, chatId, senderSocket) {
  console.log(chatId);
  console.log(`user sent a message to ${chatId}`);

  const userId = users[senderSocket.id];
  if (!userId) return;

  _sendAndSaveMessage(message, chatId, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket, chatId) {
  const messages = db
    .collection('messages')
    .find({ chatId })
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('message', messages.reverse());
    });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, chatId, socket) {
  const messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };

  db.collection('messages').insert(messageData, (err, message) => {
    socket.broadcast.to(chatId).emit('message', [message]);
  });
}
server.listen(3001, () => console.log('listening on *:3000'));
