import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Users, Calendar, Users2, BookOpen, BarChart3, Database, ChevronDown } from 'lucide-react';

interface MenuItem {
  to?: string;
  icon?: any;
  label: string;
  submenu?: MenuItem[];
}

export function Sidebar() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['master-data']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(g => g !== groupId)
        : [...prev, groupId]
    );
  };

  const menuGroups: { id: string; label: string; icon: any; submenu: MenuItem[] }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      submenu: [
        { to: '/', icon: BarChart3, label: 'Vue d\'ensemble' },
      ],
    },
    {
      id: 'master-data',
      label: 'MASTER DATA',
      icon: Database,
      submenu: [
        { to: '/roles', icon: Users, label: 'Rôles' },
        { to: '/resources', icon: Users, label: 'Ressources' },
      ],
    },
    {
      id: 'planning',
      label: 'Planning',
      icon: Calendar,
      submenu: [
        { to: '/workshops', icon: BookOpen, label: 'Ateliers' },
        { to: '/planning', icon: Calendar, label: 'Planning' },
      ],
    },
    {
      id: 'teams',
      label: 'Équipes',
      icon: Users2,
      submenu: [
        { to: '/volunteers', icon: Users2, label: 'Bénévoles' },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuGroups.map((group) => (
          <div key={group.id}>
            {group.submenu.length === 1 && !group.submenu[0].submenu ? (
              <NavLink
                to={group.submenu[0].to || '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <group.icon size={20} />
                <span>{group.submenu[0].label}</span>
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <group.icon size={20} />
                    <span className="text-sm font-semibold">{group.label}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition ${
                      expandedGroups.includes(group.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedGroups.includes(group.id) && (
                  <div className="pl-4 space-y-1 mt-1">
                    {group.submenu.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to || '/'}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:bg-gray-800'
                          }`
                        }
                      >
                        {item.icon && <item.icon size={18} />}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
