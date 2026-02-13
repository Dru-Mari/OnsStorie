let db;
let dbReady = false;

initSqlJs({
  locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
}).then(SQL => {
  db = new SQL.Database();

  db.run(`
    DROP TABLE IF EXISTS GunstelingMemories;
    DROP TABLE IF EXISTS HoekomEkVanJouHou;
    DROP TABLE IF EXISTS OnsEntwistle;

    CREATE TABLE GunstelingMemories (
      id INTEGER PRIMARY KEY,
      datum TEXT,
      titel TEXT,
      beskrywing TEXT
    );

    INSERT INTO GunstelingMemories VALUES
    (1, '2025-11-15', '15 November', 'Net alles omtrent 15 November.'),
    (2, '2025-11-23', 'Blaauwklippen', 'Toe jy vir my by Blaauwklippen sê jy sal my by die lughawe gaan aflaai. Ek was deurmekaar want jy sou daai week vertrek na die kusdorp en jou antwoord was: “Miskien gaan ek nie meer nie. Miskien het ek nou ’n rede om hier te wil wees.”'),
    (3, '2025-11-29', 'By die karre', '29 November se oomblikke by ons karre nadat jy my by die lughawe opgelaai het, terug in jou parkeer area.'),
    (4, '2025-12-03', 'Created by: F<3K', '3 December se klein detail in jou kode: Created by: F<3K.'),
    (5, '2025-12-05', 'Spek & Bone + Balboa', 'Spek & Bone plus Balboa plus post-Balboa se eerste sleepover.'),
    (6, '2025-12-11', 'Oggend koffie & strand', 'Oggend koffie en strandstappie. Daar was iets so normaal aan daai oggend. En ook die dag voor ons vakansie amptelik sou begin.'),
    (7, '2025-12-19', 'Imagine Dragons', '19 Desember featuring Imagine Dragons…..'),
    (8, '2025-12-20', 'Goldfish & Frozen Margs', 'Goldfish plus al ons Frozen Margs in die Kaap. Ek love hoe ons saam kan fun hê!'),
    (9, '2026-01-14', 'Cavella', 'Cavella en die gevoel van ’n nuwe canvas voor ons.'),
    (10, '2026-01-16', 'Krieket mense', 'Toe ons krieket mense geword het 16 Jan.'),
    (11, '2026-01-17', 'Ons Games Day', 'Ons Games Day.');

    CREATE TABLE HoekomEkVanJouHou (
      id INTEGER PRIMARY KEY,
      rede TEXT
    );

    INSERT INTO HoekomEkVanJouHou (rede) VALUES
    ('Dat jy vir my ’n veilige spasie gee om myself te kan wees en te deel.'),
    ('Dat jy deur jou seer werk sonder om dit op my neer te sit. Dat jou skouers breed genoeg is daarvoor.'),
    ('Dat jy luister en oplet na wat my gelukkig en gemaklik laat voel.'),
    ('Dat jy geduldig is met my en ons groei.'),
    ('Dat jy my bemagtig en ondersteun in elkeen van die challenges wat voor my kom staan.'),
    ('Dat jy my leer van soveel nuwe dinge.'),
    ('Dat jy ’n hart van goud het, en soveel gee vir mense in jou lewe.'),
    ('Dat jy mense met respek en waardigheid hanteer.'),
    ('Dat jy ’n vriend is vir vele. Jou lig skyn so helder vir ander.'),
    ('Ek smelt as ek vir jou kyk.');

    CREATE TABLE OnsEntwistle (
      id INTEGER PRIMARY KEY,
      storie TEXT,
      geheim TEXT
    );

    INSERT INTO OnsEntwistle VALUES
    (1,
     'Ek weet nie hoe om dit anders te sê nie, maar dit voel asof alles presies moes gebeur soos dit het sodat ons hier kon wees. Ons stories, ons paaie, selfs die timing — dit voel te netjies om net toeval te wees. En elke keer wat iets onsekerheid bring, gebeur daar weer iets klein maar betekenisvol wat ons nader trek. ’n Liedjie wat speel. ’n oomblik wat net té perfek gety is. ’n gevoel van herkenning wanneer ek in jou oë kyk. Jy voel nie vreemd nie. Jy voel bekend. Soos iemand wat ek lankal geken het en net weer moes raakloop.',
     'F<3K');
  `);

  dbReady = true;
});

function runSQL() {
  const raw = document.getElementById("sql").value;
  const output = document.getElementById("output");

  if (!db || !dbReady) {
    output.textContent = "Laai… wag net 1 oomblik en druk Run weer 🙂";
    return;
  }

  try {
    if (raw.trim() === "15112025-2-F<3K") {
      output.textContent =
`Ontsluit.

Nie toeval nie.
Nie per ongeluk nie.

Ek kies jou, Erazmataz.`;
      return;
    }

    // Remove SQL comments so checks can't be bypassed
const noComments = raw
  .split("\n")
  .filter(line => !line.trim().startsWith("--"))
  .join("\n");

const normalizedAll = noComments.replace(/\s+/g, " ").trim();

    const protectedMatch = normalizedAll.match(/select \* from (GunstelingMemories|HoekomEkVanJouHou|OnsEntwistle)\b/i);

    if (protectedMatch) {
      const table = protectedMatch[1];
      const ansMatch = normalizedAll.match(/where answer\s*=\s*'([^']+)'/i);

      if (!ansMatch) {
        output.textContent =
`Oeps 😌

Om ’n tabel oop te maak:
SELECT * FROM <tabel> WHERE answer = '<antwoord>';`;
        return;
      }

      const answer = ansMatch[1];

      const ok =
        (table.toLowerCase() === "gunstelingmemories" && answer === "15112025") ||
        (table.toLowerCase() === "hoekomekvanjouhou" && answer === "2") ||
        (table.toLowerCase() === "onsentwistle" && answer === "F<3K");

      if (!ok) {
        output.textContent = "❌ Nie heeltemal nie… probeer weer 😉";
        return;
      }

      const results = db.exec(`SELECT * FROM ${table};`);
      renderResults(results, output);
      return;
    }

    const results = db.exec(raw);
    renderResults(results, output);

  } catch (err) {
    output.textContent = "Fout: " + err.message;
  }
}

function renderResults(results, output) {
  if (!results.length) {
    output.textContent = "Geen resultate.";
    return;
  }

  let text = "";
  results.forEach(res => {
    text += res.columns.join(" | ") + "\n";
    text += "-".repeat(40) + "\n";
    res.values.forEach(row => {
      text += row.join(" | ") + "\n";
    });
  });

  output.textContent = text;
}
