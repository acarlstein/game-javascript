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

  it('The container should give us a canvas interface', function(){
    
  });
  
  
})