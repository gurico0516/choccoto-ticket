<?php

namespace App\Http\Services;

use App\Http\Repositories\OrderRepository;

class OrderService {
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function placeOrder($orderData) {
        return $this->orderRepository->create($orderData);
    }

    public function getAllOrdersWithDetails()
    {
        $orders = $this->orderRepository->getAllOrdersWithMenuDetails();

        // 合計金額の計算を行います。
        foreach ($orders as $order) {
            $order->total_price = $order->price * $order->order_count;
        }

        return $orders;
    }
}