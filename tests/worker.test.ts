import { describe, it, expect, beforeEach } from 'vitest';
import worker from '../src/index';

describe('Geolocation Worker', () => {
	let mockRequest: Request;

	beforeEach(() => {
		mockRequest = new Request('https://www.twitch.tv/greatsphynx');
		Object.defineProperty(mockRequest, 'cf', {
			value: {
				city: 'San Francisco',
				colo: 'SFO',
				continent: 'NA',
				country: 'US',
				isEUCountry: false,
				latitude: '37.7749',
				longitude: '-122.4194',
				metroCode: '807',
				postalCode: '94107',
				region: 'California',
				regionCode: 'CA',
				timezone: 'America/Los_Angeles'
			}
		});
	});

	it('should return geolocation data from CF properties', async () => {
		const response = await worker.fetch(mockRequest);
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toEqual({
			city: 'San Francisco',
			colo: 'SFO',
			continent: 'NA',
			country: 'US',
			isEUCountry: false,
			latitude: '37.7749',
			longitude: '-122.4194',
			metroCode: '807',
			postalCode: '94107',
			region: 'California',
			regionCode: 'CA',
			timezone: 'America/Los_Angeles'
		});
	});

	it('should return an error when CF data is missing', async () => {
		const requestWithoutCf = new Request('https://www.twitch.tv/greatsphynx');
		Object.defineProperty(requestWithoutCf, 'cf', { value: undefined });

		const response = await worker.fetch(requestWithoutCf);

		expect(response.status).toBe(400);
		const errorData = await response.json();
		expect(errorData).toEqual({ error: 'Response had no Cloudflare info!' });
	});
});
