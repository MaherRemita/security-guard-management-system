<?php

namespace App\Http\Controllers;

use App\Services\ShiftService;
use App\Http\Resources\ShiftResource;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function __construct(
        protected ShiftService $shiftService,
    ) {}

    // get all shifts for the authenticated guard
    public function index()
    {

        // get shifts
        $shifts = $this->shiftService->getAll();

        return ShiftResource::collection($shifts);
    }

    // show a specific shift
    public function show(string $id)
    {
        // get shift
        $shift = $this->shiftService->get($id);
        return ShiftResource::make($shift);
    }

    //create shift
    public function store(Request $request )
    {
        // validate the time slot id 
        $request->validate([
            'time_slot_id' => 'required|integer',
        ]);
        
        $shift = $this->shiftService->create($request->input('time_slot_id'));
        
        return ShiftResource::make($shift);
    }

    // delete
    public function destroy(string $id)
    {
        // delete shift
        $this->shiftService->delete($id);

        return response()->json(['message' => 'Shift deleted successfully'], 200);
    }
}
