<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shift extends Model
{
    //fillables
    protected $fillable = [
        'time_slot_id',
        'guard_id',
    ];

    // time slot relation
    public function timeSlot(): BelongsTo
    {
        return $this->belongsTo(TimeSlot::class);
    }

    // guard relation
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'guard_id')
                    ->select(['id', 'name']); // select only id, name and email for performance
    }
}
