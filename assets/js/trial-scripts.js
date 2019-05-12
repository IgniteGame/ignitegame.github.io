$(function() {
  // toggle energy on click
  $('.energy').click(function() {
    if($(this).prop('src').includes('-empty') )
      $(this).prop('src', $(this).prop('src').replace('icon-energy-empty', 'icon-energy') );
    else
      $(this).prop('src', $(this).prop('src').replace('icon-energy', 'icon-energy-empty') );
  });

  $('#toggleHandBtn').click(toggleHand); // toggle hand with btn

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
      addCardToScrap(getCardNum($('.gamecard.active') ) ); // add to scrap modal
      setDmg($('.gamecard.active'), 0); // remove damage
      $(this).html($('.gamecard.active') ); // complete the move
      $('.gamecard').removeClass('active'); // remove active class
    }
    else { // if no active card to move to scrap, open return from scrap modal
      $('#scrapModal').modal('show');
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

  // ignite button ignites and opens modal display
  $('#igniteBtn').click(roll);

});

// slot is slot1, slot2, slot3, slot4, forge, scrap
// card is 1-15, or 0 for back, or none for none
// used only for forge and scrap because others need onclick liteners on the card itself
// as opposed to the location on board
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

// given card number, add card to scrap and scrap modal
function addCardToScrap(card) {
  // add to modal and scrap array
  //console.log(card);
  $('#scrapModalCards').append('<img src="/assets/images/cards/' + card + '.png" class="gamecard">');
  scrap.push(card);

  // set onclick for modal card
  $('#scrapModalCards .gamecard:last').click(function() {
    //clicking on card in scrap modal returns to top of forge faceup

    let num = getCardNum($(this) ); // card number
    deck.push(num); // add to top of deck
    updateCard('forge', num); // display on top of deck
    $(this).remove(); // remove from modal

    // remove from scrap arr
    let idx = scrap.indexOf(num);
    scrap.splice(idx, 1);

    // display correct card in scrap
    if(scrap.length==0) {
      updateCard('scrap', 'none');
    } else {
      updateCard('scrap', scrap[scrap.length-1] );
    }

  });
}

// returns card number of DOM elm, useful for scrap
function getCardNum(elm) {
  // console.log(elm);
  let src = elm.prop('src');
  return src.split('/assets/images/cards/')[1].replace('.png','');
}

// draw card from deck
function draw() {
  if(deck.length>0) {
    addCardToHand(deck.pop() );
    updateCard('forge', 0);
  }
  if(deck.length==0) {
    updateCard('forge', 'none');
  }
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

// ignite roll
// copied and modified from roller.hmtl
const targetImgs = ['slot 1', 'slot 2', 'slot 3', 'slot 4', 'forge', 'forge'];
const damageImgs = ['small explosion', 'medium explosion', 'large explosion'];
let rolls = [];

function roll() {
  rolls = [getRandom(6), getRandom(3)];
  $('#targetDie').attr('src', '/assets/images/dice/' + targetImgs[rolls[0] ] + '.svg');
  $('#damageDie').attr('src', '/assets/images/dice/' + damageImgs[rolls[1] ] + '.svg');
  $('#desc').html('Hit ' + targetImgs[rolls[0] ] + ' with a ' + damageImgs[rolls[1] ] );
  $('#numRolls').html(parseInt($('#numRolls').html() )+1);
}

function getRandom(sides) {
  return Math.floor(Math.random() * sides);
}