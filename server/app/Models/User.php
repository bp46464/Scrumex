<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    protected $guarded = [];
    public function projects()
    {
        return $this->belongsToMany(Project::class)->withTimestamps();
    }
    public function tasks()
    {    
        return $this->hasMany(Task::class);
    }
    public function teams()
    {
        return $this->belongsToMany(Team::class)->withTimestamps();
    }
    public function trophies()
    {
        return $this->hasOne(Trophy::class)->withTimestamps();
    }
}