import React from "react";
import { Inertia } from '@inertiajs/inertia';

interface MenuDeleteProps {
    menuId: number;
}

const MenuDelete: React.FC<MenuDeleteProps> = ({ menuId }) => {
    
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this menu?")) {
            Inertia.delete(`/menus/${menuId}`);
        }
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default MenuDelete;
