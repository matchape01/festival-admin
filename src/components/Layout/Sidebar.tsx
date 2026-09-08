import { NavLink } from 'react-router-dom';
import { Users, Calendar, Users2, BookOpen, BarChart3 } from 'lucide-react';

export function Sidebar() {
  const links = [
    { to: '/', icon: BarChart3, label: 'Dashboard' },
    { to: '/resources', icon: Users, label: 'Ressources' },
    { to: '/workshops', icon: BookOpen, label: 'Ateliers' },
    { to: '/planning', icon: Calendar, label: 'Planning' },
    { to: '/volunteers', icon: Users2, label: 'Bénévoles' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <nav className="p-6 space-y-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
