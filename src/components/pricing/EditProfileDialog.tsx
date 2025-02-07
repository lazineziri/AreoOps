import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PricingProfile } from "@/types/pricing";

interface EditProfileDialogProps {
  profile: PricingProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (profile: PricingProfile) => void;
}

export default function EditProfileDialog({
  profile,
  open,
  onOpenChange,
  onUpdate,
}: EditProfileDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedProfile: PricingProfile = {
      ...profile,
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      active: formData.get("active") === "on",
    };

    onUpdate(updatedProfile);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Profile Code</Label>
              <Input
                id="code"
                name="code"
                defaultValue={profile.code}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profile.name}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={profile.description}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch
                id="active"
                name="active"
                defaultChecked={profile.active}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
