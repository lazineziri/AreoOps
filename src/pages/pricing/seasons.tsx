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
import { Season } from "@/types/pricing";
import AddSeasonDialog from "@/components/pricing/AddSeasonDialog";
import EditSeasonDialog from "@/components/pricing/EditSeasonDialog";

export default function PricingSeasonsPage() {
  const [seasons, setSeasons] = React.useState<Season[]>([
    {
      id: "1",
      code: "SUMMER24",
      name: "Summer 2024",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      description: "Summer season with peak pricing",
      active: true,
      profiles: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingSeason, setEditingSeason] = React.useState<Season | null>(null);

  const handleAddSeason = (newSeason: Omit<Season, "id" | "profiles">) => {
    setSeasons([
      ...seasons,
      { ...newSeason, id: String(seasons.length + 1), profiles: [] },
    ]);
  };

  const handleUpdateSeason = (updatedSeason: Season) => {
    setSeasons(
      seasons.map((season) =>
        season.id === updatedSeason.id ? updatedSeason : season,
      ),
    );
    setEditingSeason(null);
  };

  const handleDelete = (id: string) => {
    setSeasons(seasons.filter((season) => season.id !== id));
  };

  const filteredSeasons = seasons.filter(
    (season) =>
      season.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      season.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pricing Seasons</h1>
          <AddSeasonDialog onAdd={handleAddSeason} />
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search seasons..."
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
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Profiles</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSeasons.map((season) => (
                  <TableRow key={season.id}>
                    <TableCell className="font-medium">{season.code}</TableCell>
                    <TableCell>{season.name}</TableCell>
                    <TableCell>{season.startDate}</TableCell>
                    <TableCell>{season.endDate}</TableCell>
                    <TableCell>{season.profiles.length}</TableCell>
                    <TableCell>
                      <Switch
                        checked={season.active}
                        onCheckedChange={() => {
                          setSeasons(
                            seasons.map((s) =>
                              s.id === season.id
                                ? { ...s, active: !s.active }
                                : s,
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
                          onClick={() => setEditingSeason(season)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(season.id)}
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

        {editingSeason && (
          <EditSeasonDialog
            season={editingSeason}
            open={true}
            onOpenChange={(open) => !open && setEditingSeason(null)}
            onUpdate={handleUpdateSeason}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
