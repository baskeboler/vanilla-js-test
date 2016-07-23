    // '#/userDetails': 'userDetailsContainer'

navTable['#/userDetails'] = {
    view: 'userDetailsContainer',
    init: parseHash
}
details={
    pending:[]
};
window.addEventListener('postsLoaded', function () {
    details.ready=true;
    details.pending.forEach(function(fn) {
        fn();
    }, this);
});

function parseHash() {
    if (!details.ready) {
        console.log('not ready');
        details.pending.push(parseHash);
        return;
    }
    var prefix='#/userDetails/';
    var h = location.hash;
    var r=h.substr(prefix.length);
    var userId=parseInt(r)
    if (!isNaN(userId)) {
        showUserDetails(userId)
    }    
}

function showUserDetails(id) {
    document.getElementById('user-details-name').textContent = users[id].name + ' (' + users[id].username + ')';
    var posts = getPostsForUser(id);
    var list = document.getElementById('user-details-posts');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var li = document.createElement('li');
        li.textContent = '' + post.id + ' - ' + post.title;
        list.appendChild(li);
    }
    location.hash='#/userDetails/'+id;
    // location.search={id:id};
}