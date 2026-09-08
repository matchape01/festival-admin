import { useResources } from '../hooks/useData';
import { RolesManager } from '../components/Resources/RolesManager';

export function Roles() {
  const { data, addRole, updateRole, deleteRole } = useResources();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rôles</h1>
        <p className="text-gray-600 mt-2">Gérez les rôles disponibles du festival (Français et Anglais)</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <RolesManager
          roles={data.roles}
          onAddRole={addRole}
          onUpdateRole={updateRole}
          onDeleteRole={deleteRole}
        />
      </div>
    </div>
  );
}
