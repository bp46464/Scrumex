<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Project;

class TeamController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([ 
            'teamName' => 'required'
        ]);
    
        return Team::create($request->all());
    }
    #jak chcecie nowego usera, to bierzcie tego z ostatniego indexu :)
    public function addUserToTeam($teamid, $uid){
        $team=Team::find($teamid);
        $team->users()->attach($uid);
        return $team->users;
    }

    public function addTeamToProject($teamid, $pid){
        $team=Team::find($teamid);
        $team->projects()->attach($pid);
        return $team->projects;
    }

    public function removeTeam($teamid){
        $team = Team::find($teamid);
        $team->delete();
        #wyświetlenie pozostałych teamów
        return Team::all();
    }

    public function deleteUserFromTeam($teamid, $uid){
        $team = Team::find($teamid);
        $team->users()->detach($uid);
        return $team;
    }
}
