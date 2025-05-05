import React, { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Plus, RefreshCw, MoreVertical, Edit, Trash2, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import {
  fetchUsers,
  updateUserStatus,
  deleteUser,
  updateUserRole,
  updateUserDesignation,
  createUser,
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
  updateUser,
} from "@/lib/api";
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
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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

interface GeoLocation {
  country?: string | null;
  state?: string | null;
  region?: string | null;
  district?: string | null;
  block?: string | null;
  area?: string | null;
}

interface Role {
  _id: string;
  name: string;
  description?: string;
  permissions: UserPermissions;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  accountType: 'member' | 'organization';
  role: string | Role;
  status: 'active' | 'inactive';
  designation?: string | null;
  level?: number;
  geo?: GeoLocation;
  assignedRegions?: string[];
  createdAt: string;
  updatedAt?: string;
  permissions?: UserPermissions;
}

interface UsersResponse {
  success: boolean;
  data: User[];
  total?: number;
}

interface RolesResponse {
  success: boolean;
  data: Role[];
  total?: number;
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
  { id: "crowdFunding", label: "Crowd Funding" },
  { id: "forum", label: "Forum" },
  { id: "shop", label: "Shop" },
];

const designations = [
  "board-of-director", "executive-director", "operations-director", 
  "chartered-accountant", "auditor", "technical-consultant", 
  "advisor", "country-officer", "senior-program-manager",
  "senior-manager", "senior-officer", "manager", "officer", "associate", 
  "executive", "intern", "web-developer", "assistant", "data-entry-operator", 
  "receptionist", "event-organizer", "development-doer", "office-attendant", 
  "driver", "guard", "vendor", "daily-service-provider", "state-program-manager", 
  "state-coordinator", "state-officer", "regional-program-manager",
  "regional-coordinator", "regional-officer", "district-program-manager", 
  "district-coordinator", "district-executive", "counsellor", 
  "cluster-coordinator", "volunteer", "field-coordinator"
];

const AdminUsers: React.FC = () => {
  const { toast } = useToast();
  const { user: authUser } = useAuth();
  const queryClient = useQueryClient();
  
  // State management with lazy initialization
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRolesDialogOpen, setIsRolesDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  
  const [roleForm, setRoleForm] = useState<Partial<Role>>(() => ({
    name: '',
    description: '',
    permissions: {},
  }));
  
  const [userForm, setUserForm] = useState<Partial<User>>(() => ({
    name: '',
    email: '',
    password: '',
    accountType: 'member',
    role: '',
    status: 'active',
    designation: null,
  }));
  
  // Pagination state
  const [usersPage, setUsersPage] = useState(1);
  const [rolesPage, setRolesPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users and roles with pagination
  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useQuery<UsersResponse>({
    queryKey: ["users", usersPage],
    queryFn: () => fetchUsers(),
  });

  const { 
    data: rolesResponse, 
    isLoading: isRolesLoading,
    refetch: refetchRoles,
  } = useQuery<RolesResponse>({
    queryKey: ["roles"],
    queryFn: () => fetchRoles(),
  });

  const users = usersResponse?.data || [];
  const totalUsers = usersResponse?.total || users.length;
  const roles = rolesResponse?.data || [];
  const totalRoles = rolesResponse?.total || roles.length;

  // Mutations for users
  const createUserMutation = useMutation({
    mutationFn: (userData: { name: string; email: string; password: string; role: string; accountType: 'member' | 'organization' }) => 
      createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User created successfully" });
      setIsUserDialogOpen(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { 
      userId: string;
      status: "active" | "inactive" 
    }) => updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Status updated" });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User deleted" });
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      updateUserRole(userId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Role updated" });
    },
  });

  const updateDesignationMutation = useMutation({
    mutationFn: ({ userId, designation }: { 
      userId: string; 
      designation: string 
    }) => updateUserDesignation(userId, designation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Designation updated" });
    },
  });

  // Mutations for roles
  const createRoleMutation = useMutation({
    mutationFn: (roleData: Partial<Role>) => createRole(roleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({ title: "Role created" });
      setIsRolesDialogOpen(false);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, data }: { 
      id: string; 
      data: Partial<Role> 
    }) => updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({ title: "Role updated" });
      setIsRolesDialogOpen(false);
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({ title: "Role deleted" });
    },
  });

  // Handler functions
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchUsers(), refetchRoles()]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleStatus = (
    userId: string,
    currentStatus: "active" | "inactive"
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    updateStatusMutation.mutate({ userId, status: newStatus });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await updateUserRole(userId, newRole);
      if (response.success) {
        toast({ title: "Role updated successfully" });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      });
    }
  };

  const handleDesignationChange = async (userId: string, designation: string) => {
    try {
      const response = await updateUserDesignation(userId, designation);
      if (response.success) {
        toast({ title: "Designation updated successfully" });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update designation",
        variant: "destructive",
      });
    }
  };

  // Direct form handlers without debouncing
  const handleRoleFormInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRoleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserFormInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setUserForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Form input components
  const FormInput = React.memo(({ 
    label, 
    name, 
    type = "text", 
    value, 
    onChange, 
    disabled = false,
    placeholder = "" 
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
  }) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onInput={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="col-span-3"
      />
    </div>
  ));

  const FormSelect = React.memo(({ 
    label, 
    value, 
    onValueChange, 
    options, 
    disabled = false,
    placeholder = "Select option" 
  }: {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string; }[];
    disabled?: boolean;
    placeholder?: string;
  }) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ));

  const handleRolePermissionChange = (module: string, action: keyof ModulePermissions, value: boolean) => {
    setRoleForm(prev => {
      const newPermissions = { ...prev.permissions };
      if (!newPermissions[module]) {
        newPermissions[module] = { read: false, create: false, update: false, delete: false };
      }
      newPermissions[module][action] = value;
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleEditRole = (role: Role) => {
    setCurrentRole(role);
    setRoleForm({
      name: role.name,
      description: role.description || '',
      permissions: { ...role.permissions }
    });
    setIsRolesDialogOpen(true);
  };

  const handleCreateRole = () => {
    setCurrentRole(null);
    setRoleForm({
      name: '',
      description: '',
      permissions: {}
    });
    setIsRolesDialogOpen(true);
  };

  const handleEditUser = async (user: User) => {
    setCurrentUser(user);
    setIsUserDialogOpen(true);
  };

  const handleCreateUser = () => {
    setCurrentUser(null);
    setUserForm({
      name: '',
      email: '',
      password: '',
      accountType: 'member',
      role: roles[0]?.name || 'user',
      designation: '',
    });
    setIsUserDialogOpen(true);
  };

  const handleSubmitRole = async () => {
    try {
      if (!roleForm.name) {
        toast({
          title: "Error",
          description: "Role name is required",
          variant: "destructive",
        });
        return;
      }

      setIsRoleLoading(true);
      if (currentRole) {
        await updateRole(currentRole._id, roleForm);
      } else {
        await createRole(roleForm);
      }
      setIsRolesDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({ title: "Role saved successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save role",
        variant: "destructive",
      });
    } finally {
      setIsRoleLoading(false);
    }
  };

  const handleSubmitUser = async () => {
    try {
      if (!userForm.name || !userForm.email || !userForm.accountType || !userForm.role) {
        toast({
          title: "Error",
          description: "All fields are required",
          variant: "destructive",
        });
        return;
      }

      setIsUserLoading(true);
      if (currentUser) {
        await updateUser(currentUser._id, {
          name: userForm.name || '',
          email: userForm.email || '',
          role: typeof userForm.role === 'string' ? userForm.role : userForm.role?.name,
          designation: userForm.designation || undefined,
          status: userForm.status
        });
      } else {
        await createUser({
          name: userForm.name || '',
          email: userForm.email || '',
          password: userForm.password || '',
          role: userForm.role as string,
          accountType: userForm.accountType || 'member',
        });
      }
      setIsUserDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User saved successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save user",
        variant: "destructive",
      });
    } finally {
      setIsUserLoading(false);
    }
  };

  const handleDeleteRole = (id: string) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      deleteRoleMutation.mutate(id);
    }
  };

  // Memoized Permission Table component
  const PermissionTable = React.memo(({ permissions, onChange, disabled }: {
    permissions: UserPermissions;
    onChange: (module: string, action: keyof ModulePermissions, value: boolean) => void;
    disabled: boolean;
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Module</TableHead>
          <TableHead>Read</TableHead>
          <TableHead>Create</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules.map((module) => (
          <TableRow key={module.id}>
            <TableCell>{module.label}</TableCell>
            {(['read', 'create', 'update', 'delete'] as const).map((action) => (
              <TableCell key={`${module.id}-${action}`}>
                <input
                  type="checkbox"
                  checked={permissions?.[module.id]?.[action] || false}
                  onChange={(e) => onChange(module.id, action, e.target.checked)}
                  disabled={disabled}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ));

  // User Dialog Component
  const UserDialog = ({ 
    open, 
    onOpenChange, 
    user, 
    onSuccess 
  }: { 
    open: boolean; 
    onOpenChange: (open: boolean) => void; 
    user: User | null; 
    onSuccess: () => void;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<Partial<User>>(() => ({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      accountType: user?.accountType || 'member',
      role: typeof user?.role === 'string' ? user.role : user?.role?.name || '',
      designation: user?.designation || '',
    }));

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
      setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
      try {
        setIsLoading(true);
        if (user) {
          await updateUser(user._id, {
            name: form.name || '',
            email: form.email || '',
            role: typeof form.role === 'string' ? form.role : form.role?.name,
            designation: form.designation || undefined,
            status: form.status
          });
          toast({ title: "User updated successfully" });
        } else {
          await createUser({
            name: form.name || '',
            email: form.email || '',
            password: form.password || '',
            role: form.role as string,
            accountType: form.accountType || 'member',
          });
          toast({ title: "User created successfully" });
        }
        onSuccess();
        onOpenChange(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save user",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {user ? "Edit User" : "Create User"}
            </DialogTitle>
            <DialogDescription>
              {user ? "Update user details" : "Create a new user"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onInput={handleInput}
                placeholder="Enter name"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onInput={handleInput}
                placeholder="Enter email"
                disabled={isLoading}
              />
            </div>
            {!user && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onInput={handleInput}
                  placeholder="Enter password"
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select
                value={form.accountType}
                onValueChange={(value) => handleSelectChange('accountType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={typeof form.role === 'string' ? form.role : form.role?.name || ''}
                onValueChange={(value) => handleSelectChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role._id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                value={form.designation || ''}
                onValueChange={(value) => handleSelectChange('designation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation.replace(/-/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (user ? "Update User" : "Create User")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Role Dialog Component
  const RoleDialog = ({ 
    open, 
    onOpenChange, 
    role, 
    onSuccess 
  }: { 
    open: boolean; 
    onOpenChange: (open: boolean) => void; 
    role: Role | null; 
    onSuccess: () => void;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<Partial<Role>>(() => ({
      name: role?.name || '',
      description: role?.description || '',
      permissions: role?.permissions || {},
    }));

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (module: string, action: keyof ModulePermissions, value: boolean) => {
      setForm(prev => {
        const newPermissions = { ...prev.permissions };
        if (!newPermissions[module]) {
          newPermissions[module] = { read: false, create: false, update: false, delete: false };
        }
        newPermissions[module][action] = value;
        return { ...prev, permissions: newPermissions };
      });
    };

    const handleSubmit = async () => {
      try {
        setIsLoading(true);
        if (role) {
          await updateRoleMutation.mutateAsync({
            id: role._id,
            data: form
          });
          toast({ title: "Role updated successfully" });
        } else {
          await createRoleMutation.mutateAsync(form);
          toast({ title: "Role created successfully" });
        }
        onSuccess();
        onOpenChange(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save role",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {role ? "Edit Role" : "Create Role"}
            </DialogTitle>
            <DialogDescription>
              {role ? "Update role details and permissions" : "Create a new role with specific permissions"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onInput={handleInput}
                placeholder="Enter role name"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onInput={handleInput}
                placeholder="Enter role description"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <PermissionTable
                permissions={form.permissions || {}}
                onChange={handlePermissionChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (role ? "Update Role" : "Create Role")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const UserActions = React.memo(({ user }: { user: User }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleEditUser(user)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleToggleStatus(user._id, user.status)}>
            {user.status === 'active' ? (
              <>
                <UserMinus className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteUser(user._id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  });

  const RoleActions = React.memo(({ role }: { role: Role }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleEditRole(role)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteRole(role._id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  });

  // Memoized table columns
  const userColumns = useMemo(() => [
    {
      id: "name",
      header: "Name",
      cell: ({ row }: { row: Row<User> }) => <div>{row.original.name}</div>,
    },
    {
      id: "email",
      header: "Email",
      cell: ({ row }: { row: Row<User> }) => <div>{row.original.email}</div>,
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return (
          <Select
            value={typeof user.role === 'string' ? user.role : user.role?.name || ''}
            onValueChange={(value) => handleRoleChange(user._id, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role._id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
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
        return (
          <Select
            value={user.designation || ''}
            onValueChange={(value) => handleDesignationChange(user._id, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              {designations.map((designation) => (
                <SelectItem key={designation} value={designation}>
                  {designation.replace(/-/g, ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }: { row: Row<User> }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.original.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
        }`}>
          {row.original.status ? row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1) : 'Inactive'}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<User> }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditUser(row.original)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleStatus(row.original._id, row.original.status)}>
              {row.original.status === 'active' ? (
                <>
                  <UserMinus className="mr-2 h-4 w-4" />
                  Deactivate
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteUser(row.original._id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [roles, designations]);

  const roleColumns = useMemo(() => [
    {
      id: "name",
      header: "Name",
      cell: ({ row }: { row: Row<Role> }) => <div>{row.original.name}</div>,
    },
    {
      id: "description",
      header: "Description",
      cell: ({ row }: { row: Row<Role> }) => <div>{row.original.description || '-'}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Role> }) => <RoleActions role={row.original} />,
    },
  ], []);

  // Memoized filtered users
  const filteredUsers = useMemo(() => 
    users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [users, searchTerm]
  );

  if (isUsersLoading || isRolesLoading) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isUsersError) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetchUsers()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all system users
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateUser}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn(
                  "h-4 w-4",
                  isRefreshing && "animate-spin"
                )} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <DataTable 
            columns={userColumns} 
            data={filteredUsers} 
          />
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUsersPage(prev => Math.max(prev - 1, 1))}
                  disabled={usersPage === 1}
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm">
                  Page {usersPage} of {Math.ceil(totalUsers / itemsPerPage)}
              </span>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUsersPage(prev => prev + 1)}
                  disabled={usersPage >= Math.ceil(totalUsers / itemsPerPage)}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Manage system roles and permissions
              </CardDescription>
            </div>
            <Button onClick={handleCreateRole}>
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={roleColumns} 
            data={roles} 
          />
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRolesPage(prev => Math.max(prev - 1, 1))}
                  disabled={rolesPage === 1}
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm">
                  Page {rolesPage} of {Math.ceil(totalRoles / itemsPerPage)}
                </span>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRolesPage(prev => prev + 1)}
                  disabled={rolesPage >= Math.ceil(totalRoles / itemsPerPage)}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      {/* User Dialog */}
      <UserDialog 
        open={isUserDialogOpen} 
        onOpenChange={setIsUserDialogOpen}
        user={currentUser}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["users"] })}
      />

      {/* Role Dialog */}
      <RoleDialog 
        open={isRolesDialogOpen} 
        onOpenChange={setIsRolesDialogOpen}
        role={currentRole}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["roles"] })}
      />
    </div>
  );
};

export default AdminUsers;