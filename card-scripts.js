let slideIndex = 1;

$(document).ready(function(){
  const numCards = 15;

  let cardDiv = document.getElementById("cardDiv");
  let dots = document.getElementById("dots");
  for(let i = 1; i < numCards+1; i++) {
    let slide = document.createElement("div");
    slide.className = "card-slide";
    
    let numbertext = document.createElement("div");
    numbertext.className = "numbertext";
    numbertext.innerHTML = i + "/" + numCards;
    slide.appendChild(numbertext);

    let card = document.createElement("img");
    card.className = "gamecard";
    card.src = "assets/cards/" + i + ".svg";
    // cardDiv.appendChild(card);
    slide.appendChild(card);

    cardDiv.appendChild(slide);

    let dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", function(){ setSlide(i); } );
    dots.appendChild(dot);
  } //end for

  //url params
  let url = new URL(window.location.href);
  let c = parseInt(url.searchParams.get("c") );
  setSlide(c<=numCards&&c>=1 ? c : 1);

  $('#cardDiv').on('swipeleft', function() {
    plusSlides(-1);
  });

  $('#cardDiv').on('swiperight', function() {
    plusSlides(1);
  });

}) //end doc ready


document.onkeyup = function(e) { //left and right arrow keys for slides
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
  let i;
  let slides = document.getElementsByClassName("card-slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  } 
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i=0; i<slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  for (i=0; i<dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

  //url params
  history.replaceState({}, "", "?c=" + slideIndex);
}
  