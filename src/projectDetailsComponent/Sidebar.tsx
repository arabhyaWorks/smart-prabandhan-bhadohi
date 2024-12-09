import React from 'react';
import { 
  LayoutDashboard, 
  AlertCircle, 
  FolderOpen, 
  Users, 
  ClipboardCheck, 
  FileSpreadsheet,
  Milestone,
  AlertTriangle,
  BarChart2,
  Image,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: AlertCircle, label: 'Issues' },
  { icon: FolderOpen, label: 'All Projects', active: true },
  { icon: Users, label: 'All Users' },
  { icon: ClipboardCheck, label: 'Inspection Panel' },
  { icon: FileSpreadsheet, label: 'Project Essential Test' },
  { icon: FileSpreadsheet, label: 'Budget & UC Upload' },
  { icon: Milestone, label: 'Milestones' },
  { icon: AlertTriangle, label: 'Issue Management' },
  { icon: BarChart2, label: 'Reports' },
  { icon: Image, label: 'Gallery' },
];

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Seal_of_Uttar_Pradesh.svg/1200px-Seal_of_Uttar_Pradesh.svg.png" 
             alt="UP Seal" 
             className="w-12 h-12 mx-auto mb-2" />
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={\`flex items-center space-x-3 px-4 py-2.5 rounded-lg \${
                  item.active 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }\`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 w-full px-4 py-2.5 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;