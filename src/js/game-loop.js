// https://www.dofactory.com/javascript/singleton-design-pattern
var GameLoop = (function () {
  const MAX_FPS = 1000 / 60;

  var instance;
  var animationFrameId = null;
  var actions = [];

  var animationFrame = function(callback){
    return window.setTimeout(callback, MAX_FPS); // 60 fps
  }
  
  var cancelAnimationFrame = function(animationFrameId){
    clearTimeout(animationFrameId);
  }

  var runActions = function (){
    for (var i = 0; i < actions.length; ++i){
      actions[i]();
    }
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
    addAction: function(actionFunction){      
      actions.push(actionFunction);
    },
    setActions: function(newActions){
      if (newActions instanceof Array){
        actions = newActions;
      }
    },
    run: function runLoop() {
      this.isRunning = true;   
      try{
        runActions();
      }catch(e){
        console.log(e);
      }
      animationFrameId = animationFrame(runLoop);
    },
    stop: function() {
      console.log("stop()");
      this.isRunning = false
      cancelAnimationFrame(animationFrameId);
    },

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