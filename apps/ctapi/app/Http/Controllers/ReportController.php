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

        $divisionCases = DB::select('SELECT divisions.title as title, daydate, infected, recovered, death,
                                    infected - lag(infected,1,0) OVER (PARTITION BY division_id ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (PARTITION BY division_id ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (PARTITION BY division_id ORDER BY daydate) AS newdeath
                                    FROM daily_report_division
                                    LEFT JOIN divisions ON divisions.id = daily_report_division.division_id
                                    ORDER BY daydate DESC LIMIT 8');

        $totalCases = DB::select('SELECT daydate, infected, recovered, death, tests,
                                    infected - lag(infected,1,0) OVER (ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (ORDER BY daydate) AS newdeath,
                                    tests - lag(tests,1,0) OVER (ORDER BY daydate) AS newtests
                                    FROM daily_report_overall ORDER BY daydate DESC LIMIT 8');

        $districtCases = DB::select('SELECT districts.title as title, daydate, infected, recovered, death,
                                    infected - lag(infected,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newdeath
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

    public function showDivisionOverview($name){

        $reports = array();

        $districts = DB::table('districts')
                        ->join('divisions', 'divisions.id', '=', 'districts.division_id')
                        ->select(DB::raw('districts.*'))
                        ->where('divisions.title', '=', $name)
                        ->get();

        $dist_count = count($districts);

        $divisionCases = DB::select('SELECT divisions.title as title, daydate, infected, recovered, death,
                                    infected - lag(infected,1,0) OVER (ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (ORDER BY daydate) AS newdeath
                                    FROM daily_report_division
                                    LEFT JOIN divisions ON divisions.id = daily_report_division.division_id
                                    WHERE divisions.title = \''.$name .'\'
                                    ORDER BY daydate DESC LIMIT 15');

        $districtCases = DB::select('SELECT districts.title as title, daydate, infected, recovered, death,
                                    infected - lag(infected,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (PARTITION BY district_id ORDER BY daydate) AS newdeath
                                    FROM daily_report_districts
                                    LEFT JOIN districts ON districts.id = daily_report_districts.district_id
                                    LEFT JOIN divisions ON divisions.id = daily_report_districts.division_id
                                    WHERE divisions.title = \''.$name .'\'
                                    ORDER BY daydate DESC LIMIT '. $dist_count);

        $reports['divisionStats'] = $divisionCases;
        $reports['districtStats'] = $districtCases;

        return response()->json([
            'report' => $reports,
            'message' => 'Success'
        ], 200);
    }

    public function showDistrictOverview($name){
        $reports = array();

        $districtCases = DB::select('SELECT districts.title as title, daydate, infected, recovered, death,
                                    infected - lag(infected,1,0) OVER (ORDER BY daydate) AS newinfected,
                                    recovered - lag(recovered,1,0) OVER (ORDER BY daydate) AS newrecovered,
                                    death - lag(death,1,0) OVER (ORDER BY daydate) AS newdeath
                                    FROM daily_report_districts
                                    LEFT JOIN districts ON districts.id = daily_report_districts.district_id
                                    WHERE districts.title = \''.$name .'\'
                                    ORDER BY daydate DESC LIMIT 10');
                                    
        $reports['districtStats'] = $districtCases;

        return response()->json([
            'report' => $reports,
            'message' => 'Success'
        ], 200);
    }
}
