# Asset library

Reusable material for course videos. Every image here was generated with
`image_generate`; there are no third-party stock files.

```
images/                 1536×1024 JPG, warm editorial style
manifests/images.json   id, tags, description, prompt, source, hash, size
themes/                 palette + layout defaults (JSON)
music/                  music recipes; audio is generated, not stored
```

## Find an image

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets list
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets search probability
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets search rain --tag weather
```

## Use an image

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets add <course> coin jars --dir img
```

This copies the JPGs into `video/remotion/public/img/` and writes
`video/asset-credits.md`.

## Add a new image

1. Run `image_generate` with the style suffix from `manifests/images.json`.
2. Save the JPG as `asset-library/images/<slug>.jpg` (1536×1024, no text).
3. Add tags/description/prompt to `manifests/images.json`.
4. Run `courseforge assets rebuild` to refresh size and SHA-256.

Only add an image here if it is likely to be reused. Course-specific images can
stay in that course's `video/remotion/public/img/`.

## Style

The default library style is **warm paper**: soft natural light, cream and
oatmeal palette, muted colours, shallow depth of field, 35 mm editorial
photography. Every prompt ends with:

```
No text, no watermark, no logos.
```

## Licence

All images were generated for this project. They may be reused inside this
repository and in videos made from it. Do not present them as photographs of
real people, places, or events. See `manifests/images.json` for the per-file
source field.
