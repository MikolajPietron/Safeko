import { connectDB } from '@/lib/mongodb';
import Oferta from '@/models/Oferta';
import Samochod from '@/models/Samochod';
import Bizuteria from '@/models/Bizuteria';

export async function GET(req, context) {
  const { params } = context;
  const awaitedParams = await params;

  await connectDB();

  let oferta = await Oferta.findById(awaitedParams.id);
  let kategoria = 'nieruchomosc';

  if (!oferta) {
    oferta = await Samochod.findById(awaitedParams.id);
    kategoria = 'samochod';
  }

  if (!oferta) {
    oferta = await Bizuteria.findById(awaitedParams.id);
    kategoria = 'bizuteria';
  }

  if (!oferta) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  const ofertaObj = oferta.toObject();
  ofertaObj.kategoria = kategoria; // unify category field

  return new Response(JSON.stringify(ofertaObj), { status: 200 });
}
