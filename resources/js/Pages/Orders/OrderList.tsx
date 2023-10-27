import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Order {
    id: number;
    order_number: number;
    order_count: number;
    name: string;
    price: number;
    total_price: number;
    created_at: string;
}

interface Props {
    orders: Order[];
    isAuthenticated: boolean;
}

const OrderList: React.FC<Props> = ({ orders, isAuthenticated }) => {
    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const month = dateTime.getMonth() + 1;
        const day = dateTime.getDate();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        return `${month}月${day}日 ${hours}時${minutes}分`;
    };

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    console.log("Orders:", orders);

    const moveMenuList = () => {
        Inertia.get('/menus');
    };

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleOrderSelect = (orderId: number) => {
        if (selectedIds.includes(orderId)) {
            setSelectedIds(selectedIds.filter(num => num !== orderId));
        } else {
            setSelectedIds([...selectedIds, orderId]);
        }
    };

    const handleDeleteSelected = () => {
        if (selectedIds.length > 0) {
            Inertia.post('/orders/delete', { ids: selectedIds });
        }
    };

    const [selectAll, setSelectAll] = useState<boolean>(false);

    const handleSelectAllToggle = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedIds(orders.map(order => order.id));
        } else {
            setSelectedIds([]);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">注文受付リスト</h1>
            {isAuthenticated && (
                <div className="text-right mb-2">
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mr-2">ログアウト</button>
                    <button onClick={moveMenuList} className="bg-green-500 text-white p-2 rounded">メニューに戻る</button>
                </div>
            )}

            <div className="flex items-center mb-4">
                <label className="inline-flex items-center cursor-pointer mr-2">
                    <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={selectAll}
                        onChange={handleSelectAllToggle}
                    />
                    <span className="ml-2">全て確認</span>
                </label>
            </div>

            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2">確認</th>
                        <th className="border p-2">注文番号</th>
                        <th className="border p-2">メニュー</th>
                        <th className="border p-2">価格</th>
                        <th className="border p-2">数量</th>
                        <th className="border p-2">合計金額</th>
                        <th className="border p-2">注文日時</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr 
                            key={order.id} 
                            className={selectedIds.includes(order.id) ? "bg-gray-300 line-through" : ""}
                        >
                            <td className="border p-2 flex justify-center">
                                <input 
                                    type="checkbox"
                                    checked={selectedIds.includes(order.id)}
                                    onChange={() => handleOrderSelect(order.id)} />
                            </td>
                            <td className="border p-2">{order.order_number}</td>
                            <td className="border p-2">{order.name}</td>
                            <td className="border p-2">{order.price}円</td>
                            <td className="border p-2">{order.order_count}個</td>
                            <td className="border p-2">{order.total_price}円</td>
                            <td className="border p-2">{formatDateTime(order.created_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isAuthenticated && (
                <div className="text-right mt-2">
                    <button onClick={handleDeleteSelected} className="bg-red-500 text-white p-2 rounded mr-2">選択した注文を削除</button>
                </div>
            )}
        </div>
    );
};

export default OrderList;
