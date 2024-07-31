<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumsController;
use App\Http\Controllers\FaixasController;

Route::middleware('api')->group(function () {
    Route::get('/albums', [AlbumsController::class, 'index']);
    Route::get('/albums/{id}', [AlbumsController::class, 'show']);
    Route::post('/albums', [AlbumsController::class, 'store']);
    Route::put('/albums/{id}', [AlbumsController::class, 'update']);
    Route::delete('/albums/{id}', [AlbumsController::class, 'destroy']);

    Route::get('/faixas', [FaixasController::class, 'index']);
    Route::get('/faixas/{id}', [FaixasController::class, 'show']);
    Route::post('/faixas', [FaixasController::class, 'store']);
    Route::put('/faixas/{id}', [FaixasController::class, 'update']);
    Route::delete('/faixas/{id}', [FaixasController::class, 'destroy']);
});
