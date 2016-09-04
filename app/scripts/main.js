
// variables
var $header_top = $('.header-top');
var $nav = $('.infoOverlay');
var $infoBtn = $(".topBtn");
var $projectBtn = $(".projectBtn");
var $projectInfoOverlay = $(".projectInfo");

var $video = $('#myVideo');
$video.on('canplaythrough', function() {
   this.play();
});



// toggle menu 
$infoBtn.on('click', function() {
  $nav.toggleClass('openOverlay');
  if ($infoBtn.text() === "Information") {
    $infoBtn.text("close");
  } else {
    $infoBtn.text("Information");
  }

});


//Toggle project overlay
$projectBtn.on('click', function() {
  $projectInfoOverlay.toggleClass('projectOverlay');

});







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




