import mongoose from 'mongoose';

const OfertaSchema = new mongoose.Schema({
  typ: { type: String, enum: ['Mieszkanie', 'Dom', 'Działka'], required: true }, // which button
  imie: { type: String, required: true },
  email: { type: String, required: true },
  numer: { type: String, required: true },
  dodanePrzez: { type: String, enum: ['Osoba prywatna', 'Firma', 'Deweloper'], required: true },

  metraz: { type: Number, required: true },
  liczbaPokoi: { type: Number, required: true },

  tytul: { type: String, required: true },
  opis: { type: String },

  cena: { type: Number, required: true },

  imageKey: { type: String },
}, { timestamps: true });

export default mongoose.models.Oferta || mongoose.model('Oferta', OfertaSchema);
