import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  updateUserStatus,
  deleteUser,
  updateUserRole,
  User,
  getUserPermissions,
  updateUserPermissions,
  updateUserDesignation,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { Plus, RefreshCw, MoreVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";


interface ModulePermissions {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  [key: string]: boolean;
}

interface UserPermissions {
  [key: string]: ModulePermissions;
}

const modules = [
  { id: "dashboard", label: "Dashboard" },
  { id: "certificates", label: "Certificates" },
  { id: "reports", label: "Reports" },
  { id: "formats", label: "Formats" },
  { id: "events", label: "Events" },
  { id: "jobs", label: "Jobs" },
  { id: "blogs", label: "Blogs" },
  { id: "causes", label: "Causes" },
  { id: "crowd-funding", label: "Crowd-Funding" },
  { id: "forum", label: "Forum" },
  { id: "shop", label: "Shop" },
];

interface UserPermissionsDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onUpdate: (data: { permissions: UserPermissions; role: string }) => void;
}

const UserPermissionsDialog: React.FC<UserPermissionsDialogProps> = ({ user, open, onClose, onUpdate }) => {
  const [permissions, setPermissions] = useState<UserPermissions>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setPermissions(user.permissions || {});
    }
  }, [user]);

  const handlePermissionChange = (module: string, action: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...(prev[module] || {}),
        [action]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await updateUserPermissions(user._id, permissions);
      if (response.success) {
        onUpdate(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Error updating permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Permissions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {modules.map(module => (
            <div key={module.id} className="space-y-2">
              <Label>{module.label}</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['read', 'create', 'update', 'delete'].map(action => (
                  <div key={action} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${module.id}-${action}`}
                      checked={permissions[module.id]?.[action] || false}
                      onChange={(e) => handlePermissionChange(module.id, action, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={`${module.id}-${action}`} className="text-sm">
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const UserSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <div className="grid grid-cols-7 gap-4 p-4 border-b">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-4 p-4 border-b">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-10 w-[160px]" />
            <Skeleton className="h-10 w-[160px]" />
            <Skeleton className="h-6 w-[80px] rounded-full" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: "active" | "inactive";
    }) => updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Status updated",
        description: "User status has been updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User deleted",
        description: "User has been successfully deleted",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Role updated",
        description: "User role has been updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating role",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateDesignationMutation = useMutation({
    mutationFn: ({ userId, designation }: { userId: string; designation: string }) =>
      updateUserDesignation(userId, designation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Designation updated",
        description: "User designation has been updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating designation",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleToggleStatus = (userId: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    updateStatusMutation.mutate({ userId, status: newStatus });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    updateRoleMutation.mutate({ userId, role: newRole });
  };

  const handleDesignationChange = (userId: string, designation: string) => {
    updateDesignationMutation.mutate({ userId, designation });
  };

  const columns = [
    {
      id: "name",
      header: "Name",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return <div>{user.name}</div>;
      },
    },
    {
      id: "email",
      header: "Email",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return <div>{user.email}</div>;
      },
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        const isUpdating = updateRoleMutation.isPending && updateRoleMutation.variables?.userId === user._id;
        return (
          <Select
            value={user.role}
            onValueChange={(value) => handleRoleChange(user._id, value)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="user">Regular User</SelectItem>
              <SelectItem value="country-admin">Country Admin</SelectItem>
              <SelectItem value="state-admin">State Admin</SelectItem>
              <SelectItem value="regional-admin">Regional Admin</SelectItem>
              <SelectItem value="district-admin">District Admin</SelectItem>
              <SelectItem value="block-admin">Block Admin</SelectItem>
              <SelectItem value="area-admin">Area Admin</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "designation",
      header: "Designation",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        const isUpdating = updateDesignationMutation.isPending && updateDesignationMutation.variables?.userId === user._id;
        return (
          <Select
            value={user.designation || ""}
            onValueChange={(value) => handleDesignationChange(user._id, value)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <SelectItem value="board-of-director">Board of Director</SelectItem>
              <SelectItem value="executive-director">Executive Director</SelectItem>
              <SelectItem value="operations-director">Operations Director</SelectItem>
              <SelectItem value="chartered-accountant">Chartered Accountant</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="technical-consultant">Technical Consultant</SelectItem>
              <SelectItem value="advisor">Advisor</SelectItem>
              <SelectItem value="country-officer">Country Officer</SelectItem>
              <SelectItem value="senior-program-manager">Senior Program Manager</SelectItem>
              <SelectItem value="senior-manager">Senior Manager</SelectItem>
              <SelectItem value="senior-officer">Senior Officer</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="officer">Officer</SelectItem>
              <SelectItem value="associate">Associate</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="intern">Intern</SelectItem>
              <SelectItem value="web-developer">Web Developer</SelectItem>
              <SelectItem value="assistant">Assistant</SelectItem>
              <SelectItem value="data-entry-operator">Data Entry Operator</SelectItem>
              <SelectItem value="receptionist">Receptionist</SelectItem>
              <SelectItem value="event-organizer">Event Organizer</SelectItem>
              <SelectItem value="development-doer">Development Doer</SelectItem>
              <SelectItem value="office-attendant">Office Attendant</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="guard">Guard</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="daily-service-provider">Daily Service Provider</SelectItem>
              <SelectItem value="state-program-manager">State Program Manager</SelectItem>
              <SelectItem value="state-coordinator">State Coordinator</SelectItem>
              <SelectItem value="state-officer">State Officer</SelectItem>
              <SelectItem value="regional-program-manager">Regional Program Manager</SelectItem>
              <SelectItem value="regional-coordinator">Regional Coordinator</SelectItem>
              <SelectItem value="regional-officer">Regional Officer</SelectItem>
              <SelectItem value="district-program-manager">District Program Manager</SelectItem>
              <SelectItem value="district-coordinator">District Coordinator</SelectItem>
              <SelectItem value="district-executive">District Executive</SelectItem>
              <SelectItem value="counsellor">Counsellor</SelectItem>
              <SelectItem value="cluster-coordinator">Cluster Coordinator</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="field-coordinator">Field Coordinator</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
        );
      },
    },
    {
      id: "createdAt",
      header: "Created At",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return <div>{new Date(user.createdAt).toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                  onClick={() => handleToggleStatus(user._id, user.status)}
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user);
                  setIsPermissionsDialogOpen(true);
                }}
              >
                Manage Permissions
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                  onClick={() => handleDeleteUser(user._id)}
                >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredUsers = usersData?.data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isUsersLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[300px] mt-2" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Skeleton className="h-10 w-[300px]" />
            </div>
            <TableSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isUsersError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Users</CardTitle>
            <CardDescription>Failed to load user data. Please try again.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => refetchUsers()}>
              <RefreshCw className={cn("h-4 w-4 mr-2", isUsersLoading && "animate-spin")} />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetchUsers()}
              disabled={isUsersLoading}
              className={cn(
                "transition-transform duration-200",
                isUsersLoading && "animate-spin"
              )}
            >
              <RefreshCw className={cn("h-4 w-4", isUsersLoading && "animate-spin")} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <DataTable columns={columns} data={filteredUsers} />
        </CardContent>
      </Card>

      {selectedUser && (
        <UserPermissionsDialog
          user={selectedUser}
          open={isPermissionsDialogOpen}
          onClose={() => setIsPermissionsDialogOpen(false)}
          onUpdate={(updatedPermissions) => {
            // Handle the update of permissions
          }}
        />
      )}
    </div>
  );
};

export default AdminUsers;
