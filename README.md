<h1 style="text-align:center">⛅</h1>


https://github.com/thebestclicker/weather-widget/assets/10188306/a9a3fe3c-ebbe-43cd-ba79-2c13893c39b6




### Default

![Default](docs/image.png)

### Dark mode

![Dark mode](docs/image-1.png)

### Not found

![Not found](docs/image-2.png)

### No script

![No JS](docs/image-3.png)

## How to run

Before running, add the follow env variable

```toml
# .env
OPEN_WEATHER_MAP_API_KEY=YOUR_KEY
```

```bash
# Test
pnpm test

# Dev
pnpm dev

# Build and run
pnpm build
pnpm start

# Dockerize
docker build -t weatherwidget .
docker run -p 3000:3000 weatherwidget
```

Visit 
[http://localhost:3000/gallery](http://localhost:3000/gallery)
OR 
[http://localhost:3000/](http://localhost:3000/)
