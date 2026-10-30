# {{TITLE}} · 视频构建

```
script/narration.json     逐句中英旁白（scene id 与正文对应）
script/storyboard.json    画面蓝图（type + 内容，不写 TSX）
remotion/                 Remotion 工程（模板生成）
out/                      成片、字幕、封面
```

## 命令

```bash
courseforge voice  <course>   # edge-tts → voice.wav + timeline.json + srt
courseforge music  <course>   # 合成背景音乐 → music.wav
courseforge check  <course>   # 旁白 / 分镜 / 字幕长度检查
courseforge render <course>   # Remotion → out/<slug>.mp4
```

## 分镜类型

`cover` · `bullets` · `formula` · `curve` · `compare` · `steps` · `photo` · `timeline` · `outro`

字段说明见课程库 `courseforge/templates/remotion/STORYBOARD.md`。
