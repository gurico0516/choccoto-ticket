<?php

namespace App\Http\Controllers;

use App\Http\Services\OrderService;
use App\Http\Services\UserShopRoleService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * @var OrderService $orderService
     */
    protected $orderService;

    /**
     * @var UserShopRoleService $userShopRoleService
     */
    protected $userShopRoleService;

    /**
     * OrderController constructor.
     *
     * @param OrderService $orderService
     * @param UserShopRoleService $userShopRoleService
     * @return void
     */
    public function __construct(OrderService $orderService, UserShopRoleService $userShopRoleService)
    {
        $this->orderService = $orderService;
        $this->userShopRoleService = $userShopRoleService;
    }

    /**
     * 注文を行います。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function placeOrder(Request $request): \Illuminate\Http\JsonResponse
    {
        $selectedMenus = json_decode($request->input('orders'), true);
        
        // $orderNumber = rand(10, 99);
        $userShopRole = $this->getUserShopRole();
        $latestOrderNumber = Order::join('menus', 'orders.menu_id', '=', 'menus.id')
                                ->where('menus.shop_id', $userShopRole['userShop'])
                                ->max('order_number');

        // 前のorderがない場合は1から始め、そうでない場合は1増やします
        $orderNumber = $latestOrderNumber ? $latestOrderNumber + 1 : 1;

        foreach ($selectedMenus as $menu) {
            $orderData = [
                'menu_id' => $menu['menu']['id'],
                'order_count' => $menu['order_count'],
                'order_number' => $orderNumber,
            ];
            $this->orderService->placeOrder($orderData);
        }
        return response()->json(['注文番号は' => $orderNumber . '番です。', 'ご希望の方は注文番号を撮影して控えてください。レシートは後ほどお渡しします。']);
    }

    /**
     * 注文一覧画面を表示します。
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $userShopRole = $this->getUserShopRole();
        $orders = $this->orderService->getAllOrdersWithDetails($userShopRole['userShop']);

        return Inertia::render('Orders/OrderList', [
            'orders' => $orders,
            'isAuthenticated' => $userShopRole['isAuthenticated'],
            'user_role' => $userShopRole['userRole'],
            'user_shop_id' => $userShopRole['userShop']
        ]);
    }

    /**
     * 選択された注文を削除します。
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete(Request $request)
    {
        $ids = $request->input('ids');
        $this->orderService->deleteOrdersByOrderNumbers($ids);

        return redirect()->route('orders.index');
    }

    /**
     * ユーザーの権限と店舗IDを取得します。
     * 
     * @return array
     */
    private function getUserShopRole(): array {
        $isAuthenticated = auth()->check();
        $userId = auth()->id();
        $userRoleShopId = [];
        $userRoleShopId['isAuthenticated'] = $isAuthenticated;
        $userRoleShopId['userId'] = $userId;

        if ($isAuthenticated) {
            $userShopRole = $this->userShopRoleService->getOneByUserId($userId);

            if ($userShopRole) {
                $userRoleShopId['userRole'] = $userShopRole->user_role;
                $userRoleShopId['userShop'] = $userShopRole->shop_id;
            }
        } else {
            $userRoleShopId['userRole'] = null;
            $userRoleShopId['userShop'] = null;
        }

        return $userRoleShopId;
    }
}
