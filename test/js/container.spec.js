var expect = chai.expect;

describe('Canvas Container', function() {

  var container;

  beforeEach(function() {
    container = Container.getInstance();
  })
  
  it('There should only exist one Container instance', function() {
    expect(container).to.equal(Container.getInstance())
    expect(container.class).to.equal("Container")
  }) 
  
  it('We should know the size of the container', function(){
    expect(container.width).to.be.gt(0)
    expect(container.height).to.be.gt(0)
  }); 

  it('zoom canvas', function(){
    var canvas = getCanvas()
    var originalHeight = canvas.style.height
    var originalWidth = canvas.style.width
    container.zoom(2)  
    expect(canvas.style.height).to.be.equal(`${originalHeight.match(/\d+/g) * 2}px`)
    expect(canvas.style.width).to.be.equal(`${originalWidth.match(/\d+/g) * 2}px`)
  })

  function getCanvas(){
    return document.querySelector("canvas#container")
  }

  describe('Working with rectangles', function(){

    beforeEach(function() {
      container.fillRect(0, 0, 50, 50, '#FFFFFF')
    })

    it('Draw a filled rectangle', function(){      
      var rgba = getRGBAFromImage(0, 0, 50, 50)
      expect(rgba.red).to.be.equal(255)
      expect(rgba.green).to.be.equal(255)
      expect(rgba.blue).to.be.equal(255)
      expect(rgba.alpha).to.be.equal(255)
    })
  
    it('Clear a filled rectangle', function(){
      container.clearRect(0, 0, 50, 50)
      var rgba = getRGBAFromImage(0, 0, 50, 50)
      expect(rgba.red).to.be.equal(0)
      expect(rgba.green).to.be.equal(0)
      expect(rgba.blue).to.be.equal(0)
      expect(rgba.alpha).to.be.equal(0)
    })

  })

  function getRGBAFromImage(x, y, width, height){
    var context = getContext()
    var imageData = context.getImageData(x, y, width, height)
    return {
      "red": imageData.data[0],
      "green": imageData.data[1],
      "blue": imageData.data[2],
      "alpha": imageData.data[3],   
    }
  }

  function getContext(){
    return getCanvas().getContext("2d")
  }

  describe('Working with images', function(){
    var canvas
    var image
    var testCanvas
    var testImage

    beforeEach(function() {
      canvas = document.querySelector("canvas#container")
      testCanvas = createCanvas(canvas.width, canvas.height)
      image = getImage('images/CharacterVector.png', 86, 86)
      testImage = getImage('images/CharacterVector.png', 86, 86)
    })

    it('Draw an image with x and y coordinates', function(){           
      container.drawImage(image, 0, 0)  
      var b64Image = getImageAsB64FromCanvas(canvas)
    
      testCanvas.getContext('2d').drawImage(testImage, 0, 0)
      var b64TestImage = getImageAsB64FromCanvas(testCanvas)

      expect(b64Image).to.be.equal(b64TestImage)
    })

    it('Draw an image with x and y coordinates plus width and height', function(){           
      container.drawImage(image, 0, 0, 80, 80)
      var b64Image = getImageAsB64FromCanvas(canvas)
      
      testCanvas.getContext('2d').drawImage(testImage, 0, 0, 80, 80)
      var b64TestImage = getImageAsB64FromCanvas(testCanvas)

      expect(b64Image).to.be.equal(b64TestImage)
    })

    function createCanvas(width, height){      
      var testCanvas = document.createElement('canvas')
      testCanvas.width = width
      testCanvas.height = height
      return testCanvas
    }

    function getImageAsB64FromCanvas(canvas){
      return canvas.toDataURL('image/png').replace(/^data:image.+;base64,/, '')
    }

  })

  function getImage(filename, width, height){
    var characterImage = new Image(filename, width, height)
    characterImage.onload = imageFound;
    characterImage.onerror = imageNotFound;
    characterImage.src = filename
    characterImage.width = width
    characterImage.height = height
    return characterImage
  }

  function imageFound(){
    console.log("Image found");
  }

  function imageNotFound(){
    console.log("[X] Image Not found!");
  }

  describe('Working with animation', function(){

    it('x', function(){
      var actor = EntityFactory.getInstance().createActor()
      var image = getImage('images/CharacterVectorAnimation.png', 334, 500)
      container.drawActor(image, actor)
      expect(true).to.be.true
    })

  })

})