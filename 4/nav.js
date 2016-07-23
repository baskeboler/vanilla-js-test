
window.addEventListener('hashchange', onHashChange);
window.addEventListener('load', init);
var navTable = {
    '#/userList': {
        view: 'userListContainer',
        init: function () {

        }
    }    // '#/userDetails': 'userDetailsContainer'
};
var currentVisibleContainer = 'userListContainer';

function init() {
    myApplicationReady.then(function () {
        document.getElementById('userDetailsContainer').style.display = 'none';
        document.getElementById('userListContainer').style.display = 'none';
        document.getElementById('navErrorContainer').style.display = 'none';
        onHashChange();
        
    });

}
function onHashChange() {
    var hash = location.hash;
    if (!hash) {
        hash = location.hash = '#/userList'; 
    }
    for (var i = 0; i < Object.keys(navTable).length; i++) {
        var key = Object.keys(navTable)[i];
        if (hash.startsWith(key)) {
            console.log('current view: ', key);
            document.getElementById(currentVisibleContainer).style.display = 'none';
            currentVisibleContainer = navTable[key].view;
            navTable[key].init();
            document.getElementById(currentVisibleContainer).style.display = 'block';
        }
    }
}
