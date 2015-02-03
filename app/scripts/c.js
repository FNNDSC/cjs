define(['togetherjs'], function () {
  // constructor
  function cjs(){
    // configure togetherJS
    TogetherJS.config("suppressJoinConfirmation", true);
    TogetherJS.config("suppressInvite", true);
    TogetherJS.config("dontShowClicks", true);
    TogetherJS.config("autoStart", false);

    this.joined = false;

    var self = this;

    // ready and close cleanup
    TogetherJSConfig_on = {
      ready: function(){
        // TJS started
        self.ready();
      },
      close:function(){
        // TJS closed
        // forget listeners
        TogetherJS._listeners = {};
        TogetherJS.require = require.config(TogetherJS.requireConfig);
        // storage needs session
        TogetherJS.require(['storage', 'session'], function(storage, session){
          storage.tab.set('status')
            .then(function(saved){
              // forget room name
              saved = null;
            })
            .then(function(saved){
              // forget all about current session and storage
              TogetherJS._teardown();
            })
            .then(function(){
              self.close();
            });
        });
      }
    };
  }

  // ready callback
  cjs.prototype.ready = function(){
    window.console.log('ready callback NOT overloaded');
  }

  // close callback
  cjs.prototype.close = function(){
    window.console.log('close callback NOT overloaded');
  }

  // enter/leave room
  cjs.prototype.join = function(roomID) {
    if(!this.joined){
      TogetherJS.config("findRoom", roomID);
    }
    
    this.joined = !this.joined;
    TogetherJS();
  }

    return cjs;
});
