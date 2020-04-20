// https://www.dofactory.com/javascript/singleton-design-pattern
var Container = (function () {
  var instance;
  var canvasInstance = undefined;
  var contextInstance;

  function getContext(){
    var canvas = getCanvas();
    contextInstance = canvas.getContext('2d');
    return contextInstance;
  }

  function getCanvas() {
    if (canvasInstance === undefined) {
      canvasInstance = document.querySelector("canvas#container");
      if (canvasInstance === undefined || canvasInstance == null){
        canvasInstance = createCanvas()
        var body = document.querySelector("body");
        body.appendChild(canvasInstance);
      }
    }
    return canvasInstance;
  }

  function createCanvas(){
    var canvas = document.createElement('canvas');
    canvas.id = "container"
    canvas.width = 256;
    canvas.height = 224;
    return canvas
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
    drawImage: function(image, x, y, width, height) {         
      if(width === undefined || height == undefined){      
        getContext().drawImage(image, x, y);  
      }else{
        getContext().drawImage(image, x, y, width, height);  
      }
    },
    zoom: function(scale){
      var cssProperties = `width: ${this.width * scale}px; height: ${this.height * scale}px;`
      getCanvas().style.cssText = cssProperties
      getCanvas().parentNode.style.cssText = cssProperties
    },
    drawActor: function(image, actor){ 
      actor.sprite.x = action.sequence.values[actor.sequence.index] * 16     
      getContext().drawImage(image, 
        actor.sprite.x, actor.sprite.y, actor.sprite.width, actor.sprite.height,
        actor.x, actor.y, actor.width, actor.height
      )
      if (actor.sequence.index < actor.sequence.values.length - 1){
        actor.sequence.index++
      } else {
        actor.sequence.index = 0
      }
    }

  };

  function createInstance() {
    container = Object.assign(container, Object.prototype);
    container.zoom(1);
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