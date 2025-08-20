import { connectDB } from '@/lib/mongodb';
import Bizuteria from '@/models/Bizuteria';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('Received bizuteria data:', body);

    const bizuteria = await Bizuteria.create(body);

    return new Response(JSON.stringify(bizuteria), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message || 'Server error' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bizuteria = await Bizuteria.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(bizuteria), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), { status: 500 });
  }
}
