import { WeatherWidget } from "./weather-widget";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <WeatherWidget />
    </div>
  );
}
