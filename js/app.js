// ULTIMATE OSLO BØRS SIMULATOR

(function () {

    /* ---------------- PLAYER ---------------- */
    var Player = {
        navn: prompt("What is your name?") || "Player",
        saldo: 20000,
        shorts: {},
        achievements: [],
        tradeHistory: []
    };

    document.getElementById("playerName").innerHTML = "Welcome " + Player.navn;

    /* ---------------- GAME ---------------- */
    var Game = {
        dag: 1,
        month: 1,
        year: 2026,
        sentiment: 0,
        volatility: 0.08,
        cycle: "normal",
        trend: 0
    };

    function rand(min, max) { return Math.random() * (max - min) + min; }
    function randPrice(min, max) { return Math.round(rand(min, max) * 100) / 100; }

    /* ---------------- VIPPSRAN ---------------- */
    function triggerVIPPSRAN() {
        if (Math.random() < 0.045) { // 4.5% chance
            let loss = Math.floor(Player.saldo * rand(0.1, 0.3));
            Player.saldo -= loss;
            updateGUI();

            const popup = document.getElementById("vippsranPopup");
            const msg = document.getElementById("vippsranMessage");
            const sound = document.getElementById("vippsranSound");
            const closeBtn = document.getElementById("vippsranClose");

            msg.innerText = "You lost " + loss.toFixed(0) + " KR!";
            popup.style.display = "flex";

            if (sound) { sound.currentTime = 0; sound.play().catch(() => { }); }

            let autoClose;
            closeBtn.onclick = () => {
                popup.style.display = "none";
                clearTimeout(autoClose);
            };
            autoClose = setTimeout(() => { popup.style.display = "none"; }, 5000);
        }
    }

/* ---------------- SECTORS ---------------- */var Category = [{ name: "Teknologi", id: 0, sentiment: 0 }, { name: "Telekom", id: 1, sentiment: 0 }, { name: "Mat", id: 2, sentiment: 0 }, { name: "Underholdning", id: 3, sentiment: 0 }, { name: "Offentlig", id: 4, sentiment: 0 }, { name: "Livsglede", id: 5, sentiment: 0 }, { name: "Crypto", id: 6, sentiment: 0 }];

    /* ---------------- STOCK POOL ---------------- */
    var StockPool = [{ name: "VALVE", category: 0 }, { name: "Telia", category: 1 }, { name: "Tine", category: 2 }, { name: "PingPanik", category: 3 }, { name: "Statens Vegvesen", category: 4 }, { name: "Riot Games", category: 3 }, { name: "NordOil", category: 4 }, { name: "Arctic AI", category: 0 }, { name: "Viking Games", category: 3 }, { name: "Polar Telecom", category: 1 }, { name: "FreshFish", category: 2 }, { name: "NordCoin", category: 6 }, { name: "StartupX", category: 0 }, { name: "StartupY", category: 1 }, { name: "StartupZ", category: 2 }, { name: "CryptoKing", category: 6 }, { name: "GreenTech", category: 0 }, { name: "FoodieCo", category: 2 }, { name: "FunTimes", category: 3 }, { name: "PublicServe", category: 4 }, { name: "HappyLife", category: 5 }, { name: "NetConnect", category: 1 }, { name: "GameOn", category: 3 }, { name: "NordEnergy", category: 4 }, { name: "ArcticCoin", category: 6 }, { name: "TeleWave", category: 1 }, { name: "SnackTime", category: 2 }, { name: "VRPlay", category: 3 }, { name: "EcoFuel", category: 4 }, { name: "LifeBoost", category: 5 }, { name: "BitNord", category: 6 }, { name: "AIHelper", category: 0 }, { name: "QuickFish", category: 2 }, { name: "FunWorld", category: 3 }, { name: "GovTech", category: 4 }, { name: "JoyLife", category: 5 }, { name: "TeleFast", category: 1 }, { name: "GameMasters", category: 3 }, { name: "PolarOil", category: 4 }, { name: "CryptoMoon", category: 6 }, { name: "StartUpOne", category: 0 }, { name: "StartUpTwo", category: 1 }, { name: "StartUpThree", category: 2 }, { name: "StartUpFour", category: 3 }, { name: "StartUpFive", category: 4 }, { name: "MegaCrypto", category: 6 }, { name: "FunLab", category: 3 }, { name: "BioTech", category: 0 }, { name: "GreenFoods", category: 2 }, { name: "TeleNet", category: 1 }];

    /* ---------------- SELECT STOCKS ---------------- */
    var Stock = []; (function selectStocks() { let shuffled = StockPool.sort(() => 0.5 - Math.random()); let startupsCount = 0; for (let s of shuffled) { if (Stock.length >= 15) break; let isStartup = s.name.toLowerCase().includes("startup"); if (isStartup && startupsCount >= 5) continue; if (isStartup) startupsCount++; Stock.push({ name: s.name, price: randPrice(1, rand(50, 5000)), available: Math.floor(rand(1000, 100000)), owned: 0, category: s.category, last: 0, bankrupt: false, history: [], strength: rand(0.6, 1.6) }); } })();/* ---------------- NPCs ---------------- */var first = ["Jon", "Ole", "Lars", "Per", "Mats", "Henrik", "Daniel", "Magnus"]; var last = ["Hansen", "Olsen", "Berg", "Solberg", "Lund", "Moen", "Strand"]; var NPC = []; function createNPCs() { for (let i = 0; i < 20; i++) { NPC.push({ name: first[Math.floor(Math.random() * first.length)] + " " + last[Math.floor(Math.random() * last.length)], money: rand(10000, 50000), stocks: new Array(Stock.length).fill(0), type: "retail", risk: rand(0.3, 1) }); } for (let i = 0; i < 4; i++) { NPC.push({ name: "HedgeFund " + (i + 1), money: rand(200000, 800000), stocks: new Array(Stock.length).fill(0), type: "hedge", risk: 1.5 }); } } createNPCs();

/* ---------------- NEWS ---------------- */var News = [{ text: "AI breakthrough 🤖", cat: 0, effect: 0.4 }, { text: "Cyber attack 💻", cat: 0, effect: -0.4 }, { text: "5G expansion 📡", cat: 1, effect: 0.3 }, { text: "Telecom regulation 📉", cat: 1, effect: -0.3 }, { text: "Food scandal 🤢", cat: 2, effect: -0.4 }, { text: "Organic boom 🥗", cat: 2, effect: 0.3 }, { text: "Gaming explosion 🎮", cat: 3, effect: 0.4 }, { text: "Major game flop 🕹️", cat: 3, effect: -0.3 }, { text: "Government funding 💰", cat: 4, effect: 0.3 }, { text: "Budget cuts 🏛️", cat: 4, effect: -0.3 }, { text: "Luxury trend 🌟", cat: 5, effect: 0.3 }, { text: "Crypto hype 🚀", cat: 6, effect: 0.6 }, { text: "Crypto crash 💥", cat: 6, effect: -0.5 }]; function runNews() { if (Math.random() < 0.6) { let n = News[Math.floor(Math.random() * News.length)]; document.getElementById("newsBox").innerText = n.text; Category[n.cat].sentiment += n.effect; } }/* ---------------- MARKET CYCLES ---------------- */function updateCycle() { if (Math.random() < 0.02) { let cycles = ["bull", "bear", "boom", "crash", "normal"]; Game.cycle = cycles[Math.floor(Math.random() * cycles.length)]; document.getElementById("newsBox").innerText = "Market cycle changed: " + Game.cycle; } switch (Game.cycle) { case "bull": Game.trend = 0.02; break; case "bear": Game.trend = -0.02; break; case "boom": Game.trend = 0.05; break; case "crash": Game.trend = -0.05; break; default: Game.trend = 0; } }/* ---------------- NPC TRADING ---------------- */function npcTrading() { for (let npc of NPC) { let id = Math.floor(Math.random() * Stock.length); let s = Stock[id]; if (s.bankrupt) continue; let size = Math.floor(rand(1, 10) * npc.risk); if (npc.type == "hedge") size *= rand(5, 30); if (Math.random() < 0.5) { let cost = size * s.price; if (cost < npc.money) { npc.money -= cost; npc.stocks[id] += size; s.price *= 1 + 0.002 * size; } } else { let sell = Math.min(size, npc.stocks[id]); npc.money += sell * s.price; npc.stocks[id] -= sell; s.price *= 1 - 0.002 * sell; } } }

/* ---------------- PRICE UPDATE ---------------- */ function updatePrices() { for (let s of Stock) { if (s.bankrupt) continue; let old = s.price; let cat = Category[s.category]; let change = rand(-Game.volatility, Game.volatility) + Game.sentiment + Game.trend + cat.sentiment * 0.02; if (s.category == 6) change *= 1.5; s.price *= 1 + change; if (s.price < 5) { if (Math.random() < 0.08) { s.bankrupt = true; s.price = 0; document.getElementById("newsBox").innerText = s.name + " went bankrupt"; } else s.price = 1; } s.last = ((s.price - old) / old) * 100; s.history.push(s.price); if (s.history.length > 120) s.history.shift(); } }

    /* ---------------- GUI ---------------- */
    function portfolio() { return Stock.reduce((sum, s) => sum + (s.owned * s.price), 0); }

    function leaderboard() {
        let board = [{ name: Player.navn, wealth: Player.saldo + portfolio() }]; // no loan anymore
        for (let npc of NPC) {
            let value = npc.money;
            for (let i = 0; i < Stock.length; i++) value += npc.stocks[i] * Stock[i].price;
            board.push({ name: npc.name, wealth: value });
        }
        board.sort((a, b) => b.wealth - a.wealth);
        document.getElementById("leaderboard").innerHTML = board.slice(0, 10)
            .map(p => p.name + " : " + p.wealth.toFixed(0) + " KR").join("<br>");
    }

    function redraw() {
        let div = document.getElementById("stockList"); div.innerHTML = "";
        Stock.forEach((s, i) => {
            let col = s.last > 0 ? "green" : s.last < 0 ? "red" : "";
            let price = s.bankrupt ? "KONKURS" : s.price.toFixed(2) + " KR";
            let dis = s.bankrupt ? "disabled" : "";
            div.innerHTML += `
            <div class="stockRow">
            <b>${s.name}</b> Price: ${price} Owned: ${s.owned} 
            <span class="${col}">(${s.last.toFixed(2)}%)</span>
            <button class="buyBtn" data-id="${i}" ${dis}>Buy</button>
            <button class="sellBtn" data-id="${i}" ${dis}>Sell</button>
            </div>
        `;
        });
    }

    function updateGUI() {
        document.getElementById("Balance").innerText = Player.saldo.toFixed(0) + " KR";
        document.getElementById("portfolioValue").innerText = "Portfolio: " + portfolio().toFixed(0) + " KR";
        document.getElementById("day").innerText = Game.dag;
        document.getElementById("month").innerText = Game.month;
        document.getElementById("year").innerText = Game.year;
        redraw();
        leaderboard();
    }

    /* ---------------- EVENTS ---------------- */
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("buyBtn")) buyStock(e.target.dataset.id);
        if (e.target.classList.contains("sellBtn")) sellStock(e.target.dataset.id);
        if (e.target.id === "gambleBtn") gamble();
    });

    function buyStock(id) {
        let s = Stock[id]; if (s.bankrupt) return;
        let amt = parseInt(prompt("How many shares?")); if (!amt) return;
        if (amt * s.price > Player.saldo) return;
        Player.saldo -= amt * s.price; s.owned += amt;
        Player.tradeHistory.push("Bought " + amt + " " + s.name); updateGUI();
    }

    function sellStock(id) {
        let s = Stock[id]; if (!s) return;
        let amt = parseInt(prompt("Sell how many?")); if (!amt) return;
        if (amt > s.owned) return;
        Player.saldo += amt * s.price; s.owned -= amt;
        Player.tradeHistory.push("Sold " + amt + " " + s.name); updateGUI();
    }

    /* ---------------- GAMBLING SYSTEM ---------------- */
    function gamble() {
        let bet = parseInt(prompt("Enter your bet amount:"));
        if (!bet || bet <= 0) return alert("Invalid bet!");
        if (bet > Player.saldo) return alert("Not enough balance!");

        let winChance = 0.45; // 45% chance to win
        let outcome = Math.random() < winChance ? bet : -bet;
        Player.saldo += outcome;

        alert(outcome > 0 ? `You won ${outcome} KR!` : `You lost ${-outcome} KR!`);
        updateGUI();
    }

    /* ---------------- ADVANCE DAY ---------------- */
    function runNewDay() {
        updateCycle();
        npcTrading();
        runNews();
        updatePrices();
        triggerVIPPSRAN();

        Game.dag++; if (Game.dag > 7) { Game.dag = 1; Game.month++; }
        if (Game.month > 12) { Game.month = 1; Game.year++; }
        Game.sentiment += rand(-0.01, 0.01);
        Game.sentiment = Math.max(-0.04, Math.min(0.04, Game.sentiment));

        updateGUI();
    }

    document.getElementById("newDay").addEventListener("click", runNewDay);
    document.getElementById("vippsranPopup").style.display = "none";
    updateGUI();

})();