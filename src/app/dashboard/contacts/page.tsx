'use client';

import { Shell } from '@/components/ui/Shell';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Linkedin,
  MessageSquare,
  Star,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

const contacts = [
  {
    id: 1,
    name: 'John Smith',
    title: 'VP of Sales',
    company: 'Acme Corporation',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johnsmith',
    status: 'engaged',
    lastContact: '2 days ago',
    engagement: [
      {
        type: 'email',
        description: 'Replied to product demo email',
        date: '2 days ago',
        status: 'positive',
      },
      {
        type: 'linkedin',
        description: 'Viewed your profile',
        date: '3 days ago',
        status: 'neutral',
      },
    ],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'CTO',
    company: 'TechStart Inc',
    email: 'sarah.j@techstart.io',
    phone: '+1 (555) 987-6543',
    linkedin: 'linkedin.com/in/sarahjohnson',
    status: 'new',
    lastContact: 'Never',
    engagement: [],
  },
  {
    id: 3,
    name: 'Michael Chen',
    title: 'Head of Engineering',
    company: 'DataFlow Systems',
    email: 'mchen@dataflow.com',
    phone: '+1 (555) 456-7890',
    linkedin: 'linkedin.com/in/michaelchen',
    status: 'responded',
    lastContact: '1 week ago',
    engagement: [
      {
        type: 'call',
        description: 'Discovery call completed',
        date: '1 week ago',
        status: 'positive',
      },
      {
        type: 'email',
        description: 'Scheduled follow-up meeting',
        date: '1 week ago',
        status: 'positive',
      },
    ],
  },
];

const filters = [
  { name: 'All Contacts', value: 'all' },
  { name: 'Engaged', value: 'engaged' },
  { name: 'Responded', value: 'responded' },
  { name: 'New', value: 'new' },
];

const roles = [
  'All Roles',
  'C-Level',
  'VP',
  'Director',
  'Manager',
  'Individual Contributor',
];

export default function ContactsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Shell>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Users className="h-6 w-6 mr-2 text-gray-400" />
              Contacts
            </h1>
            <Button className="flex items-center">
              <Plus className="h-5 w-5 mr-1" />
              Add Contact
            </Button>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-5 w-5 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedFilter === filter.value
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Contacts List */}
          <div className="mt-6 space-y-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-lg font-medium text-blue-600">
                              {contact.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            {contact.name}
                          </h2>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{contact.title}</span>
                            <span className="mx-2">&middot;</span>
                            <span className="flex items-center">
                              <Building2 className="h-4 w-4 mr-1" />
                              {contact.company}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contact.status === 'engaged'
                              ? 'bg-green-100 text-green-800'
                              : contact.status === 'responded'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {contact.status.charAt(0).toUpperCase() +
                            contact.status.slice(1)}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        {contact.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2" />
                        {contact.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Linkedin className="h-4 w-4 mr-2" />
                        {contact.linkedin}
                      </div>
                    </div>

                    {/* Engagement History */}
                    {contact.engagement.length > 0 && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-gray-400" />
                          Recent Engagement
                        </h3>
                        <div className="space-y-2">
                          {contact.engagement.map((event, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center">
                                {event.type === 'email' ? (
                                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                                ) : event.type === 'call' ? (
                                  <Phone className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <Linkedin className="h-4 w-4 text-blue-600 mr-2" />
                                )}
                                <span className="text-gray-600">
                                  {event.description}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-gray-400 mr-2">
                                  {event.date}
                                </span>
                                {event.status === 'positive' && (
                                  <Star className="h-4 w-4 text-yellow-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
} 