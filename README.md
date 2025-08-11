### Geolocation Cloudflare Worker

Returns JSON about request location like:

```json
{
	"city": "Tokyo",
	"colo": "KIX",
	"continent": "AS",
	"country": "JP",
	"isEUCountry": false,
	"latitude": "35.68950",
	"longitude": "139.69171",
	"metroCode": "635",
	"postalCode": "101-8656",
	"region": "Tokyo",
	"regionCode": "13",
	"timezone": "Asia/Tokyo"
}
```

```geojson
{
  "type": "FeatureCollection",
  "features": [
	{
	  "type": "Feature",
	  "id": 1,
	  "properties": {
		"ID": 0
	  },
	  "geometry": {
		"type": "Polygon",
		"coordinates": [
		  [
			[139.64171, 35.63950],
			[139.64171, 35.73950],
			[139.74171, 35.73950],
			[139.74171, 35.63950],
			[139.64171, 35.63950]
		  ]
		]
	  }
	}
  ]
}
```
