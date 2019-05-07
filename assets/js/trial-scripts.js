$(function() {
  $('.energy').click(function() {
    if($(this).prop('src').includes('-empty') ) {
      $(this).prop('src', $(this).prop('src').replace('icon-energy-empty', 'icon-energy') );
    } else {
      $(this).prop('src', $(this).prop('src').replace('icon-energy', 'icon-energy-empty') );      
    }
  });
});

// slot is slot1, slot2, slot3, slot4, forge, scrap
// card is 1-15, or 0 for back, or none for none
function updateCard(slot, card) {
  $('#' + slot).find('img:first').prop('src', '/assets/images/cards/' + card + '.png');
}

