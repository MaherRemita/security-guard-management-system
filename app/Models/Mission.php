<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use Searchable;

    //fillables 
    protected $fillable = [
        'customer_id',
        'title',
        'description',
    ];

    // customer relation 
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id')
                    ->select(['id','name']); // select only id and name for performance
    }

    // guard groups relation
    public function guardGroups(): HasMany
    {
        return $this->hasMany(GuardGroup::class);
    }

    public function toSearchableArray(): array
    {
        return [
            'title' => $this->title,
        ];
    }
}
