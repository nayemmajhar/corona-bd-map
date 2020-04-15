<?php

namespace App\Http\Controllers;

use App\City;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CityController extends Controller
{

    public function showCityById($id){
        return response()->json([
            'city' => City::find($id),
            'message' => 'Success'
        ], 200);
    }
}
