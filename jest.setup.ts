// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const apiResponse = {
  coord: {
    lon: 12.5655,
    lat: 55.6759,
  },
  weather: [
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds",
      icon: "03n",
    },
  ],
  base: "stations",
  main: {
    temp: 282.04,
    feels_like: 279.1,
    temp_min: 280.87,
    temp_max: 282.57,
    pressure: 1006,
    humidity: 90,
  },
  visibility: 10000,
  wind: {
    speed: 5.66,
    deg: 220,
  },
  clouds: {
    all: 40,
  },
  dt: 1699384205,
  sys: {
    type: 2,
    id: 2035645,
    country: "DK",
    sunrise: 1699338432,
    sunset: 1699370375,
  },
  timezone: 3600,
  id: 2618425,
  name: "Copenhagen",
  cod: 200,
};

// @ts-ignore 🐵🍌
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(apiResponse),
    ok: true,
  })
);

jest.mock("next/navigation", () => ({
  useRouter() {},
  useSearchParams() {
    return {
      entries: () => [],
    };
  },
}));
