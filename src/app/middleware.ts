import { getSession } from '@/lib/actions';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = await getSession();
    if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/dashboard*', '/users/*'],
}