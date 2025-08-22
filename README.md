#  RezervirajApp

Aplikacija za rezervaciju termina kod doktora – sastoji se od backend servera, frontend aplikacije i admin panela.

https://rezervirajapp-1.onrender.com/ - link na frontend 
https://rezervirajapp-1-admin.onrender.com/ - link za admin/doctor panel
https://rezervirajapp.onrender.com/ - backend server


Pokretanje aplikacije (lokalno)

0. Instalirati [Node.js](https://nodejs.org/).

## Pokretanje aplikacije lokalno

### 1. Backend
1. Otvori terminal i uđi u direktorij `backend`:
   cd backend
   
2. Instaliraj potrebne pakete:
   npm install
  
3. Pokreni server:
   npm run server
   
    Backend dostupan na **http://localhost:4000**

### 2. Frontend
1. U novom terminalu uđi u direktorij `frontend`:
   cd frontend
   
2. Instaliraj potrebne pakete:
   npm install
   
3. Pokreni aplikaciju:
   npm run dev
   
   Frontend dostupan na **http://localhost:5173**



### 3. Admin panel

cd admin
npm install
npm run dev

Admin panel dostupan na **http://localhost:5174**



## ⚙️ Konfiguracija .env datoteka
U **frontend** i **admin** direktoriju potrebno je dodati **.env** datoteku s URL-om backend servera.

Primjer za lokalni rad:

VITE_API_URL=http://localhost:4000


Ako aplikaciju deployas, upisati URL backend servisa na Renderu(ja koristim) ili drugom hostingu.
