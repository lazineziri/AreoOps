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
import { Search, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PricingProfile } from "@/types/pricing";
import AddProfileDialog from "@/components/pricing/AddProfileDialog";
import EditProfileDialog from "@/components/pricing/EditProfileDialog";

export default function PricingProfilesPage() {
  const [profiles, setProfiles] = React.useState<PricingProfile[]>([
    {
      id: "1",
      code: "STD",
      name: "Standard Pricing",
      description: "Standard pricing profile for regular routes",
      active: true,
      classes: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingProfile, setEditingProfile] =
    React.useState<PricingProfile | null>(null);

  const handleAddProfile = (
    newProfile: Omit<PricingProfile, "id" | "classes">,
  ) => {
    setProfiles([
      ...profiles,
      { ...newProfile, id: String(profiles.length + 1), classes: [] },
    ]);
  };

  const handleUpdateProfile = (updatedProfile: PricingProfile) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile,
      ),
    );
    setEditingProfile(null);
  };

  const handleDelete = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pricing Profiles</h1>
          <AddProfileDialog onAdd={handleAddProfile} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search profiles..."
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
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">
                      {profile.code}
                    </TableCell>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>{profile.description}</TableCell>
                    <TableCell>{profile.classes.length}</TableCell>
                    <TableCell>
                      <Switch
                        checked={profile.active}
                        onCheckedChange={() => {
                          setProfiles(
                            profiles.map((p) =>
                              p.id === profile.id
                                ? { ...p, active: !p.active }
                                : p,
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
                          onClick={() => setEditingProfile(profile)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(profile.id)}
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

        {editingProfile && (
          <EditProfileDialog
            profile={editingProfile}
            open={true}
            onOpenChange={(open) => !open && setEditingProfile(null)}
            onUpdate={handleUpdateProfile}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
