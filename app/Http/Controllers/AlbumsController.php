<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Albums;

class AlbumsController extends Controller
{
    // Exibir lista de álbuns
    public function index()
    {
        try {
            $albums = Albums::all();
            return response()->json($albums);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar álbum: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao exibir faixas', 'error' => $e->getMessage()]);
        }
    }

    // Valida e cria um novo álbum
    public function store(Request $request)
    {
        try {

            $request->validate([
                'nome' => 'required|string|max:50',
                'descricao' => 'nullable|string',
                'artista' => 'required|string|max:50',
                'data_lancamento' => 'nullable|date',
                'genero' => 'required|string|max:255',
                'capa_url' => 'nullable|string',
                'qtd_faixas' => 'nullable|integer',
            ]);

            $albums = Albums::create($request->all());
            return response()->json($albums, 201);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar álbum: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao registrar álbum', 'error' => $e->getMessage()]);
        }
    }

    // Exibir um álbum específico
    public function show($id)
    {
        try {
            $albums = Albums::find($id);
            if (!$albums) {
                return response()->json(['message' => 'albums não encontrado'], 404);
            }
            return response()->json($albums);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar álbum: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao exibir álbum', 'error' => $e->getMessage()]);
        }
    }

    // Atualizar um álbum existente
    public function update(Request $request, $id)
    {
        try {
            $albums = Albums::find($id);
            if (!$albums) {
                return response()->json(['message' => 'Álbum não encontrado'], 404);
            }

            $request->validate([
                'nome' => 'required|string|max:50',
                'descricao' => 'nullable|string',
                'artista' => 'required|string|max:50',
                'data_lancamento' => 'nullable|date',
                'genero' => 'required|string|max:255',
                'capa_url' => 'nullable|string',
                'qtd_faixas' => 'nullable|integer',
            ]);

            $albums->update($request->all());
            return response()->json($albums);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar álbum: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao atualizar álbum', 'error' => $e->getMessage()]);
        }
    }

    // Excluir um álbum
    public function destroy($id)
    {
        try {
            error_log("Id recebida no delete: ") + $id;
            $albums = Albums::find($id);
            if (!$albums) {
                return response()->json(['message' => 'Álbum não encontrado'], 404);
            }

            $albums->delete();
            return response()->json(['message' => 'Álbum excluído com sucesso']);
        } catch (\Exception $e) {
            // Log do erro
            error_log("Erro ao registrar álbum: " . $e->getMessage());
            // Retorna uma resposta JSON com o erro
            return response()->json(['success' => false, 'message' => 'Erro ao deletar álbum', 'error' => $e->getMessage()]);
        }
    }
}
