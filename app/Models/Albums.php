<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Albums extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'artista',
        'data_lancamento',
        'genero',
        'capa_url',
        'qtd_faixas',
        'timestamps',
    ];

    public function faixas()
    {
        return $this->hasMany(Faixas::class);
    }
}
