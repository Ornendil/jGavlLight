<?php

    require __DIR__ . '/vendor/autoload.php';

    use Twig\Environment;
    use Twig\Loader\FilesystemLoader;
    use Twig\Node\Expression\TestExpression;
    use Twig\TwigTest;
    use Symfony\Component\Yaml\Yaml;

    $lists = Yaml::parseFile(__DIR__ . '/config.yaml');

    $loader = new FilesystemLoader(__DIR__ . '/templates');

    $twig = new Environment($loader, [
        'debug' => true
    ]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

    $serverUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://' ) . $_SERVER['SERVER_NAME'];

    $dangerPath = realpath($_SERVER['DOCUMENT_ROOT'] . dirname($_SERVER['PHP_SELF']));
    if ($dangerPath == __DIR__){
        $safePath = str_replace($_SERVER['DOCUMENT_ROOT'], '', __DIR__);
        $baseUrl = $serverUrl . $safePath;
    } else {
        echo "Warning: Accessing this file is not allowed by the server";
    }

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