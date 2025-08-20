import mongoose from "mongoose";

const BizuteriaSchema = new mongoose.Schema({
  category: { type: String, default: 'bizuteria' },
  rodzaj: { type: String  },
  imie: { type: String },
  email: { type: String },
  numer: { type: String},
  dodanePrzez: { type: String},
  stan: { type: String },
  rok: { type: Number },
  proba: { type: Number },
  waga: { type: Number },
  rozmiar: { type: Number },
  material: { type: String },
  tytul: { type: String },
  opis: { type: String },
  cena: { type: Number },
  imageKey: { type: String },
}, { timestamps: true });

export default mongoose.models.Bizuteria || mongoose.model("Bizuteria", BizuteriaSchema);




