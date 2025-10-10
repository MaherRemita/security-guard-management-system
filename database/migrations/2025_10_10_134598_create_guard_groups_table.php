<?php

use App\Models\Mission;
use App\Models\Profession;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guard_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Mission::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Profession::class);
            $table->string('name');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guard_groups');
    }
};
