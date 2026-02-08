# Valentine's Week

A romantic, progressive web experience that unlocks daily from February 7-14, culminating in a beautiful Valentine's Day finale.

## Features

- **Progressive Unlocking**: Days unlock based on local device time
- **Emotional Pacing**: Carefully crafted copy with slow reveals
- **After Dark Mode**: Optional intimate section after Kiss Day
- **Grand Finale**: Valentine's Day with animations and interactive moments
- **Music Player**: Full-featured music player with playlist that works everywhere
- **Mobile-First**: Beautiful on all devices

## Adding Music

1. Place your MP3 files in the `public/music/` folder
2. Update `src/data/playlist.js` with your song information:
   ```javascript
   {
     id: 1,
     title: "Your Song Title",
     artist: "Artist Name",
     src: "/music/your-song.mp3",
     cover: "/music/cover.jpg" // Optional
   }
   ```
3. The music player will appear in the bottom-right corner and persist across all pages

## Adding Video Message

1. Place your video file in the `public/video/` folder
2. Name it `message.mp4` (or `message.webm` for WebM format)
3. The video will **only be visible on February 14**
4. Before February 14, the video component is completely hidden
5. On February 14, a video preview card appears in the bottom-left corner
6. Click the preview to play the video message

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Structure

- `src/components/` - React components
- `src/data/` - Valentine's week configuration
- `src/utils/` - Date utilities for unlocking logic
- `src/styles/` - CSS files for styling and animations

## Date Logic

Days unlock progressively:
- Before Feb 7: Shows countdown
- Feb 7 onward: Past and today's days are unlocked, future days are locked and blurred
- Uses local device timezone
