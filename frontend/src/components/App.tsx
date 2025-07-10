import { Container, Stage, Text } from "@pixi/react";
import { SpacetimeMap } from "./SpacetimeMap";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Point } from "../mesh";
import { Menu } from "./Menu";
import { City, DEFAULT_CITY, fetchCity } from "../cityData";
import { useMapSizePx } from "../useIsMobile";
import { useSearchParamsState } from "../useSearchParamsState";
import { ViewSettings, updateViewSettings } from "../viewSettings";

const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Animate timeness as a sinusoid. Spend a bit of time at 0 timeness
 * ("dip") to give the springs a bit of time to reset.
 */
const getTimenessForAnimation = (totalTime: number) => {
  const SECONDS_TO_SWITCH = 5;
  const DIP = 0.05; // "Dip" below the 0 point
  return clamp(
    Math.sin((totalTime * Math.PI * 2) / SECONDS_TO_SWITCH) * (0.5 + DIP) +
      (0.5 - DIP),
    0,
    1
  );
};

const triangleWave = (t: number, period: number) => {
  // Calculate the current phase of the wave, normalized to the range [0, 1]
  const phase = (t % period) / period;

  // Calculate the value of the triangle wave based on the phase
  // The wave increases linearly from 0 to 1 in the first half of the period
  // and decreases linearly from 1 to 0 in the second half
  if (phase < 0.5) {
    return 2 * phase; // Linearly increase
  } else {
    return 2 * (1 - phase); // Linearly decrease
  }
};

const App = () => {
  const [viewSettings, setViewSettings] = useLocalStorage<ViewSettings>(
    "SpacetimeMap.viewSettings",
    {
      animate: false,
      focusOnHover: false,
      showSpringArrows: false,
      showGridPoints: false,
      showGrid: false,
      showGridNumbers: false,
      showSpringsByDistance: false,
      showSpringsThreshold: 0,
    }
  );
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [timeness, setTimeness] = useState(0);
  const [cityName, setCityName] = useSearchParamsState("city", DEFAULT_CITY);
  const [city, setCity] = useState<City | null>(null);
  const [totalTime, setTotalTime] = useState(0);
  const mapSizePx = useMapSizePx();
  const menuRef = useRef<HTMLDivElement>(null);

  const onTick = (deltaSeconds: number) => {
    setTotalTime(totalTime + deltaSeconds);
    if (viewSettings.showSpringsByDistance)
      setViewSettings({
        ...viewSettings,
        showSpringsThreshold: triangleWave(totalTime, 20),
      });
    if (viewSettings.animate) {
      setTimeness(getTimenessForAnimation(totalTime));
    }
  };

  useEffect(() => {
    fetchCity(cityName).then(
      (city) => {
        setCity(city);
      },
      (error) => {
        if (error.toString().includes("Unknown variable dynamic import")) {
          console.error(`City "${cityName}" not found, resetting`);
          setCityName(DEFAULT_CITY);
        } else {
          console.error("Error fetching city data", error);
        }
      }
    );
  }, [cityName]);

  return (
    <div>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          setViewSettings(updateViewSettings(viewSettings, e.code));
        }}
        onPointerMove={(e) => {
          setHoveredPoint({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        onTouchStart={(e) => {
          setHoveredPoint({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          });
        }}
        onTouchMove={(e) => {
          setHoveredPoint({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          });
        }}
        onTouchEnd={(e) => {
          setHoveredPoint(null);
        }}
        className="absolute -z-10 select-none"
      >
        <Stage
          width={mapSizePx}
          height={mapSizePx}
          options={{
            autoDensity: true,
            backgroundColor: 0xeef1f5,
          }}
        >
          {city === null && (
            <Container>
              <Text
                text="Loading..."
                anchor={0.5}
                x={mapSizePx / 2}
                y={mapSizePx / 2}
              />
            </Container>
          )}
          {!(city === null) && (
            <SpacetimeMap
              viewSettings={viewSettings}
              hoveredPoint={hoveredPoint}
              timeness={timeness}
              city={city}
              onTick={onTick}
            />
          )}
        </Stage>
        <div className="absolute top-0 left-0 w-full h-full z-10"></div>
      </div>
      <Menu
        ref={menuRef}
        timeness={timeness}
        setTimeness={setTimeness}
        isMenuOpen={true}
        setMenuOpen={() => {}}
        cityName={cityName}
        setCityName={setCityName}
        viewSettings={viewSettings}
        setViewSettings={setViewSettings}
      />
    </div>
  );
};

export default App;
