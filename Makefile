SHELL := /bin/bash
PY ?= .venv/bin/python
COURSE ?= courses/LLM
export PYTHONPATH := courseforge/src

.PHONY: help setup doctor test links check research clean

help:
	@echo "make setup                 create .venv and install courseforge"
	@echo "make doctor                check ffmpeg / node / Chrome / edge-tts"
	@echo "make test                  run unit tests"
	@echo "make links                 check Markdown relative links"
	@echo "make check COURSE=...      validate a course package"
	@echo "make research COURSE=...   validate a source ledger"
	@echo "make clean                 remove __pycache__ and .DS_Store"

setup:
	@test -d .venv || python3 -m venv .venv
	.venv/bin/pip install -e courseforge

doctor:
	$(PY) -m courseforge doctor

test:
	$(PY) -m unittest discover -s courseforge/tests -v

links:
	$(PY) scripts/check_links.py

check:
	$(PY) -m courseforge check $(COURSE)

research:
	$(PY) -m courseforge research $(COURSE)

clean:
	find . -path ./.venv -prune -o -name '__pycache__' -type d -print0 | xargs -0 rm -rf
	find . -path ./.venv -prune -o -name '.DS_Store' -type f -print -delete
