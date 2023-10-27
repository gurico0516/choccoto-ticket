<?php

namespace App\Http\Controllers;

use App\Http\Services\OrderService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * @var OrderService $orderService
     */
    protected $orderService;

    /**
     * OrderController constructor.
     *
     * @param OrderService $orderService
     * @return void
     */
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
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
        $orderNumber = rand(10, 99);

        foreach ($selectedMenus as $menu) {
            $orderData = [
                'menu_id' => $menu['menu']['id'],
                'order_count' => $menu['order_count'],
                'order_number' => $orderNumber,
            ];
            $this->orderService->placeOrder($orderData);
        }
        return response()->json(['注文番号は' => $orderNumber . '番です。']);
    }

    /**
     * 注文一覧画面を表示します。
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $orders = $this->orderService->getAllOrdersWithDetails();
        $isAuthenticated = auth()->check();

        return Inertia::render('Orders/OrderList', [
            'orders' => $orders,
            'isAuthenticated' => $isAuthenticated,
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
}
