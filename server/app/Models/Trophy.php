<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trophy extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'trophies';
    protected $fillable = [
        'user_id',
        'amountOfTrophies',
        'experience',
        'level'
    ];

    public function users()
    {
        return $this->belongsTo(User::class)->withTimestamps();
    }
}