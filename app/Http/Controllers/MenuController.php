<?php

namespace App\Http\Controllers;

use App\Http\Services\MenuService;
use App\Http\Services\UserShopRoleService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * @var MenuService $menuService
     */
    protected $menuService;

    /**
     * @var UserShopRoleService $userShopRoleService
     */
    protected $userShopRoleService;

    /**
     * MenuController constructor.
     *
     * @param MenuService $menuService
     * @param UserShopRoleService $userShopRoleService
     * @return void
     */
    public function __construct(MenuService $menuService, UserShopRoleService $userShopRoleService)
    {
        $this->menuService = $menuService;
        $this->userShopRoleService = $userShopRoleService;
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
        $userId = auth()->id();
        $userRole = null;
        $userShopId = null;

        if ($isAuthenticated) {
            $userShopRole = $this->userShopRoleService->getOneByUserId($userId);

            if ($userShopRole) {
                $userRole = $userShopRole->user_role;
                $userShopId = $userShopRole->shop_id;
            }
        }

        return Inertia::render('Menu/MenuList', [
            'menus' => $menus, 
            'isAuthenticated' => $isAuthenticated,
            'user_role' => $userRole,
            'user_shop_id' => $userShopId
        ]);
    }

    /**
     * メニュー登録画面を表示します。
     *
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        $user = auth()->user();
        $shop = $user->shops;
    
        return Inertia::render('Menu/MenuCreate', [
            'shopId' => $shop[0]->id,
        ]);
    }

    /**
     * メニューを登録します。
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'shop_id' => 'required|integer|exists:shops,id',  // shopsテーブルのidに存在するか確認
            'name' => 'required|string',
            'price' => 'required|integer'
        ]);

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
