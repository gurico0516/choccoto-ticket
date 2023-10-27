<?php

namespace App\Http\Repositories;

use App\Models\Menu;

class MenuRepository {
    public function getAll() {
        return Menu::all();
    }

    public function create($data) {
        return Menu::create($data);
    }

    public function findById($id) {
        return Menu::find($id);
    }

    public function update($id, $data) {
        $menu = $this->findById($id);
        $menu->update($data);
        return $menu;
    }

    public function delete($id) {
        $menu = $this->findById($id);
        return $menu->delete();
    }
}
