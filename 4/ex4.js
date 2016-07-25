var nextId = 1000;
var users = new ObservableMap();
var posts = new ObservableMap();
var myApplicationReady;

var userPersistence = new Observer();
var postsPersistence = new Observer();

initialize();

function initialize() {
    setupUserCount();
    if (sessionStorage.users && sessionStorage.posts) {
        console.log('loading from sessionStorage');
        usersObj = JSON.parse(sessionStorage.users);
        for (var key in usersObj) {
            if (usersObj.hasOwnProperty(key)) {
                var u = usersObj[key];
                users.set(key, u);
            }
        }
        postsObj = JSON.parse(sessionStorage.posts);
        for (var key in postsObj) {
            if (postsObj.hasOwnProperty(key)) {
                var p = postsObj[key];
                posts.set(key, p);
            }
        }
        myApplicationReady = Promise.resolve();
        buildList();
    } else {
        myApplicationReady = Promise.all([loadPosts(), loadUsers()]).then(buildList);//.then(firePostsLoaded());
    }
    userPersistence.update = function (subj) {
        console.log('saving users');
        sessionStorage.users = JSON.stringify(subj.map);
    }
    users.addObserver(userPersistence);
    postsPersistence.update = function (subj) {
        console.log('saving posts');
        sessionStorage.posts = JSON.stringify(subj.map);
    }
    posts.addObserver(postsPersistence);

}

function reset() {
    var list = document.getElementById('userList');
    console.log('removing ', list.children.length, ' elements');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    users.clear();
    posts.clear();
    myApplicationReady = Promise.all([loadPosts(), loadUsers()]).then(buildList);//.then(firePostsLoaded());
    setupUserCount();
}

function addUser(name) {
    var user = {
        id: nextId++,
        name: name,
        posts: [],
        username: name.split(' ').join('')
    };
    users.set(user.id, user);
    console.log('user name: ', name);
    var list = document.getElementById('userList');
    list.appendChild(createListItem(user));
}
function setupUserCount() {
    var o = document.getElementById('userCount');
    o.update = function (list) {
        this.textContent = list.keys().length;
    };
    users.addObserver(o);
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
        users.remove(user.id);
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
    return ajaxGet('http://jsonplaceholder.typicode.com/users')
        .then(function (list) {
            for (i = 0; i < list.length; i++) {
                var u = list[i];
                users.set(u.id, u);
            }
            return users;
        });
}
function buildList() {
    users.keys().forEach(function (k) {
        document.getElementById('userList').appendChild(createListItem(users.get(k)));

    }, this);
}
function loadPosts() {
    return ajaxGet('http://jsonplaceholder.typicode.com/posts')
        .then(function (list) {
            for (i = 0; i < list.length; i++) {
                var u = list[i];
                posts.set(u.id, u);
            }
            return posts;

        });
}

function getPostsForUser(userId) {
    return posts.keys().filter(function (id) {
        return posts.get(id).userId == userId;
    }).map(function (id) {
        return posts.get(id);
    });
}

function ajaxGet(url) {
    return new Promise(function (resolve, reject) {
        var r = new XMLHttpRequest();
        r.open('GET', url, true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            else {
                var resp = JSON.parse(r.response);
                return resolve(resp);
            }

        };
        r.send();
    });
}