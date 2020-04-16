// https://www.dofactory.com/javascript/singleton-design-pattern
var GameLoop = (function () {
  const MAX_FPS = 1000 / 60;

  var instance;
  var animationFrameId = null;
  var graphicContainer;
  var animationFrame = function(callback){
    return window.setTimeout(callback, MAX_FPS); // 60 fps
  }
  var cancelAnimationFrame = function(animationFrameId){
    clearTimeout(animationFrameId);
  }
  
  const gameLoop = {
    class: "GameLoop",
    isRunning: false,
    MAX_FPS: MAX_FPS,
    setAnimationFrame: function (newAnimationFrame){
      animationFrame = newAnimationFrame;
    },
    setCancelAnimationFrame: function(newCancelAnimationFrame){
      cancelAnimationFrame = newCancelAnimationFrame;
    },
    draw: function (){
      console.log("draw()")
      if(graphicContainer !== undefined){
        graphicContainer.drawFilledRectangle(0, 0, 50, 50, '#f0A');
      }
    },
    run: function () {
      this.isRunning = true;   
      try{
        this.draw();
      }catch(e){}
      animationFrameId = animationFrame(this.run);
    },
    stop: function() {
      this.isRunning = false
      cancelAnimationFrame(animationFrameId);
    },
    setGraphicContainer: function(newGraphicContainer){
      console.log(newGraphicContainer);
      graphicContainer = newGraphicContainer;
    }
  }

  function createInstance() {
    var object = Object.create(gameLoop);
    Object.assign(Object.prototype, object.prototype);
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