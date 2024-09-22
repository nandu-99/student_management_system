import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineAssignment,
  MdOutlineEventNote,
  MdEmojiEvents
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Profile from 'views/admin/profile';
import RTL from 'views/admin/rtl';
import CalendarPage from 'views/admin/leaves';
import Contests from 'views/admin/contests';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Settings from 'views/admin/results';
import Attendance from 'views/admin/attendance';
import SignOut from 'views/auth/signout';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Attendance',
    layout: '/admin',
    path: '/attendance',
    icon: (
      <Icon
        as={MdOutlineAssignment}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Attendance />,
    secondary: true,
  },
  {
    name: 'Results',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/results',
    component: <Settings />,
  },
  {
    name: 'Leaves', 
    layout: '/admin',
    path: '/leaves',
    icon: (
      <Icon
        as={MdOutlineEventNote}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <CalendarPage />,
  },
  {
    name: 'Contests', 
    layout: '/admin',
    path: '/contests',
    icon: (
      <Icon
        as={MdEmojiEvents}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Contests />, 
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Sign Out',
    layout: '/admin',
    path: '/sign-out',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component:  <SignOut />,
  }
];

export default routes;
