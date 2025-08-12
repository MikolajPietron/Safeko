'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OfertaDetailsPage() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);

  useEffect(() => {
    async function fetchOferta() {
      const res = await fetch(`/api/ofertadetails/${id}`);
      if (res.ok) {
        const data = await res.json();
        setOferta(data);
      }
    }
    fetchOferta();
  }, [id]);

  if (!oferta) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1>{oferta.nazwa}</h1>
      <p>{oferta.opis}</p>
      <img
        src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
        alt={oferta.nazwa}
        style={{ maxWidth: '400px' }}
      />
      <p>{oferta.cena} zł</p>
    </div>
  );
}
