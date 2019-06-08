import { NbMenuItem } from '@nebular/theme';
import { icons } from 'eva-icons';

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
        title: 'Sell Product',
        icon: 'nb-e-commerce',
        link: '/pages/postproduct',
    },
    {
        title: 'Cart',
        icon: 'eva eva-shopping-cart-outline',
        link: '/pages/cart',
    },
    {
        title: 'Manage Category',
        icon: 'nb-list',
        children: [
            {
                title: 'Address',
                link: '/pages/category/address',
            },
            {
                title: 'Product',
                link: '/pages/category/product',
            },
            {
                title: 'Lookup',
                link: '',
            },
        ]
    },
    {
        title: 'Manage User',
        icon: 'eva eva-people-outline',
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