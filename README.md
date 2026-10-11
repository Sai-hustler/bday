# For Krituu, with love ♥

A romantic, mobile-first birthday surprise website built with React, Vite, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Add your photos

Put four image files in `public/images/` with these exact names:

- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`
- `memory-4.jpg`

JPG, PNG, and WebP files work. If you use another extension, update the `image` paths in `src/main.jsx`. Until then, the page displays designed placeholders.

## Personalize before sharing

Open `src/main.jsx` and update:

- `memories`: photo captions and memory dates
- The letter inside the `letter-body` section: replace the sample message with words that sound like him
- `Krituu` / `Krithika` text if he prefers another nickname

The sound toggle is intentionally a visual placeholder; no audio plays by default. If adding music, use a track he has permission to use and start playback only after a user interaction.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Use the default Vite settings: build command `npm run build`, output directory `dist`.
4. Deploy and test the link on a phone before sharing it.

No environment variables are required.
