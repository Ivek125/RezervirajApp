// assets.js
import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

// Doctors images
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'

// Category images
import Dermatologist from './Dermatologist.png'
import General_physician from './General_physician.png'
import Pediatricians from './pediatricians.png'
import Stomatologist from './stomatologist.png' // Dodajem jer ti koristiš i .png stomatologa!

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  profile_pic,
  contact_image,
  about_image,
  logo,
  dropdown_icon,
  menu_icon,
  cross_icon,
  chats_icon,
  verified_icon,
  arrow_icon,
  info_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
  Dermatologist,
  General_physician,
  Pediatricians,
  Stomatologist, 
}

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Marko Horvat',
    image: doc1,
    speciality: 'Liječnik opće prakse',
    degree: 'Dr. med.',
    experience: '4 godine',
    about: 'Dr. Horvat pruža sveobuhvatnu primarnu zdravstvenu skrb s naglaskom na prevenciju i pravovremenu dijagnozu.',
    fees: 50,
    address: {
      line1: 'Ulica zdravlja 12',
      line2: 'Zagreb, Hrvatska'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Ivana Petrović',
    image: doc2,
    speciality: 'Liječnik opće prakse',
    degree: 'Dr. med.',
    experience: '5 godina',
    about: 'Dr. Petrović ima iskustvo u radu s pacijentima svih dobnih skupina i posvećena je cjelovitoj skrbi.',
    fees: 55,
    address: {
      line1: 'Klinika Nova 8',
      line2: 'Split, Hrvatska'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Tomislav Kovač',
    image: doc3,
    speciality: 'Stomatolog',
    degree: 'Dr. med. dent.',
    experience: '6 godina',
    about: 'Specijalizirao se za estetsku stomatologiju i rad s djecom.',
    fees: 60,
    address: {
      line1: 'Zubna ulica 14',
      line2: 'Rijeka, Hrvatska'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Lana Mikulić',
    image: doc4,
    speciality: 'Stomatolog',
    degree: 'Dr. med. dent.',
    experience: '3 godine',
    about: 'Fokusirana na preventivnu stomatologiju i zdravlje usne šupljine.',
    fees: 50,
    address: {
      line1: 'Dentalna 5',
      line2: 'Osijek, Hrvatska'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Anita Šarić',
    image: doc5,
    speciality: 'Pedijatar',
    degree: 'Dr. med.',
    experience: '4 godine',
    about: 'Pedijatar s iskustvom u skrbi za novorođenčad i djecu predškolske dobi.',
    fees: 45,
    address: {
      line1: 'Dječja klinika 7',
      line2: 'Zadar, Hrvatska'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Nikola Krpan',
    image: doc6,
    speciality: 'Pedijatar',
    degree: 'Dr. med.',
    experience: '6 godina',
    about: 'Posebno fokusiran na imunizaciju i nutritivno savjetovanje djece.',
    fees: 48,
    address: {
      line1: 'Obiteljska 19',
      line2: 'Pula, Hrvatska'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Elena Novak',
    image: doc7,
    speciality: 'Dermatolog',
    degree: 'Dr. med.',
    experience: '5 godina',
    about: 'Dermatologinja specijalizirana za tretmane kože i alergijske reakcije.',
    fees: 70,
    address: {
      line1: 'Dermacentar 21',
      line2: 'Dubrovnik, Hrvatska'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Filip Radić',
    image: doc8,
    speciality: 'Dermatolog',
    degree: 'Dr. med.',
    experience: '2 godine',
    about: 'Mlad, entuzijastičan stručnjak za dermatološke preglede i savjetovanja.',
    fees: 65,
    address: {
      line1: 'Kožna 3',
      line2: 'Varaždin, Hrvatska'
    }
  }
]

// Exportamo dodatno i kategorije doktora

export const doctorsCategories = [
  { title: 'Liječnik opće prakse', image: General_physician },
  { title: 'Dermatolog', image: Dermatologist },
  { title: 'Stomatolog', image: Stomatologist },
  { title: 'Pedijatar', image: Pediatricians },
]
