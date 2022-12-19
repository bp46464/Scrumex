<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $fillable = [
        'description',
        'status',
        'sprint_id',
        'user_id'
    ];
    public function sprints()
    {
        return $this->belongsTo(Sprint::class);
    }
    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
