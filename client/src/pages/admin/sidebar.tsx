// src/pages/admin/sidebar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";
import { getUserPermissions } from "@/lib/api";
import {
  FaBars,
  FaTachometerAlt,
  FaUser,
  FaFileAlt,
  FaFile,
  FaCalendar,
  FaBriefcase,
  FaBlog,
  FaHeart,
  FaComments,
  FaShoppingCart,
  FaChevronDown,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
  module: string;
  children?: MenuItem[];
}

const adminMenu: MenuItem[] = [
  { label: "Dashboard", icon: <FaTachometerAlt />, href: "/admin/dashboard", module: "dashboard" },
  { label: "Profile", icon: <FaUserCircle />, href: "/admin/profile", module: "profile" },
  { label: "Certificates", icon: <FaFile />, href: "/admin/certificates", module: "certificates" },
  {
    label: "User Management",
    icon: <FaUser />,
    href: "/admin/users",
    module: "users",
    children: [
      { label: "Users", href: "/admin/users", module: "users", icon: <FaUser /> },
      { label: "Volunteers", href: "/admin/volunteers", module: "volunteers", icon: <FaUser /> },
    ],
  },
  { label: "Reports", icon: <FaFileAlt />, href: "/admin/reports", module: "reports" },
  { label: "Formats", icon: <FaFile />, href: "/admin/formats", module: "formats" },
  { label: "Events", icon: <FaCalendar />, href: "/admin/events", module: "events" },
  { label: "Jobs", icon: <FaBriefcase />, href: "/admin/jobs", module: "jobs" },
  { label: "Blogs", icon: <FaBlog />, href: "/admin/blogs", module: "blogs" },
  { label: "Causes", icon: <FaHeart />, href: "/admin/causes", module: "causes" },
  { label: "Crowd-Funding", icon: <FaHeart />, href: "/admin/crowd-funding", module: "crowdFunding" },
  { label: "Forum", icon: <FaComments />, href: "/admin/forum", module: "forum" },
  { label: "Shop", icon: <FaShoppingCart />, href: "/admin/shop", module: "shop" },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [location] = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const { user } = useAuth();

  const { data: permissions } = useQuery({
    queryKey: ["userPermissions", user?._id],
    queryFn: () => user?._id ? getUserPermissions(user._id) : Promise.resolve({ success: true, permissions: {} as Record<string, { read: boolean }> }),
    enabled: !!user?._id,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const expandSidebar = () => setHovered(true);
  const collapseSidebar = () => setHovered(false);

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => location === href;

  const shouldShowFull = !isCollapsed || hovered;
  const sidebarWidth = isCollapsed && !hovered ? "w-16" : "w-64";

  const hasModuleAccess = (module: string) => {
    // Always allow access to profile module
    if (module === "profile") return true;
    
    if (user?.role === "admin") return true;
    
    // Check if the module exists in permissions and has read access
    const modulePermissions = permissions?.permissions?.[module];
    if (!modulePermissions) return false;
    
    // Check if read permission is explicitly set to true
    return modulePermissions.read === true;
  };

  const filteredMenu = adminMenu.filter((item) => {
    if (item.module === "users") return user?.role === "admin";
    const hasAccess = hasModuleAccess(item.module);
    return hasAccess;
  });

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed z-50 p-3 text-white bg-primary rounded-md md:hidden top-4 left-4 shadow-lg hover:bg-secondary transition-colors"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen transition-all duration-500 ease-in-out bg-black text-white ${sidebarWidth} ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        onMouseEnter={expandSidebar}
        onMouseLeave={collapseSidebar}
      >
        {/* Collapse Button */}
        <div className={`flex items-center p-4 border-b border-secondary ${
          isCollapsed && !hovered ? "justify-center" : "justify-between"
        }`}>
          {shouldShowFull && <h2 className="text-xl font-bold">Admin Panel</h2>}
          <button 
            className="hidden md:flex text-white hover:text-primary transition-colors"
            onClick={toggleCollapse}
            aria-label="Toggle menu"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
          {/* Home Link */}
          <Link
            href="/"
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 mb-4 transition-colors ${
              isCollapsed && !hovered ? "justify-center" : "space-x-3"
            }`}
          >
            <FaHome className="text-primary" />
            {shouldShowFull && <span className="font-medium">Public Site</span>}
          </Link>

          <ul className="space-y-2">
            {filteredMenu.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                        shouldShowFull ? "justify-between" : "justify-center"
                      } ${
                        expandedMenus.includes(item.label) || 
                        item.children.some(child => isActive(child.href))
                          ? "bg-gray-800"
                          : ""
                      }`}
                    >
                      <span className={`flex items-center ${
                        shouldShowFull ? "space-x-3" : ""
                      }`}>
                        <span className="text-primary">{item.icon}</span>
                        {shouldShowFull && <span>{item.label}</span>}
                      </span>
                      {shouldShowFull && (
                        <FaChevronDown
                          className={`transition-transform text-secondary ${
                            expandedMenus.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {shouldShowFull && expandedMenus.includes(item.label) && (
                      <ul className="pl-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${
                                isActive(child.href) ? "bg-secondary" : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                      shouldShowFull ? "space-x-3" : "justify-center"
                    } ${
                      isActive(item.href) ? "bg-secondary" : ""
                    }`}
                  >
                    <span className="text-primary">{item.icon}</span>
                    {shouldShowFull && <span>{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;