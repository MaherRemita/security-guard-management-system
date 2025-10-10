<?php

namespace App\Services;

use App\Models\TimeSlot;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TimeSlotService
{
    public function __construct(
        protected GuardGroupService $guardGroupService,
    ) {}
    
    // get all time slots for a guard group
    public function getAll(array $data, string $guardGroupId): LengthAwarePaginator
    {

        // get time slots for the guard group with optional date filtering
        $timeSlots = TimeSlot::where('guard_group_id', $guardGroupId)
                            ->when(isset($data['start_date']) && isset($data['end_date']), function ($query) use ($data) {
                                $query->whereBetween('start_date', [$data['start_date'], $data['end_date']]);
                            })
                            ->orderBy('start_date', 'asc')
                            ->paginate(10);
        
        // eager load guard group
        $timeSlots->load('guardGroup:id,name');

        return  $timeSlots;
    }

    // get
    public function get(string $id): TimeSlot
    {
        $timeSlot = TimeSlot::find($id);
        if (!$timeSlot) {
            abort(404,'Time slot not found');
        }

        return $timeSlot;
    }

    // create
    public function create(array $data, string $guardGroupId): TimeSlot
    {
        // get guard group 
        $guardGroup = $this->guardGroupService->get($guardGroupId);
        // create time slot
        $timeSlot = $guardGroup->timeSlots()->create($data);

        return $timeSlot;
    }

    // update
    public function update(array $data, string $id): TimeSlot
    {
        // get time slot
        $timeSlot = $this->get($id);
        // update time slot
        $timeSlot->update($data);

        return $timeSlot;
    }

    // delete
    public function delete(string $id): TimeSlot
    {
        // get time slot
        $timeSlot = $this->get($id);
        // delete time slot
        $timeSlot->delete();

        return $timeSlot;
    }
}
