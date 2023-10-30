import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';

interface Props {
    shopId: number;
}

const MenuCreate: React.FC<Props> = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = () => {
        Inertia.post('/menus', { name, price, shop_id: props.shopId });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-md">
                <h1 className="text-2xl font-semibold mb-4">メニュー作成</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="メニュー名">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="メニュー価格">
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
                        登録
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

export default MenuCreate;
