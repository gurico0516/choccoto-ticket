<?php

namespace App\Http\Services;

use App\Http\Repositories\OrderRepository;
use App\Models\Order;

class OrderService
{
    /**
     * @var OrderRepository
     */
    protected $orderRepository;

    /**
     * OrderService constructor.
     *
     * @param OrderRepository $orderRepository
     * @return void
     */
    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * 注文を行います。
     *
     * @param array $orderData
     * @return Order
     */
    public function placeOrder(array $orderData): Order
    {
        return $this->orderRepository->create($orderData);
    }

    /**
     * 注文一覧を取得します。
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllOrdersWithDetails(): \Illuminate\Database\Eloquent\Collection
    {
        $orders = $this->orderRepository->getAllOrdersWithMenuDetails();

        // 合計金額の計算を行います。
        foreach ($orders as $order) {
            $order->total_price = $order->price * $order->order_count;
        }

        return $orders;
    }

    /**
     * 注文番号で指定された注文を削除します。
     *
     * @param array $ids
     * @return void
     */
    public function deleteOrdersByOrderNumbers(array $ids)
    {
        $this->orderRepository->deleteByOrderNumbers($ids);
    }
}
