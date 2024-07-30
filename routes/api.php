<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumsController;
use App\Http\Controllers\FaixaController;

Route::middleware('api')->group(function () {
    Route::get('/albums', [AlbumsController::class, 'index']);
    Route::get('/albums/{id}', [AlbumsController::class, 'show']);
    Route::post('/albums', [AlbumsController::class, 'store']);
    Route::put('/albums/{id}', [AlbumsController::class, 'update']);
    Route::delete('/albums/{id}', [AlbumsController::class, 'destroy']);

    Route::get('/faixa', [FaixaController::class, 'index']);
    Route::get('/faixa/{id}', [FaixaController::class, 'show']);
    Route::post('/faixa', [FaixaController::class, 'store']);
    Route::put('/faixa/{id}', [FaixaController::class, 'update']);
    Route::delete('/faixa/{id}', [FaixaController::class, 'destroy']);
});
