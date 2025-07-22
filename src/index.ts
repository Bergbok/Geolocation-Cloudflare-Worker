export default {
	async fetch(request): Promise<Response> {
		const cf: IncomingRequestCfPropertiesBase & IncomingRequestCfPropertiesGeographicInformation = request.cf!;

		if (!cf) {
			return Response.json({ error: 'Response had no Cloudflare info!' }, { status: 400 });
		}

		const locationInfo = {
			city: cf.city,
			colo: cf.colo,
			continent: cf.continent,
			country: cf.country,
			isEUCountry: cf.isEUCountry,
			latitude: cf.latitude,
			longitude: cf.longitude,
			metroCode: cf.metroCode,
			postalCode: cf.postalCode,
			region: cf.region,
			regionCode: cf.regionCode,
			timezone: cf.timezone
		};

		return Response.json(locationInfo);
	},
} satisfies ExportedHandler;
