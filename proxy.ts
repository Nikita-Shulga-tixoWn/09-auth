import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export function proxy(pathname: string) {
    const cookieStore = cookies();
    const hasSession = cookieStore.has('session');

    if (!hasSession && PRIVATE_ROUTES.some(route => pathname.startsWith(route))) {
        redirect('/sign-in');
    }

    if (hasSession && AUTH_ROUTES.includes(pathname)) {
        redirect('/profile');
    }
}
