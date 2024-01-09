$('.academy_slider').slick({
  dots: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  cssEase: 'linear'
});


$(document).ready(function(){
  $(".recent_btn").click(function(){
    $(".recent_drop").toggle(500);
  });
});

$(document).ready(function(){
  $(".login_user").click(function(){
    $(".user_drop_menu").toggle(500);
  });
});


$(document).ready(function() {
  var max_fields      = 10; //maximum input boxes allowed
  var wrapper       = $(".input_fields_wrap"); //Fields wrapper
  var add_button      = $(".add_field_button"); //Add button ID
  
  var x = 1; //initlal text box count
  $(add_button).click(function(e){ //on add input button click
    e.preventDefault();
    if(x < max_fields){ //max input box allowed
      x++; //text box increment
      $(wrapper).append('<div class="input_fields_wrap"><label>Attachment</label><input type="file" name=""></div>'); //add input box
    }
  });
  
  $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault(); $(this).parent('div').remove(); x--;
  })
});