<?php

namespace App\Http\Controllers;

use App\Http\Services\MenuService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * @var MenuService $menuService
     */
    protected $menuService;

    /**
     * MenuController constructor.
     *
     * @param MenuService $menuService
     * @return void
     */
    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    /**
     * メニュー一覧画面を表示します。
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $menus = $this->menuService->getAllMenus();
        $isAuthenticated = auth()->check();
        return Inertia::render('Menu/MenuList', ['menus' => $menus, 'isAuthenticated' => $isAuthenticated]);
    }

    /**
     * メニュー登録画面を表示します。
     *
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Menu/MenuCreate');
    }

    /**
     * メニューを登録します。
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $this->menuService->createMenu($request->all());
        return redirect()->route('menus.index');
    }

    /**
     * メニュー編集画面を表示します。
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit(int $id): \Inertia\Response
    {
        $menu = $this->menuService->getMenuById($id);
        return Inertia::render('Menu/MenuEdit', ['menu' => $menu]);
    }

    /**
     * メニューを更新します。
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $this->menuService->updateMenu($id, $request->all());
        return redirect()->route('menus.index');
    }

    /**
     * メニューを削除します。
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id): \Illuminate\Http\RedirectResponse
    {
        $this->menuService->deleteMenu($id);
        return redirect()->route('menus.index');
    }
}
