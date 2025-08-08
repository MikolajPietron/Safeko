import mongoose from 'mongoose';

const OfertaSchema = new mongoose.Schema({
  nazwa: String,
  cena: String,
  opis: String,
  imageKey: String,
}, { timestamps: true });

export default mongoose.models.Oferta || mongoose.model('Oferta', OfertaSchema);
