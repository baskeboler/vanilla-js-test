var nextId = 1000;
var users = {};
var posts = {};
console.log('Loaded!');
var ex3Ready = Promise.all([loadPosts(), loadUsers()]).then(buildList).then(firePostsLoaded());
// loadPosts();
window.addEventListener('hashchange', function () {
    console.log('hash change: ', location.hash);

});

function reset() {
    var list = document.getElementById('userList');
    console.log('removing ', list.children.length, ' elements');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    users = {};
    ex3Ready = Promise.all([loadPosts(), loadUsers()]).then(buildList).then(firePostsLoaded());
    updateUserCount();
}

function addUser(name) {
    var user = {
        id: nextId++,
        name: name,
        posts: []
    };
    users[user.id] = user;
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
    var detailsBtn = document.createElement('button');
    detailsBtn.textContent = 'Details';
    detailsBtn.classList.toggle('user-list-item-button');
    detailsBtn.addEventListener('click', function () {
        showUserDetails(user.id);
    })
    item.appendChild(detailsBtn);
    return item;
}

function loadUsers() {
    return new Promise(function (resolve, reject) {
        var r = new XMLHttpRequest();
        r.open('GET', 'http://jsonplaceholder.typicode.com/users', true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            var list = JSON.parse(r.response);
            for (i = 0; i < list.length; i++) {
                var u = list[i];
                users[u.id] = u;
            }
            updateUserCount();
            resolve(users);
        };
        r.send();

    });
}
function buildList() {
    Object.keys(users).forEach(function (k) {
        document.getElementById('userList').appendChild(createListItem(users[k]));

    }, this);
}
function loadPosts() {
    return new Promise(function (resolve, reject) {
        var r = new XMLHttpRequest();
        r.open('GET', 'http://jsonplaceholder.typicode.com/posts', true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            var list = JSON.parse(r.response);
            for (i = 0; i < list.length; i++) {
                var u = list[i];
                posts[u.id] = u;
            }
            resolve(posts);

        };
        r.send();
    });
}
function firePostsLoaded(params) {
    var event = document.createEvent('Event');
    event.initEvent('postsLoaded', true, false);
    window.dispatchEvent(event);
}

function getPostsForUser(userId) {
    // using Object.keys() because Object.values() is not available in chrome
    return Object.keys(posts).filter(function (id) {
        return posts[id].userId == userId;
    }).map(function (id) {
        return posts[id];
    });
}