let slideIndex = 1;
const numCards = 15;

$(document).ready(function() {
  
  let cardDiv = $('#cardDiv');
  let dots = $('#dots');
  for(let i=1; i<numCards+1; i++) {
    cardDiv.append('<div class="card-slide"><div class="numtext">'+i+'/'+numCards+'</div><img class="gamecard" src="/assets/images/cards/'+i+'.png"></div>');
    dots.append('<span class="dot" onclick="setSlide('+i+')"></span>');
  }

  //url params
  let url = new URL(window.location.href);
  let c = parseInt(url.searchParams.get('c') );
  setSlide(c<=numCards&&c>=1 ? c : 1);

  cardDiv.on('swipeleft', function() {
    plusSlides(-1);
  });
  cardDiv.on('swiperight', function() {
    plusSlides(1);
  });

});

document.onkeyup = function(e) { //left and right arrow keys
  let code = e.keyCode ? e.keyCode : e.which;
  if(code == 37) { //left
    plusSlides(-1);
  }
  else if(code == 39) { //right
    plusSlides(1);
  }
}

//slideshow functions edited from w3 schools
function plusSlides(n) { //arrow and arrow key controls
  showSlides(slideIndex += n);
}
function setSlide(n) { //dot controls
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let slides = $('.card-slide');
  let dots = $('.dot');
  slideIndex = n>numCards ? 1 : n<1 ? numCards : n;

  slides.css('display', 'none');
  dots.removeClass('active');

  $(slides[slideIndex-1]).animate({width:'show'},500);

  $(slides[slideIndex-1]).css('display', 'block');
  $(dots[slideIndex-1]).addClass('active');

  //url params
  history.replaceState({}, '', '?c=' + slideIndex);
}
  