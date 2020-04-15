<?php

namespace App\Http\Controllers;

use App\Tour;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TourController extends Controller
{

    public function showAllTours(){

        return response()->json([
            'tours' => Tour::orderBy('id','ASC')->get(),
            'message' => 'Success'
        ], 200);
    }

    public function showTourById($id){
        return response()->json([
            'tour' => Tour::find($id),
            'message' => 'Success'
        ], 200);
    }

    public function showPopularTours(){
        return response()->json([
            'tours' => Tour::offset(0)->limit(3)->orderBy('id','ASC')->get(),
            'message' => 'Success'
        ], 200);
    }

    public function showSpotsByTourId($id){

        $spots = DB::table('tour_spots')
                    ->join('places', 'places.id', '=', 'tour_spots.place_id')
                    ->join('place_infomation', 'place_infomation.place_id', '=', 'places.id')
                    ->select(DB::raw('tour_spots.*, places.*, place_infomation.*'))
                    ->where('tour_spots.tour_id', '=', $id)
                    ->orderBy('tour_spots.id','ASC')
                    ->get();

        $places = DB::table('places')
                    ->join('place_infomation', 'place_infomation.place_id', '=', 'places.id')
                    ->select(DB::raw('places.*, place_infomation.*'))
                    ->get();

        return response()->json([
            'spots' => $spots,
            'tour' => Tour::find($id),
            'places' => $places,
            'message' => 'Success'
        ], 200);
    }
}
