<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TimeSlotService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\TimeSlotResource;
use App\Http\Requests\TimeSlot\StoreTimeSlotRequest;
use App\Http\Requests\TimeSlot\UpdateTimeSlotRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TimeSlotController extends Controller
{
    public function __construct(
        protected TimeSlotService $timeSlotService,
    ) {}

    //get all time slots for a guard group
    public function index(Request $request, string $guardGroupId): AnonymousResourceCollection
    {
        // validate the filter by date range if provided
        $data = $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        // get time slots for the guard group
        $timeSlots = $this->timeSlotService->getAll($data, $guardGroupId);

        return TimeSlotResource::collection($timeSlots);
    }

    // create 
    public function store(StoreTimeSlotRequest $request, string $guardGroupId)
    {
        // get the validated data
        $data = $request->validated();
        // create time slot
        $timeSlot = $this->timeSlotService->create($data, $guardGroupId);

        return TimeSlotResource::make($timeSlot);
    }

    // show
    public function show(string $id): TimeSlotResource
    {
        // get time slot
        $timeSlot = $this->timeSlotService->get($id);

        return TimeSlotResource::make($timeSlot);
    }

    // update
    public function update(UpdateTimeSlotRequest $request, string $id): TimeSlotResource
    {
        //get the validated data
        $data = $request->validated();
        // update time slot
        $timeSlot = $this->timeSlotService->update($data, $id);

        return TimeSlotResource::make($timeSlot);
    }

    // delete
    public function destroy(string $id): JsonResponse
    {
        // delete time slot
        $this->timeSlotService->delete($id);

        return response()->json(['message' => 'Time slot deleted successfully'], 200);
    }
}
