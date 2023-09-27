import { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import DashboardPage from "./DashboardPage";
import ProductManagementPage from "./ ProductManagementPage";
import UserManagementPage from "./UserManagementPage";
import OrderManagementPage from "./OrderManagementPage";
import SettingsPage from "./SettingsPage";
import { Close, Menu } from "@mui/icons-material";

const AdminHomePage = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);    
  };

  const selectedComponent = () => {
    switch (selectedItem) {
      case "dashboard":
        return <DashboardPage />;
      case "users":
        return <UserManagementPage />;
      case "products":
        return <ProductManagementPage />;
      case "orders":
        return <OrderManagementPage />;
      case "settings":
        return <SettingsPage />;

        default:
        return <DashboardPage/>
    }
  };

  return (
   <div className="bg-black text-white">
     <div className="container mx-auto flex h-[100vh]">
      <div className={`flex-1 bg-slate-900 text-white border-l-[20px] border-l-teal-900 ${sidebarOpen?"block" :"hidden md:block" }`}>
        <Sidebar onItemClick={handleItemClick} />
      </div>
      <div className={`${sidebarOpen ? 'flex-[4]' : 'flex-1'} md:flex-[4] transition-all duration-500 py-5 px-5`}>
      <button
          className="md:hidden text-white hover:bg-gray-400  rounded-sm hover:text-white"
          onClick={handleSidebarToggle}
          onFocus={()=>setSidebarOpen(true)}
          // onBlur={()=>setSidebarOpen(false)}
        >
          {sidebarOpen ? <Close style={{color:"gray"}}/> : <Menu style={{color:"gray"}}/>}
        </button>
        {selectedComponent()}</div>
    </div>
   </div>
  );
};

export default AdminHomePage;
