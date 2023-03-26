<?php
    header('Content-Type: application/json');

    if (isset($_GET['genre'])) {
        $rssurl = 'https://ullensaker.bib.no/rss/' . $_GET['genre'] . '.xml';
    } else if (isset($_GET['ccl'])) {
        $ccl = 'Harry Potter/SE';
        $rssurl = 'https://ullensaker.bib.no/cgi-bin/rss?bibxml=1&ccl='  .$_GET['ccl'];
    } else {
        $rssurl = '../old/fantasy.xml';
    }

    $rssxml = @simplexml_load_file($rssurl);
    
    @$rssxml->registerXPathNamespace('b', 'http://bibliofil.no/rss-xml-v1.2/');
    $items = $rssxml->xpath('//item');
    foreach ($items as &$item){
        $item->registerXPathNamespace('b', 'http://bibliofil.no/rss-xml-v1.2/');
        $tnr = implode("", $item->xpath('b:titnr'));
        $item->addChild('tnr', $item->xpath('b:titnr')[0]);
        $item->addChild('doktype', $item->xpath('b:doktype')[0]);
        $item->addChild('tittel', htmlspecialchars($item->xpath('b:hovedtittel')[0]));
        if ($item->xpath('b:serietittel')[0]) {
            $item->addChild('serietittel', htmlspecialchars($item->xpath('b:serietittel')[0]));
        }
        if ($item->xpath("b:exInfo[b:ex_avd[starts-with(.,'ubh')]][b:ex_statusnavn[contains(., 'hylla')]]/b:ex_statusnavn")) {
            @$item->addChild('inne', $item->xpath("b:exInfo[b:ex_avd[starts-with(.,'ubh')]][b:ex_statusnavn[contains(., 'hylla')]]/b:ex_statusnavn")[0]);
            
        }
        @$item->addChild('krydderbeskrivelse', $item->xpath('b:krydderbeskrivelse')[0]);
        $item->addChild('krydderbilde', $item->xpath('b:krydderbilde_s')[0]);
        $item->addChild('signatur', $item->xpath('b:signatur')[0]);
        $item->addChild('sp', $item->xpath('b:sp')[0]);
    }
    unset($item);
    $items = json_decode(json_encode((array) $items), 1);
    
    $newItems = array();

    foreach ($items as $item){
        
        if (!is_string($item['krydderbeskrivelse'])) {
            //unset($item['krydderbeskrivelse']);
            if (!is_string($item['description'])) {
                $item['krydderbeskrivelse'] = '';
            } else {
                $item['krydderbeskrivelse'] = $item['description'];
                $item['krydderbeskrivelse'] = preg_replace('|\<[\\\/]{0,2}pre\>|',"", $item['krydderbeskrivelse']); // Remove <pre>-tags
                $item['krydderbeskrivelse'] = preg_replace('|^.*?\\n\\n|s',"", $item['krydderbeskrivelse']); //Remove everything before the double line shift
                $item['krydderbeskrivelse'] = preg_replace('|ISBN.*|s',"", $item['krydderbeskrivelse']); // Fjern alt etter ISBN
                $item['krydderbeskrivelse'] = preg_replace('|\ {4}|',"", $item['krydderbeskrivelse']); //Fjern alle 
                $item['krydderbeskrivelse'] = preg_replace('|^[\s\S]*Nedlastbar e-bok.*\n|',"", $item['krydderbeskrivelse']);
                $item['krydderbeskrivelse'] = preg_replace('|^[\s\S]*Originaltittel.*\n|',"", $item['krydderbeskrivelse']);
                $item['krydderbeskrivelse'] = preg_replace('|^[\s\S]*Lest av.*\n|',"", $item['krydderbeskrivelse']);
                $item['krydderbeskrivelse'] = preg_replace('|^[\s\S]*bibliograf.*\n|',"", $item['krydderbeskrivelse']);
                $item['krydderbeskrivelse'] = preg_replace('|^[\s\S]*ordlist.*\n|',"", $item['krydderbeskrivelse']);
                $item['krydderbeskrivelse'] = preg_replace('|Omtalen er utarb.*|s',"", $item['krydderbeskrivelse']);
                //$item['krydderbeskrivelse'] = preg_replace('|\n|'," ", $item['krydderbeskrivelse']);
            }
        } else {
            $item['krydderbeskrivelse'] = preg_replace('/\n/', '', $item['krydderbeskrivelse']);
            $item['krydderbeskrivelse'] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $item['krydderbeskrivelse']);
            $item['krydderbeskrivelse'] = preg_replace('/\<br\/*\>(?=\w| )/', '', $item['krydderbeskrivelse']);
            //$item['krydderbeskrivelse'] = strip_tags($item['krydderbeskrivelse'], '<p><i><b><strong><br>');
        }
        
        // Remove nodes we don't need
        unset($item['title']);
        unset($item['link']);
        // unset($item['pubDate']);
        unset($item['guid']);
        unset($item['description']);
        
        $newItems[$item['tnr']] = $item;
    }
    unset($item);
    
    // Fjern alle uten bilde
    $items = array_filter($items, function ($item) { 
       return is_string($item['krydderbilde']); 
    });
    
    // Reassign array values
    $items = array_values($items);
    
    //echo "\tlists['" . $genre . "']['json'] = ". json_encode($items, JSON_PRETTY_PRINT) . ";\n";
    
    $json = json_encode($newItems, JSON_PRETTY_PRINT);
    
    $decoded = json_decode($json);
    
    if (json_last_error() === JSON_ERROR_NONE) {
        echo $json;
    }
?>