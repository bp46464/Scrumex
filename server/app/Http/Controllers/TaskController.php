<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sprint;
use App\Models\Task;
use App\Models\Project;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([ 
            'description' => 'required',
            'status' => 'required',
            'sprint_id' => 'required',
            'user_id' => 'required'
        ]);
    
        return Task::create($request->all());
    }
    public function updateStatus($pid, $sid, $tid, Request $request){
        $request->validate([
            'status' => 'required'
        ]);
        $res = Task::find($tid);
        $res -> update($request->all());
        return $res;
    }
}
