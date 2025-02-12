import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import { TenantProvider } from "@/components/TenantProvider";

// Module imports
import Home from "./components/home";

// Aircraft Module
import AircraftPage from "./pages/aircraft";
import AircraftSeatmapPage from "./pages/aircraft/seatmap";
import AircraftLayoutPage from "./pages/aircraft/layout";

// Count/Dest Module
import DestinationPage from "./pages/count-dest/destination";
import AirportPage from "./pages/count-dest/airport";
import UtcZonePage from "./pages/count-dest/utc";
import CountryPage from "./pages/count-dest/country";
import CurrencyPage from "./pages/count-dest/currency";
import DaylightSavingPage from "./pages/count-dest/daylight";
import LanguagePage from "./pages/count-dest/language";

// Cuscon Module
import ContractPage from "./pages/cuscon/contract";
import AllotmentPage from "./pages/cuscon/allotment";
import CusconSettingsPage from "./pages/cuscon/settings";

// Flight Module
import FlightPage from "./pages/flight";
import PlannedFlightPage from "./pages/flight/planned";
import FlightConfigurationPage from "./pages/flight/configuration";
import FlightInstancesPage from "./pages/flight/instances";
import AncillaryPage from "./pages/ancillary";
import PricingSeasonsPage from "./pages/pricing/seasons";
import PricingProfilesPage from "./pages/pricing/profiles";
import PricingClassesPage from "./pages/pricing/classes";
import PricingSeatReservationPage from "./pages/pricing/seat-reservation";
import PricingCombinationsPage from "./pages/pricing/combinations";
import PricingTaxPage from "./pages/pricing/tax";
import PricingPolicyPage from "./pages/pricing/policy";

function App() {
  return (
    <TenantProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p>Loading...</p>
          </div>
        }
      >
        <div className="min-h-screen">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Aircraft Module */}
            <Route path="/aircraft-seatmap" element={<AircraftSeatmapPage />} />
            <Route path="/aircraft" element={<AircraftPage />} />
            <Route path="/aircraft-layout" element={<AircraftLayoutPage />} />

            {/* Count/Dest Module */}
            <Route path="/destination" element={<DestinationPage />} />
            <Route path="/airport" element={<AirportPage />} />
            <Route path="/utc" element={<UtcZonePage />} />
            <Route path="/country" element={<CountryPage />} />
            <Route path="/currency" element={<CurrencyPage />} />
            <Route path="/daylight" element={<DaylightSavingPage />} />
            <Route path="/language" element={<LanguagePage />} />

            {/* Cuscon Module */}
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/allotment" element={<AllotmentPage />} />
            <Route path="/cuscon/settings" element={<CusconSettingsPage />} />

            {/* Flight Module */}
            <Route path="/flight" element={<FlightPage />} />
            <Route path="/planned-flight" element={<PlannedFlightPage />} />
            <Route path="/flight/instances" element={<FlightInstancesPage />} />
            <Route
              path="/flight/configuration"
              element={<FlightConfigurationPage />}
            />

            {/* Ancillary Module */}
            <Route path="/ancillary" element={<AncillaryPage />} />

            {/* Pricing Module */}
            <Route path="/pricing/seasons" element={<PricingSeasonsPage />} />
            <Route path="/pricing/profiles" element={<PricingProfilesPage />} />
            <Route path="/pricing/classes" element={<PricingClassesPage />} />
            <Route
              path="/pricing/seat-reservation"
              element={<PricingSeatReservationPage />}
            />
            <Route
              path="/pricing/combinations"
              element={<PricingCombinationsPage />}
            />
            <Route path="/pricing/tax" element={<PricingTaxPage />} />
            <Route path="/pricing/policy" element={<PricingPolicyPage />} />
          </Routes>

          {/* Tempo routes for development */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </div>
      </Suspense>
    </TenantProvider>
  );
}

export default App;
