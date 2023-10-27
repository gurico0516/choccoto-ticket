import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Order {
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

const Index: React.FC<Props> = ({ orders, isAuthenticated }) => {
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

    const moveMenuList = () => {
        Inertia.get('/menus');
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
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
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
                        <tr key={order.order_number}>
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
        </div>
    );
};

export default Index;
