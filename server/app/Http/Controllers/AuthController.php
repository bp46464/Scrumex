<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Trophy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        // return $user["id"];
        Trophy::create([
            'user_id' => $user["id"],
            'amountOfTrophies' => 0,
            'experience' => 10,
            'level' => 1
        ]);

        return $user;
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid email address or password'
            ], status: Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('secret_token', $token, 60 * 24); // 1 day

        return response($user)->withCookie($cookie);
    }

    public function getUser()
    {
        return Auth::user();
    }

    public function logout()
    {
        $cookie = Cookie::forget('secret_token');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }
}