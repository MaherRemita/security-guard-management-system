<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create admin
        User::factory()->create([
            'name' => 'Maher Remita',
            'email' => 'maher@admin.com',
            'user_type' => 'ADMIN'
        ]);

        // create 1000 CUSTOMER 
        User::factory(1000)->create([
            'user_type' => 'CUSTOMER'
        ]);
    }
}
