import React, { useState, useEffect } from "react";
import { Inertia } from '@inertiajs/inertia';

interface MenuEditProps {
    menu: Menu;
}

interface Menu {
    id: number;
    name: string;
    price: number;
}

const MenuEdit: React.FC<MenuEditProps> = ({ menu }) => {
    const [name, setName] = useState(menu.name);
    const [price, setPrice] = useState(menu.price);

    const handleSubmit = () => {
        Inertia.patch(`/menus/${menu.id}`, { name, price });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Edit Menu</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="menu-name">
                        メニュー名
                    </label>
                    <input 
                        type="text"
                        id="menu-name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Menu Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="menu-price">
                        価格
                    </label>
                    <input 
                        type="number" 
                        id="menu-price"
                        value={price} 
                        onChange={(e) => setPrice(parseInt(e.target.value))} 
                        placeholder="Price"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button 
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        更新
                    </button>
                    <a 
                        href="/menus" 
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        メニューに戻る
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MenuEdit;
