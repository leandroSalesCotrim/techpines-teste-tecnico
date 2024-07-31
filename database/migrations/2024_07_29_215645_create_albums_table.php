<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('albums', function (Blueprint $table) {
            $table->id(); // ID auto-incrementado
            $table->string('nome'); // Nome do álbum
            $table->text('descricao')->nullable(); // Descrição do álbum
            $table->string('artista'); // Nome do artista
            $table->date('data_lancamento')->nullable();
            $table->string('genero'); // Gênero do álbum
            $table->string('capa_url')->nullable()->nullable(); // URL da capa do álbum
            $table->integer('qtd_faixas')->nullable(); // Número de faixas
            $table->timestamps(); // Colunas 'created_at' e 'updated_at'
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faixa');
    }
};
