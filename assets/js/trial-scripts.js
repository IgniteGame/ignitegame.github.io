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
        // empty img doesnt have onclick, lineup has onclick not lineup gamecard
        $('.gamecard.active').parent().append('<img src="/assets/images/cards/none.png" class="gamecard">');
      }
      addCardToScrapModal(getCardNum($('.gamecard.active') ) ); // add to scrap modal
      setDmg($('.gamecard.active'), 0); // remove damage
      $(this).html($('.gamecard.active') ); // complete the move
      $('.gamecard').removeClass('active'); // remove active class
    }
  });

  $('#dmgSelect').change(function() {
    setDmg(currentDmgCard, $(this).val() ); // add dmg equal to select val
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
    if($(this).parent().is('#scrap') ) { // if in scrap, run scrap onclick, don't want to select this card
      $('#scrap').click();
      return;      
    }
    // clicking on card toggles its active class, removes other actives if it's active
    if(! $(this).hasClass('active') )
      $('.gamecard').removeClass('active');
    $(this).toggleClass('active');
  });
  $('#hand .gamecard:last').dblclick(function() {
    //doubleclicking on card in lineup opens damage modal
    if($(this).parent().hasClass('lineup') ) {
      openDmgModal($(this) );
    }
  });
}
// remove DOM elm from hand
function removeCardFromHand(elm) {
  elm.remove();
}

// scrap functions for modal only
function addCardToScrapModal(card) {
  $('#scrapModalCards').append('<img src="/assets/images/cards/' + card + '.png" class="gamecard">');
  $('#scrapModalCards .gamecard:last').click(function() {
    //clicking on card in scrap modal returns to forge faceup
    //todo: 
    /*todo
    get card num
    add card num to deck[]
    add img to top of deck, replace when drawn in draw function
    remove from scrapmodal
    display last card in scrapheapmodal in scrap*/
  });
}
// scrap functions for modal only
function removeCardFromScrapModal(elm) {
  elm.remove();
}

// returns card number of DOM elm, useful for scrap
function getCardNum(elm) {
  let src = elm.prop('src');
  return src.split('cards/')[1].replace('.png','');
}

// draw card from deck
function draw() {
  if(deck.length>0)
    addCardToHand(deck.pop() );
  if(deck.length==0)
    updateCard('forge', 'none');
}

// set damage counters on DOM elm
function setDmg(elm, num) {
  elm.parent().find('.damageCounter').remove();
  if(num!=0)
    elm.parent().append('<img src="/assets/images/tokens/damage-' + num + '.png" class="damageCounter">');
}
function getDmg(elm) {
  if(elm.siblings('.damageCounter').length) {
    let src = elm.siblings('.damageCounter').prop('src');
    return src.charAt(src.length-5); // 4 last chars are '.png'    
  }
  return 0;
}

// set value in dropdown in modal
function setDmgModal(num) {
  $('#dmgSelect').val(num);
}

let currentDmgCard;

// open damage on selected card modal
function openDmgModal(elm) {
  setDmgModal(getDmg(elm) );
  $('#dmgModal').modal('show');
  $('#dmgSelect').focus();
  currentDmgCard = elm; // set elm to be affected by damage select in modal
}