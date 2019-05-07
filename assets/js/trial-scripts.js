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
  // $('.lineup.slot .gamecard').click(function() {
  $('.lineup.slot').click(function() {
    if($('.gamecard.active').length!=0 && $('.gamecard.active').parent().is('#hand') ) { // if something to move and it's inside the hand
      $(this).html($('.gamecard.active') ); // complete the move
      $('.gamecard').removeClass('active'); // remove active class
    }
  });

  // clicking on scrap with a card in lineup moves it
  $('#scrap').click(function() {
    if($('.gamecard.active').length!=0 && $('.gamecard.active').parent().hasClass('lineup') ) { // if something to move and it's inside lineup
      if($('.gamecard.active').parent().hasClass('lineup') ) { // if moving from slot, add empty img to slot
        $('.gamecard.active').parent().append('<img src="/assets/images/cards/none.png" class="gamecard">');
      }
      $(this).html($('.gamecard.active') ); // complete the move
      $('.gamecard').removeClass('active'); // remove active class
    }
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
  $('#hand .gamecard:last').click(function() {
    // clicking on card toggles its active class, removes other actives if it's active
    if(! $(this).hasClass('active') )
      $('.gamecard').removeClass('active');
    $(this).toggleClass('active');
  });
}
// remove DOM elm from hand
function removeCardFromHand(elm) {
  elm.remove();
}

// draw card from deck
function draw() {
  addCardToHand(deck.pop() );
}