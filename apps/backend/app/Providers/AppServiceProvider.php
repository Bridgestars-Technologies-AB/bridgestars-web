<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Model::shouldBeStrict();
        Model::unguard();
        Date::use(CarbonImmutable::class);

/*        Relation::enforceMorphMap([
            'user' => User::class,
        ]);*/

        JsonResource::withoutWrapping();

        Blueprint::macro('publicId', function (string $column = 'public_id', int $length = 12) {
            $this->string($column, $length)->unique(); // @phpstan-ignore-line
        });

        Blueprint::macro('nonNullableTimestamps', function () {
            $this->timestamp('created_at'); // @phpstan-ignore-line
            $this->timestamp('updated_at'); // @phpstan-ignore-line
        });
    }
}
