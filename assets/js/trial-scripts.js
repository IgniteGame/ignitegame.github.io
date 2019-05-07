$(function() {
  // toggle energy on click
  $('.energy').click(function() {
    if($(this).prop('src').includes('-empty') )
      $(this).prop('src', $(this).prop('src').replace('icon-energy-empty', 'icon-energy') );
    else
      $(this).prop('src', $(this).prop('src').replace('icon-energy', 'icon-energy-empty') );
  });

  // toggle hand on btn click
  $('#toggleHandBtn').click(toggleHand);

  // clicking on lineup with card in hand selected moves it
  $('.lineup.slot, #scrap').click(function() {
    if($('.gamecard.active').length!=0) { // if something to move
      if($('.gamecard.active').parent().hasClass('lineup') || $('.gamecard.active').parent().is('#scrap') ) { // if moving from slot, add empty img to slot
        $('.gamecard.active').parent().append('<img src="/assets/images/cards/none.png" class="gamecard">');
      }
      console.log($(this).html() );
      $(this).html($('.gamecard.active') );
    }
  });

  // clicking on card toggles its active class, removes other actives if it's active
  $('#hand .gamecard').click(function() {
    if(! $(this).hasClass('active') )
      $('.gamecard').removeClass('active');
    $(this).toggleClass('active');
  });

  // start with 5 cards
  for(let i=0; i<5; i++) {
    draw();
  }

  // click forge to draw
  $('#forge').click(draw);

});


// slot is slot1, slot2, slot3, slot4, forge, scrap
// card is 1-15, or 0 for back, or none for none
function updateCard(slot, card) {
  $('#' + slot).find('img:first').prop('src', '/assets/images/cards/' + card + '.png');
}

// toggle visability of hand
function toggleHand() {
  if($('#hand').css('visibility') != 'hidden')
    $('#hand').css('visibility', 'hidden');
  else
    $('#hand').css('visibility', '');
}

// add card number to hand
function addCardToHand(card) {
  $('#hand').append('<img src="/assets/images/cards/' + card + '.png" class="gamecard">');
}
// remove DOM elm from hand
function removeCardFromHand(elm) {
  elm.remove();
}

// draw card from deck
function draw() {
  addCardToHand(deck.pop() );
}