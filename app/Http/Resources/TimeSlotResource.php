<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimeSlotResource extends JsonResource
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
            'guard_group' => $this->guardGroup, // guard group relation
            'start_date' => $this->start_date->isoFormat('D MMMM YYYY'),
            'end_date' => $this->end_date->isoFormat('D MMMM YYYY'),
            'start_time' => $this->start_time->format('H:i'),
            'end_time' => $this->end_time->format('H:i'),
            'status' => $this->status,
            'created_at' => $this->created_at->isoFormat('D MMMM YYYY'),
        ];
    }
}
