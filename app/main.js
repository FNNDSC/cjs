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

  // callback after TogetherJS is ready to go
  myCjs.ready = function(){
    document.getElementById("joinTP").innerHTML = 'Leave the party :(';
  };

  // callback after TogetherJS is ready to close
  myCjs.close = function(){
    document.getElementById("joinTP").innerHTML = 'Join the party :)';
  };

  // connect click callback
  document.getElementById("joinTP").onclick=function(){
    var roomName = document.getElementById("roomName").value;
    myCjs.join(roomName);
  };
});