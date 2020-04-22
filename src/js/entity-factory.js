// https://www.dofactory.com/javascript/singleton-design-pattern
var EntityFactory = (function () {
  var instance;
  /*
  var buildActor = function(){
    return {
      "entity": "actor",
      "x": 0,
      "y": 0,
      "width": 16,
      "height": 24,
      "offset": {
        "x": -2,
        "y": 0,
        "width": 1,
        "height": 0,
      },
      "sequence": {
        "values": [],
        "index": 0
      },
      "sprite": {
        "x": 0,
        "y": 0,
        "width": 16,
        "height": 24,
        "offset": {
          "x": -1,
          "y": 0,
          "width": 0,
          "height": 0,
        },
      }
    }
  }
  */

  var buildActor = function(){
    return {
      "entity": "actor",
      "x": 0,
      "y": 0,
      "width": 80,
      "height": 90,
      "offset": {
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0,
      },
      "sequence": {
        "values": [],
        "index": 0
      },
      "sprite": {
        "x": 0,
        "y": 20,
        "width": 80,
        "height": 90,
        "offset": {
          "x": 2,
          "y": 0,
          "width": 1,
          "height": 0,
        },
      }
    }
  } 
  var entityFactory = {
    class: "EntityFactory",
    createActor: function(){
      return new buildActor()
    }
  }

  function createInstance() {
    entityFactory = Object.assign(entityFactory, Object.prototype);
    return  Object.create(entityFactory);
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