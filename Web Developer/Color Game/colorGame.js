/* 
 *
 * JavaScript for Color Game
 *
 *
*/

// Getting HTML Elements
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById ("colorDisplay");
var messageDisplay = document.getElementById ("message");

var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");

var numberOfSquares = 6; // Default number of squares

var colors = generateRandomColors (numberOfSquares);

var pickedColor = pickColor();

colorDisplay.textContent = pickedColor;

for (var i=0; i<squares.length; i++)
{
	// add initial colors to squares
	squares[i].style.background = colors[i];

	// aad click listeners to squares
	squares[i].addEventListener ("click", function(){
		console.log("evento de click em um quadrado quadrados...");

		var clicleckColor = this.style.background;

		console.log("clicleckColor:" + clicleckColor);
		console.log("pickedColor:" + pickedColor);

		if (clicleckColor === pickedColor)
		{
			messageDisplay.textContent = "Correct";
			h1.style.background = clicleckColor;
			changeColors (clicleckColor);
			resetButton.textContent = "Play Again?";
		}
		else
		{
			this.style.background = "#232323"
			messageDisplay.textContent = "Try Again";
		}
	})
}

function changeColors ( color )
{
	for (var i=0; i<squares.length; i++)
	{
		squares[i].style.background = color;
	}
}

function pickColor ()
{
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors (num)
{
	var arr = [];

	for (var i = 0; i < num; i++)
	{
		arr.push(randomColor());
	}

	return arr;
}

function randomColor ()
{
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")"; 
}

//
// Eventos de Botões
//

resetButton.addEventListener ("click", function () {
	// generate all new colors
	colors = generateRandomColors (numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	
	for (var i=0; i<squares.length; i++)
	{
		squares[i].style.background = colors[i];
	}

	h1.style.background = "steelblue";
})

easyButton.addEventListener("click", function (){
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");

	numberOfSquares = 3;
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();

	colorDisplay.textContent = pickedColor;

	for (var i=0; i<squares.length; i++)
	{
		if (colors[i])
		{
			squares[i].style.background = colors[i];
		}
		else
		{
			squares[i].style.display = "none";
		}
	}
})

hardButton.addEventListener("click", function (){
	hardButton.classList.add("selected");
	easyButton.classList.remove("selected");

	numberOfSquares = 6;
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();

	colorDisplay.textContent = pickedColor;

	for (var i=0; i<squares.length; i++)
	{
		squares[i].style.background = colors[i];
		squares[i].style.display = "block";
	}
})