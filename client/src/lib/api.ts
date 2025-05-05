import { API_BASE_URL } from "@/config";

interface DonationStats {
    thirtyDayStats: {
      change: string;
      description: string;
    };
    sixtyDayStats: {
      change: string;
      description: string;
    };
    totalAmount: number;
    averageDonation: number;
    recurringDonors: number;
    recentDonations: Array<{
      donor: string;
      amount: number;
      date: string;
      project: string;
      status: string;
    }>;
    success: boolean;
  }
  
  export const fetchTotalDonations = async (): Promise<DonationStats> => {
    const res = await fetch(`${API_BASE_URL}/api/donation/total`, {
      credentials: 'include',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch total donations');
    }
    
    const data: DonationStats = await res.json();
    
    // Validate the response structure
    if (typeof data.totalAmount !== 'number' || 
        !data.thirtyDayStats || 
        !data.sixtyDayStats) {
      throw new Error('Invalid donation data format received');
    }
    
    return data;
  };


  export interface CauseDonation {
    name: string;
    amount: number;
    percentage: number;
    causeId: string | null; // causeId is null for "General Fund"
  }
  
  export interface DonationOverviewResponse {
    success: boolean;
    data: CauseDonation[];
  }
  

  export const fetchDonationOverview = async (): Promise<DonationOverviewResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/donation/cause`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch donation overview: ${res.status} ${res.statusText}`);
    }
  
    const data: unknown = await res.json();
  
    // Type and shape validation
    if (
      typeof data !== 'object' ||
      data === null ||
      !('success' in data) ||
      !('data' in data) ||
      !Array.isArray((data as any).data)
    ) {
      throw new Error('Invalid donation overview data structure');
    }
  
    return data as DonationOverviewResponse;
  };
  
  export interface Activity {
    title: string;
    description: string;
    time: string; // ISO string
    type: 'donation' | 'volunteer' | 'project' | 'certificate' | 'content'; // extend as needed
  }
  
  export interface RecentActivitiesResponse {
    success: boolean;
    data: Activity[];
    activeCount: number;
    change: string;
    description: string;
    newThisMonth: number;
    activeVolunteers: Array<{
      name: string;
      program: string;
      location: string;
      hours: number;
      status: string;
    }>;
    upcomingEvents: Array<{
      title: string;
      startDateTime: string;
      location: string;
      attendees: any[];
    }>;
    pastEvents: any[];
    registeredAttendees: number;
    activeProjects: Array<{
      title: string;
      category: string;
      location: string;
      budget: number;
    }>;
    completedProjects: any[];
    beneficiaries: number;
    ongoingProjects: number;
  }
  export const fetchRecentActivities = async (): Promise<RecentActivitiesResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/activities/recent-activities`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch recent activities: ${res.status} ${res.statusText}`);
    }
  
    const data: unknown = await res.json();
  
    // Validate shape
    if (
      typeof data !== 'object' ||
      data === null ||
      !('success' in data) ||
      !('data' in data) ||
      !Array.isArray((data as any).data)
    ) {
      throw new Error('Invalid recent activities data structure');
    }
  
    return data as RecentActivitiesResponse;
  };
  

  // User related function and types
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    accountType: 'member' | 'organization';
    status: 'active' | 'inactive';
    createdAt: string; // ISO string
    designation?: string;
    level?: number;
    geo?: {
      country?: string;
      state?: string;
      region?: string;
      district?: string;
      block?: string;
      area?: string;
    };
    permissions?: Record<string, ModulePermissions>;
  }
  
  export interface UsersResponse {
    success: boolean;
    data: User[];
  }
  
  export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: string;
    accountType: 'member' | 'organization';
  }
  
  export interface UpdateUserRequest {
    _id: string;
    role?: string;
    status?: 'active' | 'inactive';
    designation?: string;
    level?: number;
    geo?: {
      country?: string;
      state?: string;
      region?: string;
      district?: string;
      block?: string;
      area?: string;
    };
  }
  
  // Fetch all users
  export const fetchUsers = async (): Promise<UsersResponse> => {
    // First check localStorage for users data


    const res = await fetch(`${API_BASE_URL}/api/users`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }
  
    const data = await res.json();
  
    if (!data.success || !Array.isArray(data.data)) {
      throw new Error('Invalid users data structure');
    }


    localStorage.setItem('users', JSON.stringify(data));
  
    return data;
  };
  
  // Create new user
  export const createUser = async (userData: CreateUserRequest): Promise<{ success: boolean; user: User }> => {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.statusText}`);
    }
  
    const response = await res.json();
    
    // Update localStorage cache
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          parsedUsers.data.push(response.user);
          localStorage.setItem('users', JSON.stringify(parsedUsers));
        }
      } catch (error) {
        console.error('Error updating users cache after create:', error);
      }
    }
  
    return response;
  };
  
  export const updateUser = async (userId: string, userData: {
    name?: string;
    email?: string;
    role?: string;
    designation?: string;
    status?: 'active' | 'inactive';
  }): Promise<{ success: boolean; user: User }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to update user: ${res.statusText}`);
    }
  
    const response = await res.json();
    
    // Update localStorage cache

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          const userIndex = parsedUsers.data.findIndex((user: User) => user._id === userId);
          if (userIndex !== -1) {
            parsedUsers.data[userIndex] = { ...parsedUsers.data[userIndex], ...userData };
            localStorage.setItem('users', JSON.stringify(parsedUsers));
          }
        }
      } catch (error) {
        console.error('Error updating users cache after update:', error);
      }
    }

  
    return response;
  };
  // Update user status
  export const updateUserStatus = async (userId: string, status: 'active' | 'inactive'): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/status`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to update user status: ${res.statusText}`);
    }
  
    const response = await res.json();
    
    // Update localStorage cache
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          const userIndex = parsedUsers.data.findIndex((user: User) => user._id === userId);
          if (userIndex !== -1) {
            parsedUsers.data[userIndex].status = status;
            localStorage.setItem('users', JSON.stringify(parsedUsers));
          }
        }
      } catch (error) {
        console.error('Error updating users cache after status update:', error);
      }
    }
  
    return response;
  };
  
  // Delete user
  export const deleteUser = async (userId: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to delete user: ${res.statusText}`);
    }
  
    const response = await res.json();
    
    // Update localStorage cache
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          parsedUsers.data = parsedUsers.data.filter((user: User) => user._id !== userId);
          localStorage.setItem('users', JSON.stringify(parsedUsers));
        }
      } catch (error) {
        console.error('Error updating users cache after delete:', error);
      }
    }
  
    return response;
  };
  
  // Update user role and permissions
  export const updateUserRole = async (
    userId: string,
    role: string
  ): Promise<{ success: boolean; user: User }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/role`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to update user role: ${res.statusText}`);
    }
  
    const response = await res.json();
    
    // Update localStorage cache
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          const userIndex = parsedUsers.data.findIndex((user: User) => user._id === userId);
          if (userIndex !== -1) {
            parsedUsers.data[userIndex].role = role;
            localStorage.setItem('users', JSON.stringify(parsedUsers));
          }
        }
      } catch (error) {
        console.error('Error updating users cache after role update:', error);
      }
    }
  
    return response;
  };

  // Blog related types and functions
  export interface Blog {
    _id: string;
    title: string;
    slug: string;
    category: string;
    content: string;
    status: 'Draft' | 'Review' | 'Published';
    publishDate?: string;
    metaDescription?: string;
    seoKeywords?: string[];
    tags?: string[];
    estimatedReadTime: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    audioRequired: boolean;
  }

  export interface BlogsResponse {
    success: boolean;
    blogs: Blog[];
  }

  export interface CreateBlogRequest {
    title: string;
    category: string;
    content: string;
    status: 'Draft' | 'Review' | 'Published';
    metaDescription?: string;
    seoKeywords?: string[];
    tags?: string[];
    audioRequired: boolean;
    publishDate?: string;
  }

  export interface UpdateBlogRequest {
    title?: string;
    category?: string;
    content?: string;
    status?: 'Draft' | 'Review' | 'Published';
    metaDescription?: string;
    seoKeywords?: string[];
    tags?: string[];
    audioRequired?: boolean;
    publishDate?: string;
  }

  // Fetch all blogs
  export const fetchBlogs = async (): Promise<BlogsResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/blog`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.success || !Array.isArray(data.blogs)) {
      throw new Error('Invalid blogs data structure');
    }

    return data;
  };

  // Create new blog
  export const createBlog = async (blogData: CreateBlogRequest): Promise<{ success: boolean; blog: Blog }> => {
    const res = await fetch(`${API_BASE_URL}/api/blog`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      throw new Error(`Failed to create blog: ${res.statusText}`);
    }

    return res.json();
  };

  // Update blog
  export const updateBlog = async (blogId: string, blogData: UpdateBlogRequest): Promise<{ success: boolean; blog: Blog }> => {
    const res = await fetch(`${API_BASE_URL}/api/blog/${blogId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update blog: ${res.statusText}`);
    }

    return res.json();
  };

  // Delete blog
  export const deleteBlog = async (blogId: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE_URL}/api/blog/${blogId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete blog: ${res.statusText}`);
    }

    return res.json();
  };

  // Event related types and functions
  export interface Event {
    _id: string;
    organizerName: string;
    eventTitle: string;
    targetAudience: string[];
    startDateTime: string;
    endDateTime?: string;
    isFreeEvent: boolean;
    autoAttendanceRequired: boolean;
    needVolunteers: boolean;
    sponsorLogos: string[];
    sponsorLogoOrder: string[];
    certificateSettings: {
      enableCertificate: boolean;
      signatories: string[];
    };
    eventDocuments: string[];
    approvalStatus: 'Draft' | 'Pending' | 'Approved';
    displayOnWebsite: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface EventsResponse {
    success: boolean;
    events: Event[];
  }

  export interface CreateEventRequest {
    organizerName: string;
    eventTitle: string;
    targetAudience: string[];
    startDateTime: string;
    endDateTime?: string;
    isFreeEvent: boolean;
    autoAttendanceRequired: boolean;
    needVolunteers: boolean;
    sponsorLogos: string[];
    sponsorLogoOrder: string[];
    certificateSettings: {
      enableCertificate: boolean;
      signatories: string[];
    };
    eventDocuments: string[];
    approvalStatus: 'Draft' | 'Pending' | 'Approved';
    displayOnWebsite: boolean;
  }

  export interface UpdateEventRequest extends Partial<CreateEventRequest> {}

  // Fetch all events
  export const fetchEvents = async (): Promise<EventsResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/event`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.success || !Array.isArray(data.events)) {
      throw new Error('Invalid events data structure');
    }

    return data;
  };

  // Create new event
  export const createEvent = async (eventData: CreateEventRequest): Promise<{ success: boolean; event: Event }> => {
    const res = await fetch(`${API_BASE_URL}/api/event`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      throw new Error(`Failed to create event: ${res.statusText}`);
    }

    return res.json();
  };

  // Update event
  export const updateEvent = async (eventId: string, eventData: UpdateEventRequest): Promise<{ success: boolean; event: Event }> => {
    const res = await fetch(`${API_BASE_URL}/api/event/${eventId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update event: ${res.statusText}`);
    }

    return res.json();
  };

  // Delete event
  export const deleteEvent = async (eventId: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE_URL}/api/event/${eventId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete event: ${res.statusText}`);
    }

    return res.json();
  };

  // Permission types
  export interface ModulePermissions {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    [key: string]: boolean;
  }

  export interface UserPermissions {
    [key: string]: ModulePermissions;
  }

  export interface PermissionsResponse {
    success: boolean;
    permissions: UserPermissions;
    role: string;
  }

  // Get user permissions
  export const getUserPermissions = async (userId: string): Promise<PermissionsResponse> => {
    // First check localStorage for user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.permissions) {
        return {
          success: true,
          permissions: user.permissions,
          role: user.role
        };
      }
    }

    // If not found in localStorage, fetch from API
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/permissions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user permissions: ${res.statusText}`);
    }
  
    return res.json();
  };

  // Update user permissions
  export const updateUserPermissions = async (
    userId: string,
    permissions: UserPermissions
  ): Promise<{ success: boolean; data: { permissions: UserPermissions; role: string } }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/permissions`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ permissions })
    });

    if (!res.ok) {
      throw new Error(`Failed to update user permissions: ${res.statusText}`);
    }

    const response = await res.json();

    // Update localStorage cache
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          const userIndex = parsedUsers.data.findIndex((user: User) => user._id === userId);
          if (userIndex !== -1) {
            parsedUsers.data[userIndex].permissions = response.data.permissions;
            parsedUsers.data[userIndex].role = response.data.role;
            localStorage.setItem('users', JSON.stringify(parsedUsers));
          }
        }
      } catch (error) {
        console.error('Error updating users cache after permissions update:', error);
      }
    }

    return response;
  };

  export const updateUserDesignation = async (userId: string, designation: string): Promise<{ success: boolean; user: User }> => {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/designation`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ designation }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update user designation: ${res.statusText}`);
    }
  
    const response = await res.json();
    
    // Update localStorage cache
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (parsedUsers.success && Array.isArray(parsedUsers.data)) {
          const userIndex = parsedUsers.data.findIndex((user: User) => user._id === userId);
          if (userIndex !== -1) {
            parsedUsers.data[userIndex].designation = designation;
            localStorage.setItem('users', JSON.stringify(parsedUsers));
          }
        }
      } catch (error) {
        console.error('Error updating users cache after designation update:', error);
      }
    }
  
    return response;
  };


  interface Role {
    _id: string;
    name: string;
    description?: string;
    permissions: UserPermissions;
    createdAt: string;
    updatedAt: string;
  }

  // Role related API functions
export const fetchRoles = async (): Promise<{ success: boolean; data: Role[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/roles`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return { success: true, data: data.data };
};

export const getRoleById = async (id: string): Promise<{ data: Role }> => {
  const response = await fetch(`${API_BASE_URL}/api/roles/${id}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getRoleByName = async (name: string): Promise<{ data: Role }> => {
  const response = await fetch(`${API_BASE_URL}/api/roles/${name}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const createRole = async (roleData: Partial<Role>): Promise<{ data: Role }> => {
  const response = await fetch(`${API_BASE_URL}/api/roles`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roleData),
  });
  return response.json();
};

export const updateRole = async (id: string, roleData: Partial<Role>): Promise<{ data: Role }> => {
  const response = await fetch(`${API_BASE_URL}/api/roles/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roleData),
  });
  return response.json();
};
export const deleteRole = async (id: string): Promise<{ success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/api/roles/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getRolePermissions = async (name: string): Promise<{ data: UserPermissions }> => {
  const response = await fetch(`${API_BASE_URL}/api/roles/${name}/permissions`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};



