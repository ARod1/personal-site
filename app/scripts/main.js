
// variables
var $header_top = $('.header-top');
var $contact = $('.contactOverlay');
var $infoBtn = $(".topBtn");
var $projectBtn = $(".projectBtn");
var $pOneInfo = $(".pOneInfo");
var $video = $('#myVideo');


// toggle contact overlay
$infoBtn.on('click', function() {
  $contact.toggleClass('openOverlay');

  if ($infoBtn.text() === "Contact") {
    $infoBtn.text("close");
  } else {
    $infoBtn.text("Contact");
  }

});


//Toggle project overlay
var slideInOptions = {
  duration: 900,
  complete: slideInComplete
};

function slideInComplete() {
  console.log('complete');
};


//Project Info Slider 
$projectBtn.on('click', function() {
  //$pOneInfo.slideToggle(slideInOptions);
  
  var tl = new TimelineMax({onComplete:removeAnimation});

  function removeAnimation() {
    //tl.reverse();
  };

  tl.add( TweenLite.to(".pOverlay", .5, {
    opacity:"1",
    width: "50%",
    backgroundColor:"teal",
    ease:Quint.easeOut
   }));

  tl.add( TweenLite.to([".pTitle", ".pDate", ".pDesc", ".pSkills"], .2, {
    opacity:"1",
    delay: .2
   }));

});


//Once the animationis complet have function add class to element
//when the button is click to close it, it will check to see if it has the class
//if so reset opacity



// fullpage customization
$('#fullpage').fullpage({
  sectionsColor: ['#05668D', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
  navigation: true,
  slidesNavigation: true,
  controlArrows: false,
  anchors: ['intro', 'about', 'work', 'resume', 'contact'],
  easingcss3: '',
  touchSensitivity: 15,

  // afterLoad: function(anchorLink, index) {
  //   if(index == 2) {
  //     $('#logo').css("color", "black");
  //     $('#tMenu').css("color", "black")
  //     console.log('its working 2 loading');
  //   }
  // },

  // onLeave: function(index, nextIndex, direction) {
  //   if(index == 1) {
  //     $('overlay').css("display", "none");
  //     console.log('its working 1');
  //   } else if(index == 2) {
  //     $('Header').css("color", "black");
  //     console.log('its working 2');
  //   }
  // },

  // afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
   
  // },

  // onSlideLeave: function( anchorLink, index, slideIndex, direction) {
    
  // } 
}); 



(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
      var posy = 0;
        var posx = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();













