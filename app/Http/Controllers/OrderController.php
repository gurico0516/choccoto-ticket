<?php

namespace App\Http\Controllers;

use App\Http\Services\OrderService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller {
    protected $orderService;

    public function __construct(OrderService $orderService) {
        $this->orderService = $orderService;
    }

    public function placeOrder(Request $request) {
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
        return response()->json(['message' => '注文しました！', 'order_number' => $orderNumber]);
    }

    public function index()
    {
        $orders = $this->orderService->getAllOrdersWithDetails();
        $isAuthenticated = auth()->check();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'isAuthenticated' => $isAuthenticated,
        ]);
    }
}