import { forwardRef, useEffect, useState } from "react";
import { CITIES } from "../cityData";
import { ViewSettingsPanel } from "./ViewSettingsPanel";
import { ViewSettings } from "../viewSettings";

interface CityDetails {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const DropdownItem = ({
  text,
  onClick,
  selected = false,
  setMenuOpen,
}: {
  text: string;
  onClick: () => void;
  selected?: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}) => {
  const conditionalStyle = selected ? "bg-gray-600" : "";
  return (
    <li>
      <button
        className={
          `block px-4 py-2 hover:bg-gray-500 w-full ${conditionalStyle}` +
          " plausible-event-name=City+switch"
        }
        onClick={() => {
          onClick();
          setMenuOpen(false);
        }}
      >
        {text}
      </button>
    </li>
  );
};

export const CitySelector = ({
  cityName,
  setCityName,
  setMenuOpen,
}: {
  cityName: string;
  setCityName: (city: string) => void;
  setMenuOpen: (isOpen: boolean) => void;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(true);

  return (
    <div className="w-full">
      <button
        id="dropdownDefaultButton"
        onClick={() => {
          setDropdownOpen(!isDropdownOpen);
        }}
        className={
          "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:outline-none " +
          " focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center " +
          " inline-flex items-center w-full"
        }
        type="button"
      >
        City{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={
          "z-10 divide-y divide-gray-100 rounded-lg shadow w-full bg-gray-700 h-48 overflow-y-auto " +
          (isDropdownOpen ? "block" : "hidden")
        }
      >
        <ul
          className="py-2 text-sm text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {Object.entries(CITIES).map(([curCityName, curCity]) => (
            <DropdownItem
              text={`${curCity.displayName} (${curCity.mode})`}
              onClick={() => setCityName(curCityName)}
              key={curCityName}
              selected={cityName === curCityName}
              setMenuOpen={setMenuOpen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export type MenuProps = {
  timeness: number;
  setTimeness: (timeness: number) => void;
  isMenuOpen: boolean;
  setMenuOpen: (isMenuOpen: boolean) => void;
  cityName: string;
  setCityName: (cityName: string) => void;
  viewSettings: ViewSettings;
  setViewSettings: (viewSettings: ViewSettings) => void;
};

const ExternalLinks = ({
  cityName,
  coordinates,
}: {
  cityName: string;
  coordinates: { lat: number; lng: number };
}) => {
  const encodedCityName = encodeURIComponent(cityName);
  const googleMapsUrl = `https://www.google.com/maps/place/${encodedCityName}/@${coordinates.lat},${coordinates.lng},12z`;
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodedCityName}`;
  const tripadvisorUrl = `https://www.tripadvisor.com/Search?q=${encodedCityName}`;
  const weatherUrl = `https://www.accuweather.com/en/search-locations?query=${encodedCityName}`;
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodedCityName}`;
  const lonelyPlanetUrl = `https://www.lonelyplanet.com/search?q=${encodedCityName}`;
  const timeoutUrl = `https://www.timeout.com/search?q=${encodedCityName}`;
  const airbnbUrl = `https://www.airbnb.com/s/${encodedCityName}/homes`;

  return (
    <div className="mt-4 space-y-2">
      <div className="text-gray-400 font-medium mb-2">External Links</div>
      <div className="flex flex-wrap gap-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z" />
          </svg>
          Maps
        </a>
        <a
          href={wikipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm hover:bg-gray-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .084-.103.135-.2.157-.74.108-.835.361-.492 1.005.646 1.212 3.636 7.254 4.172 8.286.095.18.261.15.349-.044.601-1.335 2.936-6.468 3.161-7.474.052-.245.025-.411-.221-.411-.71.016-.856.111-.965.398-.075.146-.254.415-.27.434-.072.085-.166.127-.284.127h-.257l.05-.045.028-.013c.563-.005 4.634 0 4.634 0l.023.045v.434c0 .084-.103.135-.2.157-.776.108-.97.361-.525 1.005.642 1.212 2.685 5.254 3.221 6.286.095.18.261.15.349-.044.601-1.335 1.936-4.468 2.161-5.474.052-.245.025-.411-.221-.411-.71.016-.856.111-.965.398-.075.146-.254.415-.27.434-.072.085-.166.127-.284.127h-.257l.05-.045v-.434c0-.084.103-.135.2-.157.776-.108.97-.361.525-1.005-.235-.477-3.886-7.944-4.127-8.452-.159-.331-.297-.419-.741-.419-1.136 0-.559.923-.397 1.763.323 1.696 3.592 7.27 3.592 7.27l3.591-7.27c.462-1.003-.149-1.763-.705-1.763-.157 0-.297.088-.456.419l-4.018 8.452z" />
          </svg>
          Wiki
        </a>
        <a
          href={weatherUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm hover:bg-yellow-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-15c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
          </svg>
          Weather
        </a>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-800 text-white rounded-full text-sm hover:bg-blue-900 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />
          </svg>
          Hotels
        </a>
        <a
          href={airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-15c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
          </svg>
          Airbnb
        </a>
        <a
          href={tripadvisorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.006 0C6.485 0 2 4.485 2 10.006c0 5.52 4.485 10.006 10.006 10.006 5.52 0 10.006-4.485 10.006-10.006C22.012 4.485 17.526 0 12.006 0zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
          Reviews
        </a>
        <a
          href={lonelyPlanetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          Guide
        </a>
        <a
          href={timeoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm hover:bg-pink-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          Events
        </a>
      </div>
    </div>
  );
};

const TrafficInfo = ({ cityName }: { cityName: string }) => {
  const getTrafficInfo = (city: string) => {
    switch (city) {
      case "New York City":
        return {
          transit_type: "Subway, Bus, Train",
          peak_hours: "7:30-9:30 AM, 4:30-6:30 PM",
          traffic_score: "8.9/10",
          main_stations: ["Grand Central", "Penn Station", "Times Square"],
          transit_facts: [
            "Largest subway system in the world by stations",
            "24/7 subway operation",
            "Over 850 miles of subway track",
            "Connects to regional rail networks",
          ],
        };
      case "London":
        return {
          transit_type: "Underground, Bus, Train",
          peak_hours: "8:00-9:30 AM, 4:30-6:00 PM",
          traffic_score: "8.5/10",
          main_stations: ["King's Cross", "Waterloo", "Victoria"],
          transit_facts: [
            "World's oldest underground railway",
            "Iconic double-decker buses",
            "Extensive night bus network",
            "Oyster card payment system",
          ],
        };
      case "Tokyo":
        return {
          transit_type: "Metro, Train, Bus",
          peak_hours: "7:30-9:00 AM, 5:30-7:00 PM",
          traffic_score: "9.5/10",
          main_stations: ["Shinjuku", "Tokyo", "Shibuya"],
          transit_facts: [
            "Most punctual train system globally",
            "Complex but efficient network",
            "Advanced IC card system",
            "Multiple private railway companies",
          ],
        };
      default:
        return {
          transit_type: "Various",
          peak_hours: "Morning and Evening",
          traffic_score: "N/A",
          main_stations: ["Central Station"],
          transit_facts: [
            "Local public transportation available",
            "Multiple transit options",
            "Connected to regional networks",
            "Regular service hours",
          ],
        };
    }
  };

  const trafficData = getTrafficInfo(cityName);

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-blue-300">
          Transit & Traffic
        </h2>
        <span className="text-xs px-2 py-1 bg-blue-900 text-blue-200 rounded-full">
          {trafficData.transit_type}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center py-1 border-b border-gray-600">
          <span className="text-gray-400">Peak Hours</span>
          <span className="text-gray-200">{trafficData.peak_hours}</span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-gray-600">
          <span className="text-gray-400">Transit Score</span>
          <span className="text-gray-200">{trafficData.traffic_score}</span>
        </div>

        <div className="py-1 border-b border-gray-600">
          <span className="text-gray-400">Main Stations</span>
          <div className="mt-2 space-y-1">
            {trafficData.main_stations.map((station, index) => (
              <div key={index} className="text-gray-200 flex items-center">
                <svg
                  className="w-3 h-3 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                {station}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <div className="text-gray-400 font-medium mb-2">Transit Facts</div>
          <ul className="list-disc list-inside space-y-1 text-gray-200 pl-2">
            {trafficData.transit_facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const getCityInfo = (displayName: string): CityDetails => {
  switch (displayName) {
    case "Pune":
      return {
        formatted_address: "Pune, Maharashtra, India",
        geometry: {
          location: {
            lat: 18.5246091,
            lng: 73.87862389999999,
          },
        },
      };
    case "New York City":
      return {
        formatted_address: "New York, NY, USA",
        geometry: {
          location: {
            lat: 40.7128,
            lng: -74.006,
          },
        },
      };
    // ... rest of the cities ...
    default:
      return {
        formatted_address: `${displayName}`,
        geometry: {
          location: {
            lat: 0,
            lng: 0,
          },
        },
      };
  }
};

const getCityDescription = (
  displayName: string
): {
  population: string;
  elevation: string;
  nickname: string;
  facts: string[];
} | null => {
  switch (displayName) {
    case "Pune":
      return {
        population: "7.4 million (2020)",
        elevation: "560 meters",
        nickname: "Oxford of the East",
        facts: [
          "Major IT and automobile hub",
          "Cultural capital of Maharashtra",
          "Historical capital of the Maratha Empire",
          "Home to numerous educational institutions",
        ],
      };
    // ... rest of the cities ...
    default:
      return null;
  }
};

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      timeness,
      setTimeness,
      isMenuOpen,
      setMenuOpen,
      cityName,
      setCityName,
      viewSettings,
      setViewSettings,
    }: MenuProps,
    ref
  ) => {
    const city = CITIES[cityName];
    const cityInfo = getCityInfo(city.displayName);
    const cityDetails = getCityDescription(city.displayName);
    const [activeTab, setActiveTab] = useState<"info" | "traffic">("info");

    return (
      <div
        ref={ref}
        className="fixed top-0 right-0 h-screen w-[85vw] sm:w-[450px] lg:w-[600px] bg-gray-800 shadow-xl flex flex-col"
      >
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Left Panel */}
          <div className="w-full lg:w-1/2 flex flex-col min-h-0">
            <div className="p-3 bg-gray-700 border-b border-gray-600">
              <CitySelector
                cityName={cityName}
                setCityName={setCityName}
                setMenuOpen={setMenuOpen}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-3">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold text-blue-300">
                      {city.displayName}
                    </h2>
                    <span className="text-xs px-2 py-0.5 bg-blue-900 text-blue-200 rounded-full">
                      {city.mode.replace("_", " ")}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-600">
                      <span className="text-gray-400">Location</span>
                      <span className="text-gray-200">
                        {cityInfo.formatted_address}
                      </span>
                    </div>

                    {cityDetails && (
                      <>
                        <div className="flex justify-between items-center py-1 border-b border-gray-600">
                          <span className="text-gray-400">Population</span>
                          <span className="text-gray-200">
                            {cityDetails.population}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-b border-gray-600">
                          <span className="text-gray-400">Elevation</span>
                          <span className="text-gray-200">
                            {cityDetails.elevation}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-b border-gray-600">
                          <span className="text-gray-400">Known as</span>
                          <span className="text-gray-200">
                            {cityDetails.nickname}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <ExternalLinks
                  cityName={city.displayName}
                  coordinates={cityInfo.geometry.location}
                />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-1/2 flex flex-col min-h-0 border-t lg:border-t-0 lg:border-l border-gray-600">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-600">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 px-3 py-2 text-sm font-medium ${
                  activeTab === "info"
                    ? "bg-gray-700 text-blue-300 border-b-2 border-blue-300"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                City Facts & Settings
              </button>
              <button
                onClick={() => setActiveTab("traffic")}
                className={`flex-1 px-3 py-2 text-sm font-medium ${
                  activeTab === "traffic"
                    ? "bg-gray-700 text-blue-300 border-b-2 border-blue-300"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Traffic & Transit
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-3">
              {activeTab === "info" ? (
                <div className="space-y-3">
                  {cityDetails && (
                    <div className="bg-gray-700 rounded-lg p-3">
                      <h3 className="text-base font-semibold text-blue-300 mb-2">
                        Key Facts
                      </h3>
                      <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-200">
                        {cityDetails.facts.map((fact, index) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-base font-semibold text-blue-300 mb-2">
                      View Settings
                    </h3>
                    <ViewSettingsPanel
                      viewSettings={viewSettings}
                      setViewSettings={setViewSettings}
                    />
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-base font-semibold text-blue-300 mb-2">
                      About
                    </h3>
                    <p className="text-sm text-gray-200">
                      Time-Based Map Visualization reimagines geography based on
                      travel time rather than physical distance. Click and hold
                      to switch to Time Mode to see how travel times affect
                      spatial relationships.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <TrafficInfo cityName={city.displayName} />
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-base font-semibold text-blue-300 mb-2">
                      Transit Tips
                    </h3>
                    <p className="text-sm text-gray-200">
                      Use the time-based visualization to understand how public
                      transit and traffic patterns affect travel times
                      throughout the city. Areas with better transit connections
                      will appear closer together.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Attribution Footer */}
            <div className="p-3 bg-gray-700 border-t border-gray-600">
              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-400">
                  By{" "}
                  <a
                    href="https://soham-poshiya.netlify.app/"
                    className="underline hover:text-blue-300 transition-colors"
                  >
                    Soham Poshiya
                  </a>
                </div>
                <div className="text-gray-500">Map data ©Google</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
