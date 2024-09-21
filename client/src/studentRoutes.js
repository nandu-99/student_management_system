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
import MainDashboard from 'views/student/default';
import Attendance from 'views/student/attendance';
import Profile from 'views/student/profile';
import CalendarPage from 'views/student/leaves';
import Contests from 'views/student/contests';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Settings from 'views/student/results';
import SignOut from 'views/auth/signIn/signout';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/student',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Attendance',
    layout: '/student',
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
    layout: '/student',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/results',
    component: <Settings />,
  },
  {
    name: 'Leaves', 
    layout: '/student',
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
    layout: '/student',
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
    layout: '/student',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  }
];

const isLoggedIn = localStorage.getItem('token');

if (isLoggedIn) {
  routes.push({
    name: 'Sign Out',
    layout: '/student',
    path: '/sign-out',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignOut/>
  });
} else {
  routes.push({
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  });
}

export default routes;
