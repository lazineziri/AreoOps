import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { Contract } from "@/types/contract";

interface AddContractDialogProps {
  onAdd: (contract: Omit<Contract, "id" | "createdAt" | "updatedAt">) => void;
}

export default function AddContractDialog({ onAdd }: AddContractDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const contract: Omit<Contract, "id" | "createdAt" | "updatedAt"> = {
      contractNumber: formData.get("contractNumber") as string,
      partnerId: formData.get("partnerId") as string,
      partnerName: formData.get("partnerName") as string,
      documentUrl: selectedFile ? URL.createObjectURL(selectedFile) : "",
      status: "active",
    };

    onAdd(contract);
    setOpen(false);
    form.reset();
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Contract
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Contract</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contractNumber">Contract Number</Label>
              <Input
                id="contractNumber"
                name="contractNumber"
                placeholder="CNT-001"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="partnerId">Partner ID</Label>
              <Input
                id="partnerId"
                name="partnerId"
                placeholder="PTR-001"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="partnerName">Partner Name</Label>
              <Input
                id="partnerName"
                name="partnerName"
                placeholder="Partner Company Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="document">Contract Document</Label>
              <div className="flex gap-2">
                <Input
                  id="document"
                  name="document"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedFile(file);
                  }}
                  required
                />
                {selectedFile && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Contract
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
