<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Collection;

class OrderRepository
{
    /**
     * 注文を登録します。
     *
     * @param array $orderData
     * @return Order
     */
    public function create($orderData)
    {
        return Order::create($orderData);
    }

    /**
     * 注文一覧を取得します。
     *
     * @return Collection
     */
    public function getAllOrdersWithMenuDetails(): Collection
    {
        return Order::join('menus', 'orders.menu_id', '=', 'menus.id')
                    ->select('orders.id', 'orders.order_number', 'orders.order_count', 'orders.created_at', 'menus.name', 'menus.price')
                    ->get();
    }

    /**
     * 注文番号で指定された注文を削除します。
     *
     * @param array $ids
     * @return int
     */
    public function deleteByOrderNumbers(array $ids)
    {
        return Order::whereIn('id', $ids)->delete();
    }
}
