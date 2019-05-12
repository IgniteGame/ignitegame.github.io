let deck = [];
let scrap = [];
for(let i=1; i<=15; i++) {
  deck.push(i);
  deck.push(i);
}
shuffle(deck);

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1) );
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}