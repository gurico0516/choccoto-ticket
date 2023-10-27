import React from "react";
import { Inertia } from '@inertiajs/inertia';

interface Menu {
    id: number;
    name: string;
    price: number;
}

interface SelectedMenu {
    menu: Menu;
    order_count: number;
}

interface Props {
    menus: Menu[];
    order_count: number;
    isAuthenticated: boolean;
}

const MenuList: React.FC<Props> = ({ menus, isAuthenticated }) => {
    const [selectedMenus, setSelectedMenus] = React.useState<SelectedMenu[]>([]);

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    const handleSelectMenu = (menu: Menu, count: number) => {
        const newSelectedMenus = [...selectedMenus];
        const index = newSelectedMenus.findIndex(m => m.menu.id === menu.id);
        if (index > -1) {
            newSelectedMenus.splice(index, 1);
        } else {
            newSelectedMenus.push({ menu, order_count: count });
        }
        setSelectedMenus(newSelectedMenus);
    };

    const handleOrder = () => {
        Inertia.post("/placeOrder", { orders: JSON.stringify(selectedMenus) });
    };

    const handleEdit = (menuId: number) => {
        Inertia.get(`/menus/${menuId}/edit`);
    }

    const handleDelete = (menuId: number) => {
        if (window.confirm("Are you sure you want to delete this menu?")) {
            Inertia.delete(`/menus/${menuId}`);
        }
    }

    const moveOrderList = () => {
        Inertia.get(`/orders/index`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isAuthenticated && (
                <div className="col-span-full text-right mb-2">
                    <a href="/menus/create" className="bg-green-500 text-white p-2 rounded mr-2">メニュー作成</a>
                    <a href="/orders/index" className="bg-gray-500 text-white p-2 rounded mr-2">注文受付リスト</a>
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mr-2">ログアウト</button>
                </div>
            )}
            {menus.map((menu) => (
                <div key={menu.id} className="card rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-lg">{menu.name}</h2>
                        <p className="text-sm text-gray-600">{menu.price}円</p>
                        {isAuthenticated && (
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
                            onChange={() => handleSelectMenu(menu, 1)} // デフォルトで1をセット
                        />
                    </div>
                </div>
            ))}
            <button className="col-span-full bg-blue-500 text-white p-2 rounded" onClick={handleOrder}>注文する</button>
        </div>
    );
};

export default MenuList;
