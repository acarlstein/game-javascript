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

  var container = {
    class: "Container",
    width: getCanvas().width,
    height: getCanvas().height,
    fillRect: function(x, y, width, height, hexColor){
      if (hexColor !== undefined){
        getContext().fillStyle = hexColor;
      }          
      getContext().fillRect(x, y, width, height);          
    },
    clearRect: function(x, y, width, height) {
      getContext().clearRect(x, y, width, height);
    },
    drawImage: function(x, y, image) {         
      getContext().drawImage(image, x, y);
    }
  };

  function createInstance() {
    container = Object.assign(container, Object.prototype);
    return  Object.create(container);
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