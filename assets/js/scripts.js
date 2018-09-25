
$(document).ready(function() {

  $(window).scroll();

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
  
 $('#subscribe').on('click', function() {
	 console.log(document.getElementById('subscribeEmail').value);
  if(validateEmail(document.getElementById('subscribeEmail').value)) {
    bootstrap_alert("Congrats! You're subscribed", true);
  } else {
	bootstrap_alert("Invalid Email. Account not subscribed", false);
  }
}); 
  

})



$(window).scroll(function() {
  //slide animation from w3 schools
  $(".slideanim").each(function(){
    let pos = $(this).offset().top;

    let winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slide");
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


bootstrap_alert = function(message, success) {
	console.log(message);
  $('#alertPlaceholder').html('<div class="alert alert-' + (success ? 'success' : 'danger') + ' alert-dismissable fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>')
}
    



//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
