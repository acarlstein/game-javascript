var expect = chai.expect;

describe('User Input', function() {

  const KEY_DOWN_EVENT = "keydown"
  const KEY_UP_EVENT = "keyup"

  var userInput

  beforeEach(function() {
    userInput = UserInput.getInstance()
    resetKeysState()
    userInput.enabledKeyEventListeners()
  })

  function resetKeysState(){
    for (var i = 0; i < userInput.keysState.length; ++i){
      userInput.keysState[i] = false
    } 
  }

  afterEach(function(){
    userInput.disabledKeyEventListeners()
  })
  
  it('There should only exist one instance', function() {
    var userInput = UserInput.getInstance()
    expect(userInput).to.equal(UserInput.getInstance())
    expect(userInput.class).to.equal("UserInput")
  }) 

  describe('Detect keys pressed down', function() {

    it('Left key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.LEFT)
      expect(userInput.keysState[userInput.KEY_INDEX.LEFT]).to.be.true
    })

    it('Up key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.UP)
      expect(userInput.keysState[userInput.KEY_INDEX.UP]).to.be.true
    })
    
    it('Right key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.RIGHT)      
      expect(userInput.keysState[userInput.KEY_INDEX.RIGHT]).to.be.true
    })
    
    it('Down key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.DOWN)      
      expect(userInput.keysState[userInput.KEY_INDEX.DOWN]).to.be.true
    })

    it('Left key (A) is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.A)
      expect(userInput.keysState[userInput.KEY_INDEX.LEFT]).to.be.true
    })

    it('Up key (W) is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.W)      
      expect(userInput.keysState[userInput.KEY_INDEX.UP]).to.be.true
    })
    
    it('Right key (D) is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.D)      
      expect(userInput.keysState[userInput.KEY_INDEX.RIGHT]).to.be.true
    })
    
    it('Down key (S) is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.S)      
      expect(userInput.keysState[userInput.KEY_INDEX.DOWN]).to.be.true
    })

    it('Spacebar key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.SPACEBAR)      
      expect(userInput.keysState[userInput.KEY_INDEX.SPACEBAR]).to.be.true
    })
    
    it('Ctrl key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.CTRL)      
      expect(userInput.keysState[userInput.KEY_INDEX.CTRL]).to.be.true
    })
    
    it('X key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.X)      
      expect(userInput.keysState[userInput.KEY_INDEX.X]).to.be.true
    })
    
    it('Z key is down', function() {
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.Z)      
      expect(userInput.keysState[userInput.KEY_INDEX.Z]).to.be.true
    })

  })

  function triggerKeyEvent(event, keyCode){
    var event = new KeyboardEvent(event, {
      'keyCode':keyCode,
      'which': keyCode
    })
    document.dispatchEvent(event);
  }

  describe('Detect keys pressed up', function() {

    it('Left key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.LEFT)      
      expect(userInput.keysState[userInput.KEY_INDEX.LEFT]).to.be.false
    })

    it('Up key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.UP)      
      expect(userInput.keysState[userInput.KEY_INDEX.UP]).to.be.false
    })
    
    it('Right key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.RIGHT)
      expect(userInput.keysState[userInput.KEY_INDEX.RIGHT]).to.be.false
    })
    
    it('Down key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.DOWN)
      expect(userInput.keysState[userInput.KEY_INDEX.DOWN]).to.be.false
    })

    it('Left key (A) is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.A)
      expect(userInput.keysState[userInput.KEY_INDEX.LEFT]).to.be.false
    })

    it('Up key (W) is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.W)
      expect(userInput.keysState[userInput.KEY_INDEX.UP]).to.be.false
    })
    
    it('Right key (D) is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.D)
      expect(userInput.keysState[userInput.KEY_INDEX.RIGHT]).to.be.false
    })
    
    it('Down key (S) is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.S)
      expect(userInput.keysState[userInput.KEY_INDEX.DOWN]).to.be.false
    })

    it('Spacebar key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.SPACEBAR)
      expect(userInput.keysState[userInput.KEY_INDEX.SPACEBAR]).to.be.false
    })
    
    it('Ctrl key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.CTRL)
      expect(userInput.keysState[userInput.KEY_INDEX.CTRL]).to.be.false
    })
    
    it('X key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.X)
      expect(userInput.keysState[userInput.KEY_INDEX.X]).to.be.false
    })
    
    it('Z key is up', function() {
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.Z)
      expect(userInput.keysState[userInput.KEY_INDEX.Z]).to.be.false
    })

  })

  describe('Detect events when keys are pressed down', function() {    

    it('Left key event is down', function() {      
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.LEFT, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.LEFT)
      document.removeEventListener('userInput', eventFn)
    })

    it('Up key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.UP, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.UP)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Right key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.RIGHT, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.RIGHT)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Down key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.DOWN, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.DOWN)
      document.removeEventListener('userInput', eventFn)
    })

    it('Spacebar key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.SPACEBAR, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.SPACEBAR)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Ctrl key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.CTRL, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.CTRL)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('X key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.X, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.X)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Z key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.Z, true)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_DOWN_EVENT, userInput.KEY.Z)
      document.removeEventListener('userInput', eventFn)
    })

  })

  function createEventFnWithExpectation(keyIndex, expectation){
    return function(event){
      if(event.type === "userInput"){
         var isDown = event.detail["keys-state"][keyIndex]
         expect(isDown).to.be.equal(expectation)
      }        
    }
  }

  describe('Detect events when keys are release up', function() {    

    it('Left key event is down', function() {      
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.LEFT, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.LEFT)
      document.removeEventListener('userInput', eventFn)
    })

    it('Up key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.UP, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.UP)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Right key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.RIGHT, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.RIGHT)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Down key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.DOWN, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.DOWN)
      document.removeEventListener('userInput', eventFn)
    })

    it('Spacebar key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.SPACEBAR, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.SPACEBAR)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Ctrl key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.CTRL, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.CTRL)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('X key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.X, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.X)
      document.removeEventListener('userInput', eventFn)
    })
    
    it('Z key event is down', function() {
      var eventFn = createEventFnWithExpectation(userInput.KEY_INDEX.Z, false)
      document.addEventListener('userInput', eventFn)
      triggerKeyEvent(KEY_UP_EVENT, userInput.KEY.Z)
      document.removeEventListener('userInput', eventFn)
    })

  }) 

})