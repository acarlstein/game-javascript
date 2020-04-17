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
    const animationFrame = chai.spy.returns(1234)
    gameLoop.setAnimationFrame(animationFrame)

    var status = {
      wasCalled: false,
      animationFrameId: 0
    };

    var cancelAnimationFrame = chai.spy(function(newAnimationFrameId){
      status.wasCalled = true;
      status.animationFrameId = newAnimationFrameId
    })

    gameLoop.setCancelAnimationFrame(cancelAnimationFrame)
    gameLoop.run()
    gameLoop.stop()
    expect(status.wasCalled).to.be.true
    expect(status.animationFrameId).to.be.equal(1234)
    expect(animationFrame).to.have.been.called
    expect(cancelAnimationFrame).to.have.been.called
  })

  describe('Managing Actions to run in loop', function() {

    it('I can provide an action to be perform in the loop', function() {
      gameLoop.setAnimationFrame(window.requestAnimationFrame)
      gameLoop.setCancelAnimationFrame(window.cancelAnimationFrame)
      var fn = chai.spy(function someAction(){})
      gameLoop.addAction(fn)
      gameLoop.run()
      gameLoop.stop()
      expect(fn).to.be.called
    })

    it('I can provide a list of actions to be perform in the loop', function() {
      gameLoop.setAnimationFrame(window.requestAnimationFrame)
      gameLoop.setCancelAnimationFrame(window.cancelAnimationFrame)
      var fn1 = chai.spy(function action1(){})
      var fn2 = chai.spy(function action2(){})
      var fn3 = chai.spy(function action3(){})
      gameLoop.setActions([fn1, fn2, fn3])
      gameLoop.run()
      gameLoop.stop()
      expect(fn1).to.be.called
      expect(fn2).to.be.called
      expect(fn3).to.be.called
    })

  })

})