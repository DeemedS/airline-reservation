import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname

  const isPrivatePath = path === '/myaccount' || path.startsWith('/myaccount/')

  const isPublicPath = path === '/login' || path === '/signup'


  const token = request.cookies.get('token')?.value || ''

  const adminToken = request.cookies.get('adminToken')?.value || ''

  const flightDataToken = request.cookies.get('flightData')?.value || ''

  const bookingDataToken = request.cookies.get('booking')?.value || ''

  const guestInfo = request.cookies.get('guestInfo')?.value || ''



  if (path.startsWith('/admin/') && !adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/myaccount', request.url))
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (path === '/guest-info' && !flightDataToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (path === '/add-ons' && !guestInfo) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (path === '/payment' && !bookingDataToken) {
    return NextResponse.redirect(new URL('/', request.url))
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/guest-info',
    '/add-ons',
    '/payment',
    '/search-flight/',
    '/myaccount/:path*', // matches /myaccount/anything/else
    '/admin/:path*', // matches /admin/anything/else
  ]
  
}