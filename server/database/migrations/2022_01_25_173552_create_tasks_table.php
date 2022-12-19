<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();
            $table->string('status');

            $table->unsignedBigInteger('sprint_id');
            $table->unsignedBigInteger('user_id');

            $table->foreign('sprint_id')->on('sprints')->references('id')
            ->onDelete('CASCADE')
            ->onUpdate('CASCADE');

            $table->foreign('user_id')->on('users')->references('id')
            ->onDelete('CASCADE')
            ->onUpdate('CASCADE');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
