<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuardGroup\StoreGuardGroupRequest;
use App\Http\Requests\GuardGroup\UpdateGuardGroupRequest;
use Illuminate\Http\Request;
use App\Services\GuardGroupService;
use App\Http\Resources\GuardGroupResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GuardGroupController extends Controller
{
    public function __construct(
        protected GuardGroupService $guardGroupService,
    ) {}

    // get all guard groups
    public function index(Request $request): AnonymousResourceCollection
    {
        //validate search 
        $data = $request->validate([
            'search' => 'nullable|string|max:255',
        ]);

        // get guard groups 
        $guardGroups = $this->guardGroupService->getAll($data);

        return GuardGroupResource::collection($guardGroups);
    }

    // create
    public function store(StoreGuardGroupRequest $request): GuardGroupResource
    {
        // get the validated data 
        $data = $request->validated();
        // create guard group 
        $guardGroup = $this->guardGroupService->create($data);

        return GuardGroupResource::make($guardGroup);
    }

    // show
    public function show(string $id): GuardGroupResource
    {
        // get guard group
        $guardGroup = $this->guardGroupService->get($id);

        return GuardGroupResource::make($guardGroup);
    }

    // update
    public function update(UpdateGuardGroupRequest $request, string $id): GuardGroupResource
    {
        //get the validated data
        $data = $request->validated();
        // update guard group
        $guardGroup = $this->guardGroupService->update($data, $id);

        return GuardGroupResource::make($guardGroup);
    }

    // delete
    public function destroy(string $id)
    {
        // delete guard group
        $this->guardGroupService->delete($id);

        return response()->json(['message' => 'Guard group deleted successfully'],200);
    }
}
