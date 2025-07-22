import { describe, it, expect, beforeEach } from 'vitest';
import worker from '../src/index';

describe('Geolocation Worker', () => {
	const mockResponse = {
		city: "Tokyo",
		colo: "KIX",
		continent: "AS",
		country: "JP",
		isEUCountry: false,
		latitude: "35.68950",
		longitude: "139.69171",
		metroCode: "635",
		postalCode: "101-8656",
		region: "Tokyo",
		regionCode: "13",
		timezone: "Asia/Tokyo"
	};

	let mockRequest: Request;

	beforeEach(() => {
		mockRequest = new Request('https://www.twitch.tv/greatsphynx');
	});

	describe('successful responses', () => {
		it('should return complete geolocation data with correct status', async () => {
			Object.defineProperty(mockRequest, 'cf', { value: mockResponse });

			const response = await worker.fetch(mockRequest);

			expect(response.status).toBe(200);
			const data = await response.json();
			expect(data).toEqual(mockResponse);
		});

		it('should include CORS headers in the successful response', async () => {
			Object.defineProperty(mockRequest, 'cf', { value: mockResponse });

			const response = await worker.fetch(mockRequest);

			expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
			expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET');
		});

		it('should handle OPTIONS request correctly', async () => {
			const optionsRequest = new Request('https://www.twitch.tv/greatsphynx', { method: 'OPTIONS' });
			const response = await worker.fetch(optionsRequest);

			expect(response.status).toBe(200);
			expect(await response.text()).toBe('ok');
			expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
			expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET');
		});
	});

	describe('error handling', () => {
		it('should return 400 error when CF data is missing', async () => {
			Object.defineProperty(mockRequest, 'cf', { value: undefined });

			const response = await worker.fetch(mockRequest);

			expect(response.status).toBe(400);
			const errorData = await response.json();
			expect(errorData).toEqual({ error: 'Response had no Cloudflare info!' });
		});

		it('should include CORS headers even in error responses', async () => {
			Object.defineProperty(mockRequest, 'cf', { value: undefined });

			const response = await worker.fetch(mockRequest);

			expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
			expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET');
		});
	});
});
