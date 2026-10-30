from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from courseforge.narration import validate_board
from courseforge.paths import Course
from courseforge.scaffold import init_course
from courseforge.utils import slugify


class ScaffoldTest(unittest.TestCase):
    def test_slugify(self) -> None:
        self.assertEqual(slugify("Entropy: A Measure"), "entropy-a-measure")

    def test_init_creates_contract(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            course = init_course(Path(tmp) / "entropy", "熵：不确定性的度量")
            self.assertTrue((course.root / "course.json").exists())
            self.assertTrue(course.narration_path.exists())
            self.assertTrue(course.storyboard_path.exists())
            self.assertTrue((course.root / "curriculum" / "00-导读.md").exists())
            errors = validate_board(Course.open(course.root))
            self.assertEqual(errors, [])

    def test_scaffold_rejects_non_empty_without_force(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "course"
            target.mkdir()
            (target / "keep.txt").write_text("x", encoding="utf-8")
            with self.assertRaises(SystemExit):
                init_course(target, "X")


if __name__ == "__main__":
    unittest.main()
