# jGavlLight

Til bruk på vertikale gavl-skjermer på biblioteket

![Screenshot](https://github.com/Ornendil/jGavlLight/blob/master/img/screenshot.webp)

## Installere

1. Kopier filene til serveren din. Hvis du har gh installert på serveren din kan du gjøre det ved å kjøre denne kommandoen:

        gh repo clone Ornendil/jGavlLight

    Det legger filene i mappen jGavlLight under din nåværende plassering.

2. Gå til den nye mappen

        cd jGavlLight

3. Installer dependencies

        composer install

## Oppsett

I filen config.yaml setter du data for hver sjanger du vil ha med på skjermen din. For eksempel:

    scifi:
        ccl: plass=scifi
        human: Science Fiction
        computer: scifi

* "ccl" er CCL-søker du bruker for å finne frem de riktige bøkene (se [Bibliofil-håndbøkene om CCL](https://dok.bibsyst.no/web/m2/m2-int-sok.html#m2-ccl))
* "human" er det menneske-lesbare navnet på sjangeren
* "computer" er det maskin-lesbare navnet på sjangeren, og må være det samme som du kalte feeden da du pregenererte den (se [Bibliofil-håndbøkene om RSS-pregenerering](https://dok.bibsyst.no/web/tkstat/rss.html))
* Nøkkelen kan være hva som helst, men sett den til det samme som "computer" for enkelhets skyld

Det anbefales å pregenerere feedene, men hvis du mot formodning ikke ønsker å gjøre det, så kan du også legge til følgende i de feedene du ikke vil ha pregenrert:

        ikkePregenerert: true

### Fonter

For å få en stilig sjanger-relevant font i menyen på siden og i headeren til den sjangeren må du:

1. Finne fonten i Google Fonts

3. Legge den til i head i den lange pipe-separerte lista her: (tempates/index.twig linje 13)

        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface|Almendra+Display|Audiowide|Bangers|Bungee|Cabin+Sketch|Chicle|Codystar|Germania+One|Milonga|Open+Sans+Condensed:300|Patua+One|Poiret+One|Staatliches|Srisakdi" rel="stylesheet">

2. Legge til dette i style.css (bytt ut scifi med det datamaskinlesbare navnet på sjangeren din, og fonten med den du har valgt):

        aside li#scifi_btn,
        #scifi h3{
            font-family: 'Audiowide';
            font-size: 0.8em;
        }
    Du kan også med fordel justere fonten litt til å passe. Akkurat denne fonten i eksempelet var litt for stor, så jeg forminsket den med 0.2em.