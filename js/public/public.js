
$({property: 0}).animate({property: 100}, {
  duration: 3000,
  step: function() {
    var percentage = Math.round(this.property);
    $('#progress').css('width',  percentage+"%");
      if(percentage == 100) {
        $("#progress").addClass("done");
       }
    }
});

$(document).ready(function(){
  var $backToTop = $(".go-top");
    $backToTop.removeClass('show-go')
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {

        // $backToTop.fadeIn();
        $backToTop.addClass('show-go')

      } else {
        //  $backToTop.hide();
        $backToTop.removeClass('show-go')
      }
  });
  $backToTop.on('click', function() {
   $("html, body").animate({scrollTop: 0}, 900);
  });
})
















 