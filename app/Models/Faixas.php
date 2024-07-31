<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faixas extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'artista',
        'num_faixa',
        'duracao',
        'albums_id',
        'timestamps',
    ];

    public function albums()
    {
        return $this->belongsTo(Albums::class);
    }
}
