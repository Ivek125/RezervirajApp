
// Category images
import Dermatologist from "./Dermatologist.png";
import General_physician from "./general_physician.png";
import Pediatricians from "./pediatricians.png";
import Stomatologist from "./stomatologist.png";

// about page images ()
import about1 from "./about1.png";
import about2 from "./about2.png";
import contact_image from "./contact_image.png";
import appointment_img from "./appointment_img.png";

export const assets = {
  appointment_img,
  Dermatologist,
  General_physician,
  Pediatricians,
  Stomatologist,
  about1,
  about2,
  contact_image,
};
//Lozinka1@ za sve doktore


// Exportamo dodatno i kategorije doktora (mozemo dodati, katergorije dinamicnko dodavanje)

export const doctorsCategories = [
  { title: "Liječnik opće prakse", image: General_physician },
  { title: "Dermatolog", image: Dermatologist },
  { title: "Stomatolog", image: Stomatologist },
  { title: "Pedijatar", image: Pediatricians },
  
];
