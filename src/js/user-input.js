// https://www.dofactory.com/javascript/singleton-design-pattern
var UserInput = (function () {
  var instance;
  var userInputEvent;

  var keys = [
    false, // Left
    false, // Up
    false, // Right
    false, // Down
    false, // Attack
    false, // Use Item
    false, // Start
    false  // Select
  ];

  var KEY = {
    "LEFT": 37,  "A": 65, 
    "UP": 38,    "W": 87, 
    "RIGHT": 39, "D": 68, 
    "DOWN": 40,  "S": 83, 
    "SPACEBAR": 32, // Attack
    "CTRL": 91,     // Use Item
    "X": 88,        // Start
    "Z": 90         // Select
  };

  const KEY_INDEX = {
    "LEFT": 0, 
    "UP": 1, 
    "RIGHT": 2, 
    "DOWN": 3, 
    "SPACEBAR": 4, 
    "CTRL": 5, 
    "X": 6, 
    "Z": 7
  }

  var changeKey = function(which, to){
    switch(which){
      case KEY.LEFT: case KEY.A: keys[KEY_INDEX.LEFT] = to; break;
      case KEY.UP: case KEY.W: keys[KEY_INDEX.UP] = to; break;
      case KEY.RIGHT: case KEY.D: keys[KEY_INDEX.RIGHT] = to; break;
      case KEY.DOWN: case KEY.S: keys[KEY_INDEX.DOWN] = to; break;
      case KEY.SPACEBAR: keys[KEY_INDEX.SPACEBAR] = to; break;
      case KEY.CTRL: keys[KEY_INDEX.CTRL] = to; break;
      case KEY.X: keys[KEY_INDEX.X] = to; break;
      case KEY.Z: keys[KEY_INDEX.Z] = to; break;
    }
  }

  function createUserInputEvent(){
    console.log("createUserInputEvent()")
    userInputEvent = new CustomEvent("userInput", {
      "detail": {
        "keys-state": keys
      }
    });
  }
  
  function enabledKeyEventListeners(){
    document.addEventListener('keydown', keydownEvent);
    document.addEventListener('keyup', keyupEvent);
  };

  var keydownEvent = function(event){
    changeKey(event.keyCode, true);
    document.dispatchEvent(userInputEvent);
  }

  var keyupEvent = function(event){
    changeKey(event.keyCode, false);
    document.dispatchEvent(userInputEvent);
  }

  function disabledKeyEventListeners(){
    document.removeEventListener('keydown', keydownEvent);
    document.removeEventListener('keyup', keyupEvent);    
  };

  var userInput = {
    class: "UserInput",
    KEY: KEY,
    KEY_INDEX: KEY_INDEX,
    keysState: keys,
    enabledKeyEventListeners: enabledKeyEventListeners,
    disabledKeyEventListeners: disabledKeyEventListeners
  };

  function createInstance() {    
    createUserInputEvent();
    userInput = Object.assign(userInput, Object.prototype);        
    return  Object.create(userInput);
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