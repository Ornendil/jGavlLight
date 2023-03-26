
// Generer DOM-en til en sjanger. Den som skal vise alle bøkene
function genererSjangerDOM(kilde){
    kilde.DOM = document.createElement("div");
    kilde.DOM.id = kilde.computer;
    kilde.DOM.className = "genre";

    let h3 = document.createElement("h3");
    h3.innerText = 'Nyeste ' + kilde.human;
    kilde.DOM.appendChild(h3);

    let collage = document.createElement("div");
    collage.className = "collage";

    for (j in kilde.json){
        let bok = kilde.json[j];

        bokElement = document.createElement('div');
        bokElement.classList.add('Image_Wrapper');
        if (bok.inne != "På hylla" && bok.doktype.includes("la") == false ) {
            bokElement.classList.add('ute');
        }
        bokElement.dataset.tnr = bok.tnr;
        bokElement.dataset.pubDate = bok.pubDate;

        bildeElement = document.createElement('img');
        bildeElement.src = bok.krydderbilde;
        bildeElement.classList.add('image');
        bildeElement.setAttribute('title', bok.tittel);

        bokElement.appendChild(bildeElement);

        collage.appendChild(bokElement);
    };

    [...collage.children]
        .sort((a,b) => Date.parse(a.dataset.pubDate) < Date.parse(b.dataset.pubDate) ? 1:-1)
        .forEach(function(node){
            collage.appendChild(node);
            let space = document.createTextNode(" ");
            collage.appendChild(space);
        });

    kilde.DOM.appendChild(collage);
};

function genererBokDOM(sjanger, tnr){

    const bokJSON = lists[sjanger]['json'][tnr];
    
    const main = document.querySelector('main');
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.id = 'tnr_' + tnr;
    
    const exitDiv = document.createElement('div');
    exitDiv.className = 'exit';
    exitDiv.dataset.scroller = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const exitImg = document.createElement('img');
    exitImg.src = 'img/x.svg';
    exitDiv.appendChild(exitImg);
    
    const header = document.createElement('header');
    const h4 = document.createElement('h4');
    h4.textContent = bokJSON.tittel;
    header.appendChild(h4);
    if (bokJSON.serietittel) {
        const h5 = document.createElement('h5');
        h5.textContent = bokJSON.serietittel;
        header.appendChild(h5);
    }
    bookDiv.appendChild(exitDiv);
    bookDiv.appendChild(header);
    if(bokJSON.krydderbilde.includes('http://') || bokJSON.krydderbilde.includes('https://')){
        const coverWrapper = document.createElement('div');
        coverWrapper.className = 'coverWrapper';
        const coverImg = document.createElement('img');
        coverImg.className = 'cover';
        coverImg.src = bokJSON.krydderbilde;
        coverWrapper.appendChild(coverImg);
        bookDiv.appendChild(coverWrapper);
        if( bokJSON.inne != "På hylla" ){
            coverWrapper.classList.add('ute');
        }
    }
    const table = document.createElement('table');
    if (bokJSON.signatur.length >= 1) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = 'Plass';
        const td = document.createElement('td');
        td.textContent = bokJSON.signatur;
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    if (bokJSON.sp) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = 'Språk';
        const td = document.createElement('td');
        td.className = 'spraak';
        tr.appendChild(th);
        tr.appendChild(td);
        if ( bokJSON.sp == 'nno' ) {
            td.textContent = 'Nynorsk';
        } else if ( bokJSON.sp == 'nob' ) {
            td.textContent = 'Bokmål';
        } else if ( bokJSON.sp == 'eng' ) {
            td.textContent = 'Engelsk';
        } else if ( bokJSON.sp == 'mul' ) {
            td.textContent = 'Flerspråklig';
        } else {
            td.textContent = bokJSON.sp;
        }
        table.appendChild(tr);
    }
    bookDiv.appendChild(table);
    const p = document.createElement('p');
    bookDiv.appendChild(p);
    p.outerHTML = "<p>" + bokJSON.krydderbeskrivelse + "</p>";
    
    main.innerHTML = '';
    main.appendChild(bookDiv);

    // if (bokJSON.serietittel) {
    //     $.getJSON( 'lists/?ccl="' + bokJSON.serietittel + '"/SE', function( serieBooks ) {
    //         console.log(serieBooks);
    //         if ( serieBooks.length > 1 ) {
    //             $('.book').append('<div class="serie"></div>');
    //             $('.serie').html('<h5>Andre bøker i serien '+bokJSON.serietittel+'</h5>');
    //             $('.serie').append('<div class="collage"></div>');
    //             var serieHtml = "";
    //             for (bok in serieBooks){
    //                 if ( bokJSON.serietittel == serieBooks[bok].serietittel ) {
    //                     if ( bokJSON.tittel != serieBooks[bok].tittel ) {
    //                         serieHtml += '<div class="Image_Wrapper';
    //                         if (serieBooks[bok].inne != "På hylla" && serieBooks[bok].doktype.includes("la") == false ) {
    //                             serieHtml += ' ute';
    //                         }
    //                         serieHtml += '" data-tnr="' + serieBooks[bok].tnr + '">';
    //                         serieHtml += '<img class="image" src="' + serieBooks[bok].krydderbilde + '" title="'+serieBooks[bok].tittel+'">';
    //                         serieHtml += '</div> ';
    //                         if (!genreJSON.containsBook(serieBooks[bok])) {
    //                             genreJSON.push(serieBooks[bok]);
    //                         }
    //                     }
    //                 }
    //             }
    //             $('.serie .collage').append(serieHtml);
    //         }
    //     });
    // }
}

// Bytt til en annen sjanger
function endreSjanger(sjanger){
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.appendChild(lists[sjanger].DOM);
}

function containsObject(obj, list) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }

    return false;
}

Array.prototype.containsBook = function(thisBook){
    for( book in this ) {
        if (this[book].tnr == thisBook.tnr) {
            return true;
        }
    }
}