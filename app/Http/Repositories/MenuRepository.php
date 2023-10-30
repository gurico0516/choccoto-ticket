<?php

namespace App\Http\Repositories;

use App\Models\Menu;
use Illuminate\Support\Collection;

class MenuRepository
{
    /**
     * メニュー一覧を取得します。
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Menu::all();
    }

    /**
     * メニューを登録します。
     *
     * @param array $data
     * @return Menu
     */
    public function create(array $data): Menu
    {

        return Menu::create($data);
    }

    /**
     * メニューを取得します。
     *
     * @param integer $id
     * @return Menu
     */
    public function findById(int $id)
    {
        return Menu::find($id);
    }

    /**
     * メニューを更新します。
     *
     * @param integer $id
     * @param array $data
     * @return Menu
     */
    public function update(int $id, array $data): Menu
    {
        $menu = $this->findById($id);
        $menu->update($data);
        return $menu;
    }

    /**
     * メニューを削除します。
     *
     * @param integer $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $menu = $this->findById($id);
        return $menu->delete();
    }
}
