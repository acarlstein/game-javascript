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

  describe('Working with images', function(){

    it('Draw an image', function(){           
      var image = getTestingImage()
      container.drawImage(0, 0, image)
      
      var canvas = document.querySelector("canvas#container")
      var b64Image = canvas.toDataURL('image/png').replace(/^data:image.+;base64,/, '')
      
      var testImage = getTestingImage()
      var testCanvas = document.createElement('canvas')
      testCanvas.width = canvas.width
      testCanvas.height = canvas.height
      testCanvas.getContext('2d').drawImage(testImage, 0, 0)
      var b64TestImage = testCanvas.toDataURL('image/png').replace(/^data:image.+;base64,/, '')

      expect(b64Image).to.be.equal(b64TestImage)
    })

  })

  function getCanvasContext(){
    var canvas = document.querySelector("canvas#container")
    return canvas.getContext("2d")
  }

  function getRGBAFromImage(x, y, width, height){
    var context = getCanvasContext()
    var imageData = context.getImageData(x, y, width, height)
    return {
      "red": imageData.data[0],
      "green": imageData.data[1],
      "blue": imageData.data[2],
      "alpha": imageData.data[3],   
    }
  }

  function getTestingImage(){
    var characterImage = new Image()
    characterImage.onload = imageFound;
    characterImage.onerror = imageNotFound;
    characterImage.src = 'images/CharacterVector.png'
    characterImage.width = 86
    characterImage.height = 86
    return characterImage
  }

  function imageFound(){
    console.log("Image found");
    //console.log("- Width: " + this.width)
    //console.log("- Height: " + this.width)
  }

  function imageNotFound(){
    console.log("[X] Image Not found!");
  }

})