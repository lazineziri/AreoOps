import React, { createContext, useContext, useEffect, useState } from "react";
import { Tenant } from "@/types/tenant";
import { getCurrentTenant, setCurrentTenant } from "@/lib/tenant";

interface TenantContextType {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant) => void;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  setTenant: () => {},
  loading: true,
});

export function useTenant() {
  return useContext(TenantContext);
}

interface TenantProviderProps {
  children: React.ReactNode;
}

export function TenantProvider({ children }: TenantProviderProps) {
  const [tenant, setTenantState] = useState<Tenant | null>(getCurrentTenant());
  const [loading, setLoading] = useState(true);

  const setTenant = (newTenant: Tenant) => {
    setCurrentTenant(newTenant);
    setTenantState(newTenant);
  };

  useEffect(() => {
    // Here you would typically:
    // 1. Get tenant from URL/hostname
    // 2. Fetch tenant data from API
    // 3. Set the tenant
    setLoading(false);
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, setTenant, loading }}>
      {children}
    </TenantContext.Provider>
  );
}
