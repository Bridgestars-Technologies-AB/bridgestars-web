<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Concerns\HasPublicId;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use CanResetPassword;
    use HasApiTokens, HasFactory, Notifiable;
    use HasPublicId;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function biddingResults(): HasMany
    {
        return $this->hasMany(BiddingResult::class);
    }

    public function leadResults(): HasMany
    {
        return $this->hasMany(LeadResult::class);
    }

    public function sendPasswordResetNotification($token): void
    {
        $url = config('app.frontend_url') . '/auth/reset?token=' . $token . '&email=' . $this->getEmailForPasswordReset();
        $this->notify(new ResetPasswordNotification($url));
    }

    public function fullName(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
