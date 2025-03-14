import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard | BruceLeads',
  description: 'Manage your leads and campaigns',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name}!
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats Cards */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-sm font-medium text-gray-500">Total Leads</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">1,234</div>
          <div className="mt-1 text-sm text-green-600">+12% from last month</div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-sm font-medium text-gray-500">Qualified Leads</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">567</div>
          <div className="mt-1 text-sm text-green-600">+8% from last month</div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-sm font-medium text-gray-500">Conversion Rate</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">45.8%</div>
          <div className="mt-1 text-sm text-green-600">+3% from last month</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">New lead added</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Lead status updated</div>
                <div className="text-sm text-gray-500">4 hours ago</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Task completed</div>
                <div className="text-sm text-gray-500">6 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Follow up with John Doe</div>
                <div className="text-sm text-gray-500">Due tomorrow</div>
              </div>
              <div className="text-sm text-orange-500">High Priority</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Review lead scores</div>
                <div className="text-sm text-gray-500">Due in 2 days</div>
              </div>
              <div className="text-sm text-yellow-500">Medium Priority</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Update campaign settings</div>
                <div className="text-sm text-gray-500">Due in 3 days</div>
              </div>
              <div className="text-sm text-blue-500">Low Priority</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
