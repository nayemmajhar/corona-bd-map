<?php

namespace App\Http\Controllers;

use App\Place;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VectorController extends Controller
{

    public function showAllVectors(){

        $bikes = DB::table('bikes')
                    ->select(DB::raw('bikes.*'))
                    ->get();

        // distance
        // ST_Distance(geography(ST_MakePoint("bikes"."lon", "bikes"."lat")), geography(ST_MakePoint('.$lon.','.$lat.'))) as distance

        return response()->json([
            'bikes' => $bikes,
            'message' => 'Success'
        ], 200);
    }

    public function showPlaceById($id){


        $bike = DB::table('bikes')
                    ->join('bike_info', 'bike_info.bike_id', '=', 'bikes.id')
                    ->join('user_information', 'user_information.user_id','=','bikes.created_by')
                    ->select(DB::raw('bikes.*, bike_info.*, user_information.*'))
                    ->where('bikes.id', '=', $id)
                    ->where('bikes.status', '=', 1)
                    ->first();

        return response()->json([
            'bike' => $bike,
            'message' => 'Success'
        ], 200);
    }

    public function isBikeAvailabile(Request $request){

        $startDate  = $request->pickup;
        $endDate    = $request->dropoff;
        $bike_id    = $request->bike_id;
        // have to check again
        $bike = DB::select(DB::raw('SELECT order_items.* FROM order_items WHERE (pickup_time between \''.$startDate.'\' AND \''.$endDate.'\') AND (dropoff_time between \''.$startDate.'\' AND \''.$endDate.'\') AND bike_id = '.$bike_id));

        if(count($bike)){
            $isAvailable = 0;
        } else {
            $isAvailable = 1;
        }

        $hours = round((strtotime($endDate) - strtotime($startDate))/(60*60));

        $rent = DB::table('bike_info')
            ->select(DB::raw('minimum_rent, daily_rent'))
            ->where('bike_info.bike_id', '=', $bike_id)
            ->first();

        if($hours > 4){
            $days = round($hours/24);
            $total_rent = $rent->daily_rent * $days;
        } else {
            $total_rent = $rent->minimum_rent;
        }

        return response()->json([
            'isAvailable' => $isAvailable,
            'rent' => $total_rent,
            'message' => 'Success'
        ], 200);
    }

    public function addBike(Request $request)
    {
        $this->validate(
            $request, [
                'title'             => 'required',
                'size'              => 'required',
                'sex'               => 'required',
                'minimum_rent'      => 'required',
                'daily_rent'        => 'required',
                'security_deposit'  => 'required',
                'location'          => 'required'
            ]
        );

        $data = [
            'title'             => $request->title,
            'size'              => $request->size,
            'sex'               => $request->sex,
            'minimum_rent'      => $request->minimum_rent,
            'daily_rent'        => $request->daily_rent,
            'security_deposit'  => $request->security_deposit,
            'location'          => $request->location,
            'created_by'        => $request->created_by
        ];

        $bike = Bike::create($data);

        $statusCode = $bike ? 220:422;

        return response(
            [
                'data' => $bike,
                'status' => $bike ? "success":"error"
            ],
            $statusCode
        );

    }
}
