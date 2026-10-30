#!/usr/bin/env bash
# 下载论文库中的 arXiv PDF 到 papers/pdf/
# 用法：bash papers/fetch_pdfs.sh
# 说明：
#   - 只下载有 arXiv 编号的论文；GPT-1 / GPT-2 / Bricken 2023 需手动从官方页面获取。
#   - 默认 3 秒间隔，避免触发 arXiv 限流。
#   - 若你所在网络无法访问 arXiv，可用镜像或手动下载。

set -euo pipefail

cd "$(dirname "$0")"
mkdir -p pdf

# id|短名
PAPERS=(
  "1301.3781|P08_word2vec"
  "1310.4546|P09_negative_sampling"
  "1409.3215|P10_seq2seq"
  "1409.0473|P11_bahdanau_attention"
  "1412.6980|P12_adam"
  "1512.03385|P14_resnet"
  "1508.07909|P15_bpe"
  "1706.03762|P16_transformer"
  "1810.04805|P18_bert"
  "2005.14165|P20_gpt3"
  "2001.08361|P21_scaling_laws"
  "2005.11401|P22_rag"
  "2203.15556|P23_chinchilla"
  "2203.02155|P30_instructgpt"
  "2305.18290|P31_dpo"
  "2212.08073|P32_constitutional_ai"
  "2106.09685|P33_lora"
  "2201.11903|P24_cot"
  "2203.11171|P25_self_consistency"
  "2210.03629|P26_react"
  "2206.07682|P27_emergent"
  "2304.15004|P28_mirage"
  "2305.20050|P43_lets_verify"
  "2408.03314|P44_test_time_compute"
  "2501.12948|P45_deepseek_r1"
  "2302.04761|P46_toolformer"
  "2205.11916|P47_zero_shot_cot"
  "1701.06538|P34_moe"
  "2101.03961|P35_switch"
  "2305.13245|P36_gqa"
  "2205.14135|P37_flashattention"
  "2312.00752|P38_mamba"
  "2302.13971|P39_llama"
  "2310.06825|P40_mistral"
  "2405.04434|P41_deepseek_v2"
  "2412.19437|P42_deepseek_v3"
  "2209.10652|P48_toy_superposition"
  "2209.11895|P50_induction_heads"
  "2202.05262|P51_rome"
  "2405.15793|P52_swe_agent"
  "2412.14093|P53_alignment_faking"
  "2501.14249|P54_hle"
  "2303.08774|P55_gpt4"
  "2307.03172|P57_lost_in_middle"
  "2009.03300|S01_mmlu"
  "2110.14168|S02_gsm8k"
  "2107.03374|S03_humaneval"
  "2310.06770|S04_swebench"
)

echo "目标目录：$(pwd)/pdf"
echo "共 ${#PAPERS[@]} 篇（仅有 arXiv 编号的）"
echo

for item in "${PAPERS[@]}"; do
  id="${item%%|*}"
  name="${item##*|}"
  out="pdf/${name}.pdf"
  if [[ -f "$out" ]]; then
    echo "[skip] $name"
    continue
  fi
  echo "[get ] $name  (arXiv:$id)"
  if ! curl -fL --retry 3 --max-time 120 \
      -A "Mozilla/5.0 (compatible; llm-course-reader/1.0)" \
      "https://arxiv.org/pdf/${id}" -o "$out"; then
    echo "  !! 失败：$id（网络问题或需要镜像）" >&2
    rm -f "$out"
  fi
  sleep 3
done

echo
echo "完成。手动补齐："
echo "  GPT-1  https://openai.com/research/language-unsupervised"
echo "  GPT-2  https://openai.com/research/better-language-models"
echo "  SAE    https://transformer-circuits.pub/2023/monosemantic-features"
echo "  Bitter Lesson  http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
