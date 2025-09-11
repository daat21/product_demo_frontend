// Reusable helpers to parse image_risk and compute view scores, overall and consistency

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const round2 = (n: number) => Math.round(n * 100) / 100;

export function extractViewScoresFromImageRisk(raw: unknown): number[] {
  const fromArray = (arr: unknown[]): number[] =>
    arr.map((item) => {
      const obj = item as { confidence_score?: unknown; logits?: unknown };
      const conf = obj?.confidence_score;
      if (typeof conf === "number" && Number.isFinite(conf)) {
        return round2(clamp01(conf));
      }
      const logits = obj?.logits as unknown;
      if (
        Array.isArray(logits) &&
        Array.isArray((logits as unknown[])[0]) &&
        typeof (logits as unknown[][])[0][0] === "number"
      ) {
        const z = (logits as number[][])[0][0];
        const sigmoid = 1 / (1 + Math.exp(-z));
        return round2(clamp01(sigmoid));
      }
      return 0;
    });

  if (Array.isArray(raw)) return fromArray(raw);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return fromArray(parsed);
    } catch {
      try {
        const fixed = (raw as string).replace(/'/g, '"');
        const parsed2 = JSON.parse(fixed);
        if (Array.isArray(parsed2)) return fromArray(parsed2);
      } catch {
        const matches = Array.from(
          (raw as string).matchAll(/confidence_score[^0-9]*([0-9]*\.?[0-9]+)/g)
        );
        if (matches.length)
          return matches.map((m) => round2(clamp01(Number(m[1]))));
      }
    }
  }
  return [];
}

export function buildManipulationScores(
  viewScores: number[]
): Record<string, number> {
  return viewScores.reduce<Record<string, number>>((acc, score, idx) => {
    acc[`view_${idx + 1}`] = score;
    return acc;
  }, {});
}

export function computeOverallAndConsistency(viewScores: number[]): {
  overall: number | null;
  consistency: number | null;
} {
  const analysed = viewScores;
  const overall = analysed.length
    ? round2(analysed.reduce((sum, v) => sum + v, 0) / analysed.length)
    : null;
  const consistency =
    analysed.length > 1
      ? round2(1 - (Math.max(...analysed) - Math.min(...analysed)))
      : null;
  return { overall, consistency };
}
