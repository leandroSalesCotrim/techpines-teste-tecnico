<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Albums;

class AlbumsController extends Controller
{
    // Exibir lista de álbuns
    public function index()
    {
        error_log("Mensagem para o log3");
        $albums = Albums::all();
        return response()->json($albums);
    }

    // Valida e cria um novo álbum
    public function store(Request $request)
    {
        try {
            error_log("Request recebida: " . json_encode($request->all(), JSON_PRETTY_PRINT));

            $request->validate([
                'nome' => 'required|string|max:50',
                'descricao' => 'nullable|string',
                'artista' => 'required|string|max:50',
                'data_lancamento' => 'required|date',
                'genero' => 'required|string|max:255',
                'capa_url' => 'nullable|string',
                'num_faixas' => 'required|integer',
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
        error_log("Mensagem para o log2");
        $albums = Albums::find($id);
        if (!$albums) {
            return response()->json(['message' => 'albums não encontrado'], 404);
        }
        return response()->json($albums);
    }

    // Atualizar um álbum existente
    public function update(Request $request, $id)
    {
        error_log("Mensagem para o log4");
        $albums = Albums::find($id);
        if (!$albums) {
            return response()->json(['message' => 'Álbum não encontrado'], 404);
        }

        $request->validate([
            'nome' => 'nullable|string|max:50',
            'descricao' => 'nullable|string',
            'artista' => 'nullable|string|max:50',
            'data_lancamento' => 'nullable|date',
            'genero' => 'nullable|string|max:255',
            'capa_url' => 'nullable|string',
            'num_faixas' => 'nullable|integer',
        ]);

        $albums->update($request->all());
        return response()->json($albums);
    }

    // Excluir um álbum
    public function destroy($id)
    {
        error_log("Mensagem para o log6");
        $albums = Albums::find($id);
        if (!$albums) {
            return response()->json(['message' => 'Álbum não encontrado'], 404);
        }

        $albums->delete();
        return response()->json(['message' => 'Álbum excluído com sucesso']);
    }
}
