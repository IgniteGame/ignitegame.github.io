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
  $('.lineup.slot .gamecard').click(lineupCardClick);

  // clicking on card toggles its active class, removes other actives if it's active
  $('#hand .gamecard').click(function() {
    if(! $(this).hasClass('active') )
      $('.gamecard').removeClass('active');
    $(this).toggleClass('active');
  });




});

function lineupCardClick() {
 if($('.gamecard.active').length!=0) { // if something to move
    if($('.gamecard.active').parent().hasClass('lineup') ) { // if moving from slot, add empty img to slot
      $('.gamecard.active').parent().append('<img src="/assets/images/cards/none.png" class="gamecard">').click(function() {
        // this function is different because there's no if statement check to create another placeholder
        // if($('.gamecard.active').length!=0) { // if something to move
        //   $(this).parent().html($('.gamecard.active') );
        // }
        lineupCardClick($(this) );
      });
    }
    $(this).parent().html($('.gamecard.active') );
  } 
}

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