import React from "react";
import { Inertia } from '@inertiajs/inertia';

interface Menu {
    id: number;
    name: string;
    price: number;
    shop_id: number;
}

interface SelectedMenu {
    menu: Menu;
    order_count: number;
}

interface Props {
    menus: Menu[];
    order_count: number;
    isAuthenticated: boolean;
    user_role?: number;
    user_shop_id?: number;
}

const MenuList: React.FC<Props> = ({ menus, isAuthenticated, user_role, user_shop_id }) => {
    const [selectedMenus, setSelectedMenus] = React.useState<SelectedMenu[]>([]);

    const filteredMenus = menus.filter(menu => menu.shop_id === user_shop_id);

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    const handleSelectMenu = (menu: Menu, count: number) => {
        const newSelectedMenus = [...selectedMenus];
        const index = newSelectedMenus.findIndex(m => m.menu.id === menu.id);
        if (index > -1) {
            if (count > 0) {
                newSelectedMenus[index].order_count = count; // 数量を更新
            } else {
                newSelectedMenus.splice(index, 1); // 数量が0の場合、リストから削除
            }
        } else if (count > 0) {
            newSelectedMenus.push({ menu, order_count: count }); // 数量が0より大きい場合のみ追加
        }
        setSelectedMenus(newSelectedMenus);
    };

    const handleOrder = () => {
        if (selectedMenus.length === 0) {
            alert('注文が選択されていません');
            return;
        }

         // 注文の内容を確認するためのメッセージを作成
        let orderConfirmationMessage = '以下の内容で注文を行いますか？\n\n';
        let totalAmount = 0; // 合計金額を初期化
        selectedMenus.forEach(menuItem => {
            orderConfirmationMessage += `${menuItem.menu.name}: ${menuItem.order_count}個\n`;
            totalAmount += menuItem.menu.price * menuItem.order_count; // 各メニューの合計金額を加算
        });

        orderConfirmationMessage += `\n合計金額: ${totalAmount}円`;

        // 注文の確認
        if (window.confirm(orderConfirmationMessage)) {
            Inertia.post("/placeOrder", { orders: JSON.stringify(selectedMenus) });
        }
    };

    const handleEdit = (menuId: number) => {
        Inertia.get(`/menus/${menuId}/edit`);
    }

    const handleDelete = (menuId: number) => {
        if (window.confirm("Are you sure you want to delete this menu?")) {
            Inertia.delete(`/menus/${menuId}`);
        }
    }

    // メニューの選択/選択解除を処理
    const handleToggleMenu = (menu: Menu) => {
        const count = selectedMenus.find(m => m.menu.id === menu.id)?.order_count || 0;
        handleSelectMenu(menu, count === 0 ? 1 : count);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isAuthenticated && user_role === 1 && (
                <div className="col-span-full text-right mb-2">
                    <a href="/menus/create" className="bg-green-500 text-white p-2 rounded mr-2">メニュー作成</a>
                    <a href="/orders/index" className="bg-gray-500 text-white p-2 rounded mr-2">注文受付リスト</a>
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mr-2">ログアウト</button>
                </div>
            )}
            {filteredMenus.map((menu) => (
                <div key={menu.id} className="card rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-lg">{menu.name}</h2>
                        <p className="text-sm text-gray-600">{menu.price}円</p>
                        {isAuthenticated && user_role === 1 && (
                            <div className="flex justify-end mt-2">
                                <button onClick={() => handleEdit(menu.id)} className="text-blue-500 hover:text-blue-700 mr-2">編集</button>
                                <button onClick={() => handleDelete(menu.id)} className="text-red-500 hover:text-red-700">削除</button>
                            </div>
                        )}
                        <input 
                            type="number" 
                            min="1"
                            defaultValue="1"
                            className="mt-2"
                            onChange={(e) => handleSelectMenu(menu, parseInt(e.target.value))}
                        />
                        <input 
                            type="checkbox" 
                            className="mt-2 ml-2"
                            onChange={() => handleToggleMenu(menu)}
                        />
                    </div>
                </div>
            ))}
            <button 
                className="col-span-full bg-blue-500 text-white p-2 rounded"
                onClick={handleOrder}
            >
                注文する
            </button>
        </div>
    );
};

export default MenuList;
