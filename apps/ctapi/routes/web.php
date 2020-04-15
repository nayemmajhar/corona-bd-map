<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//CT Routes 

$router->group(
    [
        'prefix' => 'v1/places'
    ], function () use ($router) {
        $router->get('/',  ['uses' => 'PlaceController@showAllPlaces']);
        $router->get('/popular', ['uses' => 'PlaceController@showPopularPlaces']);
        $router->get('/{id}', ['uses' => 'PlaceController@showPlaceById']);
});

$router->group(
    [
        'prefix' => 'v1/tours'
    ], function () use ($router) {
        $router->get('/',  ['uses' => 'TourController@showAllTours']);
        $router->get('/popular', ['uses' => 'TourController@showPopularTours']);
        $router->get('/{id}', ['uses' => 'TourController@showTourById']);
        $router->get('map/{id}', ['uses' => 'TourController@showSpotsByTourId']);
});

$router->group(
    [
        'prefix' => 'v1/cities'
    ], function () use ($router) {
        $router->get('/{id}', ['uses' => 'CityController@showCityById']);
});

$router->group(
    [
        'prefix' => 'v1/vectors'
    ], function () use ($router) {
        $router->get('/', ['uses' => 'VectorController@showAllVectors']);
});



