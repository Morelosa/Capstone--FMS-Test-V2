// MenuItems.js

export const AuthMenuItems = [
  {
    title: 'John Smith',
    cName: 'user-info big-font', // Add the 'big-font' class here
    icon: 'fa-solid fa-user',
    customClass: 'user-icon' // Custom class for the user icon
  },
  {
    title: 'Exercises',
    url: '/ExercisesComponents',
    cName: 'nav-links',
    icon: 'fa-solid fa-person-walking'
  },
  {
    title: 'Tests',
    url: '/StartTest',
    cName: 'nav-links',
    icon: 'fa-solid fa-circle-check'
  },
  {
    title: 'Test Result',
    url: '/TestResult',
    cName: 'nav-links',
    icon: 'fa-solid fa-poll'
  },
  {
    title: 'My Account',
    url: '/MyAccount',
    cName: 'nav-links',
    icon: 'fa-solid fa-user-circle'
  },
  {
    title: 'Logout',
    url: '/',
    cName: 'nav-links',
    icon: 'fa-solid fa-sign-out-alt'
  }
];
