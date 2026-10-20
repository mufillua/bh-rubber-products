/**
 * Turns the standards quoted on a product (e.g. "EN 388:2016 (4544D)") into plain-English
 * explanations for the product page. Only decodes what the product data already states.
 */
export interface StandardRow {
  label: string;
  value: string;
}

export interface StandardExplained {
  standard: string;
  title: string;
  summary: string;
  rows: StandardRow[];
}

const level = (c: string, max: number) => (c === 'X' ? 'Not tested' : `Level ${c} of ${max}`);

const TDM: Record<string, string> = { A: '2 N', B: '5 N', C: '10 N', D: '15 N', E: '22 N', F: '30 N' };
const CONTACT_HEAT: Record<string, string> = { '1': '100 °C', '2': '250 °C', '3': '350 °C', '4': '500 °C' };

function code(s: string): string | null {
  const m = s.match(/\(([^)]+)\)/);
  return m ? m[1].replace(/[\s-]/g, '').toUpperCase() : null;
}

function en388(s: string): StandardExplained | null {
  const c = code(s);
  if (!c || !/^[0-5X]{4}[A-FX]?P?$/.test(c)) return null;
  const rows: StandardRow[] = [
    { label: 'Abrasion resistance', value: level(c[0], 4) },
    { label: 'Blade cut resistance (coupe test)', value: c[1] === 'X' ? 'Not tested' : `Level ${c[1]} of 5` },
    { label: 'Tear resistance', value: level(c[2], 4) },
    { label: 'Puncture resistance', value: level(c[3], 4) },
  ];
  if (c[4]) {
    rows.push({
      label: 'Cut resistance (ISO 13997 TDM test)',
      value: c[4] === 'X' ? 'Not tested' : `Level ${c[4]} on the A–F scale (at least ${TDM[c[4]]})`,
    });
  }
  if (c[5] === 'P') rows.push({ label: 'Impact protection', value: 'Passed' });
  return {
    standard: s,
    title: 'EN 388 — protection against mechanical risks',
    summary:
      'The European standard for gloves against abrasion, cuts, tears and punctures. Higher levels mean more protection; X means the test was not carried out or does not apply.',
    rows,
  };
}

function en407(s: string): StandardExplained | null {
  const c = code(s);
  if (!c || !/^[0-4X]{6}$/.test(c)) return null;
  const labels = [
    'Burning behaviour (limited flame spread)',
    'Contact heat',
    'Convective heat',
    'Radiant heat',
    'Small splashes of molten metal',
    'Large quantities of molten metal',
  ];
  return {
    standard: s,
    title: 'EN 407 — protection against thermal risks',
    summary: 'The European standard for gloves against heat and fire. Each figure runs from 1 to 4; X means not tested.',
    rows: labels.map((label, i) => ({
      label,
      value:
        i === 1 && c[i] !== 'X'
          ? `Level ${c[i]} of 4 (tested at ${CONTACT_HEAT[c[i]]} for at least 15 seconds)`
          : level(c[i], 4),
    })),
  };
}

function en20345(s: string): StandardExplained | null {
  if (!/EN ISO 20345/i.test(s)) return null;
  const rows: StandardRow[] = [{ label: 'Toe cap', value: 'Tested against a 200 J impact (all EN ISO 20345 safety footwear)' }];
  const cls = s.match(/\bS(B|1P?|2|3)\b/)?.[0];
  const CLASSES: Record<string, string> = {
    SB: 'Basic safety footwear',
    S1: 'Closed heel area, antistatic, energy absorption in the heel',
    S1P: 'As S1, plus a penetration-resistant midsole',
    S2: 'As S1, plus resistance to water penetration',
    S3: 'As S2, plus a penetration-resistant midsole and cleated sole',
  };
  if (cls) rows.push({ label: `Class ${cls}`, value: CLASSES[cls] });
  const slip = s.match(/\bSR[ABC]\b/)?.[0];
  const SLIP: Record<string, string> = {
    SRA: 'Slip tested on ceramic tile with a soap solution',
    SRB: 'Slip tested on steel with glycerine',
    SRC: 'Slip tested on both ceramic tile (soap solution) and steel (glycerine)',
  };
  if (slip) rows.push({ label: `Slip resistance ${slip}`, value: SLIP[slip] });
  return {
    standard: s,
    title: 'EN ISO 20345 — safety footwear',
    summary: 'The international standard for safety shoes and boots with a protective toe cap.',
    rows,
  };
}

function hiVis(s: string): StandardExplained | null {
  if (/AS\/NZS 1906\.4/i.test(s)) {
    return {
      standard: s,
      title: 'AS/NZS 1906.4 — high-visibility materials',
      summary:
        'The Australian/New Zealand standard for the fluorescent and retro-reflective materials used in safety garments. Class D materials are for day-time use; Class N for night-time; Class D/N for both.',
      rows: [],
    };
  }
  if (/\bEN 471\b/i.test(s)) {
    return {
      standard: s,
      title: 'EN 471 — high-visibility warning clothing',
      summary:
        'The former European standard for high-visibility clothing, since replaced by EN ISO 20471. Day-time visibility comes from the fluorescent background fabric.',
      rows: [],
    };
  }
  return null;
}

function marks(s: string): StandardExplained | null {
  if (s.trim() === 'CE') {
    return {
      standard: s,
      title: 'CE marking',
      summary: 'The marking that shows the manufacturer declares the product meets European requirements for personal protective equipment.',
      rows: [],
    };
  }
  if (s.trim() === 'ISI') {
    return {
      standard: s,
      title: 'ISI mark',
      summary: 'The certification mark of the Bureau of Indian Standards (BIS), showing the product conforms to the relevant Indian Standard.',
      rows: [],
    };
  }
  return null;
}

export function explainStandards(standards: readonly string[] | undefined): StandardExplained[] {
  const out: StandardExplained[] = [];
  const conformityMarks: StandardExplained[] = [];
  for (const s of standards ?? []) {
    const mark = marks(s);
    if (mark) {
      conformityMarks.push(mark);
      continue;
    }
    const e = /EN 388/i.test(s) ? en388(s) : /EN 407/i.test(s) ? en407(s) : en20345(s) ?? hiVis(s);
    if (e) out.push(e);
  }
  // Test standards first, then CE / ISI marks.
  return [...out, ...conformityMarks];
}
