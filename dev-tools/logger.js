// https://www.dofactory.com/javascript/singleton-design-pattern
var Logger = (function () {
  var instance;
  var outputElement;
  var watchers = [];

  function getDateTime(log) {
    return new Date(Date.now()).toLocaleString();
  };

  function getDateTimedText(text) {
    return getDateTime() + " " + text;
  }

  function log(text) {
    if (outputElement !== undefined) {
      var paragraph = document.createElement("p");
      paragraph.innerHTML = getDateTimedText(text);
      outputElement.append(paragraph)
    }
  };

  function setOutputBySelector(selector) {
    outputElement = document.querySelector(selector);
  };   

  function createInstance() {
    var object = Object.create(Object.prototype, {
      class: {
        value: "Logger"
      },
      log: {
        value: log
      },
      setOutputBySelector: {
        value: setOutputBySelector          
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