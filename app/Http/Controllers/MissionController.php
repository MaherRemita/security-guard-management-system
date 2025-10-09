<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mission\StoreMissionRequest;
use App\Http\Requests\Mission\UpdateMissionRequest;
use Illuminate\Http\Request;
use App\Services\MissionService;
use App\Http\Resources\MissionResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MissionController extends Controller
{
    public function __construct(
        protected MissionService $missionService,
    ) {}

    // get all missions
    public function index(Request $request): AnonymousResourceCollection
    {
        //validate search 
        $data = $request->validate([
            'search' => 'nullable|string|max:255',
        ]);

        // get missions 
        $missions = $this->missionService->getAll($data);

        return MissionResource::collection($missions);
    }

    // create
    public function store(StoreMissionRequest $request): MissionResource
    {
        // get the validated data 
        $data = $request->validated();
        // create mission 
        $mission = $this->missionService->create($data);

        return MissionResource::make($mission);
    }

    // show
    public function show(string $id): MissionResource
    {
        // get mission
        $mission = $this->missionService->get($id);

        return MissionResource::make($mission);
    }

    // update
    public function update(UpdateMissionRequest $request, string $id): MissionResource
    {
        //get the validated data
        $data = $request->validated();
        // update mission
        $mission = $this->missionService->update($data, $id);

        return MissionResource::make($mission);
    }

    // delete
    public function destroy(string $id)
    {
        // delete mission
        $this->missionService->delete($id);

        return response()->json(['message' => 'Mission deleted successfully'],200);
    }
}
