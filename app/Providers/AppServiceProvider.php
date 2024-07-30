<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Define o "namespace" das rotas.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Registra os serviços de roteamento.
     *
     * @return void
     */
    public function boot(): void
    {
        parent::boot();
    }

    /**
     * Mapeia as rotas da aplicação.
     *
     * @return void
     */
    public function map(): void
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    /**
     * Mapeia as rotas da API.
     *
     * @return void
     */
    protected function mapApiRoutes(): void
    {
        Route::middleware('api')
             ->prefix('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    /**
     * Mapeia as rotas da web.
     *
     * @return void
     */
    protected function mapWebRoutes(): void
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }
}
