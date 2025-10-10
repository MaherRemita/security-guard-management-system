<?php

namespace App\Http\Requests\GuardGroup;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuardGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'mission_id' => 'sometimes|exists:missions,id',
            'profession_id' => 'sometimes|exists:professions,id',
            'name' => 'sometimes|string|max:255',
            'quantity' => 'sometimes|integer|min:1',
        ];
    }
}
