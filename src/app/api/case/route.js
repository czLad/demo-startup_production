export const runtime = 'edge'; // optional: use Vercel Edge Runtime for sub-ms warm-up
export function GET() {
  return new Response('ok', { status: 200 });
}