<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Profession extends Model
{
    use Searchable;

    // disable timestamps
    public $timestamps = false;

    //fillables 
    protected $fillable = [
        'name',
        'description',
    ];

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
