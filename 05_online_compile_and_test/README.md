# Cross Exchange Rate calculator

## Testing

### Run tests once

```sh
npm run compile
npm test
```

### Watch mode

Terminal 1:
```sh
npm run compile:watch
```

Terminal 2:
```sh
npm run test:watch
```

## Build & Run

```sh
docker build -t exchange .
docker run -p 127.0.0.1:3000:3000 exchange
```

The application will be available at `http://127.0.0.1:3000`.
Invoke it for example via:

```sh
curl 'http://127.0.0.1:3000/cross-exchange-rate?base=USD&quota=EUR'
```