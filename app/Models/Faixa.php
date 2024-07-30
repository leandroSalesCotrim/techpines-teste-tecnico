<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faixa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'artista',
        'numFaixa',
        'fkalbums',
        'timestamps',
    ];

    public function albums()
    {
        return $this->belongsTo(Albums::class);
    }
}
