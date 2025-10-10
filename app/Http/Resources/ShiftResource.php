<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'guard' => $this->user, // guard relation
            'time_slot' => TimeSlotResource::make($this->timeSlot), // time slot relation
            'booked_at' => $this->created_at->isoFormat('D MMMM YYYY'),
        ];
    }
}
