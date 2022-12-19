<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Trophy;

class TrophyController extends Controller
{
    private $baseCap = 100;
    private $capMultiplier = 1.1;

    public function getTrophies()
    {
        return Trophy::all()->sortByDesc('experience');
    }
    public function getUserTrophy($user_id)
    {
        $user = Trophy::all()->where('user_id', $user_id);
        return response()->json($user);
    }

    private function hasLeveledUp($user_id)
    {
        $current_level = Trophy::where(['user_id' => $user_id])->get(['level']);
        $current_level = floatval($current_level[0]->level);

        $userExperience = Trophy::where(['user_id' => $user_id])->get(['experience']);
        $userExperience = floatval($userExperience[0]->experience);

        $expCap = $this->capMultiplier * $current_level * $this->baseCap;

        if ($userExperience >= $expCap) {
            return true;
        }
        return false;
    }
    private function levelUp($user_id)
    {
        $current_level = Trophy::where(['user_id' => $user_id])->get(['level']);
        $next_level = floatval($current_level[0]->level);
        $next_level++;

        Trophy::where(['user_id' => $user_id])->update(['level' => $next_level]);
    }
    public function addExpToUser($user_id, $exp_amount)
    {
        $current_exp = Trophy::where(['user_id' => $user_id])->get(['experience']);
        $exp_amount = floatval($exp_amount);

        $current_exp = floatval($current_exp[0]->experience);
        $trophy = Trophy::where(['user_id' => $user_id])->update(['experience' => $current_exp + $exp_amount]);

        if (self::hasLeveledUp($user_id)) {
            self::levelUp($user_id);
        }

        return $trophy;
    }
}