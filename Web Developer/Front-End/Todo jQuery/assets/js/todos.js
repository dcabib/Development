// Check off specific todos by clicking.

$("ul").on("click", "li", function ()
{
	$(this).toggleClass("completed");
});

/*
$("li").click(function ()
{
	$(this).toggleClass("completed");

	// Check if LI is alreday gray
	// if ($(this).css("color") === "rgb(128, 128, 128)")
	// {
	// 	// If it's gray, turn it to black
	// 	$(this).css("color", "black");
	// 	$(this).css("text-decoration", "none");	
	// }
	// else
	// {
	// 	$(this).css("color", "gray");
	// 	$(this).css("text-decoration", "line-through");	
	// }
	
})
*/

// Click on X to delete TODO
$("ul").on("click", "span", function(event)
//$("span").click(function(event)
{
	// remove LI with fade out event after half a second
	$(this).parent().fadeOut(500, function()
	{
		$(this).remove();
	});

	// Avoid event propagation
	event.stopPropagation();
})

$("input[type='text']").keypress(function(event){
	if (event.which == 13)
	{
		// getting the content of input text
		var todoText = $(this).val();

		// create a new LI and update to UL
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");

		// Clearing input
		$(this).val("");
	}
})

$(".fa-plus").click(function()
{
	$("input[type='text']").fadeToggle();
});
