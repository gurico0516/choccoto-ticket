<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserShopRole extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['user_id', 'shop_id', 'user_role'];

    /**
     * relation to users table
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * relation to shops table
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shops(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }
}