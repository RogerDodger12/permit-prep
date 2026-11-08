# Missouri Permit Prep

A practice app for the Missouri written permit test and road sign test. It runs in the browser, installs to the home screen, and works offline.

## What's inside

| File | What it does |
| --- | --- |
| index.html | The app: home, practice, mock test, topic drills, missed review, progress, settings |
| questions.js | 106 written questions and 28 sign questions from the August 2026 Missouri Driver Guide |
| signs.js | The road sign drawings for the sign round |
| sw.js | Offline support |
| manifest.webmanifest, icons/ | Home-screen install |
| worker/ | Cloudflare Worker for progress sync by code |

## Put it online (GitHub Pages)

1. Create a repo, for example `permit-prep`, and upload everything in this folder except `worker/`.
2. In the repo's Settings, open Pages and publish from the main branch, root folder.
3. Open `https://rogerdodger12.github.io/permit-prep/` on the phone, then Share and Add to Home Screen.

## Turn on progress sync (Cloudflare)

1. In the Cloudflare dashboard, create a KV namespace named `permit-progress` and copy its ID.
2. In `worker/wrangler.toml`, paste that ID, and set `ALLOWED_ORIGIN` to your Pages address (just the origin, no path).
3. From the `worker` folder, run `npx wrangler deploy`. Note the `workers.dev` address it prints.
4. In `index.html`, set `SYNC_URL` to that address, then upload the file again.
5. Bump `VERSION` in `sw.js` (for example to `permit-prep-v2`) so installed copies pick up the change.

The app makes an 8-character code the first time it opens with sync on. It's shown in Settings with a Copy button. On a new phone, enter that code in Settings to bring progress over.

## Tuning

At the top of the script in `index.html`:

- `WRITTEN_COUNT` and `WRITTEN_PASS` are 25 and 20, from the official guide.
- `SIGN_COUNT` and `SIGN_PASS` are 16 and 13. Confirm these against the Highway Patrol's sign test before relying on them.
- `PRACTICE_LEN` and `DRILL_LEN` set session lengths.

## Adding questions

Add entries to `questions.js` in the same shape. `c` is the correct answer's position (0 = A). For a sign question, add `type: "sign"` and an `img` name that exists in `signs.js`. Bump `VERSION` in `sw.js` after any change.

## Known limits

- Streak reminders show inside the app. A true phone notification at a set time would need a push server.
- Sync keeps the newest copy. If two phones are used at the same time, the most recent save wins.
