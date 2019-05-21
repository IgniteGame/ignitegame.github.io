
$(function() {

  $(window).scroll();

  $('.flipcard').flip({
    trigger: 'click'
  });

  // $('.flip-card').click(function() {
  //   $(this).toggleClass('active');
  // });

  $(".fa-envelope").hover(
    function(){ 
   	  $(this).addClass("fa-envelope-open"); 
  	  $(this).removeClass("fa-envelope"); 
    },
    function(){ 
   	  $(this).removeClass("fa-envelope-open"); 
   	  $(this).addClass("fa-envelope");
    }
  );

  $('#menuButton').on('click', function() {
    $('#menuIcon').toggleClass('fa-bars');
    $('#menuIcon').toggleClass('fa-times');
  });  

});


$(window).scroll(function() {
  //slide animation from w3 schools
  $(".slideanim").each(function(){
    let pos = $(this).offset().top;

    let winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      if($(this).hasClass("slideSideways") ) {
        $(this).addClass("slideSide");
      } else {
        $(this).addClass("slide");        
      }

    }
  });

  //make nav item active when scrolled to
  //https://jsfiddle.net/cse_tushar/Dxtyu/141/
  let scrollPos = $(document).scrollTop();
  $('.page-scroll').each(function(idx) {
    let currLink = $(this);
    let refElement = $('#' + currLink.attr('href').split('#')[1] );
    if (refElement.position().top <= scrollPos +100 && refElement.position().top + refElement.height() +100 > scrollPos) {
        $('.page-scroll').removeClass('active');
        currLink.addClass('active');
    }
    else{
        currLink.removeClass('active');
    }
  });
    

});


function sendEmail() {
  let name = document.getElementById("name").value.replace(" ", "%20").replace("\n", "%0D%0A");
  let email = document.getElementById("email").value.replace(" ", "%20").replace("\n", "%0D%0A");
  let comments = document.getElementById("comments").value.replace(" ", "%20").replace("\n", "%0D%0A");
  window.open("mailto:contact@ignite.cards?subject=Ignite.cards%20Contact%20Form&body=" + comments + "%0D%0A%0D%0A" + name + "%0D%0A%0D%0A" + email);
  console.log("Hi");	
}
