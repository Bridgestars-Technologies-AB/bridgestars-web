<?php

use App\Data\UserData;
use App\Http\Controllers\BiddingProblemController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\Internal\LoginController;
use App\Http\Controllers\Internal\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('internal')->group(function () {
    Route::post('register', RegisterController::class);
    Route::post('login', LoginController::class);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return UserData::from($request->user());
    });
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{course}', [CourseController::class, 'show']);
    Route::get('/bidding-problems/{bidding_problem}', [BiddingProblemController::class, 'show']);
    Route::post('/bidding-problems/{bidding_problem}', [BiddingProblemController::class, 'bid']);
});
