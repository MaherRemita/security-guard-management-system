<?php

namespace App\Services;
use App\Models\Shift;
use App\Models\TimeSlot;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ShiftService
{
    public function __construct(
        protected TimeSlotService $timeSlotService,
    ) {}

    // get all shifts for the authenticated guard
    public function getAll(): LengthAwarePaginator
    {
        // get the authenticated guard
        $guard = auth()->user();
        // get shifts
        $shifts = $guard->shifts()->with(['timeSlot', 'user'])->paginate(10);

        return $shifts;
    }

    // get a specific shift
    public function get(string $id): Shift 
    {
        $shift = Shift::find($id);
        if (!$shift) {
            abort(404,'Shift not found');
        }

        return $shift;
    }

    // create 
    public function create(string $timeSlotId)
    {
        // get the authenticated guard
        $guard = auth()->user();
        
        // get time slot
        $timeSlot = $this->timeSlotService->get($timeSlotId);
        // get all shifts for the time slot guard group
        $guardGroup = $timeSlot->guardGroup;
        // get max shifts for the guard group
        $maxShifts = $guardGroup->quantity;
        // get current shifts count for the guard group in the time slot date range
        $currentShiftsCount = $timeSlot->shifts()->select(['shifts.*', 'time_slots.guard_group_id as laravel_through_key', 'time_slots.start_date', 'time_slots.end_date'])
                                    ->where('time_slots.start_date', '<=', now()->toDate())
                                    ->where('time_slots.end_date', '>=', now()->toDate())->count();

        if ($currentShiftsCount >= $maxShifts) {
            abort(400, 'Guard group is fully booked for this time slot');
        }

        // Check if guard already booked this slot
        $existingShift = Shift::where('time_slot_id', $timeSlotId)
            ->where('user_id', $guard->id)
            ->exists();

        if ($existingShift) {
            abort(400, 'You have already booked this time slot');
        }

        // Create shift
        $shift = $timeSlot->shifts()->create([
            'user_id' => $guard->id,
        ]);

        return $shift;
    }

    // delete
    public function delete(string $id): Shift
    {
        // get shift
        $shift = $this->get($id);
        // delete shift
        $shift->delete();

        return $shift;
    }
}
