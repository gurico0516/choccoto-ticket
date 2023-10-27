<?php

namespace App\Http\Controllers;

use App\Http\Services\MenuService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MenuController extends Controller {
    protected $menuService;

    public function __construct(MenuService $menuService) {
        $this->menuService = $menuService;
    }

    public function index() {
        $menus = $this->menuService->getAllMenus();
        $isAuthenticated = auth()->check();
        return Inertia::render('Menu/MenuList', ['menus' => $menus, 'isAuthenticated' => $isAuthenticated]);
    }

    public function create() {
        return Inertia::render('Menu/MenuCreate');
    }

    public function store(Request $request) {
        $this->menuService->createMenu($request->all());
        return redirect()->route('menus.index');
    }

    public function edit($id) {
        $menu = $this->menuService->getMenuById($id);
        return Inertia::render('Menu/MenuEdit', ['menu' => $menu]);
    }

    public function update(Request $request, $id) {
        $this->menuService->updateMenu($id, $request->all());
        return redirect()->route('menus.index');
    }

    public function destroy($id) {
        $this->menuService->deleteMenu($id);
        return redirect()->route('menus.index');
    }
}
