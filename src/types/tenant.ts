export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  settings: {
    defaultCurrency: string;
    defaultLanguage: string;
    timeZone: string;
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  userId: string;
  role: "owner" | "admin" | "user";
  createdAt: string;
  updatedAt: string;
  active: boolean;
}
