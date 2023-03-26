
for (list in lists){
    let li = lists[list];
    let mLi = document.createElement("li");
    mLi.setAttribute('id', li['computer'] + "_btn");
    mLi.dataset.computer = li['computer'];
    mLi.dataset.human = li['human'];
    mLi.innerText = li['human'];
    document.querySelector('#meny ul').appendChild(mLi);

    genererSjangerDOM(li);
}

// Sett sjanger som skal vises når siden lastes
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    document.querySelector("#meny li#fantasy_btn").classList.add('active');
    endreSjanger('fantasy');
});

// Endre sjanger ved å trykke på knappene i menyen
document.querySelectorAll('#meny li').forEach((li) => {
    li.addEventListener('click', function() {
        window.scrollTo(0, 0);
        document.querySelectorAll('#meny li').forEach(function(li2) {
            li2.classList.remove('active');
        });
        this.classList.add('active');
        endreSjanger(this.dataset.computer);
    });
});


document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.matches('.Image_Wrapper')) {

        window.scrollTo(0, 0);
        const sjanger = document.querySelector('#meny li.active').dataset.computer;
        const tnr = event.target.dataset.tnr;

        genererBokDOM(sjanger, tnr);
    } else if (event.target.matches('.exit')) {
        var genre = document.querySelector('#meny li.active').dataset.computer;
        endreSjanger(genre);
        window.scrollTo(0, event.target.dataset.scroller);
    }
});




// Reload with gestures in footer

/*
var touchArea = document.getElementById('meny');
var myRegion = new ZingTouch.Region(touchArea);

var swipeDir = new ZingTouch.Swipe({
	numInputs: 2,
	maxRestTime: 100,
	escapeVelocity: 0.25
});

myRegion.bind(touchArea, swipeDir, function(e){
    var tData = e.detail.data[0];
    if ( tData.currentDirection < 120 && tData.currentDirection > 60 ) {
        if ( tData.distance > 5 ) {
            location.reload(true);
        }
    }
});
*/