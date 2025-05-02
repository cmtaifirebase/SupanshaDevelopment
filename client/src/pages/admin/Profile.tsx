import React from 'react';
import { useAuth } from '../../context/authContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
            {user.designation && (
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium capitalize">{user.designation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.geo?.country && (
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{user.geo.country}</p>
              </div>
            )}
            {user.geo?.state && (
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{user.geo.state}</p>
              </div>
            )}
            {user.geo?.region && (
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{user.geo.region}</p>
              </div>
            )}
            {user.geo?.district && (
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p className="font-medium">{user.geo.district}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 