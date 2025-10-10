<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuardGroupResource extends JsonResource
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
            'mission' => $this->mission, // mission relation
            'profession' => $this->profession, // profession relation
            'name' => $this->name,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at->isoFormat('D MMMM YYYY'),
        ];
    }
}
