import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AddContractDialog from "@/components/cuscon/AddContractDialog";
import { Contract } from "@/types/contract";

export default function ContractPage() {
  const [contracts, setContracts] = React.useState<Contract[]>([
    {
      id: "1",
      contractNumber: "CNT-001",
      partnerId: "PTR-001",
      partnerName: "Acme Airlines",
      documentUrl: "#",
      status: "active",
      createdAt: "2024-03-28T10:00:00Z",
      updatedAt: "2024-03-28T10:00:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAddContract = (
    newContract: Omit<Contract, "id" | "createdAt" | "updatedAt">,
  ) => {
    const now = new Date().toISOString();
    setContracts([
      ...contracts,
      {
        ...newContract,
        id: String(contracts.length + 1),
        createdAt: now,
        updatedAt: now,
      },
    ]);
  };

  const handleDelete = (id: string) => {
    setContracts(contracts.filter((contract) => contract.id !== id));
  };

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.contractNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contract.partnerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contracts</h1>
          <AddContractDialog onAdd={handleAddContract} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search contracts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Number</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      {contract.contractNumber}
                    </TableCell>
                    <TableCell>{contract.partnerName}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:text-primary"
                      >
                        <a
                          href={contract.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(contract.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(contract.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={contract.status === "active"}
                        onCheckedChange={() => {
                          setContracts(
                            contracts.map((c) =>
                              c.id === contract.id
                                ? {
                                    ...c,
                                    status:
                                      c.status === "active"
                                        ? "inactive"
                                        : "active",
                                    updatedAt: new Date().toISOString(),
                                  }
                                : c,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:text-primary"
                        >
                          <a
                            href={contract.documentUrl}
                            download={`${contract.contractNumber}.pdf`}
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(contract.id)}
                          className="hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
