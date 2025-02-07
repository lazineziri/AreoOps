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
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Route, Stop } from "@/types/route";

interface AddRouteDialogProps {
  onAdd: (route: Omit<Route, "id">) => void;
}

export default function AddRouteDialog({ onAdd }: AddRouteDialogProps) {
  const [open, setOpen] = useState(false);
  const [hasStops, setHasStops] = useState(false);
  const [stops, setStops] = useState<Omit<Stop, "order">[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const route: Omit<Route, "id"> = {
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      stops: stops.map((stop, index) => ({
        ...stop,
        order: index + 1,
      })),
      distance: formData.get("distance") as string,
      duration: formData.get("duration") as string,
    };

    onAdd(route);
    setOpen(false);
    form.reset();
    setStops([]);
    setHasStops(false);
  };

  const addStop = () => {
    setStops([...stops, { airport: "", groundTime: "60" }]);
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const updateStop = (index: number, field: keyof Stop, value: string) => {
    setStops(
      stops.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop,
      ),
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Route
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="origin">Origin Airport</Label>
              <Input id="origin" name="origin" placeholder="JFK" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="destination">Destination Airport</Label>
              <Input
                id="destination"
                name="destination"
                placeholder="LAX"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                name="distance"
                placeholder="2,475 miles"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="5h 30m"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasStops"
              checked={hasStops}
              onCheckedChange={(checked) => setHasStops(checked as boolean)}
            />
            <Label htmlFor="hasStops">This is a multi-leg route</Label>
          </div>

          {hasStops && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Intermediate Stops</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addStop}
                  className="gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Stop
                </Button>
              </div>

              {stops.map((stop, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr,120px,40px] gap-4 items-end"
                >
                  <div className="grid gap-2">
                    <Label>Airport</Label>
                    <Input
                      value={stop.airport}
                      onChange={(e) =>
                        updateStop(index, "airport", e.target.value)
                      }
                      placeholder="Airport code"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Ground Time (min)</Label>
                    <Input
                      type="number"
                      min="30"
                      value={stop.groundTime}
                      onChange={(e) =>
                        updateStop(index, "groundTime", e.target.value)
                      }
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStop(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full">
            Add Route
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
