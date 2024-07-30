<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faixa;

class FaixaController extends Controller
{
    // Exibir lista de faixas
    public function index()
    {
        $tracks = Faixa::all();
        return response()->json($tracks);
    }

    // Criar uma nova faixa
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:50',
            'descricao' => 'nullable|string',
            'duracao' => 'required|integer',
            'artista' => 'required|string|max:50',
            'num_faixa' => 'required|integer',
            'albums_id' => 'required|exists:albums,id',
        ]);

        $track = Faixa::create($request->all());
        return response()->json($track, 201);
    }

    // Exibir uma faixa específica
    public function show($id)
    {
        $track = Faixa::find($id);
        if (!$track) {
            return response()->json(['message' => 'Faixa não encontrada'], 404);
        }
        return response()->json($track);
    }

    // Atualizar uma faixa existente
    public function update(Request $request, $id)
    {
        $track = Faixa::find($id);
        if (!$track) {
            return response()->json(['message' => 'Faixa não encontrada'], 404);
        }

        $request->validate([
            'nome' => 'nullable|string|max:255',
            'descricao' => 'nullable|string',
            'duracao' => 'nullable|integer',
            'artista' => 'nullable|string|max:255',
            'num_faixa' => 'nullable|integer',
            'albums_id' => 'nullable|exists:albums,id',
        ]);

        $track->update($request->all());
        return response()->json($track);
    }

    // Excluir uma faixa
    public function destroy($id)
    {
        $track = Faixa::find($id);
        if (!$track) {
            return response()->json(['message' => 'Faixa não encontrada'], 404);
        }

        $track->delete();
        return response()->json(['message' => 'Faixa excluída com sucesso']);
    }
}
