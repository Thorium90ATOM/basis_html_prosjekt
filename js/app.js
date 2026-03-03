// oslo børs
// oppretelse av spillarvariabel 
var Player = {
  navn: "Bjarte Emil Alsaker",
  saldo: 15000,
}

// spel variabel
var Game = {
  dag: 1,
  month: 1,
  year: 2026
}

// Category
var Category = [
  { navn: "Teknologi", id: 0 },
  { navn: "Telekom", id: 1 },
  { navn: "Mat", id: 2 },
  { navn: "Underholdning", id: 3 },
  { navn: "Offentlig", id: 4 },
]
// aksjer
var Stock = [
  { navn: "VALVE", Price: 1000, Available: 1000, owned: 0, category: 0 },
  { navn: "Telia", Price: 100, Available: 10000, owned: 0, category: 1 },
  { navn: "Tine", Price: 10, Available: 100000, owned: 0, category: 2 },
  { navn: "PingPanik", Price: 0.07, Available: 10000000000, owned: 0, category: 3 },
  { navn: "Staten's Vegvesen", Price: 10000, Available: 100000, owned: 0, category: 4 },
]

// her er trykk på ny dag knappen
document.getElementById("newDay").addEventListener("click", () => {
  runNewDay();
});

//kode som blir kjørt ved ny dag
function runNewDay() {

  // kalkuler nye priser på aksjer

  //updaye days, months and years
  Game.dag = Game.dag + 1;
  if (Game.dag == 8) {
    Game.dag = 1;
    Game.month = Game.month + 1;
    if (Game.month == 12) {
      Game.month = 1;
      Game.year = Game.year + 1;
    }
  }
  // update gui
  updateGUI();
}

function updateGUI() {
  document.getElementById("day").innerHTML = Game.dag;
  document.getElementById("month").innerHTML = Game.month;
  document.getElementById("year").innerHTML = Game.year;
  document.getElementById("Balance").innerHTML = Player.saldo;
  redrawStockList();
}

function redrawStockList() {
  var Divlist = document.getElementById("stockList");
  Divlist.innerHTML = "";

  for (i = 0; i < Stock.length; i++) {
    var info = "";
    info = info + ((Stock[i].navn + "---"))
    info = info + (("Price: " + Stock[i].Price))
    info = info + (("Available: " + Stock[i].Available))
    info = info + (("Owned: " + Stock[i].owned))
    // kjøp og selg knapp
   info = info + ("<button id='buy' data stock" + i + "'>Kjøp</button>")
   info = info + ("<button id='sell' data-stock" + i + "'>Selg</button>")
   //ny linje
    info = info + "<hr>"

        Divlist.innerHTML = Divlist.innerHTML + info;
  }


}

updateGUI();