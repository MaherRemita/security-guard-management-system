<?php

namespace App\Services;

use App\Models\Mission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MissionService
{
    // get all missions
    public function getAll(array $data): LengthAwarePaginator
    {
        // get missions 
        $missions = Mission::search($data['search'] ?? '')->paginate(10);
        //eager load customers
        $missions->load('customer:id,name'); 

        return $missions;
    }

    // get
    public function get(string $id): Mission
    {
        $mission = Mission::find($id);
        if (!$mission) {
            abort(404,'Mission not found');
        }

        return $mission;
    }

    // create 
    public function create(array $data): Mission
    {
        // get the authenticated user (customer)
        $customer = auth()->user();
        // create a mission related to the customer 
        $mission =  $customer->missions()->create($data);

        return $mission;
    }

    // update 
    public function update(array $data, string $id): Mission
    {
        // get mission
        $mission = $this->get($id);
        // update mission
        $mission->update($data);

        return $mission;
    }

    // delete 
    public function delete(string $id): Mission
    {
        // get mission
        $mission = $this->get($id);
        // delete mission
        $mission->delete();

        return $mission;
    }
}
