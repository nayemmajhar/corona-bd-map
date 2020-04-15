<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Hashing\BcryptHasher;


class UserController extends Controller
{

    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function showAllPersons(){
        // return json_encode(array('name'=>'nayem','email'=>'majhar'));
        return response()->json(User::all());
    }

    public function showUserByUsername($id){
        return response()->json(User::find($id));
    }


    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|max:255',
            'password' => 'required',
        ]);

        $email = $request->email;
        $password = $request->password;


        $token = null;
        $credentials = $request->only('email', 'password');

        $user = \App\User::where('email', $request->email)->get()->first();

        $response = ['success'=>false, 'data'=>'Record doesnt exists'];

        if ($user && (new BcryptHasher)->check($request->password, $user->password)){

            try {
                if (!$token = $this->jwt->attempt($request->only('email', 'password'))) {
                    return response()->json([
                        'response' => 'error',
                        'message' => 'Password or email is invalid',
                        'token' => $token,
                        'success' => false
                    ]);
                }else{
                    $user->auth_token = $token;
                    $user->save();

                    $response = ['success'=>true, 'auth'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->username, 'email'=>$user->email]];
                }
            } catch (JWTAuthException $e) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Token creation failed',
                    'success' => false
                ]);
            }

    }

        return response($response,
            220
        );
    }

    public function register(Request $request)
    {
        $this->validate(
            $request, [
                'username'  => 'required|unique:users',
                'email'     => 'required|email|unique:users',
                'password'  => 'required'
            ]
        );

        $data = [
            'username'          => $request->username,
            'email'             => $request->email,
            'activation_key'    => rand(100000,999999),
            'password'          => (new BcryptHasher)->make($request->password)
        ];

        $user = User::create($data);

        $statusCode = $user ? 220:422;

        return response(
            [
                'user' => $user,
                'success' => $user ? true:false
            ],
            $statusCode
        );

    }

    public function login(Request $request)
    {

        $this->validate(
            $request, [
                'email' => 'email|required',
                'password' => 'required'
            ]
        );



        $email = $request->email;
        $password = $request->password;
        $user = User::find($email);

        $response = [
            'data' => $user,
            'status' => 'error',
        ];

        $statusCode = $user ? 220:422;

        if($user != null){

            if ((new BcryptHasher)->check($password, $user->password)){
                $response['status'] = 'success';
            } else {
                $response['status'] = 'worng';
            }
        }

        return response($response, $statusCode);

    }

}
