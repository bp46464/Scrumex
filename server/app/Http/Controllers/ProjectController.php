<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;

class ProjectController extends Controller
{
    public function getProjects()
    {
        return Project::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'pmid' => 'required',
            'projectName' => 'required',
            'description' => 'required',
            'endingDate' => 'required'
        ]);

        return Project::create($request->all());
    }

    public function destroy($id)
    {
        $res = Project::find($id)->delete();

        return "deleted.";
    }

    public function getProject($id)
    {
        return Project::find($id);
    }

    public function getProjectUsers($id)
    {
        return Project::find($id)->users;
    }

    public function addUserToProject($pid, $uid)
    {
        $project = Project::find($pid);
        $project->users()->attach($uid);
    }

    public function deleteUserFromProject($pid, $uid)
    {
        $project = Project::find($pid);
        $project->users()->detach($uid);
    }

    public function addTeamToProject($pid, $teamid)
    {
        $project = Project::find($pid);
        $project->teams()->attach($teamid);
    }

    public function deleteTeamFromProject($pid, $teamid)
    {
        $project = Project::find($pid);
        $project->teams()->detach($teamid);
    }
}