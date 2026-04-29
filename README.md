# 🚗Filo Yönetim Dashboard (React — araç takip dashboard'u)

Filo araçlarının listelendiği, filtrelenip sıralanabildiği bir yönetim dashboard'u.

## 🚀 Kurulum

```bash
npm install
npm start
```

Tarayıcıda `http://localhost:5173` adresini aç.

## 🖥️ Özellikler

- **Filtreleme** — Durum, marka ve tarih aralığına göre filtrele
- **Sıralama** — Sütun başlığına tıklayarak sırala (artan/azalan)
- **Durum badge'leri** — Aktif, Bakımda, Arızalı renk kodlu gösterim
- **Detay modalı** — Araç kartına tıkla, ESC ile kapat
- **Loading skeleton** — Veri yüklenirken animasyonlu iskelet ekran
- **Hata yönetimi** — Hata durumunda retry butonu
- **URL query params** — Filtre ve sıralama URL'ye yansır
- **Sayfalama** — Sayfa başına 8 araç
- **İstatistik kartları** — Toplam, aktif, bakımda, arızalı araç sayıları

## 🛠️ Teknolojiler

- React
- TypeScript
- Tailwind CSS
- Context API
- React Router DOM
- Vite

## 📸 Ekran Görüntüleri

### Ana Dashboard
![Ana Dashboard](public/Filo%20Yönetim%20Dashboard.JPG)

### Filtreleme
![Aktif Araçlar](public/Araç%20Aktif.JPG)
![Arızalı Araçlar](public/Araç%20Arızalı.JPG)
![Bakımda Araçlar](public/Araç%20Bakımda.JPG)