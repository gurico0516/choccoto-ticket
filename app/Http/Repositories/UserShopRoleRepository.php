<?php

namespace App\Http\Repositories;

use App\Models\UserShopRole;

class UserShopRoleRepository
{
    /**
     * userIdで指定されたデータを取得する
     * 
     * @param integer $userId
     * @return UserShopRole|null
     */
    public function getOneByUserId(int $userId): ?UserShopRole
    {
        $userShopRole = UserShopRole::where('user_id', $userId)->first();
        if (!$userShopRole) {
            throw new \Exception("UserShopRole for user_id {$userId} not found");
        }

        return $userShopRole;
    }
}
