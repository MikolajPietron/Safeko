import { connectDB } from '@/lib/mongodb';
import Oferta from '@/models/Oferta';

export async function GET(req, context) {
  const { params } = context;
  const awaitedParams = await params;

  await connectDB();
  const oferta = await Oferta.findById(awaitedParams.id);

  if (!oferta) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(oferta), { status: 200 });
}
