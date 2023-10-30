<?php

namespace App\Http\Repositories;

use App\Models\UserShopRole;

class UserShopRoleRepository
{
    /**
     * userIdで指定されたデータを取得する
     * 
     * @param integer $userId
     * @return UserShopRole
     */
    public function getOneByUserId(int $userId): UserShopRole
    {
        return UserShopRole::where('user_id', $userId)->first();
    }
}
