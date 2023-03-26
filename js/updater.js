// Oppdater bøker av og til
var m = 60 * 60; // 1 time
var m = 60 * 10; // 10 minutter
var n = m;
setTimeout(countDown,1000);

function countDown(){
    n--;
    // console.log(n);
    if(n === 0){
        //location.reload();
        for (i in lists){
            oppdaterSjanger(lists[i]);
        };
        n = m;
    }
    setTimeout(countDown,1000);
}

function prolongCountDown(){
    if(n < 20){
        n = n + 40;
    }
}
//$("body").click(prolongCountDown);

// Testforsøk med oppdatering i bakgrunnen


function oppdaterSjanger(sjanger) {
    var oldBooks = sjanger.json;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "lists/?genre=" + sjanger['computer']);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var newBooks = JSON.parse(xhr.responseText);
            if (typeof oldBooks === 'undefined' || checkIfObjectContains(newBooks, oldBooks)) {
                console.log('Alle de nye bøkene finnes allerede i lista');
            } else {
                sjanger.json = newBooks;
                genererSjangerDOM(sjanger);
                console.log(sjanger["human"] + ' oppdatert');
            }
        } else {
            console.log('Kan ikke hente data. Statuskode: ' + xhr.status);
        }
    };
    xhr.send();
}

function containsAll(oldBooks, newBooks) {
    for (i in newBooks) {
        if (!Object.keys(oldBooks).includes(i)) {
            console.log(Object.keys(oldBooks));
            console.log(i);
            return false;
        }
    }
    return true;
}

function checkIfObjectContains(one, two) {
    for (var i in one) {
        if (!two.hasOwnProperty(i)) {
            console.log('Old list does not contain ' + i);
            return false;
        } else if (one[i].pubDate != two[i].pubDate) {
            console.log(one[i]);
            console.log(two[i]);
            return false;
        }
    }
    return true;
}