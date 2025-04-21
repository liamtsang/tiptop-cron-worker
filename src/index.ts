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
		// Using fetch API for a POST request
		try {
			const response = await fetch(
				"https://tiptop-hono.liamtsang.workers.dev/api/convert/convert-all",
				{
					method: "POST",
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Success:", data);
			return data;
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	},
} satisfies ExportedHandler<Env>;
