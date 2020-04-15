// https://www.dofactory.com/javascript/singleton-design-pattern
var Container = (function () {
  var instance;

  function createInstance() {
    var object = Object.create(Object.prototype, {
      class: {
        value: "Container"
      }
    });
    return object;
  }

  return {
    getInstance: function () {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }
  };

})();