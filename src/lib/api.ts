import { z } from "zod";

const fullSchema = z
  .object({
    coord: z.object({ lon: z.number(), lat: z.number() }),
    weather: z.array(
      z.object({
        id: z.number(),
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
    base: z.string(),
    main: z.object({
      temp: z.number(),
      feels_like: z.number(),
      temp_min: z.number(),
      temp_max: z.number(),
      pressure: z.number(),
      humidity: z.number(),
    }),
    visibility: z.number(),
    wind: z.object({ speed: z.number(), deg: z.number() }),
    clouds: z.object({ all: z.number() }),
    dt: z.number(),
    sys: z.object({
      type: z.number(),
      id: z.number(),
      country: z.string(),
      sunrise: z.number(),
      sunset: z.number(),
    }),
    timezone: z.number(),
    id: z.number(),
    name: z.string(),
    cod: z.number(),
  })
  .deepPartial();

export const weatherApi = async (input: { q: string }) => {
  const { q } = input;

  const schema = fullSchema.pick({ main: true, name: true, wind: true });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status !== 404) console.error(response);
    return { error: { message: response.statusText, status: response.status } };
  }

  const data = await response.json();

  try {
    const parsedData = schema.parse(data);
    return { data: parsedData };
  } catch (error) {
    console.error(error);
    return { error: { message: "Internal error", status: 500 } };
  }
};
