import { connectDB } from '@/lib/mongodb';
import Samochod from '@/models/Samochod';

export async function POST(request) {
  const body = await request.json();

  console.log('Received samochod data:', body);

  try {
    await connectDB();

    const samochod = new Samochod({
      pojazdTyp: body.pojazdTyp,      // "Osobowy" or "Motocykl"
      marka: body.marka,
      model: body.model,
      rok: body.rok,
      przebieg: body.przebieg,
      paliwo: body.paliwo,
      moc: body.moc,
      pojemnosc: body.pojemnosc,
      stan: body.stan,
      cena: body.cena,
      tytul: body.tytul,
      opis: body.opis,
      imageKey: body.imageKey,
      dodanePrzez: body.dodanePrzez,
      imie: body.imie,
      email: body.email,
      numer: body.numer,
    });

    await samochod.save();

    return new Response(JSON.stringify({ message: 'Samochod saved' }), {
      status: 201,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDB();

    const samochody = await Samochod.find({}).sort({ createdAt: 1 });

    return new Response(JSON.stringify(samochody), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 500,
    });
  }
}
