# 🚀 FlowTrack Pro - Developer Guide (Hinglish)

Bhai, yeh app ab ek normal timer nahi rahi, yeh ek **Enterprise-Grade Premium Study Ecosystem** ban chuki hai. Is guide mein main tumhe bataunga ki **app mein kya-kya hai**, **kaise kaam karta hai**, aur **konsa code kahan rakha hua hai** taaki future mein tumhe edit karne mein koi dikkat na ho.

---

## 🌟 1. App Mein Kya-Kya Hai? (Core Features)

1. **Strict Google Login Gatekeeper**: App khulte hi sabse pehle `LoginPage` aata hai. Bina Google Auth ke koi andar nahi jaa sakta. Guest mode puri tarah khatam kar diya gaya hai.
2. **Delta-Sync Timer Engine**: Ye koi normal `setInterval` wala timer nahi hai jo browser minimize hone pe ruk jaye. Ye actual hardware clock (`Date.now()`) ka use karta hai. Agar laptop sleep mein chala jaye ya battery bacha raha ho, tab bhi calculation ekdum accurate hoti hai.
3. **Advanced Anti-Cheat System**: Koi console se time/xp badhane ki koshish karega toh pakda jayega. Har session ka ek secure Base64 `integrityHash` banta hai.
4. **Picture-in-Picture (PiP) YouTube & Timer**: Tum app ke upar ek floating mini-player chala sakte ho jismein tumhara timer ya YouTube lofi beats chalti rahengi (Controls ke sath).
5. **Gamification & XP Economy**: Padhai karne par XP milta hai. Level badhte hain (e.g., Novice Seeker se Flow Sovereign tak).
6. **100% Cloud Sync (Firebase)**: Jaise hi padhai khatam hoti hai, data seedha **Firebase Firestore** par sync ho jata hai. Local storage (IndexedDB) ka koi chakkar nahi, isse kabhi data loss nahi hota, aur kisi bhi device se login karne par wahin se shuru hota hai jahan chhoda tha.
7. **Free Architecture**: App Github + Vercel + Firebase Spark Plan (Free) par run karne ke liye optimize ki gayi hai. Tumhe ₹1 bhi kharch karne ki zaroorat nahi hai.

---

## 📂 2. Konsa Code Kahan Hai? (Folder Structure)

Project ka sabse main folder hai `src/`. Iske andar sab kuch well-organized hai:

### 📄 Entry Points
- `src/main.tsx`: React ka starting point. Yahan se puri app render hoti hai.
- `src/App.tsx`: Yahan saari **Routes (Pages)** handle hoti hain. **Login Guard** bhi yahi par laga hai. (Matlab agar user `null` hai toh yahan se sidha `LoginPage` dikhaya jata hai).

### 🏠 Views (Pages) - `src/pages/`
Jo bhi tumhe screen par dikhta hai, uska main component yahan hai:
- `LoginPage.tsx`: Naya premium glassmorphism wala login screen.
- `DashboardPage.tsx`: Main screen jahan Level, XP, aur aaj ki padhai ka chart dikhta hai.
- `TimerPage.tsx`: Jaha actual focus timer chalta hai, subjects select hote hain.
- `SettingsPage.tsx`: Jaha user apni profile dekhta hai, pomodoro timings set karta hai, aur Sign Out kar sakta hai.
- `AnalyticsPage.tsx`: Jaha padhai ke graphs (Recharts) ban ke aate hain.

### 🧩 Chote Hise (Components) - `src/components/`
Pages ke andar jo chhote elements hote hain (Buttons, Modals, Timer Display), wo yahan hain:
- `components/timer/FloatingTimer.tsx`: Picture-in-Picture (PiP) wala code yahan hai.
- `components/timer/AmbiencePlayer.tsx`: Jo barish ki aawaz aur YouTube controls chalte hain, wo sab logic isme hai.
- `components/layout/AppShell.tsx`: Navigation bar aur sidebar yahan banti hai.

### 🧠 Dimag (Store & Logic)
- **`src/store/useAppStore.ts`**: Yeh app ka **Brain** hai. Zustand library ka use karke yahan saara Data (Sessions, Subjects, User, Theme) rakha jata hai. Koi bhi page directly yahan se data mangta hai. Agar tumhe koi naya global variable banana ho, toh yahi aana padega.
- **`src/hooks/useTimer.ts`**: Timer tick hone ka saara math, background tab handling, aur XP calculate hone ka logic is file mein hai.
- **`src/hooks/useCloudSync.ts`**: Firebase pe data bhejne aur wahan se laane ki saari responsibility iski hai. `onAuthStateChanged` bhi yahi check karta hai ki user logged in hai ya nahi.

### 🔧 Tools & Config
- **`src/lib/firebase.ts`**: Firebase ka configuration, API keys, aur `auth` initialization.
- **`src/lib/firestore.ts`**: Firestore database se data read/write karne ke saare directly secured functions yahan hain.

---

## 🔄 3. Data Kaise Flow Karta Hai? (Kaise Kaam Karta Hai)

1. **Step 1: User App Kholta Hai**
   - `App.tsx` load hota hai aur `useAppStore` check karta hai ki user logged in hai ya nahi (`authLoading` check).
   - Agar nahi hai, toh `LoginPage` show hota hai.
   - User Google se login karta hai -> Firebase `useCloudSync.ts` ko signal deta hai -> `setUser` update hota hai -> Dashboard khul jata hai.

2. **Step 2: Timer Start Hota Hai (`useTimer.ts`)**
   - Jab tum Start dabate ho, `startedAtMs` (exact timestamp) save ho jata hai.
   - Background mein ek service chalti hai jo har second timer ko update karti hai.

3. **Step 3: Session Complete Hota Hai**
   - Jaise hi timer khatam hota hai ya tum Finish dabate ho, naya session object banta hai.
   - Isme ek `integrityHash` add hota hai (Anti-cheat security).
   - `useAppStore` us session ko turant **Firebase Firestore** par `fs.saveSession()` ke through bhej deta hai. Naya data cloud par permanently save ho jata hai.

---

## 💡 4. Kuch Edit Karna Ho Toh Kahan Jayein?

- **Colors / Theme Badlna Hai?** `src/index.css` (Tailwind config yahan hai) aur `AppShell.tsx` mein gradients set hain.
- **Naya Page Banana Hai?** `src/pages/` mein file banao, aur `src/App.tsx` mein uska `<Route>` add kar do. Navbar mein link dikhane ke liye `AppShell.tsx` ke `links` array mein add karo.
- **Naya Firebase Feature (e.g., Friends/Leaderboard)?** `src/hooks/useCloudSync.ts` ke andar ek naya function banao jo Firestore se data fetch kare aur Zustand (`useAppStore.ts`) mein save kare.

Bhai app ekdum next-level bani hai, bilkul clean architecture ke saath. Coding karte raho! 🚀

---

## 🔑 5. Environment Variables aur Firebase Setup (Sabse Zaroori)

Kyunki yeh ek Strict Premium Cloud App hai, isliye **Firebase** ke bina app login nahi karegi aur aage nahi badhegi. Niche exact steps hain ki kaunsi API key kahan daalni hai aur kaunse Rules lagane hain.

### Step 1: `.env` File Banana
Project ke main folder (jahan `package.json` hai) mein ek nayi file banao jiska naam strictly `.env` hona chahiye. Uske andar yeh exact lines daalni hain:

```env
VITE_FIREBASE_API_KEY=tumhari_firebase_api_key_yahan_aayegi
VITE_FIREBASE_AUTH_DOMAIN=tumhara_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tumhara_project_id
VITE_FIREBASE_STORAGE_BUCKET=tumhara_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

*(Yeh saari details tumhe Firebase Console -> Project Settings -> General -> Web App banate waqt mil jayengi).*
**Note:** Vite mein environment variables hamesha `VITE_` se start hone zaroori hote hain, warna code unhe padh nahi payega.

### Step 2: Firebase Console Mein "Authentication" Setup
Bina iske Google Login button kaam nahi karega!
1. Firebase Console mein jao.
2. Left menu se **Build > Authentication** par click karo.
3. **Get Started** par click karo.
4. **Sign-in method** tab mein jao aur **Google** ko enable kar do.
5. Apna support email wahan select kar lena aur Save kar dena.

### Step 3: Firebase Security Rules (Firestore & Storage)
Bohot zaroori hai ki aapka data aur files secure rahein. Agar aapke Firebase rules default par hain, toh koi bhi aapka data hack ya delete kar sakta hai! Niche diye gaye rules ko exact copy-paste karna hai.

#### 📝 A) Firestore Database Rules
1. Firebase Console mein **Build > Firestore Database** par click karo.
2. **Rules** wale tab mein jao aur purana code delete karke yeh paste kar do:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 1. User Profile & Data Access
    match /users/{userId}/{document=**} {
      // User sirf apna khud ka data dekh, likh aur modify kar sakta hai
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 2. Default strict deny policy kisi aur collection ke liye
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### 📦 B) Firebase Storage Rules (Agar aap images/files use kar rahe hain)
1. Firebase Console mein **Build > Storage** par click karo.
2. **Rules** wale tab mein jao aur yeh rules paste karo:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 1. User ki personal files
    match /users/{userId}/{allPaths=**} {
      // Sirf logged in user apni files padh ya upload kar sakta hai
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 2. Default strict deny policy
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

**Iska fayda kya hai?** 
Yeh rules ensure karte hain ki ek user (jaise Rahul) kisi dusre user (jaise Rohit) ka data ya files kabhi access nahi kar sakta. `request.auth.uid` ko path `userId` se strictly match kiya jata hai!

### Is Setup Ke Baad Kya Karein? (Vercel Deployment)
Jab tum yeh saari keys `.env` file mein daal lo, toh:
1. Apna code **GitHub** par push karo (Free).
2. **Vercel** par login karke naya project banao aur GitHub repository select karo.
3. Vercel ke **Environment Variables** settings mein wahi saari `VITE_FIREBASE_...` keys paste kar do.
4. Deploy button dabao! 

Tumhari Premium FlowTrack Pro app internet par **100% Free** (Vercel Hobby Plan + Firebase Spark Plan) live ho jayegi! 🚀
