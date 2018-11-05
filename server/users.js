class UsersList {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUSerList(room) {
    const users = this.users.filter(user => user.room === room);
    console.log(users);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { UsersList };
