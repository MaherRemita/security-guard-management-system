<?php

namespace App\Services;

use App\Models\GuardGroup;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GuardGroupService
{
    // get all guard groups
    public function getAll(array $data): LengthAwarePaginator
    {
        // get guard groups with eager loading
        $guardGroups = GuardGroup::search($data['search'] ?? '')->paginate(10);

        // eager load mission and profession
        $guardGroups->load(['mission:id,title', 'profession:id,name']);

        return $guardGroups;
    }

    // get
    public function get(string $id): GuardGroup
    {
        $guardGroup = GuardGroup::find($id);
        if (!$guardGroup) {
            abort(404,'Guard group not found');
        }

        return $guardGroup;
    }

    // create 
    public function create(array $data): GuardGroup
    {
        // create guard group 
        $guardGroup = GuardGroup::create($data);

        return $guardGroup;
    }

    // update 
    public function update(array $data, string $id): GuardGroup
    {
        // get guard group
        $guardGroup = $this->get($id);
        // update guard group
        $guardGroup->update($data);

        return $guardGroup;
    }

    // delete 
    public function delete(string $id): GuardGroup
    {
        // get guard group
        $guardGroup = $this->get($id);
        // delete guard group
        $guardGroup->delete();

        return $guardGroup;
    }
}
