<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Collection;

class OrderRepository {
    public function create($orderData) {
        return Order::create($orderData);
    }

    public function getAllOrdersWithMenuDetails(): Collection
    {
        return Order::join('menus', 'orders.menu_id', '=', 'menus.id')
                    ->select('orders.order_number', 'orders.order_count', 'orders.created_at' , 'menus.name', 'menus.price')
                    ->get();
    }
}