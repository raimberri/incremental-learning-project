# Examples

## entropy-mini

An 82-second smoke test of the whole pipeline:

- 5 scenes / 14 bilingual lines;
- cover with a photo from `asset-library` (`coin`);
- bullets, formula, `neglog` curve, outro;
- edge-tts voice, synthesized music, SRTs, MP4, poster.

It exists to prove that `courseforge` works end to end, not as a polished
course. Regenerate it with:

```bash
cd ../..
export PYTHONPATH=courseforge/src
PY=.venv/bin/python
$PY -m courseforge check  courseforge/examples/entropy-mini
$PY -m courseforge voice  courseforge/examples/entropy-mini
$PY -m courseforge music  courseforge/examples/entropy-mini
$PY -m courseforge render courseforge/examples/entropy-mini
$PY -m courseforge thumbnail courseforge/examples/entropy-mini
```

The demo's `video/remotion/node_modules` was a local symlink during development;
remove it before publishing. `npm install` recreates it.
