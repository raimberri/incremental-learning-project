# Music

The library stores **recipes**, not WAV files. A 9-minute stereo bed is about
100 MB; regenerating it is cheaper than committing it.

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge music <course> --bpm 76 --seed 7
```

The generator writes `video/remotion/public/music.wav` and puts a whoosh at every
scene cut in `timeline.json`. The mix is voice-first: `musicVolume=0.2` in the
Remotion composition.
