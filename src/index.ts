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
		try {
			// Make the API call to your Next.js endpoint
			// const response = await fetch(
			// 	"https://your-nextjs-app.com/api/your-endpoint",
			// 	{
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify({
			// 			trigger: "cron",
			// 			timestamp: new Date().toISOString(),
			// 		}),
			// 	},
			// );

			// if (!response.ok) {
			// 	throw new Error(`API call failed: ${response.statusText}`);
			// }

			// const data = await response.json();
			// console.log("Cron job completed successfully:", data);
			console.log("Cron job completed successfully:");
		} catch (error) {
			console.error("Cron job failed:", error);
		}
	},

	async fetch(request, env, ctx): Promise<Response> {
		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
