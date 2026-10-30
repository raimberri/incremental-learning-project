# Asset playbook

## Reuse first

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets list
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets search water
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets search rain --tag weather
```

The catalog ships with a small warm-editorial image library: desks, notebooks,
libraries, keyboards, weather, coins, jars, tools, machinery, landscapes, and
everyday objects. Check the catalog before generating a new image.

Add to a course:

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets add <course> coin jars --dir img
```

This copies files to `video/remotion/public/img/` and writes
`video/asset-credits.md`.

## Generate a gap

1. Write a concrete subject, not an abstract concept: "four glass jars with
   decreasing amounts of amber beads", not "probability".
2. Use the style suffix:

```
Warm editorial photograph, soft natural light, cream and oatmeal palette,
muted colors, shallow depth of field, 35mm film look, calm minimal composition.
<subject>. No text, no watermark, no logos.
```

3. Generate at 1536×1024 (3:2).
4. Save to the course's `public/img/` with a descriptive slug.
5. If reusable, copy to `asset-library/images/` and add metadata to
   `manifests/images.json`; then run `courseforge assets rebuild`.

## If `image_generate` is down

`fetch failed` often means the proxy cannot reach the image service. Check the
route before retrying; a `000` response means it is dead. Then:

1. Use already-archived generated images for concrete scenes.
2. For abstract concepts, draw **text-free vector diagrams** (SVG → PNG with
   Chrome headless) and keep the generator under `video/art/`.
3. Keep the planned filenames; document the substitution in
   `video/asset-credits.md` and the chapter README. When the service returns,
   overwrite the same paths and re-render; never edit scene code for a swap.
4. Do not silently use an unrelated stock image.

## Metaphor discipline

- Use one image for one idea.
- If the photo is a metaphor, say where it breaks in the narration or caption.
- Do not generate a photo of a named person or a real event.
- Do not put formulas or labels inside the image; add them in SVG/HTML.
- Do not use a culturally specific image as if it were universal.

## Credits

`courseforge assets add` writes a table with id, file, description, source and
licence. Keep it in the course package. Generated images are not third-party
stock; do not claim they are photographs of real events.
