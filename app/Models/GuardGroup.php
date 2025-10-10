<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class GuardGroup extends Model
{
    use Searchable;

    //fillables 
    protected $fillable = [
        'mission_id',
        'profession_id',
        'name',
        'quantity',
    ];

    // mission relation 
    public function mission(): BelongsTo
    {
        return $this->belongsTo(Mission::class, 'mission_id')
                    ->select(['id','title']); // select only id and title for performance
    }

    // profession relation 
    public function profession(): BelongsTo
    {
        return $this->belongsTo(Profession::class, 'profession_id')
                    ->select(['id','name']); // select only id and name for performance
    }

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
