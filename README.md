# Deckhand

Duolingo-style flash cards for learning programming topics. Multiple choice, three levels per subject, plus a deck of tips and curiosities.

```sh
npm install
npm run dev
```

## How it works

- A round deals 10 cards from a level. Cards you missed come first, then new ones, then ones you're still learning, then mastered ones.
- Get a card wrong and it comes back once at the end of the round.
- A card counts as **mastered** after 2 correct answers in a row.
- Clicking an answer (or pressing `1`–`4`) checks it right away. `Enter` moves to the next card, `Esc` leaves. In tips, use `←` / `→`.

## Where progress is saved

In a SQLite file on disk: `data/deckhand.db`. It logs every answer you give, which drives XP, the day streak, the activity chart and card mastery.

- A small API in `server/` reads and writes it. It runs inside Vite, so `npm run dev` is the only thing to start. If the page can't reach it, a red banner says so.
- It uses Node's built-in `node:sqlite`, so there's nothing native to install (Node 22.13+). Node prints an "experimental" warning once at startup; that's expected.
- Back it up by copying the file. Open it with any SQLite tool to poke around. `data/` is git-ignored.
- To use a different file, set `DECKHAND_DB=/path/to/file.db` before `npm run dev`.
- To start over, stop the app and delete `data/deckhand.db`.

## Adding a subject

1. Copy `src/subjects/typescript/` to a new folder, e.g. `src/subjects/rust/`.
2. Fill in its `index.ts` (name, badge, colour, level blurbs and glyphs) and the question and tip files. The shapes are in `src/types.ts`.
3. List it in `src/subjects/index.ts`.
4. Run `npm run check:content` to catch duplicate ids, bad answer indexes and unbalanced backticks.

Writing cards:

- Ids must be unique across all subjects and never change, because progress is saved against them. Prefix them, e.g. `rs-b-01`.
- Options are shuffled when shown, so avoid "all of the above".
- Wrap code in backticks inside any text field and it renders as inline code. Use `code` for multi-line snippets.
