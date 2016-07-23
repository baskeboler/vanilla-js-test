var nextId = 0;
var users = {};
// (function(){
// document.onload = function(){
console.log('Loaded!');
addUser('dummy');
// createListItem('dummy');
// updateUserCount();
// }

function reset() {
    var list = document.getElementById('userList');
    console.log('removing ', list.children.length, ' elements');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    users = {};
    updateUserCount();
}

function addUser(name) {
    var user = {
        id: 'user' + nextId++,
        name: name,
        posts: []
    };
    users[user.id] = user;
    // var name = document.getElementById('nameInput').value;
    console.log('user name: ', name);
    var list = document.getElementById('userList');
    list.appendChild(createListItem(user));
    updateUserCount();
}
function updateUserCount() {
    var count = Object.keys(users).length;//document.getElementById('userList').childElementCount;
    document.getElementById('userCount').textContent = count;
}
function createListItem(user) {
    var item = document.createElement('div');
    item.id = user.id;
    item.classList.toggle('user-list-item')
    var text = document.createElement('div');
    text.classList.toggle('user-list-item-text');
    text.textContent = user.name + ' - (' + user.posts.length + ' posts)';
    item.appendChild(text);
    var button = document.createElement('button');
    button.textContent = 'Remove';
    button.addEventListener('click', function () {
        item.remove();
        delete users[user.id];
        updateUserCount();
    });
    button.classList.toggle('user-list-item-button');
    item.appendChild(button);
    return item;
}
// })()