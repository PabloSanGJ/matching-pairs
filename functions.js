function selectColor(index) {
	var colors = new Array ("#DDDDDD", "#FF0000", "#00FF00", "#0000FF", "#555555", "#550000", "#005500", "#000055", "#AAAAAA", "#AA0000", "#00AA00", "#0000AA", "#000000", "#00FFFF", "#FF00FF", "#FFFF00", "#0077FF", "#FF7700");	
	return colors[index];
}

function generate(number) {
	var rows = new Array();
	
	var limit = number == 5 ? 24 : number * number;
	
	for (var i = 0; i < (limit); i++) {
		var rand = Math.floor((Math.random()*limit)+1)
		while (jQuery.inArray(rand, rows) != -1) {
			rand = Math.floor((Math.random()*limit)+1)
		}
		rows.push(rand);
	}
	
	return rows;
}

function clicking(div, number) {
	if($("div.clicked").length < 2) {
		if (!div.hasClass("clicked") && !div.hasClass("discovered")) {
			var object = JSON.parse(readCookie("pairs"));
			var index = object[div.attr("id")] / 2 - 1;	
			var color = selectColor(index);
			div.css("background-color", color);
			div.html("<span class='number'>" + (parseInt(index) + 1) + "</span>");
			
			if($("div.clicked").length == 1) {
				$("span.clics").html(parseInt($("span.clics").html()) + 1);
				var check = $("div.clicked");
				if (check.html() == div.html()) {
					check.removeClass("clicked");
					check.addClass("discovered");
					div.addClass("discovered");
					if ($("div.discovered").length >= (number * number - 1)) {
						$("<h3 id='gameover'>Game over</h3>").appendTo("#container");
						$("#choice").toggle("slow");
					}
				} else {
					setTimeout(function(){
						check.removeClass("clicked");
						check.removeAttr("style");
						check.html("");
						div.removeAttr("style");
						div.html("");
					},800);
				}
			} else
				div.addClass("clicked");
		}
	}
}

function start(number) {
	eraseCookie("pairs");
	$("#choice").toggle("fast");
	$("#board").html("");
	$("#gameover").hide();
	$("span.clics").html("0");
	
	var row = 0;
	var column = 0;
	var counter = 0;
	var units = {};
	var numbers = generate(number);
	
	while (row < number) {
		while (column < number) {
			if (number == 5 && row == 2 && column == 2) {
				$("<div id='unit_" + row + "_" + column + "' class='unit5blank'></div>").appendTo("#board");
				units["unit_" + row + "_" + column] = "X";
			} else {
				$("<div id='unit_" + row + "_" + column + "' class='unit unit" + number + "'></div>").appendTo("#board");
				var data = numbers[counter];
				units["unit_" + row + "_" + column] = data%2 == 0 ? data : data + 1;
				counter++;
			}
			column++;
		}
		column = 0;
		row++;
	}
	$("<div class='clear'></div>").appendTo("#board")
	
	$("#clics").toggle("slow");
	createCookie("pairs", JSON.stringify(units));
	$("div.unit" + number).click(function() {clicking($(this), number);});
}