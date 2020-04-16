// https://www.dofactory.com/javascript/singleton-design-pattern
var Container = (function () {
  var instance;
  var canvasInstance = undefined;
  var contextInstance;

  function getCanvas() {
    if (canvasInstance === undefined) {
      canvasInstance = document.querySelector("canvas#container");
      if (canvasInstance === undefined || canvasInstance == null){
        canvasInstance = document.createElement('canvas');
        canvasInstance.id = "container"
        canvasInstance.width = 256;
        canvasInstance.height = 224;
        var body = document.querySelector("body");
        body.appendChild(canvasInstance);
      }
    }
    return canvasInstance;
  }

  function getContext(){
    var canvas = getCanvas();
    contextInstance = canvas.getContext('2d');
    return contextInstance;
  }

  function createInstance() {
    var object = Object.create(Object.prototype, {
      class: {
        value: "Container"
      },
      width: {
        value: getCanvas().width
      },
      height: {
        value: getCanvas().height
      },
      drawFilledRectangle: {
        value: function(x, y, width, height, hexColor){
          getContext().fillStyle = hexColor;
          getContext().fillRect(x, y, width, height);          
        }
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