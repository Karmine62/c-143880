import { useState } from "react";
import { ChevronRight, HomeIcon, Users, Video, Image, Edit, Palette, Grid, LayoutGrid, Rss, Code, ChevronDown, BookOpen, HelpCircle, Sparkles, Palette as ThemeIcon, Newspaper, Clock, Bookmark, Heart, Album, Boxes, Crown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isNew?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
};

type DropdownItemProps = {
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon, label, isActive = false, isNew = false, hasDropdown = false, onClick }: SidebarItemProps) => (
  <button 
    className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-accent' : 'hover:bg-accent'}`}
    onClick={onClick}
  >
    <div className={isActive ? "text-white" : "text-gray-300"}>{icon}</div>
    <span className="text-white text-sm font-medium flex-1 text-left">{label}</span>
    {isNew && (
      <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
        NEW
      </span>
    )}
    {hasDropdown && (
      isActive ? <ChevronDown size={16} className="text-gray-300" /> : <ChevronRight size={16} className="text-gray-300" />
    )}
  </button>
);

const DropdownItem = ({ icon, label, isExternal = false, isActive = false, onClick }: DropdownItemProps) => (
  <button 
    className={`w-full flex items-center gap-3 p-3 pl-12 hover:bg-accent rounded-md transition-colors ${isActive ? 'bg-accent' : ''}`}
    onClick={onClick}
  >
    <div className={isActive ? "text-white" : "text-gray-300"}>{icon}</div>
    <span className={`text-sm ${isActive ? "text-white" : "text-gray-300"}`}>{label}</span>
    {isExternal && <span className="ml-2 px-1 bg-muted rounded-sm text-[10px] text-gray-300">↗</span>}
  </button>
);

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [myStuffOpen, setMyStuffOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-sidebar min-h-screen flex flex-col items-center py-4 border-r border-gray-800">
        <div className="mb-8">
          <img src="/lovable-uploads/407e5ec8-9b67-42ee-acf0-b238e194aa64.png" alt="Logo" className="w-8 h-8" />
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full p-1 text-white hover:bg-gray-700 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[232px] bg-sidebar min-h-screen flex flex-col border-r border-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/407e5ec8-9b67-42ee-acf0-b238e194aa64.png" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold">OpenArt</span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Upgrade Plan Button */}
      <div className="p-3">
        <button
          onClick={() => handleNavigation('/upgrade-plan')}
          className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-2.5 px-4 font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
            location.pathname === '/upgrade-plan' ? 'ring-2 ring-purple-400' : ''
          }`}
        >
          <Crown size={18} />
          Upgrade Plan
        </button>
      </div>

      <div className="py-2 px-3 flex flex-col gap-1">
        <SidebarItem 
          icon={<HomeIcon size={20} />} 
          label="Home" 
          isActive={location.pathname === '/'}
          onClick={() => handleNavigation('/')}
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          label="Characters" 
          isNew 
          isActive={location.pathname === '/characters'}
          onClick={() => handleNavigation('/characters')}
        />
        <SidebarItem 
          icon={<Image size={20} />} 
          label="Create Image" 
          isActive={location.pathname === '/create'}
          onClick={() => handleNavigation('/create')}
        />
        <SidebarItem 
          icon={<Edit size={20} />} 
          label="Edit Image" 
          isActive={location.pathname === '/edit'}
          onClick={() => handleNavigation('/edit')}
        />
        <SidebarItem 
          icon={<Palette size={20} />} 
          label="Style Profile" 
          isActive={location.pathname === '/style-profile'}
          onClick={() => handleNavigation('/style-profile')}
        />
        <SidebarItem 
          icon={<Grid size={20} />} 
          label="Photo Dumps" 
          isActive={location.pathname === '/photo-dumps'}
          onClick={() => handleNavigation('/photo-dumps')}
        />
        <SidebarItem 
          icon={<LayoutGrid size={20} />} 
          label="Store" 
          isActive={location.pathname === '/store'}
          onClick={() => handleNavigation('/store')}
        />
      </div>

      <div className="flex-grow overflow-auto">
        <div className="py-2 px-3">
          <SidebarItem 
            icon={myStuffOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            label="My stuff" 
            isActive={location.pathname.startsWith('/my')}
            hasDropdown
            onClick={() => setMyStuffOpen(!myStuffOpen)}
          />

          {myStuffOpen && (
            <div className="mt-1 space-y-1 animate-fade-in">
              <DropdownItem 
                icon={<Clock size={16} />} 
                label="Creation History" 
                isActive={location.pathname === '/my/history'}
                onClick={() => handleNavigation('/my/history')}
              />
              <DropdownItem 
                icon={<Bookmark size={16} />} 
                label="Bookmarks" 
                isActive={location.pathname === '/my/bookmarks'}
                onClick={() => handleNavigation('/my/bookmarks')}
              />
              <DropdownItem 
                icon={<Heart size={16} />} 
                label="Liked" 
                isActive={location.pathname === '/my/liked'}
                onClick={() => handleNavigation('/my/liked')}
              />
            </div>
          )}
        </div>

        <div className="py-2 px-3">
          <SidebarItem 
            icon={resourcesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            label="Resources" 
            hasDropdown
            isActive={location.pathname.startsWith('/resources')}
            onClick={() => setResourcesOpen(!resourcesOpen)}
          />
          
          {resourcesOpen && (
            <div className="mt-1 space-y-1 animate-fade-in">
              <DropdownItem 
                icon={<BookOpen size={16} />} 
                label="Tutorials" 
                isActive={location.pathname === '/resources/tutorials'}
                onClick={() => handleNavigation('/resources/tutorials')}
              />
              <DropdownItem 
                icon={<HelpCircle size={16} />} 
                label="Help Center" 
                isActive={location.pathname === '/resources/help'}
                onClick={() => handleNavigation('/resources/help')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
