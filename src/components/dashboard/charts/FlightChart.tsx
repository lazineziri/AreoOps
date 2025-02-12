import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function FlightChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Completed",
        data: [180, 175, 190, 185, 195, 210, 200],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Delayed",
        data: [10, 15, 8, 12, 9, 11, 13],
        backgroundColor: "rgba(234, 179, 8, 0.5)",
      },
      {
        label: "Cancelled",
        data: [2, 1, 3, 2, 1, 2, 1],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Flight Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar options={options} data={data} height={300} />
      </CardContent>
    </Card>
  );
}
