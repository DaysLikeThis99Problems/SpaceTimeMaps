import { useEffect, useState } from "react";
import { CITIES } from "../cityData";

type CityDetailsProps = {
  cityName: string;
};

export const CityDetails = ({ cityName }: CityDetailsProps) => {
  const [cityInfo, setCityInfo] = useState<any>(null);
  const city = CITIES[cityName];

  useEffect(() => {
    const fetchCityInfo = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city.displayName}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results[0]) {
          setCityInfo(data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching city info:", error);
      }
    };

    if (city.description) {
      setCityInfo({ formatted_address: city.description });
    } else {
      fetchCityInfo();
    }
  }, [cityName, city]);

  if (!cityInfo) return null;

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm p-4 rounded-b-lg shadow-lg max-w-2xl text-sm">
      <div className="text-gray-800 whitespace-pre-line">
        {cityInfo.formatted_address}
      </div>
    </div>
  );
};
