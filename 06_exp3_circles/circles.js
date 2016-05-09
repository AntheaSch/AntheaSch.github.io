// created by jdegen on 04/24/2014
// substantial adjustments by fdabl on 03/20/2015
// adapted with Anthea 29/04/2016
// white circles in code are filled RED, label black is filled BLUE


var drawCircles = function(nr_points, nr_white) {
  var RADIUS = 12; //radius of circles
  var WIDTH = 600; //canvas
  var HEIGHT = 400; //canvas (canvas is area where image is constructed)

  function uniform(a, b) { return ((Math.random() * (b - a)) + a); }
  function fillArray(val, len) { return _.times(len, _.constant(val)); }

    //sample coordinates of point
  function samplePoint(color) {
    var x = uniform(RADIUS + 10, WIDTH - RADIUS - 10);
    var y = uniform(RADIUS + 10, HEIGHT - RADIUS - 10);
    var point = {x: x, y: y, color: color};
    return point;
  }

  function getPoints(nr_points, nr_white) {
    var DIFF = Math.sqrt(2) * RADIUS; //minimal distance between points
    var points = [];
    var nr_black = nr_points - nr_white;
    var pointcolors = _.shuffle(fillArray('red', nr_white)
                       .concat(fillArray('blue', nr_black)));

    var done = function(point, points) {
      for (var i = 0; i < points.length; i++) {
        var other_point = points[i];
        var check = Math.abs(point.x - other_point.x) > DIFF &&
                    Math.abs(point.y - other_point.y) > DIFF;
        if (!check) return false;
      }
      return true;
    };

    var count = 0;
    for (var i = 0; i < nr_points; i++) {
      var point = samplePoint(pointcolors[i]);

      // Bogosort like algorithm in all its elegant simplicity
      while (!done(point, points)) {    
        count++;
        point = samplePoint(pointcolors[i]);
      }

      points[i] = point;
    }
    return points;
  }

//draw circles with fitting coordinates
  function draw(id, nr_points, nr_white) {
    var nr_black = nr_points - nr_white;
    var canvas = document.getElementById(id);

    if (canvas.getContext){
      var ctx = canvas.getContext("2d");

      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      ctx.rect(0, 0, WIDTH, HEIGHT);
      ctx.stroke();

      var points = getPoints(nr_points, nr_white);
      for (var i = 0; i < points.length; i++) {
          ctx.beginPath();
          ctx.arc(points[i].x, points[i].y, RADIUS, 0, 2 * Math.PI, true);
          ctx.fillStyle = points[i].color;
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;

          ctx.fill();
          ctx.stroke();
      }
    }
  }

  var canvas = $('canvas'); //relate to canvas in html file
  draw('circles', nr_points, nr_white); //id of canvas
};
