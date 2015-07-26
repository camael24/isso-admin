<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ('OPTIONS' === $_SERVER['REQUEST_METHOD'] && isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE');
    die;
}

/**
 * PHP Settings
 */
date_default_timezone_set('Europe/Paris');

/**
 * Autoloader Composer
 */
require_once dirname( __DIR__ )
    . DIRECTORY_SEPARATOR . 'vendor'
    . DIRECTORY_SEPARATOR . 'autoload.php';

/** ******************************************************************************************************* **/

use \Hoa\Core,
    \Hoa\Dispatcher;

$hoa = Core\Core::getInstance();
$hoa->getParameters()->setParameter('root.data', dirname(dirname(dirname(__DIR__))) . DS . 'data');
$hoa->setProtocol();

Core\Core::enableErrorHandler();
Core\Core::enableExceptionHandler();

Hoa\Database\Dal::initializeParameters(array(
    'connection.list.default.dal' => Hoa\Database\Dal::PDO,
    'connection.list.default.dsn' => 'sqlite:' . resolve('hoa://Data') . '/comments.sqlite'
));
$dal = Hoa\Database\Dal::getInstance('default');

$baseUri = '/api/v1/';
$router = new Hoa\Router\Http\Http();
$router
    ->get('p', $baseUri . 'posts', function () use($dal) {
        $statement = $dal->query('SELECT t.*, (select group_concat(c.id) from comments as c where c.tid = t.id) as comments FROM threads as t');
        $posts = [];

        while ($row = $statement->fetchNext()) {
            $row['comments'] = explode(',', $row['comments']);

            foreach ($row['comments'] as & $c) {
                $c = (int)$c;
            }

            $posts[] = $row;
        }

        echo json_encode(['posts' => $posts]);
    })
    ->get('c', $baseUri . 'comments', function () use($dal) {
        $statement = $dal->query('SELECT * FROM comments order by created DESC');
        $comments = [];

        while ($row = $statement->fetchNext()) {
            $comments[] = [
                'id'            => $row['id'],
                'text'          => $row['text'],
                'ip'            => $row['remote_addr'],
                'author'        => $row['author'],
                'authorEmail'   => $row['email'],
                'authorWebsite' => $row['website'],
                'likes'         => (int)$row['likes'],
                'dislikes'      => (int)$row['dislikes'],
                'createdAt'     => date('c', $row['created']),
                'updatedAt'     => null === $row['modified'] ? date('c', $row['created']) : date('c', $row['modified']),
                'post'          => $row['tid']
            ];
        }

        echo json_encode(['comments' => $comments]);
    })
    ->delete('cd', $baseUri . 'comments/(?<commentId>[0-9]+)', function($commentId) use($dal) {
        $stmt = $dal->query('DELETE FROM comments where id = ?');
        $stmt->execute([(int)$commentId]);

        header($_SERVER['SERVER_PROTOCOL'] . ' 204 No Content');
    });

$dispatcher = new Hoa\Dispatcher\Basic();

try {
    $dispatcher->dispatch($router);
} catch (Hoa\Router\Exception\NotFound $e) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
    echo json_encode(['errors' => ['code' => 404, 'title' => 'Resource not found']]);
} catch (\Exception $e) {
    throw $e;
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Not Found');
    echo json_encode(['errors' => ['code' => 500, 'title' => 'Internal server error']]);
}

