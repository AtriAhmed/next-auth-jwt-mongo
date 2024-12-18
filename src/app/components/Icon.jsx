import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import React from 'react'

export default function Icon({icon, styles}) {

switch (icon){
    case 'home': return <HomeIcon className={styles} />;
    case 'users': return <UsersIcon className={styles} />
}
}
