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

        $divisionCases = DB::select('SELECT divisions.title as title, daydate, infected,
                                    infected - lag(infected,1,0) OVER (PARTITION BY division_id ORDER BY daydate) AS newinfected
                                    FROM daily_report_division
                                    LEFT JOIN divisions ON divisions.id = daily_report_division.division_id
                                    ORDER BY daydate DESC LIMIT 8');

        $totalCases = DB::select('SELECT daydate, infected, recovered, death, tests,
                                    infected - lag(infected,1,0) OVER (ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (ORDER BY daydate) AS newdeath,
                                    tests - lag(tests,1,0) OVER (ORDER BY daydate) AS newtests
                                    FROM daily_report_overall ORDER BY daydate DESC LIMIT 8');

        $districtCases = DB::select('SELECT districts.title as title, daydate, infected,
                                    infected - lag(infected,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newinfected
                                    FROM daily_report_districts
                                    LEFT JOIN districts ON districts.id = daily_report_districts.district_id
                                    ORDER BY daydate DESC LIMIT 64');
        
        foreach ($divisionCases as $key => $item) {
            if($item->infected > 1000){
                $divisionCases[$key]->colorClass = 'cases-top-1';
            } elseif( 1000 >= $item->infected && $item->infected > 70){
                $divisionCases[$key]->colorClass = 'cases-top-2';
            } else {
                $divisionCases[$key]->colorClass = 'cases-top-3';
            }
        }

        foreach ($districtCases as $key => $item) {
            if($item->infected > 300){
                $districtCases[$key]->colorClass = 'cases-dist-top-1';
            } elseif( 300 >= $item->infected && $item->infected > 100){
                $districtCases[$key]->colorClass = 'cases-dist-top-2';
            } elseif( 100 >= $item->infected && $item->infected > 30){
                $districtCases[$key]->colorClass = 'cases-dist-top-3';
            } elseif( $item->infected == 0){
                $districtCases[$key]->colorClass = 'cases-dist-top-5';
            } else {
                $districtCases[$key]->colorClass = 'cases-dist-top-4';
            }
        }

        $reports['totalCases'] = $totalCases;
        $reports['divisionCases'] = $divisionCases;
        $reports['districtCases'] = $districtCases;

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
