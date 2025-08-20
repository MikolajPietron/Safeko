import mongoose from "mongoose";

const SamochodSchema = new mongoose.Schema({
  category: { type: String, default: 'samochod' },
  pojazdTyp: { type: String, enum: ['Osobowy', 'Motocykl'], required: true },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  przebieg: { type: Number, required: true },
  pojemnosc: { type: Number, required: true },
  moc: { type: Number, required: true },
  rok: { type: Number, required: true },
  paliwo: { type: String, required: true },
  stan: { type: String, required: true },
  cena: { type: Number, required: true },
  tytul: { type: String, required: true },
  opis: { type: String, required: true },
  imageKey: { type: String, required: true },
  dodanePrzez: { type: String, required: true },
  imie: { type: String, required: true },
  email: { type: String, required: true },
  numer: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Samochod || mongoose.model("Samochod", SamochodSchema);
