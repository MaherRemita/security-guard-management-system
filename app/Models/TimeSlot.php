<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimeSlot extends Model
{
    //fillables
    protected $fillable = [
        'guard_group_id',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
    ];

    // cast start_date and end_date to date, start_time and end_time to time
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    // status attribute
    public function getStatusAttribute(): string
    {
        $now = now();
        if ($this->end_date->isBefore($now)) {
            return 'past';
        } elseif ($this->start_date->isAfter($now)) {
            return 'upcoming';
        } else {
            return 'ongoing';
        }
    }

    // guard group relation
    public function guardGroup(): BelongsTo
    {
        return $this->belongsTo(GuardGroup::class)
                    ->select(['id', 'name']); // select only id and name for performance
    }
}
