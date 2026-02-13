let db;

initSqlJs({
  locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
}).then(SQL => {

  db = new SQL.Database();

  db.run(`
    CREATE TABLE GunstelingMemories (id INTEGER PRIMARY KEY, datum TEXT, titel TEXT);

    INSERT INTO GunstelingMemories VALUES
    (1, '2025-11-15', '15 November'),
    (2, '2025-11-23', 'Blaauwklippen'),
    (3, '2025-11-29', 'Lughawe oomblik'),
    (4, '2025-12-03', 'Created by: F<3K'),
    (5, '2025-12-05', 'Spek & Bone'),
    (6, '2025-12-11', 'Strandstappie'),
    (7, '2025-12-19', 'Imagine Dragons'),
    (8, '2025-12-20', 'Goldfish'),
    (9, '2026-01-14', 'Cavella'),
    (10, '2026-01-16', 'Krieket mense'),
    (11, '2026-01-17', 'Ons Games Day');

    CREATE TABLE HoekomEkVanJouHou (id INTEGER PRIMARY KEY, rede TEXT);

    INSERT INTO HoekomEkVanJouHou (rede) VALUES
    ('Veilige spasie'),
    ('Jy dra jou seer sterk'),
    ('Jy luister'),
    ('Jy is geduldig'),
    ('Jy bemagtig my'),
    ('Jy leer my nuwe dinge'),
    ('Hart van goud'),
    ('Respek vir mense'),
    ('Vriend vir vele'),
    ('Ek smelt as ek vir jou kyk');

    CREATE TABLE OnsEntwistle (id INTEGER PRIMARY KEY, storie TEXT);

    INSERT INTO OnsEntwistle VALUES
    (1, 'Dit voel asof die heelal lankal besluit het ons moet mekaar vind...');
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
