import {
  DashboardCustomize,
  GroupOutlined,
  Category,
  LocalMall,
  Settings,
} from "@mui/icons-material";
import React from "react";

interface SidebarProps {
  onItemClick:(item:string)=>void
}

const Sidebar:React.FC<SidebarProps> = ({onItemClick}) => {
  return (
    <>
    <h1 className="p-5 text-2xl font-bold first-letter:text-red-500 tracking-wider">Shop Cart</h1>
      <ul>
        <li onClick={()=>onItemClick('dashboard')} className="text-sm hover:bg-gray-400 px-10 py-3 border-l-4 border-black/75 hover:border-l-4 hover:border-l-red-700 cursor-pointer flex gap-5 items-center">
          <DashboardCustomize/>
          Dashboard
        </li>
        <li onClick={()=>onItemClick('users')} className="text-sm hover:bg-gray-400 px-10 py-3 border-l-4 border-black/75 hover:border-l-4 hover:border-l-red-700 cursor-pointer flex gap-5 items-center">
          <GroupOutlined />
          Users
        </li>
        <li onClick={()=>onItemClick('products')} className="text-sm hover:bg-gray-400 px-10 py-3 border-l-4 border-black/75 hover:border-l-4 hover:border-l-red-700 cursor-pointer flex gap-5 items-center">
          <Category />
          Products
        </li>
        <li onClick={()=>onItemClick('orders')} className="text-sm hover:bg-gray-400 px-10 py-3 border-l-4 border-black/75 hover:border-l-4 hover:border-l-red-700 cursor-pointer flex gap-5 items-center">
          <LocalMall />
          Orders
        </li>
        <li onClick={()=>onItemClick('settings')} className="text-sm hover:bg-gray-400 px-10 py-3 border-l-4 border-black/75 hover:border-l-4 hover:border-l-red-700 cursor-pointer flex gap-5 items-center">
          <Settings />
          settings
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
