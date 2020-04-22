var Resource = (function (){
  const ADD_PATH_TO_FILENAME = true
  return {
    getJSON: function(filename, callback){
      if (typeof filename == "string" && !filename.endsWith(".json")){
        console.error("Not a json file");
        return;
      }
      var request = new XMLHttpRequest();
      request.overrideMimeType("application/json");
      request.open('GET', filename, ADD_PATH_TO_FILENAME);
      request.onreadystatechange = function(){
        if (request.status = 200 
            && (request.readyState == 4
                || request.readyState == 0)){
          callback(request.responseText);
        }
      };
      request.send(null);
    }
  };
})()