'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { useSession } from 'next-auth/react'

export default function AdminDashboard() {
    const { data: session, status } = useSession({})
    if (status == "loading") return "Loading";

    return (
        <ProtectedRoute accessId={2}>
            <div className=''>admin dashboard</div>
        </ProtectedRoute>
    )
}
