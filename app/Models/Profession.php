<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
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

    // guard groups relation
    public function guardGroups(): HasMany
    {
        return $this->hasMany(GuardGroup::class);
    }

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
