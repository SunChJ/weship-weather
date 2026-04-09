# Lofoten Weather Widget

## What is this?
A single-page weather widget showing live conditions in Lofoten, Norway — real data, beautiful design, rain animation.

## Who is it for?
Anyone who opens the URL. It's a self-contained, shareable page.

## What does it do?
- Shows current temperature from Open-Meteo (68.2°N, 14.4°E, Europe/Oslo)
- Displays "Today" + current local time in Lofoten
- Shows "Lofoten / Norway" as the location
- Animated rain drops over a Nordic landscape background
- 400×400px card, centered on a dark (#18181B) page

## What doesn't it do?
- No forecast, no hourly breakdown (just current temp)
- No location picker — it's always Lofoten
- No settings or interactivity beyond looking at it

## Tech
- Next.js + Tailwind
- Open-Meteo API (free, no key)
- CSS rain animation (60 drops)
- Inter font (Black 72px for temp, Semi Bold 18px for labels)
- All text white (#FFFFFF)
- Card: 400×400px, 16px corner radius, 32px padding
