<?php

namespace App\Http\Requests\GuardGroup;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuardGroupRequest extends FormRequest
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
            'mission_id' => 'required|exists:missions,id',
            'profession_id' => 'required|exists:professions,id',
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
        ];
    }
}
