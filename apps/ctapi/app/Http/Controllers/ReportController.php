<?php

namespace App\Http\Controllers;

use App\Place;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{

    public function showAllReports(){

        $reports = array();

        $totalCases = DB::table('daily_report_overall')
                        ->select(DB::raw('MAX(daydate) AS latestDate'), DB::raw('SUM(infected) AS infected_no'),DB::raw('SUM(recovered) AS recovered_no'),DB::raw('SUM(death) AS death_no'))
                        ->first();

        $divisionCases = DB::table('daily_report_division')
                            ->join('divisions', 'divisions.id', '=', 'daily_report_division.division_id')
                            ->select('divisions.title',DB::raw('SUM(infected) AS infected'),DB::raw('SUM(recovered) AS recovered'),DB::raw('SUM(death) AS death'))
                            ->groupBy('divisions.title')
                            ->get();

        $reports['totalCases'] = $totalCases;
        $reports['divisionCases'] = $divisionCases;

        return response()->json([
            'report' => $reports,
            'message' => 'Success'
        ], 200);
    }

    public function showPopularPlaces(){

        $places = DB::table('places')
                    ->join('place_infomation', 'place_infomation.place_id', '=', 'places.id')
                    ->select(DB::raw('places.*, place_infomation.*'))
                    ->orderBy('place_infomation.rating', 'ASC')
                    ->limit(3)
                    ->get();

        return response()->json([
            'places' => $places,
            'message' => 'Success'
        ], 200);
    }

    public function showPlaceById($id){

        $place = DB::table('places')
                    ->join('place_infomation', 'place_infomation.place_id', '=', 'places.id')
                    ->select(DB::raw('places.*, place_infomation.*'))
                    ->where('places.id', '=', $id)
                    ->first();

                    $places = DB::table('places')
                    ->join('place_infomation', 'place_infomation.place_id', '=', 'places.id')
                    ->select(DB::raw('places.*, place_infomation.*'))
                    ->get();

        return response()->json([
            'place' => $place,
            'places' => $places,
            'message' => 'Success'
        ], 200);
    }
}
