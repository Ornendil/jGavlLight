<?php

    include('innstillinger.php');

    $serverUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://' ) . $_SERVER['SERVER_NAME'];

    $dangerPath = realpath($_SERVER['DOCUMENT_ROOT'] . dirname($_SERVER['PHP_SELF']));
    if ($dangerPath == __DIR__){
        $safePath = str_replace($_SERVER['DOCUMENT_ROOT'], '', __DIR__);
        $baseUrl = $serverUrl . $safePath;
    } else {
        echo "Warning: Accessing this file is not allowed by the server";
    }

    $lists = array(
        "fantasy" => array(
            "ccl" => "plass=fantasy",
            "human" => "Fantasy",
            "computer" => "fantasy",
            "ikkePregenerert" >= true
        ),
        "scifi" => array(
            "ccl" => "plass=scifi",
            "human" => "Science Fiction",
            "computer" => "scifi"
        ),
        "spenning" => array(
            "ccl" => "(avd=ubhu eller avd=ubku) og plass=spenning",
            "human" => "Spenning",
            "computer" => "spenning"
        ),
        "ungromaner" => array(
            "ccl" => "(avd=ubhu eller avd=ubku) og plass=romaner",
            "human" => "Vanlige bøker",
            "computer" => "ungromaner"
        ),
        "tegneserier" => array(
            "ccl" => "plass=tegneserier",
            "human" => "Tegneserier",
            "computer" => "tegneserier"
        ),
        "nynorskung" => array(
            "ccl" => "(avd=ubhp eller avd=ubkp eller avd=ubhu eller avd=ubku) og sp=nno",
            "human" => "Nynorsk",
            "computer" => "nynorskung"
        ),
    );
    

    foreach($lists as $key => $list) {
        if ($list['ikkePregenerert']) {
            $lists[$key]['json'] = json_decode(file_get_contents($baseUrl . "/lists?ccl=" . $list['ccl']));
        } else {
            $lists[$key]['json'] = json_decode(file_get_contents($baseUrl . "/lists?genre=" . $list['computer']));
        }
    }



    echo $twig->render('index.twig', [
        'lists' => $lists,
    ]);
?>