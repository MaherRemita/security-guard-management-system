<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profession\StoreProfessionRequest;
use App\Http\Requests\Profession\UpdateProfessionRequest;
use Illuminate\Http\Request;
use App\Services\ProfessionService;
use App\Http\Resources\ProfessionResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProfessionController extends Controller
{
    public function __construct(
        protected ProfessionService $professionService,
    ) {}

    // get all professions
    public function index(Request $request): AnonymousResourceCollection
    {
        //validate search 
        $data = $request->validate([
            'search' => 'nullable|string|max:255',
        ]);

        // get professions 
        $professions = $this->professionService->getAll($data);

        return ProfessionResource::collection($professions);
    }

    // create
    public function store(StoreProfessionRequest $request): ProfessionResource
    {
        // get the validated data 
        $data = $request->validated();
        // create profession 
        $profession = $this->professionService->create($data);

        return ProfessionResource::make($profession);
    }

    // show
    public function show(string $id): ProfessionResource
    {
        // get profession
        $profession = $this->professionService->get($id);

        return ProfessionResource::make($profession);
    }

    // update
    public function update(UpdateProfessionRequest $request, string $id): ProfessionResource
    {
        //get the validated data
        $data = $request->validated();
        // update profession
        $profession = $this->professionService->update($data, $id);

        return ProfessionResource::make($profession);
    }

    // delete
    public function destroy(string $id)
    {
        // delete profession
        $this->professionService->delete($id);

        return response()->json(['message' => 'Profession deleted successfully'],200);
    }
}
