import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'CONFIGURE',
        group: true,
    },
    {
        title: 'Home',
        icon: 'nb-home',
        link: '/pages/home',
    },
    {
        title: 'Manage Category',
        icon: 'nb-locked',
        children: [
            {
                title: 'Address',
                link: '/pages/category/address',
            },
            {
                title: 'Product',
                link: '',
            },
            {
                title: 'Lookup',
                link: '',
            },
        ]
    },
    {
        title: 'Manage User',
        icon: 'nb-locked',
        children: [
            {
                title: 'Role',
                link: '',
            },
            {
                title: 'User',
                link: '',
            },
        ]
    },
    
]