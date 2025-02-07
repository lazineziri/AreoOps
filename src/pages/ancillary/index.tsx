import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, Package, Ticket } from "lucide-react";
import FareBrands from "@/components/ancillary/FareBrands";
import Services from "@/components/ancillary/Services";
import Vouchers from "@/components/ancillary/Vouchers";

export default function AncillaryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ancillary Management</h1>
        </div>

        <Card className="p-6 bg-white">
          <Tabs defaultValue="fare-brands" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger
                value="fare-brands"
                className="flex items-center gap-2"
              >
                <Tag className="h-4 w-4" />
                Fare Brands
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="vouchers" className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Vouchers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fare-brands">
              <FareBrands />
            </TabsContent>

            <TabsContent value="services">
              <Services />
            </TabsContent>

            <TabsContent value="vouchers">
              <Vouchers />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
