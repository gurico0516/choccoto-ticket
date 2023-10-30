<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_shop_roles', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('shop_id')->unsigned();
            $table->tinyInteger('user_role')->unsigned();

            $table->primary(['user_id', 'shop_id']);
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('shop_id')->references('id')->on('shops');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_shop_roles');
    }
};
