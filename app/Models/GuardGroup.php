<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    // time slots relation
    public function timeSlots(): HasMany
    {
        return $this->hasMany(TimeSlot::class);
    }

    // shifts relation
    public function shifts(): HasManyThrough
    {
        return $this->hasManyThrough(Shift::class, TimeSlot::class);
                    // ->where('time_slots.start_at', '<=', now())
                    // ->where('time_slots.end_at', '>=', now());
    }

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
