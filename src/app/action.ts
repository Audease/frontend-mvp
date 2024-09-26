'use server'
 
import { revalidateTag } from 'next/cache'
 
export async function staffRevalidation() {
  revalidateTag('stafflist')
}


export async function rolesRevalidation() {
    revalidateTag('roles')
  }


  export async function statusRevalidation() {
    revalidateTag('accountStatus')
  }


  export async function learnerRevalidation() {
    revalidateTag('learnersList')
  }
