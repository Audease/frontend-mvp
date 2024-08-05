'use server'
 
import { cookies } from 'next/headers'
 
export default async function create() {

  const cookieStore = cookies()
  const serverAccessToken = cookieStore.get('serverAccessToken')?.value
  return console.log(serverAccessToken)
}