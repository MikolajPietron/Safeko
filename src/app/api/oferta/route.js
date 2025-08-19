import { connectDB } from '@/lib/mongodb';
import Oferta from '@/models/Oferta';

export async function POST(request) {
  const body = await request.json();

  console.log('Received oferta data:', body);

  try {
    await connectDB();

    const oferta = new Oferta({
  typ: body.typ,
  imie: body.imie,
  email: body.email,
  numer: body.numer,
  dodanePrzez: body.dodanePrzez,
  metraz: body.metraz,
  liczbaPokoi: body.liczbaPokoi,
  tytul: body.tytul,
  opis: body.opis,
  cena: body.cena,
  imageKey: body.imageKey
});


    await oferta.save();

    return new Response(JSON.stringify({ message: 'Oferta saved' }), {
      status: 201,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}

export async function GET(){
  try{
    await connectDB();

    const oferty = await Oferta.find({}).sort({createdAt: 1});

    return new Response(JSON.stringify(oferty),  {
      status:200,
    });
  }catch(error){
    console.log(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch'}),{
      status:500,
    });
  }
}
