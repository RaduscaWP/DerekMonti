// Curated IATA dataset — major international airports.
// Each entry: [IATA code, canonical city display name, ...aliases]
const ENTRIES = [
  // North America
  ['JFK', 'New York', 'nyc', 'new york city'],
  ['LAX', 'Los Angeles', 'la'],
  ['ORD', 'Chicago'],
  ['MIA', 'Miami'],
  ['SFO', 'San Francisco'],
  ['BOS', 'Boston'],
  ['IAD', 'Washington', 'washington dc', 'dc'],
  ['PHL', 'Philadelphia', 'philly'],
  ['SEA', 'Seattle'],
  ['DFW', 'Dallas'],
  ['ATL', 'Atlanta'],
  ['DEN', 'Denver'],
  ['IAH', 'Houston'],
  ['LAS', 'Las Vegas', 'vegas'],
  ['MCO', 'Orlando'],
  ['PHX', 'Phoenix'],
  ['DTW', 'Detroit'],
  ['MSP', 'Minneapolis'],
  ['CLT', 'Charlotte'],
  ['SAN', 'San Diego'],
  ['HNL', 'Honolulu'],
  ['YYZ', 'Toronto'],
  ['YUL', 'Montreal'],
  ['YVR', 'Vancouver'],
  ['MEX', 'Mexico City'],
  ['CUN', 'Cancun'],

  // Europe (West)
  ['LHR', 'London'],
  ['CDG', 'Paris'],
  ['FRA', 'Frankfurt'],
  ['AMS', 'Amsterdam'],
  ['MAD', 'Madrid'],
  ['BCN', 'Barcelona'],
  ['FCO', 'Rome', 'roma'],
  ['MXP', 'Milan'],
  ['MUC', 'Munich'],
  ['ZRH', 'Zurich', 'zürich'],
  ['GVA', 'Geneva', 'genève'],
  ['VIE', 'Vienna', 'wien'],
  ['BRU', 'Brussels', 'bruxelles'],
  ['CPH', 'Copenhagen', 'kobenhavn', 'københavn'],
  ['ARN', 'Stockholm'],
  ['OSL', 'Oslo'],
  ['HEL', 'Helsinki'],
  ['DUB', 'Dublin'],
  ['LIS', 'Lisbon', 'lisboa'],
  ['ATH', 'Athens', 'athina'],
  ['BER', 'Berlin'],
  ['HAM', 'Hamburg'],
  ['EDI', 'Edinburgh'],
  ['MAN', 'Manchester'],
  ['NCE', 'Nice'],
  ['LYS', 'Lyon'],
  ['VCE', 'Venice', 'venezia'],
  ['NAP', 'Naples', 'napoli'],
  ['PMI', 'Palma', 'palma de mallorca', 'mallorca'],

  // Europe (East)
  ['IST', 'Istanbul'],
  ['SVO', 'Moscow', 'moskva'],
  ['LED', 'Saint Petersburg', 'st petersburg', 'saint-petersburg'],
  ['WAW', 'Warsaw', 'warszawa'],
  ['PRG', 'Prague', 'praha'],
  ['BUD', 'Budapest'],
  ['OTP', 'Bucharest', 'bucuresti', 'bucurești'],
  ['SOF', 'Sofia'],
  ['BEG', 'Belgrade', 'beograd'],
  ['KBP', 'Kyiv', 'kiev'],
  ['KIV', 'Chișinău', 'chisinau', 'kishinev'],
  ['RIX', 'Riga'],
  ['TLL', 'Tallinn'],
  ['VNO', 'Vilnius'],
  ['MSQ', 'Minsk'],
  ['ZAG', 'Zagreb'],
  ['LJU', 'Ljubljana'],
  ['SKP', 'Skopje'],
  ['TIA', 'Tirana'],
  ['SJJ', 'Sarajevo'],

  // Middle East
  ['DXB', 'Dubai'],
  ['AUH', 'Abu Dhabi'],
  ['DOH', 'Doha'],
  ['RUH', 'Riyadh'],
  ['JED', 'Jeddah'],
  ['TLV', 'Tel Aviv'],
  ['CAI', 'Cairo'],
  ['AMM', 'Amman'],
  ['BEY', 'Beirut'],
  ['KWI', 'Kuwait'],
  ['IKA', 'Tehran'],

  // Asia
  ['HND', 'Tokyo'],
  ['NRT', 'Tokyo Narita', 'narita'],
  ['KIX', 'Osaka'],
  ['PEK', 'Beijing'],
  ['PVG', 'Shanghai'],
  ['HKG', 'Hong Kong'],
  ['ICN', 'Seoul'],
  ['SIN', 'Singapore'],
  ['BKK', 'Bangkok'],
  ['KUL', 'Kuala Lumpur'],
  ['MNL', 'Manila'],
  ['CGK', 'Jakarta'],
  ['BOM', 'Mumbai', 'bombay'],
  ['DEL', 'Delhi', 'new delhi'],
  ['BLR', 'Bangalore', 'bengaluru'],
  ['MAA', 'Chennai', 'madras'],
  ['HYD', 'Hyderabad'],
  ['CCU', 'Kolkata', 'calcutta'],
  ['TPE', 'Taipei'],
  ['SGN', 'Ho Chi Minh City', 'saigon', 'ho chi minh'],
  ['HAN', 'Hanoi'],
  ['KTM', 'Kathmandu'],
  ['CMB', 'Colombo'],
  ['DPS', 'Bali', 'denpasar'],
  ['MLE', 'Maldives', 'male'],

  // Oceania
  ['SYD', 'Sydney'],
  ['MEL', 'Melbourne'],
  ['BNE', 'Brisbane'],
  ['PER', 'Perth'],
  ['AKL', 'Auckland'],
  ['NAN', 'Nadi'],

  // Africa
  ['JNB', 'Johannesburg'],
  ['CPT', 'Cape Town'],
  ['NBO', 'Nairobi'],
  ['CMN', 'Casablanca'],
  ['LOS', 'Lagos'],
  ['ADD', 'Addis Ababa'],
  ['DAR', 'Dar es Salaam'],
  ['ACC', 'Accra'],
  ['DKR', 'Dakar'],
  ['HRG', 'Hurghada'],

  // South America
  ['GRU', 'São Paulo', 'sao paulo'],
  ['GIG', 'Rio de Janeiro', 'rio'],
  ['EZE', 'Buenos Aires'],
  ['LIM', 'Lima'],
  ['BOG', 'Bogotá', 'bogota'],
  ['SCL', 'Santiago'],
  ['CCS', 'Caracas'],
  ['UIO', 'Quito'],
  ['MVD', 'Montevideo'],
  ['PTY', 'Panama City', 'panama'],
];

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const cityIndex = new Map();
const codeIndex = new Map();

for (const [code, city, ...aliases] of ENTRIES) {
  codeIndex.set(code, city);
  cityIndex.set(normalize(city), { code, city });
  for (const alias of aliases) {
    const key = normalize(alias);
    if (key && !cityIndex.has(key)) cityIndex.set(key, { code, city });
  }
}

const STOP_WORDS = new Set([
  'the', 'of', 'de', 'di', 'da', 'la', 'le', 'el', 'al', 'a', 'an', 'and',
  'der', 'die', 'das', 'st', 'saint', 'sao',
]);

function titleCase(value) {
  return String(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function deriveCode(normalized) {
  const tokens = normalized.split(' ').filter(Boolean);
  const significant = tokens.filter((t) => !STOP_WORDS.has(t));
  const useTokens = significant.length ? significant : tokens;

  let code = useTokens.map((t) => t[0]).join('').toUpperCase().slice(0, 3);

  if (code.length < 3 && useTokens[0]) {
    code = (useTokens[0].slice(0, 3) || '').toUpperCase();
  }
  if (code.length < 3 && useTokens[0]) {
    code = (useTokens[0] + 'XX').slice(0, 3).toUpperCase();
  }
  return code || 'XXX';
}

export function resolveLocation(input) {
  const raw = String(input || '').trim();
  if (!raw) return { code: '—', city: 'Not specified' };

  // 1. Explicit IATA code anywhere in input
  const codeMatch = raw.toUpperCase().match(/\b([A-Z]{3})\b/);
  if (codeMatch && codeIndex.has(codeMatch[1])) {
    return { code: codeMatch[1], city: codeIndex.get(codeMatch[1]) };
  }

  // 2. Full normalized match
  const normalized = normalize(raw);
  if (!normalized) return { code: '—', city: raw };

  if (cityIndex.has(normalized)) return cityIndex.get(normalized);

  // 3. Progressive prefix match (handles "New York City" → "new york")
  const tokens = normalized.split(' ').filter(Boolean);
  for (let take = tokens.length; take > 0; take--) {
    const prefix = tokens.slice(0, take).join(' ');
    if (cityIndex.has(prefix)) return cityIndex.get(prefix);
  }

  // 4. Single-token match against multi-word entries (e.g., "Mallorca")
  for (const token of tokens) {
    if (cityIndex.has(token)) return cityIndex.get(token);
  }

  // 5. Fallback: derive a 3-letter code from initials, keep user input as city
  return { code: deriveCode(normalized), city: titleCase(raw) };
}
