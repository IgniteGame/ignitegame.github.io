
$(document).ready(function(){
  
  
 $('#subscribe').on('click', function() {
	 console.log(document.getElementById('subscribeEmail').value);
  if(validateEmail(document.getElementById('subscribeEmail').value)) {
    bootstrap_alert("Congrats! You're subscribed", true);
  } else {
	bootstrap_alert("Invalid Email. Account not subscribed", false);
  }
}); 
  
  
  
  
  
  
  
  //Smooth scrolling from navbar from w3 schools
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#home']").on('click', function(event) {

   // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 900, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
      });
    } // End if
  });
})


//slide animation from w3 schools
$(window).scroll(function() {
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slide");
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
