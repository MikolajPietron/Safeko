"use client";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import "./samochody.css";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import UserIcon from '@mui/icons-material/Person';
import { useState } from "react";
import ProfileMenu from "@/components/ProfileMenu/profileMenu";
import { useRouter } from 'next/navigation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSession, signOut } from 'next-auth/react';
export default function Samochody(){

    const [selectedBrand, setSelectedBrand] = useState("");
    const [availableModels, setAvailableModels] = useState([]);
    const [isShownMarka, setIsShownMarka] = useState(false);
    const [isShowDane, setIsShowDane] = useState(false);
    const [isShownPhotos, setIsShownPhotos] = useState(false);
    const [isShowKontakt, setIsShowKontakt] = useState(false);
    const [isShowTytul, setIsShowTytul] = useState(false);
    const [isShowCena, setIsShowCena] = useState(false);
    const {data: session} = useSession();
    const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  function toggleProfileMenu() {
    setIsShowProfileMenu(prev => !prev);
  }
    function showMarka() {
        setIsShownMarka(true);
    }
    
    function showDane() {
        setIsShowDane(true);
    }
    function showPhotos(){
      setIsShownPhotos(true);
    }

    function showKontakt() {
        setIsShowKontakt(true);
    }
    function showTytul() {
        setIsShowTytul(true);
    }
    const modelsByBrand = {
  Abarth: ["124", "500", "500e", "595", "600e", "695", "Grande Punto", "Punto Evo"],
  Acura: ["CL", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RSX", "TL", "TSX", "Vigor", "ZDX"],
  Aixam: ["City", "Coupe", "Crossline", "Crossover", "GTO"],
  AlfaRomeo: ["145", "146", "147", "155", "156", "159", "164", "166", "33","4C", "75", "90", "Alfasud", "Alfetta", "Brera", "Crosswagon", "Giulia", "Giulietta", "GT", "GTV", "Junior","Mito","RS","Spider","Sportwagon","Sprint","Stelvito","Tonale"],
  Alpine: ["A110", "A290"],
  AstonMartin: ["Bulldog", "Cygnet", "DB", "DB Mk III", "DB1", "DB11", "DB12", "DB2", "DB4", "DB5", "DB6", "DB7", "DB9", "DBS", "DBS Superleggera", "DBX", "DBX707", "Lagonda", "One-77", "Rapide", "V12 Vanquish", "V8", "V8", "V8 Vantage", "V8 Zagato", "Vanquish", "Vantage", "Virage", "Volatne"],
  Audi: ["A1", "A3", "S3", "RS3","A4", "S4","A5", "S5", "RS5","A6", "S6","A7", "S7", "RS7","A8", "S8","A4 Allroad", "A6 Allroad", "RS6 Avant","TT", "TT RS", "R8","etron GT", "RS e‑tron GT","Q2", "Q3", "Q4 etron", "Q5", "SQ5","Q6", "Q6 etron", "Q7", "Q8", "SQ7", "SQ8", "RS Q8","Q5 Sportback", "SQ5 Sportback","Q4 Sportback etron", "Q6 Sportback etron", "Q8 etron", "Q8 Sportback etron","SQ6 etron", "RS Q3","80", "90", "100", "200", "Quattro", "Sport Quattro", "S2", "S4", "S6", "S8","RS2", "RS4", "RS5", "RS6", "RS7", "UrQuattro"],
  Baic: ["Beijing 3", "Beijing 5", "Beijing 7", "BJ20", "BJ30", "BJ40", "BJ60", "BJ80", "BJ90", "X3", "X5", "X7", "D50", "D70", "EU5", "EX3", "EX5", "Argo", "EV", "ET", "Lite", "M50S", "M60", "Senova D20", "Senova D50", "Senova D60", "Senova D70", "Senova X25", "Senova X35", "Senova X55", "Senova X65", "Weiwang M20", "Weiwang M30", "Weiwang M35", "Weiwang M50F", "Weiwang M60", "Weiwang S50", "Arcfox Alpha S", "Arcfox Alpha T", "Changhe Q25", "Changhe Q35", "Changhe A6", "Ruixiang X3", "Ruixiang X5", "Huansu H2", "Huansu H3", "Huansu H5", "Huansu S2", "Huansu S3", "Huansu S5", "Huansu S6", "Foton Tunland"],
  Bentley: ["Continental GT", "Flying Spur", "Bentayga", "Arnage", "Mulsanne", "Azure", "Brooklands", "Eight", "Turbo R", "Corniche", "Continental", "S1", "S2", "S3", "T1", "T2", "Continental R", "Continental S", "Continental T", "Turbo RT", "Hunaudieres", "Continental GT Speed", "Continental GTC", "Continental Flying Spur", "Flying Spur W12 S", "Bentayga V8", "Bentayga Speed", "Continental GT V8 S", "Flying Spur V8 S"],
  BMW: ["Seria 1", "Seria 2", "Seria 3", "Seria 4", "Seria 5", "Seria 6", "Seria 7", "Seria 8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z3", "Z4", "Z8", "i3", "i4", "i5", "i7", "iX", "iX1", "iX2", "iX3", "M2", "M3", "M4", "M5", "M6", "M8", "XM", "Z1", "8 Series", "1 Series M Coupe", "2 Series Active Tourer", "2 Series Gran Coupe", "2 Series Gran Tourer", "3 Series Compact", "3 Series Gran Turismo", "4 Series Gran Coupe", "5 Series Gran Turismo", "6 Series Gran Coupe", "Isetta", "Neue Klasse", "2000 CS", "3.0 CS", "507", "E9", "M1", "Z Series", "Vision Future Luxury", "Concept Z4", "Concept M4 Coupe", "Concept M8 Gran Coupe", "Concept XM", "Concept iX", "Concept i4", "Concept i Vision Circular"],
  BMWAlpina: ["XB7", "B6", "B7", "C1", "B3", "B5", "B10", "D3", "B8", "B4", "C2", "B7 S Turbo", "B7 Coupe", "B12 5.7", "B12 6.0", "V8 Roadster", "3.0 CSL Batmobil", "D5 S Touring AWD"],
  Buick: ["Encore", "Park Avenue", "Roadmaster", "Enclave", "Rendezvous", "Riviera", "Electra", "Lacrosse", "Regal", "Wildcat", "Reatta", "Century", "Skylark", "Special", "Le Sabre", "GS 400", "Limited", "Centurion", "Invicta", "Apollo", "Skyhawk", "Somerset", "Verano", "Cascada", "Regal Sportback", "Regal TourX", "Envista", "Envision", "Velite 6"],
  BYD: ["Seal U", "Seal", "Sealion 7", "Dolphin", "Atto 3", "Tang", "Leopard 5", "Leopard 8", "Yangwang U8", "Denza", "Song Plus DM-i", "Han", "Qin Plus DM-i", "Destroyer 05", "Frigate 07", "Chaser 05", "Song Max DM-i", "e2", "e3", "e5", "e6", "F3", "F6", "G3", "G6", "L3", "M6", "S6", "S7", "Yuan", "Tang DM", "Song Pro DM-i", "Song Pro EV", "Yuan Plus", "Dolphin Mini", "Seagull", "Qinzhou", "ETM6", "ETP3", "ETH8"],
  Cadillac: ["Escalade", "CTS", "SRX", "BLS", "XT4", "ATS", "Deville", "STS", "CT6", "Seville", "CT5", "XTS", "XT6", "XLR", "Eldorado", "Fleetwood", "Allante", "Brougham", "DTS", "Concours", "Coupe de Ville", "DTS L", "SRX", "STS-V", "XTS V-Sport", "XT4", "XT5", "XT6", "Lyriq"],
  Casalini: ["M14", "M20", "M10", "550", "Gransport", "Trofeo", "Pickup"],
  Chevrolet: ["Aveo", "Camaro", "Captiva", "Corvette", "Cruze", "Epica", "Evanda", "Lacetti", "Malibu", "Matiz", "Orlando", "Spark", "Suburban", "Tahoe", "Traverse", "Trax", "Volt", "Equinox", "Impala", "Silverado", "Colorado", "Express", "HHR", "K-Series", "Niva", "Rezzo", "Trans Sport", "Uplander", "Blazer", "TrailBlazer", "Monte Carlo", "Chevelle", "Bel Air", "Corvair", "Nova", "Cavalier", "Cobalt", "Sonic", "Tracker", "Bolt EV", "Blazer EV", "Silverado EV", "Colorado EV", "Groove", "Onix", "Spin", "Montana", "S10", "Montana EV", "S10 EV"],
  Chrysler: ["Pacifica", "Town & Country", "300C", "Grand Voyager", "Sebring", "Voyager", "PT Cruiser", "Crossfire", "Aspen", "Concorde", "Cirrus", "LHS", "Neon", "Prowler", "Stratus", "Valiant", "Imperial", "New Yorker", "LeBaron", "Cordoba", "Saratoga"],
  Citroen: ["C3", "C4", "Berlingo", "C4 Picasso", "C5", "C5 Aircross", "C4 Cactus", "C4 Grand Picasso", "C3 Aircross", "C3 Picasso", "DS3", "C4X", "C4 Aircross", "C2", "C-Elysée", "SpaceTourer", "Jumpy", "Jumper", "Xsara", "Xantia", "C1", "C6", "DS4", "DS5", "DS7 Crossback", "DS9", "E-Mehari", "Ami", "C-Zero", "Saxo", "Ax", "BX", "CX", "GS", "XM", "ZX", "Evasion", "Jumpy Combi", "Nemo", "Relay", "Dispatch", "Berlingo Van", "e-Berlingo", "e-Jumpy", "e-Jumper", "C4 SpaceTourer", "Grand C4 SpaceTourer", "C5X"],
  Cupra: ["Formentor", "Terramar", "Leon", "Leon Sportstourer", "Ateca", "Tavascan", "Born", "UrbanRebel Concept", "Ravasa"],
  Dacia: ["Duster", "Sandero", "Sandero Stepway", "Jogger", "Spring", "Logan", "Dokker", "Lodgy", "Bigster"],
  Daewoo: ["Lanos", "Matiz", "Kalos", "Nubira", "Musso", "Tico", "Rezzo", "Evanda", "Leganza", "Espero", "Lacetti", "Nexia", "Chairman", "Korando", "Lublin", "Lublin II", "Lublin III"],
  Daihatsu: ["Terios", "Sirion", "Materia", "Cuore", "Feroza", "Charade", "Copen", "Move", "Rocky", "Hijet"],
  DFSK: ["Seres 3", "Fengon 580", "Fengon 5", "Pick up"],
  Dodge: ["Durango", "RAM", "Challenger", "Charger", "Grand Caravan", "Journey", "Avenger", "Caliber", "Dart", "Viper", "Magnum", "Nitro", "Dakota", "Neon", "Stealth", "Stratus", "Caravan", "Intrepid", "Spirit", "Monaco", "Dynasty", "Shadow", "Daytona", "Omni", "Colt", "Aries", "Power Wagon"],
  DSAutomobiles: ["DS 3", "DS 4", "DS 7", "DS 9", "DS 5", "DS 3 Crossback", "DS 4 Crossback", "DS N°4", "DS N°8"],
  Ferrari: ["Roma", "SF90 Stradale", "Purosangue", "F8 Spider", "SF90 Spider", "812 Superfast", "Portofino M", "328", "296 GTS", "812 GTS", "296 GTB", "California T", "F430", "GTC4Lusso", "F430 Spider", "612 Scaglietti", "F8 Tributo", "458 Italia", "California", "Testarossa", "FF", "12Cilindri"],
  Fiat: ["500", "Tipo", "Panda", "Freemont", "Doblo", "Ducato", "600", "Grande Panda", "500e", "Bravo", "Punto", "Croma", "Sedici", "Scudo", "Qubo", "Fiorino", "Talento", "Fullback", "Strada", "Mobi", "Argo", "Cronos", "Fastback", "Pulse", "Toro", "Idea", "Linea", "Siena", "Palio", "Stilo", "Croma", "Multipla", "Ulysse", "Seicento", "Cinquecento", "Barchetta", "Coupe", "X1/9", "Dino"],
  Ford: ["Focus", "Mondeo", "Kuga", "Fiesta", "S-Max", "C-MAX", "Mustang", "Galaxy", "Edge", "EcoSport", "Grand C-MAX", "Transit Custom", "Puma", "Ranger", "Escape", "B-MAX", "Fusion", "Transit", "Tourneo Connect", "KA", "Tourneo Custom", "Explorer", "F-MAX", "Ranger Raptor", "Transit Connect", "Courier"],
  Forthing: ["T5 EVO", "U Tour"],
  GAZ: ["69", "Gazela", "Sobol", "Volga", "Chaika", "Zim", "M1", "A", "AA", "M20 Pobeda", "M72", "M73", "21 Volga", "13 Chaika", "14 Chaika", "24 Volga", "3102 Volga", "3110 Volga", "31105 Volga", "3111 Volga", "Gazelle Next", "Sobol Next", "Valdai", "3302", "3307", "3308 Sadko", "3309", "66", "53", "4301", "3310 Valdai", "33102 Valdai", "33081 Sadko", "33098", "C41R11", "C41R31", "C42R31", "C41R13", "C41R33", "C42R33", "C44R33", "A21R22", "A21R32", "A22R32", "A23R32", "A31R22", "A31R32", "A32R32", "A33R32"],
  Genesis: ["GV70", "G70", "GV80", "G80", "G90", "GV60"],
  Honda: ["Civic", "CR-V", "Accord", "Jazz", "HR-V", "Odyssey", "ZR-V", "Insight", "FR-V", "CR-Z", "City", "Legend", "e:NY1", "e", "CRX", "Prelude", "S2000", "Integra", "Stream", "Shuttle", "Concerto", "Logo"],
  Hummer: ["H1", "H2", "H3", "Inny"],
  Hyundai: ["Tucson", "i30", "Kona", "i20", "Santa Fe", "Elantra", "i10", "IONIQ 5", "IONIQ Electric", "IONIQ Hybrid", "IONIQ Plug-in Hybrid", "Bayon", "Veloster", "Venue", "Palisade", "Accent", "Creta", "Grand i10", "HB20", "ix35", "ix20", "ix55", "H-1", "H350", "Genesis Coupe", "Sonata", "Coupe", "Terracan", "Matrix", "Getz", "Atos", "Trajet", "Galloper", "Grandeur", "XG", "Pony", "Lantra", "Excel", "Dynasty", "Tiburon", "Equus", "Azera", "Veracruz", "Entourage", "Strategem"],
  Infiniti: ["Q50", "QX30", "Q70", "FX", "Q60", "QX55", "QX80", "Q30", "M", "EX", "QX50", "G", "JX", "Q40"],
  Isuzu: ["D-Max", "Trooper", "Pick-up", "Gemini", "Midi","Campo", "Other"],
  Iveco: ["Daily", "Massif", "Eurocargo", "Stralis", "Trakker", "S-Way", "Other"],
  Jaecoo: ["5", "6", "7", "8", "9", "J7", "J8"],
  Jaguar: ["F-Pace", "XF", "XE", "XJ", "E-Pace", "F-Type", "XK", "I-Pace", "XK8", "S-Type", "X-Type", "XJS", "XJR", "E-Type", "Daimler", "Other"],
  Jeep: ["Grand Cherokee", "Wrangler", "Compass", "Renegade", "Cherokee", "Avenger", "Gladiator", "Commander", "Patriot", "Liberty", "Comanche", "CJ", "Wagoneer", "Scrambler", "Vj", "FC"],
  Kia: ["Sportage", "Ceed", "Rio", "XCeed", "Stonic", "Sorento", "Picanto", "Carens", "Optima", "Soul", "ProCeed", "Niro", "EV6", "Cerato", "Venga", "Carnival", "Mohave", "K900", "Telluride", "K5", "K3", "Ray", "Morning", "Seltos", "Sonet", "Cadenza", "Forte", "Spectra", "Amanti", "Sephia", "Mentor", "Magentis", "Opirus", "Quoris", "Roadster", "Shuma", "Clarus", "Elan", "Pride"],
  Lada: ["Niva", "Samara", "Kalina", "Granta", "Vesta", "Largus", "XRAY", "Priora", "110", "111", "112", "2101", "2102", "2103", "2104", "2105", "2106", "2107", "Oka", "Niva Legend", "Niva Travel"],
  Lamborghini: ["Urus", "Huracan", "Aventador", "Gallardo", "Murcielago", "Diablo", "Countach", "Reventon", "Veneno", "Centenario", "Sian", "Essenza SCV12", "Terzo Millennio", "Sesto Elemento", "Concept S", "Egoista", "LM002", "Jalpa", "Espada", "Islero", "Miura", "350 GT", "400 GT", "Jarama", "Urraco", "Silhouette", "Coutach LPI 800-4"],
  Lancia: ["Ypsilon", "Delta", "Voyager", "Thema", "Musa", "Thesis", "Kappa", "Phedra", "Lybra", "Fulvia", "Flavia", "Stratos", "Montecarlo", "Beta", "Gamma", "Dedra", "Zeta", "Fedra", "Dialogos", "Pangea", "Nea", "Granturismo Stilnovo", "Medusa", "Orca", "Megagamma", "Hyena", "Kaylan", "Izmo", "P030", "Flaminia", "Appia", "Ardea", "Aurelia", "Dilambda", "Lambda", "Aprilia", "Astura", "Artena", "Augusta", "Trevi", "Dedra", "K", "Zeta", "Lybra SW"],
  LandRover: ["Range Rover Evoque", "Range Rover Sport", "Discovery Sport", "Range Rover Velar", "Discovery", "Defender", "Range Rover", "Freelander", "Series II", "Series III", "Series I"],
  Leapmotor: ["T03", "C10", "C01", "C11"],
  Lexus: ["RX", "NX", "UX", "ES", "IS", "LS", "CT", "LC", "RC", "GS", "SC", "LX", "GX", "HS", "LFA", "LBX"],
  Ligier: ["JS50", "JS60", "IXO", "X-Too", "Nova", "Ambra", "JS50L", "JS RC", "X-Too S", "X-Too RS", "X-Too R", "X-Too Max"],
  Lincoln: ["Navigator", "Aviator", "Corsair", "Nautilus", "Continental", "MKZ", "Town Car", "Mark", "MKC", "MKX", "MKS"],
  Lotus: ["Eletre", "Emira", "Europa", "Exige", "Elise", "Other"],
  Lucid: ["Air", "Gravity"],
  Lynk_Co: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "Z10", "Z20"],
  Man: ["TGE", "TGX", "TGS", "TGL", "Other", "HX", "TGA", "F2000", "L2000", "M2000", "Bus", "Lion's City", "Lion's Coach", "Lion's Intercity", "Lion's Regio", "Lion's Star"],
  UAZ: ["Hunter", "469 B", "452", "Patriot", "Buhanka", "Pickup", "Inny"], 
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Touran", "T-Roc", "Caddy", "Arteon", "Multivan", "Transporter", "Golf Plus", "Sharan", "Touareg", "up!", "Caravelle", "Taigo", "T-Cross", "Jetta", "Amarok", "Golf Sportsvan", "Tiguan Allspace", "Scirocco", "Tayron", "CC", "California", "Beetle", "ID.3", "ID.4", "ID.5", "ID.7", "Crafter", "Fox", "Lupo", "Eos", "Phaeton", "Corrado", "Bora", "Vento", "Other"], 
  Volvo: ["XC60", "V60", "XC90", "XC40", "V40", "S60", "V50", "V70", "S90", "V90", "C30", "S80", "XC70", "V90 Cross Country", "V60 Cross Country", "S40", "EX30", "V40 Cross Country", "C70", "C40", "EX90", "P1800", "S70", "Other"], 
  Warszawa: ["M-20", "223", "224", "M-204", "Pick-up", "2233", "Inny"], 
  Wartburg: ["353", "1.3", "311", "312", "Inny"], 
  Wolga: ["M21", "M24", "M20 Pobieda", "3102", "3110", "31105", "GAZ-24", "GAZ-21", "GAZ-M20", "Inny"], 
  Xiaomi: ["SU7", "SU7 Max", "SU7 Pro", "SU7 Ultra", "YU7"], 
  XPeng: ["P7", "G9", "G6", "X9", "P5", "G3", "P7+", "G7", "Mona M03", "Inny"], 
  Żuk: ["Inny", "Izoterma", "FS Lublin", "A", "FSC", "A 13", "A118", "A111H", "ZUK A 11B"],
  Suzuki: ["Swift", "Vitara", "S-Cross", "Ignis", "Across", "Swace", "Jimny", "Grand Vitara", "SX4", "Baleno", "Splash", "Alto", "Samurai", "Liana", "Kizashi", "Celerio", "Wagon R+", "XL7", "X-90", "Other"], 
  Syrena: ["100", "101", "102", "103", "104", "105", "Bosto", "R20", "Sport", "110", "Inny"], 
  Tarpan: ["233", "235", "Honker", "Inny", "237", "F-233", "F-235", "239D"], 
  Tata: ["Indica", "Xenon", "Safari", "Indigo", "Sumo", "Aria", "Nano", "Bolt", "Tiago", "Tigor", "Nexon", "Harrier", "Altroz", "Punch", "Sierra", "Curvv", "Avinya", "Inny"], 
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck", "Roadster", "Semi", "Inny"], 
  Toyota: ["Corolla", "Yaris", "RAV4", "C-HR", "Aygo", "Auris", "Corolla Cross", "Camry", "Highlander", "Land Cruiser", "Hilux", "Prius", "Yaris Cross", "GR Yaris", "Proace City", "Proace City Verso", "Proace Verso", "Proace", "Mirai", "bZ4X", "Avensis", "Celica", "MR2", "Supra", "Verso", "GT86", "Sienna", "Urban Cruiser", "IQ", "Verso-S", "Starlet", "Carina", "Corolla Verso", "Avensis Verso", "Dyna", "Tundra", "Tacom", "Tercel", "4Runner", "Paseo", "Sequoia", "Other"], 
  Trabant: ["601", "P 50", "600", "Inny", "1.1", "Hycomat", "Kübelwagen"],
  Renault: ["Clio", "Captur", "Megane", "Austral", "Arkana", "Scenic", "Espace", "Twingo", "Kadjar", "Koleos", "Kangoo", "Trafic", "Master", "Zoe", "Laguna", "Talisman", "Modus", "Vel Satis", "Fluence", "Wind", "Kwid", "Symbioz", "Rafale", "R5", "R4", "Grand Scenic", "Twizy", "Fuego", "Safrane", "19", "21", "25", "5", "8", "9", "11", "12", "14", "16", "18", "20", "30", "Alaskan", "Avantime", "Duster", "Express", "Kaptur", "Latitude", "Lodgy", "Logan", "Sandero", "Thalia", "Velsatis", "Duster", "Kango Van", "Master Van", "Trafic Van", "Other"], 
  RollsRoyce: ["Cullinan", "Ghost", "Phantom", "Wraith", "Dawn", "Spectre","Silver Shadow", "Silver Spur", "Silver Seraph", "Other"], 
  Rover: ["75", "25", "45", "Mini", "200", "400", "600", "800", "100", "Metro", "Streetwise", "Montego", "Maestro", "SD1", "Inny"], 
  Saab: ["9-3", "9-5", "900", "9-3X", "9000", "9-7X", "9-2X", "99", "96", "9-4X", "Inny"], 
  Seat: ["Leon", "Ibiza", "Ateca", "Arona", "Alhambra", "Altea", "Altea XL", "Exeo", "Tarraco", "Toledo", "Mii", "Cordoba", "Arosa", "Marbella", "Malaga", "Other"], 
  Skoda: ["Octavia", "Superb", "Fabia", "Kodiaq", "Kamiq", "Karoq", "Scala", "Rapid", "Yeti", "Roomster", "Citigo", "Enyaq", "Elroq", "Felicia", "Favorit", "Praktik", "105", "120", "100", "Kushaq", "Slavia", "Enyaq Coupe", "Other"], 
  Smart: ["Fortwo", "Forfour", "Roadster", "#1", "#3", "Crossblade", "Inny"], 
  SsangYongKGM: ["Torres", "Korando", "Tivoli", "Musso", "Rexton", "Actyon", "Rodius", "XLV", "Tivoli Grand", "Kyron", "Other"], 
  Subaru: ["Forester", "Outback", "Impreza", "XV", "Legacy", "BRZ", "WRX", "Crosstrek", "Levorg", "Justy", "Tribeca", "Solterra", "Ascent", "SVX", "G3X Justy", "Trezia", "Other"],
  Opel: ["Astra", "Corsa", "Mokka", "Grandland", "Zafira", "Insignia", "Meriva", "Crossland", "Combo", "Vectra", "Adam", "Antara", "Frontera", "Vivaro", "Signum", "Agila", "Karl", "Cascada", "Ampera", "Tigra", "Movano", "Omega", "Kadett", "Monterey", "Calibra", "GT", "Campo", "Kombi", "Ascona", "Kapitan", "Rekord", "Other"], 
  Peugeot: ["308", "3008", "2008", "508", "208", "408", "Rifter", "Partner", "Boxer", "Expert", "108", "5008", "307", "RCZ", "207", "107", "Traveller", "206", "407", "406", "807", "607", "1007", "4007", "5008", "Partner Tepee", "Bipper", "301", "508 RXH", "206 CC", "307 CC", "308 SW", "508 SW", "e-208", "e-2008", "e-3008", "e-Rifter", "e-Traveller", "e-Boxer", "e-Expert", "e-408", "e-5008", "Other"], 
  Piaggio: ["Porter NP6", "Ape", "Inny", "Porter", "Ape 50", "Ape TM", "M500"], 
  Plymouth: ["Prowler", "Voyager", "Road Runner", "Inny", "Fury", "Belvedere", "Gran Fury", "Valiant", "Barracuda", "Duster", "Neon", "Acclaim", "Laser", "Sundance", "Horizon", "Turismo", "Colt", "Sapporo", "Arrow", "Reliant", "Caravelle", "GTX", "Satellite", "Cranbrook", "De Luxe"], 
  Polestar: ["2", "3", "4", "1", "Inny"], 
  Polonez: ["Caro", "Caro Plus", "Atu", "Truck", "Coupe", "MR'83", "MR'85", "MR'87", "MR'89", "Borewicz", "Inny"], 
  Pontiac: ["Firebird", "Trans Am", "GTO", "Grand Prix", "Bonneville", "Sunfire", "Solstice", "Grand Am", "Fiero", "Aztek", "Vibe", "Torrent", "G6", "G8", "Montana", "Le Mans", "Tempest", "Catalina", "Sunbird", "6000", "Inny"], 
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Cayman", "Boxster", "Cayman", "718 Boxster", "718 Spyder", "924", "Other", "944", "928", "356", "Carrera GT", "968", "Inny"], 
  RAM: ["1500", "2500", "3500", "TRX", "ProMaster", "Other", "1500 Classic", "ProMaster City"],
  Zuk: ["Inny", "Izoterma", "FS Lublin", "A", "FSC", "A 13", "A118", "A111H", "ZUK A 11B"],
  Zhidou: ["KWB", "D2", "Inny"],
  Maserati: ["Grecale", "Levante", "GranTurismo", "Ghibli", "Quattroporte", "GranCabrio", "MC20", "MC20 Cielo", "Biturbo", "Coupe", "Spyder", "Merak", "Gransport", "GT2 Stradale", "Trofeo"],
  Maxus: ["Deliver 9", "Euniq 6", "Euniq 5", "Deliver 7", "eT90", "T60 MAX LUXURY", "e-Deliver 9", "e-Deliver 7"], 
  Maybach: ["GLS", "Klasa S", "57", "62", "Inny", "S 560", "S 580", "S 600", "S 650", "SL 680 Monogram Series", "EQS SUV"], 
  Mazda: ["CX-5", "6", "CX-60", "3", "CX-30", "2", "CX-3", "MX-5", "MX-30", "CX-7", "CX-9", "5", "CX-80", "RX-8", "323F", "MX-3", "Tribute", "626", "323", "CX-90", "Xedos", "Seria B", "CX-50", "Premacy", "Other", "MX-6", "BT-50", "MPV", "Xedos 6", "CX-8"], 
  McLaren: ["Artura", "GT", "720S Coupe", "MP4-12C", "765LT Spider", "720S Spider", "650S", "570S Coupe", "570S Spider", "Other", "750S", "GTS", "Elva", "Senna", "Speedtail", "F1", "P1", "600LT", "570GT", "540C", "675LT"], 
  MercedesBenz: ["Klasa C", "Klasa E", "Klasa A", "GLC", "CLA", "Klasa S", "GLE", "Klasa B", "GLA", "SL", "Klasa V", "GLB", "CLS", "ML", "Vito", "Klasa G", "AMG GT", "CLK", "GLS", "SLK", "W124", "EQB", "EQE", "EQS", "EQS SUV", "EQE SUV", "Maybach", "Citan", "Sprinter", "Viano", "CLC", "CLE", "AMG SL", "GT 4-Door Coupe", "A-Class Sedan", "C-Class All-Terrain", "EQT", "T-Class", "X-Class", "Vaneo", "190", "124", "200", "210", "220", "230", "240", "250", "260", "270", "280", "290", "300", "320", "350", "380", "400", "420", "430", "450", "500", "550", "560", "600", "SLR McLaren", "SLS AMG", "AMG One", "SLC", "Other"],
  Mercury: ["Grand Marquis", "Milan", "Mariner", "Mountaineer", "Sable", "Montego", "Monterey", "Marauder", "Cougar", "Villager", "Eight", "M-Series", "Comet", "Cyclone", "Capri", "Marquis", "Colony Park", "Montclair", "Park Lane", "Topaz", "Tracer", "Monarch", "Zephyr", "Bobcat", "Lynx", "LN7", "Mystique", "S-55", "Meteor", "Turnpike Cruiser", "Voyager", "Custom", "Commuter", "400", "Villager"], 
  MG: ["HS", "ZS", "MG3", "EHS", "4", "Cyberster", "MGF", "Midget", "MGB", "Marvel R", "5", "ZS Hybrid+", "7"], 
  MINI: ["Cooper", "Countryman", "Clubman", "One", "Cooper S", "John Cooper Works", "Cabrio", "Hatch", "Electric", "Aceman", "Paceman", "Coupe", "Roadster", "One D", "Cooper D", "Cooper SD", "John Cooper Works ALL4", "Cooper ALL4", "EHS", "SE"],  
  Mitsubishi: ["ASX", "Outlander", "Colt", "Space Star", "Lancer", "Eclipse Cross", "L200", "Pajero", "Grandis", "Carisma", "Galant", "Pajero Sport", "i-MiEV", "Space Wagon", "Sigma", "Montero", "L400", "Space Runner", "Space Gear", "Lancer Evolution", "Pajero Pinin", "Eclipse", "Triton", "Mirage", "Outlander PHEV", "Xpander", "Xforce", "Mirage G4", "Attrage", "Shogun", "Delica", "Other"], 
  Nysa: ["521", "522", "N57", "N58", "N59", "N60", "N61", "501"], 
  Oldsmobile: ["Eighty-Eight", "Toronado", "Inny", "Delta 88", "Cutlass", "Custom Cruiser", "Regency", "Alero", "Aurora", "Silhouette", "Intrigue", "Bravada", "442", "98", "Cutlass Supreme", "Cutlass Ciera", "Firenza", "Omega", "Achieva", "Starfire", "Vista Cruiser", "F-85"],
  Omoda: ["5", "E5", "9", "3", "7", "Inny"]
};
const [formData, setFormData] = useState({
    category: 'samochod',
    pojazdTyp: '',
    imie: '',
    email: '',
    numer: '',
    dodanePrzez: '',
    stan : '',
    marka: '',
    model: '',
    rok: '',
    przebieg: '',
    pojemnosc: '',
    paliwo: '',
    moc : '',
    tytul: '',
    opis: '',
    cena: '',
    imageKey: ''
  });
  const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    // handlers
    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  
    function handleFileChange(e) {
      setFile(e.target.files[0]);
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      setUploading(true);
  
      let uploadedFileName = "";
  
      try {
        // 1. Upload to S3 first
        if (file) {
          const uploadForm = new FormData();
          uploadForm.append('file', file);
  
          const uploadRes = await fetch('/api/s3-upload', {
            method: 'POST',
            body: uploadForm,
          });
  
          const uploadResult = await uploadRes.json();
  
          if (uploadRes.ok) {
            uploadedFileName = uploadResult.fileName;
          } else {
            alert("Błąd podczas przesyłania zdjęcia.");
            setUploading(false);
            return;
          }
        }
  
        // 2. Send data to MongoDB
        const res = await fetch('/api/samochod', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            imageKey: uploadedFileName,
          }),
        });
  
        if (res.ok) {
          alert('Oferta dodana!');
          setFormData({ category: 'samochod',
          imie: '',
          email: '',
          numer: '',
          dodanePrzez: '',
          marka: '',
          model: '',
          rok: '',
          przebieg: '',
          paliwo: '',
          moc : '',
          tytul: '',
          opis: '',
          cena: '',
          imageKey: ''});
          setFile(null);
  
          // redirect back to /oferty after success
          router.push('/oferty');
        } else {
          alert('Wystąpił błąd przy dodawaniu oferty.');
        }
      } catch (err) {
        console.error("Upload error", err);
        alert("Coś poszło nie tak.");
      } finally {
        setUploading(false);
      }
    }

const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setAvailableModels(modelsByBrand[brand] || []);
    };


    return(
        <div className="samochodyContainer">
          <div className={`profileMenu ${isShowProfileMenu ? 'show' : ''}`}>
                <ProfileMenu />
              </div>
              <div className="header">
                <div className="headerText">
                  <a href="Kontakt">Kontakt</a>
                  <a href="O-nas">O nas</a>
                </div>
                <img src= "/default_logo.svg" className="LogoIcon" onClick={() => router.push("/oferty")}/>
                
                
                {session?.user ? (
                  <>
                  <button className="UserProfileButton" type='button' onClick={toggleProfileMenu}>
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="UserProfileImage"
                    />
                  </button>
                    
                  </>
                ) : (
                  <UserIcon style={{ fontSize: 50, color: '#1d1d1b' }} className="UserIcon" />
                )}
              </div>
            <form className="samochodyForm">        
                <div className="coChceszZrobic">
          JAKI POJAZD CHCESZ SPRZEDAĆ?
        </div>
        <div className="coChceszZrobicButtons">
          <button type="button" className = "osobowyButton" name="wybierzSamochod" onClick={() => {
            showMarka();
            setFormData({ ...formData, pojazdTyp: "Osobowy" })
          }}><DirectionsCarIcon sx={{
      fontSize: 50,
      color: "#1d1d1b",
      transition: "all 0.3s ease",
      ".osobowyButton:hover &": {
        color: "black",
        
      },
    }} />Osobowy</button>
          <button type="button" className="motocyklButton" name="wybierzSamochod" onClick={() => {
            showMarka();
            setFormData({ ...formData, pojazdTyp: "Motocykl" })
          }}><TwoWheelerIcon sx={{
      fontSize: 50,
      color: "#1d1d1b",
      transition: "all 0.3s ease",
      ".motocyklButton:hover &": {
        color: "black",

      },
    }} />Motocykl</button>
      </div>
      <div className={`markamodelModal ${isShownMarka ? 'show' : ''}`}>
        <button type='button' onClick={() => showDane()} className='dalej'>Dalej</button>
        <div className='markamodelModalText'>
            <DirectionsCarFilledIcon style={{fontSize:50, color:"#1d1d1b"}}/>
          MARKA I MODEL
        </div>
        <div className='markamodelModalContent'>
           <select
  className="markaSelect"
  value={selectedBrand}
  onChange={(e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);                          // updates UI
    setAvailableModels(modelsByBrand[brand] || []);   // resets models list
    setFormData((prev) => ({ ...prev, marka: brand })); // saves to main formData
  }}
>
  <option value="" disabled>Marka Samochodu</option>
  {Object.keys(modelsByBrand).map((brand) => (
    <option key={brand} value={brand}>{brand}</option>
  ))}
</select>

<select
  className="modelSelect"
  value={formData.model}
  onChange={(e) => {
    const model = e.target.value;
    setFormData((prev) => ({ ...prev, model })); // save to formData
  }}
  disabled={!selectedBrand}
>
  <option value="" disabled>Model Samochodu</option>
  {availableModels.map((model) => (
    <option key={model} value={model}>{model}</option>
  ))}
</select>

        </div>
      </div>
      <div className={`daneModal ${isShowDane ? 'show' : ''}`}>
            <button type="button" onClick={() => showPhotos()} className="dalej2">Dalej</button>
            <div className='daneModalText'>
                <SettingsSuggestIcon style={{fontSize:50, color:"#1d1d1b"}}/>
                DANE TECHNICZNE
            </div>
            <div className='daneModalContent'>
                <input type='text' name='przebieg' className='przebieg' placeholder='Przebieg'  value={formData.przebieg} onChange={handleChange}/>
                <input type='text' name='pojemnosc' className='pojemnosc' placeholder='Pojemność silnika'  value={formData.pojemnosc} onChange={handleChange}/>
                <input type='text' name='moc' className='moc' placeholder='Moc silnika (w KM)' value={formData.moc} onChange={handleChange}/>
                <input type='number' name='rok' className='rok' placeholder='Rok produkcji' value={formData.rok} onChange={handleChange}/>
                <select className='paliwo' value={formData.paliwo} onChange={handleChange} name="paliwo">
                    <option value="" disabled >Rodzaj Paliwa</option>
                    <option value="Benzyna">Benzyna</option>
                    <option value="Diesel">Diesel</option>
                    <option value="LPG">LPG</option>
                    <option value="Elektryczny">Elektryczny</option>
                </select>
                <select className='stan' value={formData.stan} onChange={handleChange} name="stan">
                    <option value="" disabled >Stan Techniczny</option>
                    <option value="Nowy">Nowy</option>
                    <option value="Uzywany">Używany</option>
                </select>
            </div>
        </div>

      <div className={`photosModalContainer ${isShownPhotos ? 'show' : ''}`}>
          <button type="button"   onClick={() => showKontakt()} className="dalej3">Dalej</button>
          <div className="photosModalText">
          <AddAPhotoIcon style={{fontSize:50, color:"#1d1d1b"}}/>
          <h1>DODAJ ZDJĘCIA</h1>
        </div>
        <div className="photosModal">
          
            <input
              className="Photo1input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              
            />
            <AddPhotoAlternateIcon
              className="addPhotoIcon"
              style={{ fontSize: 60, color: '#1d1d1b' }}
            />
          
        </div>
        </div>

      <div className={`kontaktModal ${isShowKontakt ? 'show' : ''}`}>
        <button type = "button" className="dalej4" onClick={() => showTytul()} >Dalej</button>
        <div className="kontaktZTobaText">
          <PersonAddIcon style={{fontSize:50, color:"#1d1d1b"}}/>
          DAJ KONTAKT DO SIEBIE!
        </div>
        
        <div className="kontaktZTobaInput">
          <input type="text" name="imie"  className ="imie"  placeholder="Imię"  value={formData.imie} onChange={handleChange}/>
          <input type="number" name="numer" className ="telefon"  placeholder="Numer telefonu" value={formData.numer} onChange={handleChange}/>
          <input type="email" name="email" className ="email"  placeholder="E-mail" value={formData.email} onChange={handleChange}/>
          <select required
          name="dodanePrzez"
          value={formData.dodanePrzez} onChange={handleChange}
          
          >
            <option value="Wybierz">Dodane przez *</option>
            <option value="Osoba prywatna">Osoba prywatna</option>
            <option value="Firma">Firma</option>
            <option value="Deweloper">Deweloper</option>
          </select>
        </div>
        </div>

        <div className={`tytulModal ${isShowTytul ? 'show' : ''}`}>
          <button type="button" onClick={() => setIsShowCena(true)} className="dalej5" >Dalej</button>
          <div className="tytulModalText">
            <FormatColorTextIcon style={{fontSize:50, color:"#1d1d1b"}}/>
            <h1>TYTUŁ I OPIS</h1>
          </div>
          <div className="tytulModalContent">
            <input type="text" name="tytul" className="tytul" placeholder="Tytuł*"  value={formData.tytul} onChange={handleChange}/> 
            <input type="text" name="opis" className="tytul" placeholder="Opis"  value={formData.opis} onChange={handleChange}/>
          </div>

           
        </div>
        <div className={`cenaModal ${isShowCena ? 'show' : ''}`}>
          <div className="cenaModalText">
            <AttachMoneyIcon style={{fontSize:50, color:"#1d1d1b"}}/>
            <h1>CENA</h1>
          </div>
          <div className="cenaModalContent">
            <input type="number" name="cena" className="cena" placeholder="Cena*"  value={formData.cena} onChange={handleChange}/>
          </div>
        </div>
        <div className="dodajModal">
          <button type="submit" onClick={handleSubmit} className="dodajOgłoszenie">Dodaj Ogłoszenie</button>
        </div>
            </form>
        </div>
    )
}