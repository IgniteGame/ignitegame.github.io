$(function() {
  $('.energy').click(function() {
    if($(this).prop('src').includes('-empty') )
      $(this).prop('src', $(this).prop('src').replace('icon-energy-empty', 'icon-energy') );
    else
      $(this).prop('src', $(this).prop('src').replace('icon-energy', 'icon-energy-empty') );
  });

  $('#toggleHandBtn').click(toggleHand);

  $('.gamecard').click(function() {
    if(! $(this).hasClass('active') )
      $('.gamecard').removeClass('active');
    $(this).toggleClass('active');

  });

});

// slot is slot1, slot2, slot3, slot4, forge, scrap
// card is 1-15, or 0 for back, or none for none
function updateCard(slot, card) {
  $('#' + slot).find('img:first').prop('src', '/assets/images/cards/' + card + '.png');
}

function toggleHand() {
  if($('#hand').css('visibility') != 'hidden')
    $('#hand').css('visibility', 'hidden');
  else
    $('#hand').css('visibility', '');
}

function addCardToHand(card) {
  $('#hand').append('<img src="/assets/images/cards/' + card + '.png" class="gamecard">');
}
function removeCardFromHand(elm) {
  elm.remove();
}