<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MissionResource extends JsonResource
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
            'customer' => $this->customer, // customer relation
            'title' => $this->title,
            'description' => $this->description,
            'created_at' => $this->created_at->isoFormat('D MMMM YYYY'),
        ];
    }
}
