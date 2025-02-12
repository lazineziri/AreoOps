import { Tenant } from "@/types/tenant";

let currentTenant: Tenant | null = null;

export function setCurrentTenant(tenant: Tenant) {
  currentTenant = tenant;
}

export function getCurrentTenant(): Tenant | null {
  return currentTenant;
}

export function getTenantFromHostname(hostname: string): string | null {
  // Extract tenant slug from subdomain
  const parts = hostname.split(".");
  if (parts.length > 2) {
    return parts[0];
  }
  return null;
}

export function getTenantFromPath(path: string): string | null {
  // Extract tenant slug from path for local development
  const parts = path.split("/");
  if (parts.length > 1 && parts[1] === "tenant") {
    return parts[2];
  }
  return null;
}
