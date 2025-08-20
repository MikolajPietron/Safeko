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
      <h1>{oferta.tytul}</h1>
      <p>{oferta.opis}</p>

      {/* Render nieruchomości fields */}
      {oferta.kategoria === 'nieruchomosc' && (
        <>
          <p>Metraż: {oferta.metraz} m²</p>
          <p>Liczba pokoi: {oferta.liczbaPokoi}</p>
        </>
      )}

      {/* Render samochód fields */}
      {oferta.kategoria === 'samochod' && (
        <>
          <p>Marka: {oferta.marka}</p>
          <p>Model: {oferta.model}</p>
          <p>Rok: {oferta.rok}</p>
          <p>Przebieg: {oferta.przebieg} km</p>
          <p>Pojemność: {oferta.pojemnosc} cm³</p>
          <p>Moc: {oferta.moc} KM</p>
          <p>Paliwo: {oferta.paliwo}</p>
          <p>Stan: {oferta.stan}</p>
          <p>Typ: {oferta.pojazdTyp}</p>
        </>
      )}

      {/* Render biżuteria fields */}
      {oferta.kategoria === 'bizuteria' && (
        <>
          <p>Rodzaj: {oferta.rodzaj}</p>
          <p>Stan: {oferta.stan}</p>
          <p>Rok: {oferta.rok}</p>
          <p>Próba: {oferta.proba}</p>
          <p>Waga: {oferta.waga} g</p>
          <p>Rozmiar: {oferta.rozmiar}</p>
          <p>Materiał: {oferta.material}</p>
        </>
      )}

      <p>Dodane przez: {oferta.dodanePrzez}</p>
      <p>Kontakt: {oferta.imie} | {oferta.email} | {oferta.numer}</p>
      <p>Cena: {oferta.cena} zł</p>

      <img
        src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
        alt={oferta.tytul}
        style={{ maxWidth: '400px' }}
      />
    </div>
  );
}
