<?php

namespace App\Services;

use App\Models\Profession;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProfessionService
{
    // get all professions
    public function getAll(array $data): LengthAwarePaginator
    {
        // get professions 
        $professions = Profession::search($data['search'] ?? '')->paginate(10);

        return $professions;
    }

    // get
    public function get(string $id): Profession
    {
        $profession = Profession::find($id);
        if (!$profession) {
            abort(404,'Profession not found');
        }

        return $profession;
    }

    // create 
    public function create(array $data): Profession
    {
        // create profession 
        $profession = Profession::create($data);

        return $profession;
    }

    // update 
    public function update(array $data, string $id): Profession
    {
        // get profession
        $profession = $this->get($id);
        // update profession
        $profession->update($data);

        return $profession;
    }

    // delete 
    public function delete(string $id): Profession
    {
        // get profession
        $profession = $this->get($id);
        // delete profession
        $profession->delete();

        return $profession;
    }
}
