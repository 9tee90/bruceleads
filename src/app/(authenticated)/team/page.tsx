'use client';

import { useState } from 'react';
import { Plus, Mail, UserPlus2, Shield, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending';
  lastActive: string;
  avatar?: string;
}

export default function TeamPage() {
  const [members] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastActive: new Date().toISOString(),
      avatar: '/avatars/john.jpg',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'member',
      status: 'active',
      lastActive: new Date().toISOString(),
      avatar: '/avatars/sarah.jpg',
    },
    {
      id: '3',
      name: 'Mike Brown',
      email: 'mike@example.com',
      role: 'member',
      status: 'pending',
      lastActive: new Date().toISOString(),
    },
  ]);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your team members and their access</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-600/20">
          <UserPlus2 className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1400px] mx-auto">
        {members.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={member.status === 'active' 
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'}
                >
                  {member.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Role</span>
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-indigo-500" />
                      <span className="capitalize">{member.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last Active</span>
                    <span>{new Date(member.lastActive).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3">
                    <Button size="sm" variant="outline" className="flex-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                      <Mail className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                      <Settings2 className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 