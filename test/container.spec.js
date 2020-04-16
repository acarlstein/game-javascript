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

  it('Draw a Filled Rectangle', function(){
    container.drawFilledRectangle(0, 0, 50, 50, '#f0A');    
  })

})