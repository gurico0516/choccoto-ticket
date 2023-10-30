<?php

namespace App\Http\Services;

use App\Http\Repositories\UserShopRoleRepository;
use App\Models\UserShopRole;

class UserShopRoleService
{
    /**
     * @var UserShopRoleRepository
     */
    protected $userShopRoleRepository;

    /**
     * UserShopRoleService constructor.
     *
     * @param UserShopRoleRepository $userShopRoleRepository
     * @return void
     */
    public function __construct(UserShopRoleRepository $userShopRoleRepository)
    {
        $this->userShopRoleRepository = $userShopRoleRepository;
    }

    /**
     * user_shop_rolesテーブルからuserIdで指定されたデータを取得する
     * 
     * @param integer $userId
     * @return UserShopRole|null
     */
    public function getOneByUserId(int $userId): ?UserShopRole
    {
        return $this->userShopRoleRepository->getOneByUserId($userId);
    }
}
