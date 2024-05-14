$(function(){
	// 1、隐藏游戏说明的对话框
	$(".gameDialog").hide();

	// 2、点游戏说明按钮 打开对话框
	$("#game-info").click(function(){
		$(".gameDialog").show()
	})

	// 3、点关闭按钮，关闭对话框
	$(".close").on("click",function(){
   		$(".gameDialog").hide()
   	})
})