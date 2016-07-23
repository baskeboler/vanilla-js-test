
// Extend an object with an extension
function extend(obj, extension) {
    for (var key in obj) {
        extension[key] = obj[key];
    }
}

function Observer() { }
Observer.prototype.constructor = Observer;
Observer.prototype.update = function (subject) {
    console.error('not implemented.');
}

function Subject() {
    // this.list = [];
    this.observers = [];
}
Subject.prototype.constructor = Subject;
Subject.prototype.notify = function () {
    for (var i = 0; i < this.observers.length; i++) {
        var o = this.observers[i];
        o.update(this);
    }
}

Subject.prototype.addObserver = function (elem) {
    this.observers.push(elem);
}

function ObservableMap() {
    Subject.call(this);
    this.map = {}
    // extend(new Subject(), this);
}
ObservableMap.prototype = Object.create(Subject.prototype);
ObservableMap.prototype.constructor=ObservableMap;
ObservableMap.prototype.get = function (key) {
    return this.map[key];
};
ObservableMap.prototype.set = function (key, val) {
    this.map[key] = val;
    this.notify();
    return this;
};
ObservableMap.prototype.remove = function (key) {
    delete this.map[key];
    this.notify();
};
ObservableMap.prototype.keys = function () {
    return Object.keys(this.map);
};
ObservableMap.prototype.clear = function () {
    this.map = {};
    this.notify();
};
