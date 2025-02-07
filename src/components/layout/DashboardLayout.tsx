import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Plane,
  Map,
  Calendar,
  Users,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  Building2,
  Clock,
  Package,
  DollarSign,
  CalendarDays,
  ListFilter,
  Layers,
  Armchair,
  Combine,
  Receipt,
  FileText,
} from "lucide-react";
import Header from "@/components/dashboard/Header";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/",
  },
  {
    title: "Aircraft",
    icon: <Plane className="h-5 w-5" />,
    href: "/aircraft",
    subItems: [
      {
        title: "Aircraft List",
        icon: <Plane className="h-5 w-5" />,
        href: "/aircraft",
      },
      {
        title: "Aircraft Layout",
        icon: <Map className="h-5 w-5" />,
        href: "/aircraft-layout",
      },
      {
        title: "Aircraft Seatmap",
        icon: <Map className="h-5 w-5" />,
        href: "/aircraft-seatmap",
      },
    ],
  },
  {
    title: "Count/Dest",
    icon: <Globe className="h-5 w-5" />,
    href: "/destination",
    subItems: [
      {
        title: "Destination",
        icon: <Map className="h-5 w-5" />,
        href: "/destination",
      },
      {
        title: "Airport",
        icon: <Plane className="h-5 w-5" />,
        href: "/airport",
      },
      {
        title: "UTC Zone",
        icon: <Clock className="h-5 w-5" />,
        href: "/utc",
      },
      {
        title: "Country",
        icon: <Globe className="h-5 w-5" />,
        href: "/country",
      },
      {
        title: "Currency",
        icon: <Building2 className="h-5 w-5" />,
        href: "/currency",
      },
      {
        title: "Daylight Saving",
        icon: <Clock className="h-5 w-5" />,
        href: "/daylight",
      },
      {
        title: "Language",
        icon: <Globe className="h-5 w-5" />,
        href: "/language",
      },
    ],
  },
  {
    title: "Cuscon",
    icon: <Users className="h-5 w-5" />,
    href: "/contract",
    subItems: [
      {
        title: "Contract",
        icon: <Building2 className="h-5 w-5" />,
        href: "/contract",
      },
      {
        title: "Allotment",
        icon: <Users className="h-5 w-5" />,
        href: "/allotment",
      },
      {
        title: "Settings",
        icon: <Settings className="h-5 w-5" />,
        href: "/cuscon/settings",
      },
    ],
  },
  {
    title: "Flight",
    icon: <Calendar className="h-5 w-5" />,
    href: "/flight",
    subItems: [
      {
        title: "Flight",
        icon: <Plane className="h-5 w-5" />,
        href: "/flight",
      },
      {
        title: "Planned Flight",
        icon: <Calendar className="h-5 w-5" />,
        href: "/planned-flight",
      },
      {
        title: "Flight Instances",
        icon: <CalendarDays className="h-5 w-5" />,
        href: "/flight/instances",
      },
      {
        title: "Configuration",
        icon: <Settings className="h-5 w-5" />,
        href: "/flight/configuration",
      },
    ],
  },
  {
    title: "Ancillary",
    icon: <Package className="h-5 w-5" />,
    href: "/ancillary",
  },
  {
    title: "Pricing",
    icon: <DollarSign className="h-5 w-5" />,
    href: "/pricing",
    subItems: [
      {
        title: "Seasons",
        icon: <CalendarDays className="h-5 w-5" />,
        href: "/pricing/seasons",
      },
      {
        title: "Profiles",
        icon: <ListFilter className="h-5 w-5" />,
        href: "/pricing/profiles",
      },
      {
        title: "Classes",
        icon: <Layers className="h-5 w-5" />,
        href: "/pricing/classes",
      },
      {
        title: "Seat Reservation",
        icon: <Armchair className="h-5 w-5" />,
        href: "/pricing/seat-reservation",
      },
      {
        title: "Combinations",
        icon: <Combine className="h-5 w-5" />,
        href: "/pricing/combinations",
      },
      {
        title: "Tax",
        icon: <Receipt className="h-5 w-5" />,
        href: "/pricing/tax",
      },
      {
        title: "Policy",
        icon: <FileText className="h-5 w-5" />,
        href: "/pricing/policy",
      },
    ],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = location.pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.title);

    return (
      <div key={item.href} className="space-y-1">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start",
            collapsed ? "px-2" : "px-4",
            level > 0 && !collapsed && "pl-8",
          )}
          onClick={() => {
            if (hasSubItems) {
              toggleExpand(item.title);
            } else {
              navigate(item.href);
            }
          }}
        >
          {item.icon}
          {!collapsed && <span className="ml-2">{item.title}</span>}
        </Button>
        {hasSubItems && isExpanded && !collapsed && (
          <div className="ml-4 space-y-1">
            {item.subItems.map((subItem) => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <div className="p-4 flex flex-col h-full">
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => renderNavItem(item))}
            </nav>
            <div className="border-t border-gray-200 pt-4">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300",
            collapsed ? "ml-16" : "ml-64",
          )}
        >
          <div className="container p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
