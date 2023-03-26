<?php

    require __DIR__ . '/vendor/autoload.php';

    use Twig\Environment;
    use Twig\Loader\FilesystemLoader;
    use Twig\Node\Expression\TestExpression;
    use Twig\TwigTest;

    $loader = new FilesystemLoader(__DIR__ . '/templates');

    $twig = new Environment($loader, [
        'debug' => true
    ]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

?>