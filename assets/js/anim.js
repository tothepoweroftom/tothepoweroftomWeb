

//// 1. Define Space and Form
var colors = {
  a1: "#fff", a2: "#42dc8e", a3: "#26A874", a4: "#ffe359",
  b1: "#96bfed", b2: "#f5ead6", b3: "#f1f3f7", b4: "#e2e6ef"
};
var space = new CanvasSpace("pt").setup( {bgcolor: "rgba(0,0,0,0.5)", resize: true} );
var form = new Form( space )


var speed = 0.05;
var prevSpeed;
//// 2. Create Elements
var line = new Line( 0, space.size.y * 0.5 ).to( space.size.x, space.size.y*0.5 );
var steps = 25;
var amp = Math.min( space.size.x, space.size.y ) / 4;
var angle = 0;


//// 3. Visualize, Animate, Interact
space.add({
  animate: function(time, fps, context) {

    // for each step, draw a perpendicular line on the path, whose length is derived from a sine wave.
    for (var i=0; i<steps; i++) {
      var t = i/steps;
      var ln = line.getPerpendicular( t, Math.sin( t*1.2*Const.two_pi + angle )* amp);
      var ln2 = line.getPerpendicular( t+0.5/steps, Math.cos( t*1.2*Const.two_pi + angle )* amp );

      form.stroke(colors.a1).line( ln );
      form.stroke(colors.a3).line( ln2 );

        angle = (time*speed)/space.size.y * 2 * Const.two_pi;
    }
  },

  onMouseAction: function(type, x, y, evt) {
    if (type=="move") {
      amp = y/space.size.y*100 + 5; // change starting angle
    }
  },


});


// 4. Start playing
space.bindMouse();
space.play();
