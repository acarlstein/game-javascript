var expect = chai.expect;

describe('Game Loop', function() {
  var gameLoop

  beforeEach(function() {
    gameLoop = GameLoop.getInstance()
  })
  
  it('There should only exist one instance', function() {
    expect(gameLoop).to.equal(GameLoop.getInstance())
    expect(gameLoop.class).to.equal("GameLoop")
  }) 

  it('It shouldn\'t be running when created', function(){
    expect(gameLoop.isRunning).to.be.false
  })

  it('It should run', function() {
    gameLoop.run()
    expect(gameLoop.isRunning).to.be.true
  })

  it('It should stop after running', function() {
    gameLoop.run()
    expect(gameLoop.isRunning).to.be.true
    gameLoop.stop()
    expect(gameLoop.isRunning).to.be.false
  })

  it('If already not running, stop should do nothing', function(){
    expect(gameLoop.isRunning).to.be.false
    gameLoop.stop()
    expect(gameLoop.isRunning).to.be.false
  })

  it('I can provide my own animation frame if needed', function(){
    var wasCalled = false;
    var animationFrame = function(callback){
      wasCalled = true;
      return 0;
    }
    gameLoop.setAnimationFrame(animationFrame);
    gameLoop.run();
    expect(wasCalled).to.be.true;
  })
  
  it('I can provide my own cancel animation frame if needed', function() {
    var animationFrame = function(callback){
      return 1234;
    }
    gameLoop.setAnimationFrame(animationFrame);

    var status = {
      wasCalled: false,
      animationFrameId: 0
    };

    var cancelAnimationFrame = function(newAnimationFrameId){
      status.wasCalled = true;
      status.animationFrameId = newAnimationFrameId;
    };

    gameLoop.setCancelAnimationFrame(cancelAnimationFrame);
    gameLoop.run();
    gameLoop.stop();
    expect(status.wasCalled).to.be.true;
    expect(status.animationFrameId).to.be.equal(1234);
  })

})