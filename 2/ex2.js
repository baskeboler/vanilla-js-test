var nextId = 0;
var users = {};
var posts = {};
console.log('Loaded!');
loadUsers();
loadPosts();

function reset() {
    var list = document.getElementById('userList');
    console.log('removing ', list.children.length, ' elements');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    users = {};
    loadUsers();
    loadPosts();
    updateUserCount();
}

function addUser(name) {
    var user = {
        id:  nextId++,
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
    text.textContent = user.name + ' - (' + getPostsForUser(user.id).length + ' posts)';
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

function loadUsers() {
    var r = new XMLHttpRequest(); 
    r.open('GET', 'http://jsonplaceholder.typicode.com/users', true); 
    r.onreadystatechange = function () {
         if (r.readyState != 4 || r.status != 200) return; 
         var list = JSON.parse(r.response);
         for (i=0; i<list.length;i++) {
             var u = list[i];
             users[u.id]=u;
             document.getElementById('userList').appendChild(createListItem(u));
         }
         updateUserCount();
        //  alert("Success: " + r.responseText); 
    };
    r.send();
}

function loadPosts() {
    var r = new XMLHttpRequest(); 
    r.open('GET', 'http://jsonplaceholder.typicode.com/posts', true); 
    r.onreadystatechange = function () {
         if (r.readyState != 4 || r.status != 200) return; 
         var list = JSON.parse(r.response);
         for (i=0; i<list.length;i++) {
             var u = list[i];
             posts[u.id]=u;
            //  document.getElementById('userList').appendChild(createListItem(u));
         }
        //  reset();
        //  updateUserCount();
        //  alert("Success: " + r.responseText); 
    };
    r.send();
}

function getPostsForUser(userId) {
    // using Object.keys() because Object.values() is not available in chrome
    return Object.keys(posts).filter(function (id) {
        return posts[id].userId == userId;
    }).map(function (id) {
        return posts[id];
    });
}