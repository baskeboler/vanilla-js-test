# Javascript exercises

## 1 
* `document.createElement()`
* DOM manipulation
## 2
* `XMLHttpRequest` used for AJAX requests.

## 3
* Routing and navigation
* "application ready" promise used so views are built after all data has been fetched.
## 4

### ObservableMaps
Maps that extend Subject and notify observers when modified.

* users
* posts

### Observers
* Persistence observers
* User count observer
  * observes users map
   
### Routing
* Navigation table
  * nav entries include element id of view and init callback.

### Use of Promise objects
* application ready promise
  * used in router init methods to build views when promise is fulfilled.
* ajax requests

### Room for improvements
* Make user list in DOM observer of user map
  * update method refreshes list in DOM
* use of angular.js
  * use ui-router for routing and navigation
  * use 2-way binding in views for user list and user count.
  * use angular factory and $resource 
  ```javascript
  angular.module('app').factory('User', User);
  User.$inject = ['$resource'];
  function User($resource) {
    var service = $resource('http://someurl.com/users/:id', {}, {
          query: {
              method: 'GET',
              isArray: true
          },
          save: {method: 'POST'},
          update: {method: 'PUT'},
          remove: {method: 'DELETE'},
          get: {method: 'GET'}
    });
    return service;
  }
  ```
    * this is assuming backend service implements these HTTP methods.