# 🍔 Food Delivery Platform (Pinecone)

Монголын хамгийн шуурхай, найдвартай онлайн хоол хүргэлтийн нэгдсэн систем.

---

## 🌐 Live Production Links

- **📱 Хэрэглэгчийн вэб апп (Frontend)**: [https://food-client-pink.vercel.app](https://food-client-pink.vercel.app)
- **🛡️ Админ удирдлагын самбар (Admin Panel)**: [https://food-admin-neon.vercel.app](https://food-admin-neon.vercel.app)
- **⚡ Backend REST API**: [https://food-server-sigma-five.vercel.app](https://food-server-sigma-five.vercel.app)

---

## 📁 Бүтэц (Monorepo Structure)

```
food_delivery/
├── food-client/       # Next.js 14 + MUI (Хэрэглэгчийн Frontend)
├── food-admin/        # Next.js 14 + MUI + ApexCharts (Админ Dashboard)
└── food-server/       # Express.js + TypeScript + MongoDB (REST API)
```

---

## 🚀 Суулгах ба Ажиллуулах

### 1. Frontend (food-client)
```bash
cd food-client
npm install
npm run dev
# http://localhost:3000
```

### 2. Admin Panel (food-admin)
```bash
cd food-admin
npm install
npm run dev
# http://localhost:3001
```

### 3. Backend (food-server)
```bash
cd food-server
npm install
npm run dev
# http://localhost:8000
```

---

## ✨ Онцлогууд

- 🛒 **Сагсны систем**: Тоо ширхэг нэмэх/хасах, нийт дүн болон хүргэлтийн үнэ тооцох, LocalStorage хадгалалт.
- 🍔 **Хоолны каталог**: Ангилал (Үндсэн хоол, Салат, Десерт, Хямдралтай), амьд хайлт, үнэ болон үнэлгээгээр эрэмбэлэх.
- 🔍 **Модаль цонх**: Найрлага, порцын тохиргоо, дэлгэрэнгүй зурагтай танилцах.
- 📦 **Захиалгын урсгал**: Хаяг оруулах (Дүүрэг, Хороо, Гудамж), төлбөрийн хэлбэр (QPay, Банкны карт, Бэлэн мөнгө).
- 📜 **Захиалгын түүх & Dashboard**: Өмнөх захиалгууд харах, дахин шууд захиалах.
- 📱 **100% Responsive**: Гар утас, таблет, компьютер дээр төгс харагдах UI/UX.
