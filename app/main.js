var MyApp = MyApp || {};

MyApp.require = require.config({
    paths: {
        togetherjs: 'https://togetherjs.com/togetherjs-min',
        cjs: 'scripts/c'
    }
});

// load cjs after togetherJS has been loaded
// turn OFF togetherJS autostart
// should investigate to have it working well with AUTO START TOO
TogetherJSConfig_noAutoStart = true;
MyApp.require(['cjs'], function(Cjs) {
  // init cjs
  var myCjs = new Cjs();

  // event handler
  var myHandler = {
    id: 'fireID',
    name: 'app.fireMessage',
    target: 'fireButton',
    callback: function(message){
      window.console.log('fireMessage received! ' + message);
    }
  }

  // callback after TogetherJS is ready to go
  myCjs.ready = function(){
    document.getElementById("joinTP").innerHTML = 'Leave the party :(';

    // add hanlers
    myCjs.add(myHandler);

  };

  // callback after TogetherJS is ready to close
  myCjs.close = function(){
    document.getElementById("joinTP").innerHTML = 'Join the party :)';

    // remove handler
    // only 1 fireMessage in this case
    myCjs.remove(myHandler);
  };

  // connect click callback
  document.getElementById("joinTP").onclick=function(){
    var roomName = document.getElementById("roomName").value;
    myCjs.join(roomName);
  };

  document.getElementById("fireButton").onclick=function(){
    var event = new CustomEvent('app.fireMessage', { 'detail': 'hello my friend' });
    this.dispatchEvent(event);
  };
});