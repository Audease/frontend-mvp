"use server";

import { revalidateTag } from "next/cache";

export async function staffRevalidation() {
  revalidateTag("stafflist");
}

export async function rolesRevalidation() {
  revalidateTag("roles");
}

export async function statusRevalidation() {
  revalidateTag("accountStatus");
}

export async function learnerRevalidation() {
  revalidateTag("learnersList");
}

export async function bksdLearnerRevalidation() {
  revalidateTag("bksdLearnersList");
}

export async function accessorLearnerRevalidation() {
  revalidateTag("accessorLearnersList");
}

export async function adminFolderListRevalidation() {
  revalidateTag("adminFolderList");
}

export async function lazerLearnerRevalidation() {
  revalidateTag("lazerLearnersList");
}

export async function certificateLearnerRevalidation() {
  revalidateTag("certificateLearnersList");
}


