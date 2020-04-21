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

        

        $totalCases = DB::select('SELECT infected, recovered, death, daydate
                                FROM daily_report_overall as a
                                WHERE daydate = (
                                    SELECT MAX(daydate)
                                    FROM daily_report_overall as b
                                )')[0];

        $divisionCases = DB::select('SELECT a.infected, a.recovered, a.death, a.daydate, b.title
                                FROM daily_report_division as a
                                LEFT JOIN divisions as b ON b.id = a.division_id
                                WHERE a.daydate = (
                                    SELECT MAX(daydate)
                                    FROM daily_report_division as c
                                )');

        $districtCases = DB::select('SELECT a.infected, a.recovered, a.death, a.daydate, b.title
                                FROM daily_report_districts as a
                                LEFT JOIN districts as b ON b.id = a.district_id
                                WHERE a.daydate = (
                                    SELECT MAX(daydate)
                                    FROM daily_report_districts as c
                                )');

        foreach ($divisionCases as $key => $item) {
            if($item->infected > 1000){
                $divisionCases[$key]->colorClass = 'cases-top-1';
            } elseif( 1000 >= $item->infected && $item->infected > 70){
                $divisionCases[$key]->colorClass = 'cases-top-2';
            } else {
                $divisionCases[$key]->colorClass = 'cases-top-3';
            }
        }

        $districtCasesObj = array();

        foreach ($districtCases as $key => $item) {
            $district = strtolower($item->title);
            $districtCasesObj[$district] = $item;
            if($item->infected > 300){
                $districtCasesObj[$district]->colorClass = 'cases-dist-top-1';
            } elseif( 300 >= $item->infected && $item->infected > 100){
                $districtCasesObj[$district]->colorClass = 'cases-dist-top-2';
            } elseif( 100 >= $item->infected && $item->infected > 30){
                $districtCasesObj[$district]->colorClass = 'cases-dist-top-3';
            } elseif( $item->infected == 0){
                $districtCasesObj[$district]->colorClass = 'cases-dist-top-5';
            } else {
                $districtCasesObj[$district]->colorClass = 'cases-dist-top-4';
            }
        }

        $reports['totalCases'] = $totalCases;
        $reports['divisionCases'] = $divisionCases;
        $reports['districtCases'] = $districtCasesObj;

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
