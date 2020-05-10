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
    return 'you don\'t have permission to access this application.';
});

//CT Routes 

$router->group(
    [
        'prefix' => 'v1/reports'
    ], function () use ($router) {
        $router->get('/',  ['uses' => 'ReportController@showAllReports']);
        $router->get('country', ['uses' => 'ReportController@getCountryOverview']);
        $router->get('division/{name}', ['uses' => 'ReportController@showDivisionOverview']);
        $router->get('district/{name}', ['uses' => 'ReportController@showDistrictOverview']);
});
