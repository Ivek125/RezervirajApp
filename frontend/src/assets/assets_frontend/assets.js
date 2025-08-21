// assets.js
import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";


import about_image from "./about_image.png";






// Doctors images
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";

// Category images
import Dermatologist from "./Dermatologist.png";
import General_physician from "./general_physician.png";
import Pediatricians from "./pediatricians.png";
import Stomatologist from "./stomatologist.png"; 
// About page images
import about1 from "./about1.png";
import about2 from "./about2.png";
import contact_image from "./contact_image.png";

export const assets = {
  appointment_img,
  
  about_image,

  Dermatologist,
  General_physician,
  Pediatricians,
  Stomatologist,
  about1,
  about2,
  contact_image,
};
//Lozinka1@
export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Marko Horvat",
    image: doc1,
    speciality: "Liječnik opće prakse",
    degree: "Dr. med.",
    experience: "4 godine",
    about:
      "Dr. Horvat pruža sveobuhvatnu primarnu zdravstvenu skrb s naglaskom na prevenciju i pravovremenu dijagnozu.",
    fees: 50,
    address: "Ulica zdravlja 12, Zagreb, Hrvatska",
  },
  {
    _id: "doc2",
    name: "Dr. Ivana Petrović",
    image: doc2,
    speciality: "Liječnik opće prakse",
    degree: "Dr. med.",
    experience: "5 godina",
    about:
      "Dr. Petrović ima iskustvo u radu s pacijentima svih dobnih skupina i posvećena je cjelovitoj skrbi.",
    fees: 55,
    address: "Klinika Nova 8, Split, Hrvatska",
  },
  {
    _id: "doc3",
    name: "Dr. Tomislav Kovač",
    image: doc3,
    speciality: "Stomatolog",
    degree: "Dr. med. dent.",
    experience: "6 godina",
    about: "Specijalizirao se za estetsku stomatologiju i rad s djecom.",
    fees: 60,
    address: "Zubna ulica 14, Rijeka, Hrvatska",
  },
  {
    _id: "doc4",
    name: "Dr. Lana Mikulić",
    image: doc4,
    speciality: "Stomatolog",
    degree: "Dr. med. dent.",
    experience: "3 godine",
    about: "Fokusirana na preventivnu stomatologiju i zdravlje usne šupljine.",
    fees: 50,
    address: "Dentalna 5, Osijek, Hrvatska",
  },
  {
    _id: "doc5",
    name: "Dr. Anita Šarić",
    image: doc5,
    speciality: "Pedijatar",
    degree: "Dr. med.",
    experience: "4 godine",
    about:
      "Pedijatar s iskustvom u skrbi za novorođenčad i djecu predškolske dobi.",
    fees: 45,
    address: "Dječja klinika 7, Zadar, Hrvatska",
  },
  {
    _id: "doc6",
    name: "Dr. Nikola Krpan",
    image: doc6,
    speciality: "Pedijatar",
    degree: "Dr. med.",
    experience: "6 godina",
    about: "Posebno fokusiran na imunizaciju i nutritivno savjetovanje djece.",
    fees: 48,
    address: "Obiteljska 19, Pula, Hrvatska",
  },
  {
    _id: "doc7",
    name: "Dr. Elena Novak",
    image: doc7,
    speciality: "Dermatolog",
    degree: "Dr. med.",
    experience: "5 godina",
    about:
      "Dermatologinja specijalizirana za tretmane kože i alergijske reakcije.",
    fees: 70,
    address: "Dermacentar 21, Dubrovnik, Hrvatska",
  },
  {
    _id: "doc8",
    name: "Dr. Filip Radić",
    image: doc8,
    speciality: "Dermatolog",
    degree: "Dr. med.",
    experience: "2 godine",
    about:
      "Mlad, entuzijastičan stručnjak za dermatološke preglede i savjetovanja.",
    fees: 65,
    address: "Kožna 3, Varaždin, Hrvatska",
  },
];

// Exportamo dodatno i kategorije doktora

export const doctorsCategories = [
  { title: "Liječnik opće prakse", image: General_physician },
  { title: "Dermatolog", image: Dermatologist },
  { title: "Stomatolog", image: Stomatologist },
  { title: "Pedijatar", image: Pediatricians },
];
