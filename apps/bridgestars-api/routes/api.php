<?php

use App\Data\UserData;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BiddingController;
use App\Http\Controllers\BiddingProblemController;
use App\Http\Controllers\CourseController;
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

Route::prefix('auth')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::post('forgot-password', PasswordResetLinkController::class);
        Route::post('reset-password', NewPasswordController::class);
        Route::post('register', RegisterController::class);
        Route::post('login', LoginController::class);
    });

    Route::post('logout', LogoutController::class)
        ->middleware('auth:sanctum');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('user', function (Request $request) {
        return UserData::from($request->user());
    });
    Route::get('courses', [CourseController::class, 'index']);
    Route::get('courses/{course}', [CourseController::class, 'show']);

    Route::get('bidding-problems/{problem}', [BiddingProblemController::class, 'show']);

    Route::post('bidding-problems/{problem}/bid', [BiddingController::class, 'bid']);
    Route::post('bidding-problems/{problem}/surrender', [BiddingController::class, 'surrender']);

    Route::middleware([])->group(function () {
        Route::post('import/{chapter}/bridgetobridge', App\Importers\BridgeToBridge::class);
    });

});
