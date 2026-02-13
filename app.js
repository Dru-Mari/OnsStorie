let db;

initSqlJs({
  locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
}).then(SQL => {

  db = new SQL.Database();

  db.run(`
    CREATE TABLE GunstelingMemories (
      id INTEGER PRIMARY KEY,
      datum TEXT,
      titel TEXT,
      beskrywing TEXT
    );

    INSERT INTO GunstelingMemories VALUES
    (1, '2025-11-15', '15 November',
     'Net alles omtrent 15 November.'),

    (2, '2025-11-23', 'Blaauwklippen',
     'Toe jy vir my by Blaauwklippen sê jy sal my by die lughawe gaan aflaai. Ek was deurmekaar want jy sou daai week vertrek na die kusdorp en jou antwoord was: “Miskien gaan ek nie meer nie. Miskien het ek nou ’n rede om hier te wil wees.”'),

    (3, '2025-11-29', 'By die karre',
     '29 November se oomblikke by ons karre nadat jy my by die lughawe opgelaai het, terug in jou parkeer area.'),

    (4, '2025-12-03', 'Created by: F<3K',
     '3 December se klein detail in jou kode: Created by: F<3K.'),

    (5, '2025-12-05', 'Spek & Bone + Balboa',
     'Spek & Bone plus Balboa plus post-Balboa se eerste sleepover.'),

    (6, '2025-12-11', 'Oggend koffie & strand',
     'Oggend koffie en strandstappie. Daar was iets so normaal aan daai oggend. En ook die dag voor ons vakansie amptelik sou begin.'),

    (7, '2025-12-19', 'Imagine Dragons',
     '19 Desember featuring Imagine Dragons.'),

    (8, '2025-12-20', 'Goldfish & Frozen Margs',
     'Goldfish plus al ons Frozen Margs in die Kaap. Ek love hoe ons saam kan fun hê.'),

    (9, '2026-01-14', 'Cavella',
     'Cavella en die gevoel van ’n nuwe canvas voor ons.'),

    (10, '2026-01-16', 'Krieket mense',
     'Toe ons krieket mense geword het.'),

    (11, '2026-01-17', 'Ons Games Day',
     'Ons Games Day.');
    

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
      storie TEXT
    );

    INSERT INTO OnsEntwistle VALUES
    (1,
     'Ek weet nie hoe om dit anders te sê nie, maar dit voel asof alles presies moes gebeur soos dit het sodat ons hier kon wees. Ons stories, ons paaie, selfs die timing — dit voel te netjies om net toeval te wees. En elke keer wat iets onsekerheid bring, gebeur daar weer iets klein maar betekenisvol wat ons nader trek. ’n Liedjie wat speel. ’n Oomblik wat net té perfek gety is. ’n Gevoel van herkenning wanneer ek in jou oë kyk. Jy voel nie vreemd nie. Jy voel bekend. Soos iemand wat ek lankal geken het en net weer moes raakloop.');
  `);
});

function runSQL() {
  const sql = document.getElementById("sql").value.trim();
  const output = document.getElementById("output");

  try {

    if (sql === "15112025-2-F<3K") {
      output.textContent =
`Ontsluit.

Nie toeval nie.
Nie per ongeluk nie.

Ek kies jou, Erazmataz.`;
      return;
    }

    const results = db.exec(sql);

    if (!results.length) {
      output.textContent = "Klaar.";
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

  } catch (err) {
    output.textContent = "Fout: " + err.message;
  }
}
