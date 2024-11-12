/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async scheduled(event, env, ctx) {
		const nextApp = env.NEXT_APP;

		const productIds = [
			"7961383502005",
			"8030062837941",
			"8047179759797",
			"7762251120821",
			"8048698196149",
			"7710195744949",
		];

		try {
			// Create an array of promises for each API call
			const promises = productIds.map(async (productId) =>
				nextApp
					.fetch(
						`https://tiptop.liamtsang.workers.dev/api/size-convert/debug/check-sizes?id=${productId}`,
						{
							method: "POST",
						},
					)
					.then(async (response) => {
						if (!response.ok) {
							throw new Error(
								`API call failed for product ${productId}: ${response.statusText}`,
							);
						}
						const product = (await response.json()) as any;

						return [product.product.title, product.product.variants[0].option1];
					}),
			);

			// Execute all promises concurrently
			const results = await Promise.all(promises);

			// Log all results
			console.log("All API calls completed:", results);
		} catch (error) {
			console.error("Cron job failed:", error);
			throw error; // Re-throw the error to be handled by the caller if needed
		}
	},

	// async scheduled(event, env, ctx) {
	// 	try {
	// 		// Make the API call to your Next.js endpoint
	// 		const response = await fetch(
	// 			"https://tiptop.liamtsang.workers.dev/api/size-convert/convert-all",
	// 			{
	// 				method: "POST",
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`API call failed: ${response.statusText}`);
	// 		}

	// 		const data = await response.json();
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.error("Cron job failed:", error);
	// 	}
	// },

	async fetch(request, env, ctx): Promise<Response> {
		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
