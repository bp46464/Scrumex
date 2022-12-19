<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TrophyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/users', function () {
    return User::all();
});
Route::get('/users/{userId}', function ($id) {
    return User::find($id);
});
Route::patch('/users/{userId}', function ($id, Request $request) {
    $request->validate([
        'first_name' => 'required',
        'last_name' => 'required',
    ]);
    $res = User::find($id);
    $res->update($request->all());
    return $res;
});
Route::delete('/users/{userId}', function ($id) {
    $res = User::find($id)->delete();
});

#Get Projects
Route::get('projects', [ProjectController::class, 'getProjects']);
#Get specific project
Route::get('projects/{projectId}', [ProjectController::class, 'getProject']);
#Add project
Route::post('projects', [ProjectController::class, 'store']);
#Delete project
Route::delete('projects/{projectId}', [ProjectController::class, 'destroy']);
#Get project's user
Route::get('projects/{projectId}/users', [ProjectController::class, 'getProjectUsers']);
#Add user to project
Route::post('projects/{projectId}/users/{userId}', [ProjectController::class, 'addUserToProject']);
#Delete user from project
Route::delete('projects/{projectId}/users/{userId}', [ProjectController::class, 'deleteUserFromProject']);

#Get all sprints from project
Route::get('projects/{projectId}/sprints', [SprintController::class, 'getAllSprints']);
#Add sprint to project
Route::post('projects/{projectId}/sprints', [SprintController::class, 'store']);
#Get specific sprint from project
Route::get('projects/{projectId}/sprints/{sprintId}', [SprintController::class, 'getSpecificSprint']);

#Add task to sprint
Route::post('projects/{projectId}/sprints/{sprintId}/tasks', [TaskController::class, 'store']);
#Get tasks from sprint
Route::get('projects/{projectId}/sprints/{sprintId}/tasks', [SprintController::class, 'getAllSprintTasks']);
#Get specific task from sprint
Route::get('projects/{projectId}/sprints/{sprintId}/tasks/{taskId}', [SprintController::class, 'getSpecificSprintTask']);
#Delete task from sprint
Route::delete('projects/{projectId}/sprints/{sprintId}/tasks/{taskId}', [SprintController::class, 'deleteTaskFromSprint']);
#delete specific sprint NIE UŻYWAĆ KURWA
Route::delete('projects/{projectId}/sprints/{sprintId}', [SprintController::class, 'deleteSpecificSprint']);
#Update task status
Route::patch('projects/{projectId}/sprints/{sprintId}/tasks/{taskId}', [TaskController::class, 'updateStatus']);
#Create team
Route::post('team', [TeamController::class, 'store']);
#Add user to team
Route::post('teams/{teamId}/users/{userId}', [TeamController::class, 'addUserToTeam']);
#Add team to project
Route::post('projects/{projectId}/teams/{teamId}', [ProjectController::class, 'addTeamToProject']);
#Remove team from project
Route::delete('projects/{projectId}/teams/{teamId}', [ProjectController::class, 'deleteTeamFromProject']);
#Remove team 
Route::delete('teams/{teamId}', [TeamController::class, 'removeTeam']);
#Remove user from team
Route::delete('teams/{teamId}/users/{userId}', [TeamController::class, 'deleteUserFromTeam']);

Route::post('/users/{userId}/trophy', function ($id) {
    return User::find($id);
});

Route::get('/trophy', [TrophyController::class, 'getTrophies']);
Route::get('/trophy/{user_id}', [TrophyController::class, 'getUserTrophy']);
Route::patch('/trophy/{user_id}/{amount}', [TrophyController::class, 'addExpToUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'getUser']);
    Route::post('logout', [AuthController::class, 'logout']);
});