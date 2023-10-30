<?php

namespace App\Http\Services;

use App\Http\Repositories\MenuRepository;
use Illuminate\Support\Collection;
use App\Models\Menu;

class MenuService
{
    /**
     * @var MenuRepository
     */
    protected $menuRepository;

    /**
     * MenuService constructor.
     *
     * @param MenuRepository $menuRepository
     * @return void
     */
    public function __construct(MenuRepository $menuRepository)
    {
        $this->menuRepository = $menuRepository;
    }

    /**
     * メニュー一覧を取得します。
     *
     * @return Collection
     */
    public function getAllMenus(): Collection
    {
        return $this->menuRepository->getAll();
    }

    /**
     * メニューを登録します。
     *
     * @param array $data
     * @return Menu
     */
    public function createMenu(array $data): Menu
    {
        if (!isset($data['shop_id']) || empty($data['shop_id'])) {
            throw new \Exception('Shop ID is required.');
        }

        return $this->menuRepository->create($data);
    }

    /**
     * メニューを取得します。
     *
     * @param integer $id
     * @return Menu
     */
    public function getMenuById(int $id): Menu
    {
        return $this->menuRepository->findById($id);
    }

    /**
     * メニューを更新します。
     *
     * @param integer $id
     * @param array $data
     * @return Menu
     */
    public function updateMenu(int $id, array $data): Menu
    {
        return $this->menuRepository->update($id, $data);
    }

    /**
     * メニューを削除します。
     *
     * @param integer $id
     * @return boolean
     */
    public function deleteMenu(int $id): bool
    {
        return $this->menuRepository->delete($id);
    }
}
