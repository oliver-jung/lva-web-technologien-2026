function getData() {
	// AJAX-Anfrage an scraper.php, um Daten von der angegebenen URL zu erhalten.
	$.ajax({
		url: 'scraper.php',
		type: 'POST',
		data: {
			"url": "https://svv.volleynet.at/Termine/32369/Alle?sort=dat"
		},
		dataType: 'html',
		success: function (res) {
			// Arrays für alle Einträge und gefilterte Einträge erstellen.
			let entries_all = [];
			let entries1 = $(res).find(".tablehell");
			let entries2 = $(res).find(".tabledunkel");

			// Daten aus den HTML-Elementen extrahieren und in entries_all speichern.
			for (let i = 0; i < entries1.length; i++) {
				let data = $(entries1[i]).find("td");
				entries_all.push({
					"Datum": $(data[3]).html(),
					"Zeit": $(data[4]).html(),
					"Heimteam": $(data[5]).html(),
					"Gastteam": $(data[6]).html(),
					"Halle": $(data[7]).html(),
					"Karte": $(data[8]).html().split("&nbsp;")[1]
				});

				// Wenn noch Einträge in entries2 vorhanden sind, auch diese verarbeiten.
				if (i < entries2.length) {
					let data = $(entries2[i]).find("td");
					entries_all.push({
						"Datum": $(data[3]).html(),
						"Zeit": $(data[4]).html(),
						"Heimteam": $(data[5]).html(),
						"Gastteam": $(data[6]).html(),
						"Halle": $(data[7]).html(),
						"Karte": $(data[8]).html().split("&nbsp;")[1]
					});
				}
			}

			// Einträge filtern, um nur diejenigen mit "ATV Schladming" als Heim- oder Gastteam zu behalten.
			let entries_filtered = [];
			for (let i = 0; i < entries_all.length; i++) {
				if (
					entries_all[i]["Heimteam"] === "ATV Schladming" ||
					entries_all[i]["Gastteam"] === "ATV Schladming"
				)
					entries_filtered.push(entries_all[i]);
			}

			// Generiere eine HTML-Tabelle und fülle sie mit den gefilterten Daten.
			let html = "<table>";
			html +=
				"<tr><th>Datum</th><th>Zeit</th><th>Heimteam</th><th>Gastteam</th><th>Halle</th><th>Karte</th></tr>";
			for (let i = 0; i < entries_filtered.length; i++) {
				html +=
					"<tr><td>" +
					entries_filtered[i]["Datum"] +
					"</td><td>" +
					entries_filtered[i]["Zeit"] +
					"</td><td>" +
					entries_filtered[i]["Heimteam"] +
					"</td><td>" +
					entries_filtered[i]["Gastteam"] +
					"</td><td>" +
					entries_filtered[i]["Halle"] +
					"</td><td>" +
					entries_filtered[i]["Karte"] +
					"</td></tr>";
			}
			html += "</table>";

			// Füge die generierte Tabelle in das HTML-Element mit der ID #tableData ein.
			$("#tableData").html(html);
		},
	});
}
