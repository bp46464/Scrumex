<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sprint;
use App\Models\Project;
use App\Models\Task;

class SprintController extends Controller
{
    public function getAllSprints($pid)
    {
        return Project::find($pid)->sprints;
    }

    public function getSpecificSprint($pid, $sid)
    {
        return Project::find($pid)->sprints->where("id", "=", $sid);
    }

    public function getAllSprintTasks($pid, $sid)
    {
        return Sprint::find($sid)->tasks;
    }

    public function getSpecificSprintTask($pid, $sid, $tid)
    {
        return Sprint::find($sid)->tasks->where("id", "=", $tid);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required',
            'startDate' => 'required',
            'stopDate' => 'required',
            'interval' => 'required'
        ]);

        return Sprint::create($request->all());
    }

    public function deleteTaskFromSprint($pid, $sid, $tid)
    {
        $res = Task::find($tid)->delete();
        return "deleted.";
    }

    public function deleteSpecificSprint($pid, $sid)
    {
        $res = Sprint::find($sid)->delete();
        return "deleted.";
    }
}