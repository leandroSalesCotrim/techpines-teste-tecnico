<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faixas', function (Blueprint $table) {
            $table->id(); // ID auto-incrementado
            $table->string('nome'); // Nome da faixa
            $table->text('descricao')->nullable(); // Descrição da faixa (opcional)
            $table->string('artista'); // Nome do artista
            $table->integer('num_faixa'); // Número da faixa no álbum
            $table->float('duracao'); // Duração da faixa
            $table->foreignId('albums_id')->constrained()->onDelete('cascade'); // FK para a tabela albums
            $table->timestamps(); // Colunas 'created_at' e 'updated_at'
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('faixas');
    }
};
