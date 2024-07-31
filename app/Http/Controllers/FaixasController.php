<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faixas;

class FaixasController extends Controller
{
    // Exibir lista de faixas
    public function index()
    {
        try {
            $tracks = Faixas::all();
            return response()->json($tracks);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar faixa: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao exibir faixas', 'error' => $e->getMessage()]);
        }
    }

    // Criar uma nova faixa
    public function store( Request $request)
    {
        error_log("Request recebida no store: " . json_encode($request->all(), JSON_PRETTY_PRINT));
        try {
            $request->validate([
                'nome' => 'required|string|max:50',
                'descricao' => 'nullable|string',
                'duracao' => 'required|numeric',
                'artista' => 'required|string|max:50',
                'num_faixa' => 'required|integer',
                'albums_id' => 'required|exists:albums,id',
            ]);

            $track = Faixas::create($request->all());
            return response()->json($track, 201);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar faixa: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao registrar faixa', 'error' => $e->getMessage()]);
        }
    }

    // Exibir uma faixa específica
    public function show($id)
    {
        try {
            $track = Faixas::find($id);
            if (!$track) {
                return response()->json(['message' => 'Faixa não encontrada'], 404);
            }
            return response()->json($track);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar faixa: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao exibir faixa', 'error' => $e->getMessage()]);
        }
    }

    // Atualizar uma faixa existente
    public function update(Request $request, $id)
    {
        try {
            $track = Faixas::find($id);
            if (!$track) {
                return response()->json(['message' => 'Faixa não encontrada'], 404);
            }

            $request->validate([
                'nome' => 'nullable|string|max:255',
                'descricao' => 'nullable|string',
                'duracao' => 'nullable|numeric',
                'artista' => 'nullable|string|max:255',
                'num_faixa' => 'nullable|integer',
                'albums_id' => 'nullable|exists:albums,id',
            ]);

            $track->update($request->all());
            return response()->json($track);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar faixa: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao atualizar faixa', 'error' => $e->getMessage()]);
        }
    }

    // Excluir uma faixa
    public function destroy($id)
    {
        try {
            $track = Faixas::find($id);
            if (!$track) {
                return response()->json(['message' => 'Faixa não encontrada'], 404);
            }

            $track->delete();
            return response()->json(['message' => 'Faixa excluída com sucesso']);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar faixa: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao deletar faixa', 'error' => $e->getMessage()]);
        }
    }
}
