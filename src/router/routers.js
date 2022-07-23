export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../UserLayout/Login')
    },
    {
        path: '/navbar',
        name: 'Navbar',
        component: () => import('../views/navbar/Navbar')
    },
    {
        path: '/teachers',
        name: 'Teachers',
        component: () => import('../views/Main/Teachers')
    },
    {
        path: '/rooms',
        name: 'Rooms',
        component: () => import('../views/Main/Rooms')
    },
    {
        path: '/subjects',
        name: 'Subjects',
        component: () => import('../views/Main/Subjects')
    },
    {
        path: '/students',
        name: 'Students',
        component: () => import('../views/Main/Students')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Main/Settings')
    }
];