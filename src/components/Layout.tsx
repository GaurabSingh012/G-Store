import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 fixed top-20 bottom-12 left-0 bg-gray-50 border-r overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-0 lg:ml-64 p-4 overflow-y-auto relative">
          <Outlet /> {/* This renders whatever page/route you define */}
          
          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <Sidebar /> {/* Handles floating button + drawer */}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="h-12 bg-gray-800 text-white flex items-center justify-center text-sm sticky bottom-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
