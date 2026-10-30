# 素材清单 · v2（2026-10-29 生成图重跑）

本片共 **22 张视觉素材，全部由 `image_generate`（gpt-image-2）生成**，
1536×1024，3:2，暖白编辑 / 纸艺微缩风格。画面内**无文字、无水印、无 logo**；
标题、年份、数字、轴名、标签全部由 HTML/SVG 渲染。

第一轮生成时 `image_generate` 返回 `fetch failed`，9 张抽象概念图曾用无文字矢量图兜底；
服务恢复后已重新生成并替换。重构精简目录时，矢量兜底脚本已删除；当前成片 0 张矢量图。

| id | 文件 | 画面说明 | 来源 | 许可 |
|---|---|---|---|---|
| intro-desk | img/intro-desk.jpg | 窗边纸艺书桌、笔记本电脑屏幕上的节点星座、茶杯与植物 | image_generate 2026-10-29 | 原创生成 |
| library | img/library.jpg | 长焦图书馆走廊与拱窗 | image_generate（归档） | 原创生成 |
| umbrella | img/umbrella.jpg | 雨夜透明伞与暖色路灯 | image_generate（归档） | 原创生成 |
| candidates | img/candidates.jpg | 四只装有不同数量珠子的玻璃罐（候选概率的视觉隐喻） | image_generate（归档） | 原创生成 |
| era-statistical | img/era-statistical.jpg | 老式电传打字机与档案柜 | image_generate（归档） | 原创生成 |
| era-scale | img/era-scale.jpg | 数据中心的服务器机架 | image_generate（归档） | 原创生成 |
| pattern-hand | img/pattern-hand.jpg | 手写笔记、钢笔与账本 | image_generate（归档） | 原创生成 |
| feather | img/feather.jpg | 奶油色亚麻上的一根金色羽毛 | image_generate（归档） | 原创生成 |
| ledger | img/ledger.jpg | 摊开的空白笔记本、钢笔与茶杯 | image_generate（归档） | 原创生成 |
| steam | img/steam.jpg | 黄铜蒸汽机与飞轮 | image_generate（归档） | 原创生成 |
| bacteria | img/bacteria.jpg | 朝暖光游动的细菌群 | image_generate（归档） | 原创生成 |
| pinfactory | img/pinfactory.jpg | 19 世纪别针工厂的手工工位 | image_generate（归档） | 原创生成 |
| mountain | img/mountain.jpg | 日出时山脊上的徒步者 | image_generate（归档） | 原创生成 |
| why-reasoning | img/why-reasoning.jpg | 五块踏脚石跨过云雾，徒步者从左向右走向远山 | image_generate 2026-10-29 | 原创生成 |
| why-scale | img/why-scale.jpg | 纸艺山峰：路径先平缓、接近山顶突然变陡 | image_generate 2026-10-29 | 原创生成 |
| why-understanding | img/why-understanding.jpg | 左：纸鹦鹉重复一个圆片；右：手把黄铜钥匙插进锁 | image_generate 2026-10-29 | 原创生成 |
| why-hallucination | img/why-hallucination.jpg | 带裂纹的自信纸面具，旁边镜中映出空洞的脸 | image_generate 2026-10-29 | 原创生成 |
| era-neural | img/era-neural.jpg | 彩色纸圆片由黄铜丝连成星座，悬浮在空白书页上 | image_generate 2026-10-29 | 原创生成 |
| era-transformer | img/era-transformer.jpg | 金色丝线跨过一排空白纸标签，汇聚到一张发光的标签 | image_generate 2026-10-29 | 原创生成 |
| era-alignment | img/era-alignment.jpg | 黄铜罗盘指向右侧一小群纸艺人物 | image_generate 2026-10-29 | 原创生成 |
| pattern-learned | img/pattern-learned.jpg | 木织机把彩色丝线织成有结构的布 | image_generate 2026-10-29 | 原创生成 |
| working-memory | img/working-memory.jpg | 六个浅木托盘：四个塞满旧纸，两个空 | image_generate 2026-10-29 | 原创生成 |

## 使用位置

| 场景 | 图片 |
|---|---|
| `intro` | intro-desk |
| `sentence` | library, umbrella, candidates, why-scale |
| `whys` | why-reasoning, why-scale, why-understanding, why-hallucination |
| `map` | umbrella, era-neural, era-transformer, library, era-scale, era-alignment |
| `eras` | era-statistical, era-neural, era-transformer, era-scale, era-alignment |
| `pattern` | pattern-hand, pattern-learned, feather |
| `method` | ledger, working-memory |
| `bridges` | steam, bacteria, pinfactory, feather |
| `outro` | mountain |

## 复核

- [x] 22 张图均在 `video/remotion/public/img/` 中存在。
- [x] 图内无文字、无水印、无 logo；所有文字由 HTML/SVG 渲染。
- [x] 尺寸 1536×1024；裁切为 390×250 / 620×392 / 900×600 时主体未被裁掉。
- [x] 每张图只服务一个概念；四个 why、五个时代、四个学科各有自己的图。
- [x] 候选概率 0.62 / 0.14 / 0.07 / 0.04 是示意值，画面已标「示意」。
- [x] 当前成片 0 张矢量图；目录中不保留未使用的矢量脚本。
