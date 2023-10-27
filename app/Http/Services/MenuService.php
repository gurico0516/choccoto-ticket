<?php

namespace App\Http\Services;

use App\Http\Repositories\MenuRepository;

class MenuService {
    protected $menuRepository;

    public function __construct(MenuRepository $menuRepository) {
        $this->menuRepository = $menuRepository;
    }

    public function getAllMenus() {
        return $this->menuRepository->getAll();
    }

    public function createMenu($data) {
        return $this->menuRepository->create($data);
    }

    public function getMenuById($id) {
        return $this->menuRepository->findById($id);
    }

    public function updateMenu($id, $data) {
        return $this->menuRepository->update($id, $data);
    }

    public function deleteMenu($id) {
        return $this->menuRepository->delete($id);
    }
}
