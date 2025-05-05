import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchDonationOverview, fetchRecentActivities, fetchTotalDonations, getUserPermissions } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";
import { RefreshCw } from "lucide-react";
import {
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
  FaUsers,
  FaChartLine,
  FaProjectDiagram,
} from "react-icons/fa";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const modules = [
  { label: "Dashboard", icon: <FaTachometerAlt />, href: "/admin/dashboard", module: "dashboard" },
  { label: "Certificates", icon: <FaFile />, href: "/admin/certificates", module: "certificates" },
  { label: "Users", icon: <FaUser />, href: "/admin/users", module: "users" },
  { label: "Reports", icon: <FaFileAlt />, href: "/admin/reports", module: "reports" },
  { label: "Formats", icon: <FaFile />, href: "/admin/formats", module: "formats" },
  { label: "Events", icon: <FaCalendar />, href: "/admin/events", module: "events" },
  { label: "Jobs", icon: <FaBriefcase />, href: "/admin/jobs", module: "jobs" },
  { label: "Blogs", icon: <FaBlog />, href: "/admin/blogs", module: "blogs" },
  { label: "Causes", icon: <FaHeart />, href: "/admin/causes", module: "causes" },
  { label: "Crowd-Funding", icon: <FaHeart />, href: "/admin/crowd-funding", module: "crowdFunding" },
  { label: "Forum", icon: <FaComments />, href: "/admin/forum", module: "forum" },
  { label: "Shop", icon: <FaShoppingCart />, href: "/admin/shop", module: "shop" },
  { label: "Volunteers", icon: <FaUsers />, href: "/admin/volunteers", module: "volunteers" },
  { label: "Donations", icon: <FaChartLine />, href: "/admin/donations", module: "donations" },
  { label: "Projects", icon: <FaProjectDiagram />, href: "/admin/projects", module: "projects" },
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();

  const { data: permissions } = useQuery({
    queryKey: ["userPermissions", user?._id],
    queryFn: () => user?._id ? getUserPermissions(user._id) : Promise.resolve({ success: true, permissions: {} as Record<string, { read: boolean }> }),
    enabled: !!user?._id,
  });

  const hasModuleAccess = (module: string) => {
    if (user?.role === "admin") return true;
    return permissions?.permissions?.[module]?.read === true;
  };

  const filteredModules = modules.filter((item) => {
    if (item.module === "users") return user?.role === "admin";
    return hasModuleAccess(item.module);
  });

  // Total Donations Query
  const {
    data: totalDonations,
    isLoading: isTotalLoading,
    isError: isTotalError,
    refetch: refetchTotalDonations,
    isRefetching: isRefetchingTotal,
  } = useQuery({
    queryKey: ["totalDonations"],
    queryFn: fetchTotalDonations,
    enabled: hasModuleAccess("donations"),
  });

  // Donation Overview Query
  const {
    data: donationOverview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    refetch: refetchDonationOverview,
    isRefetching: isRefetchingOverview,
  } = useQuery({
    queryKey: ["donationOverview"],
    queryFn: fetchDonationOverview,
    enabled: hasModuleAccess("donations"),
  });

  // Recent Activities Query
  const {
    data: recentActivities,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
    refetch: refetchRecentActivities,
    isRefetching: isRefetchingActivities,
  } = useQuery({
      
    queryKey: ["recentActivities"],
    queryFn: fetchRecentActivities,
    enabled: hasModuleAccess("activities"),
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{user &&user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || "User"} Dashboard</h1>
        <p className="text-gray-600">
          Manage your organization's activities, users, and content.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {hasModuleAccess("donations") && (
          <DashboardCard
            title="Total Donations"
            value={
              isTotalLoading || isRefetchingTotal
                ? "Loading..."
                : isTotalError
                ? "Error"
                : `₹${totalDonations?.totalAmount?.toLocaleString()}`
            }
            change={totalDonations?.thirtyDayStats?.change || ""}
            description={totalDonations?.thirtyDayStats?.description || ""}
            icon="💰"
            onRefresh={refetchTotalDonations}
            isRefreshing={isRefetchingTotal}
          />
        )}
        {hasModuleAccess("volunteers") && (
        <DashboardCard
          title="Active Volunteers"
            value={recentActivities?.activeCount?.toString() || "0"}
            change={recentActivities?.change || "0%"}
            description={recentActivities?.description || ""}
          icon="👥"
            onRefresh={refetchRecentActivities}
            isRefreshing={isRefetchingActivities}
        />
        )}
        {hasModuleAccess("projects") && (
        <DashboardCard
          title="Ongoing Projects"
            value={recentActivities?.ongoingProjects?.toString() ?? "0"}
            change={recentActivities?.change ?? "0%"}
            description={recentActivities?.description ?? ""}
          icon="📋"
            onRefresh={refetchRecentActivities}
            isRefreshing={isRefetchingActivities}
        />
        )}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Donation Overview Card */}
        {hasModuleAccess("donations") && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Donation Overview</CardTitle>
              <button
                onClick={() => refetchDonationOverview()}
                disabled={isRefetchingOverview}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Refresh donation overview"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isRefetchingOverview ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {isOverviewLoading || isRefetchingOverview ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-4 w-[80px]" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : isOverviewError ? (
              <div className="text-red-500 py-4 text-center">
                Failed to load data.{" "}
                <button
                  onClick={() => refetchDonationOverview}
                  className="text-blue-500 hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {donationOverview?.data.map((donation) => (
                  <div key={donation.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {donation.name}
                      </span>
                      <span className="text-sm font-medium">
                          ₹{donation.amount?.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={donation.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {/* Recent Activities Card */}
        {hasModuleAccess("activities") && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Activities</CardTitle>
              <button
                onClick={() => refetchRecentActivities()}
                disabled={isRefetchingActivities}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Refresh recent activities"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isRefetchingActivities ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>

          <CardContent>
            {isActivitiesLoading || isRefetchingActivities ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                ))}
              </div>
            ) : isActivitiesError ? (
              <div className="text-red-500 py-4 text-center">
                Failed to load recent activities.{" "}
                <button
                  onClick={() => refetchRecentActivities()}
                  className="text-blue-500 hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities?.data?.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    title={activity.title}
                    description={activity.description}
                      time={new Date(activity.time)?.toLocaleString()}
                    type={activity.type}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        )}
      </div>

      {/* Quick Actions Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {filteredModules.map((module) => (
            <ActionButton
                key={module.href}
                title={module.label}
                description={`Manage ${module.label.toLowerCase()}`}
                icon={module.icon}
                href={module.href}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Reports */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volunteers">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              <TabsContent value="volunteers" className="py-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <StatCard title="Total Volunteers" value={recentActivities?.activeCount?.toString() || "0"} />
                  <StatCard title="New This Month" value={recentActivities?.newThisMonth?.toString() || "0"} />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Name</th>
                        <th className="text-left py-3 px-2">Program</th>
                        <th className="text-left py-3 px-2">Location</th>
                        <th className="text-left py-3 px-2">Hours</th>
                        <th className="text-left py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities?.activeVolunteers?.map((volunteer, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">{volunteer.name}</td>
                          <td className="py-2 px-2">{volunteer.program}</td>
                          <td className="py-2 px-2">{volunteer.location}</td>
                          <td className="py-2 px-2">{volunteer.hours}</td>
                        <td className="py-2 px-2">
                            <StatusBadge status={volunteer.status} />
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="donations" className="py-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <StatCard title="Total Amount" value={totalDonations?.totalAmount?.toLocaleString() || "0"} />
                  <StatCard title="Average Donation" value={totalDonations?.averageDonation?.toLocaleString() || "0"} />
                  <StatCard title="Recurring Donors" value={totalDonations?.recurringDonors?.toString() || "0"} />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Donor</th>
                        <th className="text-left py-3 px-2">Amount</th>
                        <th className="text-left py-3 px-2">Project</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-left py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalDonations?.recentDonations?.map((donation, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">{donation.donor}</td>
                          <td className="py-2 px-2">{donation.amount?.toLocaleString()}</td>
                          <td className="py-2 px-2">{donation.project}</td>
                          <td className="py-2 px-2">{new Date(donation.date)?.toLocaleDateString()}</td>
                        <td className="py-2 px-2">
                            <StatusBadge status={donation.status} />
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="events" className="py-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <StatCard title="Upcoming Events" value={recentActivities?.upcomingEvents?.length?.toString() || "0"} />
                  <StatCard title="Past Events" value={recentActivities?.pastEvents?.length?.toString() || "0"} />
                  <StatCard title="Registered Attendees" value={recentActivities?.registeredAttendees?.toString() || "0"} />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Event Name</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-left py-3 px-2">Location</th>
                        <th className="text-left py-3 px-2">Attendees</th>
                        <th className="text-left py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities?.upcomingEvents?.map((event, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">{event.title}</td>
                          <td className="py-2 px-2">{new Date(event.startDateTime)?.toLocaleDateString()}</td>
                          <td className="py-2 px-2">{event.location}</td>
                          <td className="py-2 px-2">{event.attendees?.length?.toString()}</td>
                        <td className="py-2 px-2">
                          <StatusBadge status="upcoming" />
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="projects" className="py-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <StatCard title="Active Projects" value={recentActivities?.activeProjects?.length?.toString() || "0"} />
                  <StatCard title="Completed Projects" value={recentActivities?.completedProjects?.length?.toString() || "0"} />
                  <StatCard title="Beneficiaries" value={recentActivities?.beneficiaries?.toLocaleString() || "0"} />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Project Name</th>
                        <th className="text-left py-3 px-2">Category</th>
                        <th className="text-left py-3 px-2">Location</th>
                        <th className="text-left py-3 px-2">Budget</th>
                        <th className="text-left py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities?.activeProjects?.map((project, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">{project.title}</td>
                          <td className="py-2 px-2">{project.category}</td>
                          <td className="py-2 px-2">{project.location}</td>
                          <td className="py-2 px-2">{project.budget?.toLocaleString()}</td>
                        <td className="py-2 px-2">
                          <StatusBadge status="active" />
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Dashboard Card Component with Refresh
interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  description,
  icon,
  onRefresh,
  isRefreshing,
}) => {
  const isPositive = change.startsWith("+");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              {onRefresh && (
                <button
                  onClick={() => onRefresh()}
                  disabled={isRefreshing}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={`Refresh ${title} data`}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </button>
              )}
            </div>
            <div className="flex items-baseline mt-1">
              <h3 className="text-2xl font-bold">{value}</h3>
              {change && (
                <span
                  className={`ml-2 text-sm font-medium ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {change}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem: React.FC<{
  title: string;
  description: string;
  time: string;
  type: "donation" | "volunteer" | "project" | "certificate" | "content";
}> = ({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case "donation":
        return "💰";
      case "volunteer":
        return "👥";
      case "project":
        return "📋";
      case "certificate":
        return "📜";
      case "content":
        return "📝";
      default:
        return "📣";
    }
  };

  return (
    <div className="flex gap-3">
      <div className="text-xl">{getIcon()}</div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}> = ({ title, description, icon, href }) => {
  const [, navigate] = useLocation();
  
  return (
    <button 
      onClick={() => navigate(href)}
      className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer w-full"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </button>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
}> = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
};

const StatusBadge: React.FC<{
  status: string;
}> = ({ status }) => {
  let color = "bg-gray-100 text-gray-800";

  switch (status) {
    case "active":
    case "completed":
      color = "bg-green-100 text-green-800";
      break;
    case "pending":
    case "processing":
    case "upcoming":
      color = "bg-blue-100 text-blue-800";
      break;
    case "inactive":
    case "failed":
      color = "bg-red-100 text-red-800";
      break;
  }

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default AdminDashboard;
