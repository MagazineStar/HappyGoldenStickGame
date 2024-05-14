//第一步:生成随机间距的主子
var wellWidth = 100;//设置柱子的宽为100px；
initWell();//调用生成柱子函数

//第二部：鼠标按下不动，棍子长出来； 鼠标松开，棍子停止生长，并且倒下来     创新，控制棍子生长速度，颜色
var stop = true;//标记变量。标记按钮能否按下的状态
//1.鼠标按下,棍子长出来
$('.btnClick').mousedown(function(){
	if(stop){

	var stickH = $('.container').offset().top;//棍子的最大值
	$('.stick').animate({'width':stickH + 'px'},3000)//设动画，让棍子长出来
	}
})

//鼠标松开，棍子停止生长，并且倒下来
$('.btnClick').mouseup(function(){
	if(stop){

	$('.stick').stop();//棍子停下来
	$('.stick').addClass('stickDown')//棍子倒下来
	stop = false;//修改状态
	moveMan();//调用小人移动的函数
	
	}
})


//第三步：小人移动函数
var num = 0;//柱子索引号，表示小人在第几个柱子上。
function moveMan(){
	//定时器是为了优化效果
	setTimeout(function(){
		$('.man>img').attr('src','images/16179478469962477.gif');//换动图
		//给人加动画跑起来
		var stickW = $('.stick').width();//棍子的宽度、长度
		$('.man>img').animate({'left':stickW+'px'},700,function(){
			//判断小人有没有挑战成功
			//棍子长度和柱子之间的距离比较  棍子太长或者太短都会挑战失败
			var juLi = $('.well').eq(num+1).offset().left - wellWidth;
			if(stickW<juLi || stickW>(juLi+wellWidth)){
				//alert('挑战失败')
				fail();//调用挑战失败的函数
			}else{
								
				//一个柱子跑过去了再跑下一个柱子,等柱子都跑完了再调用闯关成功的函数
				$('.man>img').attr('src','images/16179478469962477.gif')
				.removeClass('rotate').css('left','0px');
				$('.stick').removeClass('stickDown').width('0px');
				var next = $('.well').eq(num+1).css('left');
				$('.well-box').animate({'left':'-'+next},600,function(){
					$('man>img').show();
					stop = true;
					num++;
					if(num == 3){
						success();//调用床干成功的函数
						stop = false;
					}
				})
			}
		})
	},1000)	
}


//第四步:封装挑战失败的函数
function fail(){
	//人掉下来并隐藏
	$('.man>img').addClass('rotate').hide(1000);
	$('.stick').fadeOut(1000);//棍子淡出 
	$('.dialog').show(1000,function(){//显示
	$('.dialog .name').html(failText[Math.floor(Math.random()*20)])//添加提示语
	$('.dialog .dialog-btn').html('<a href="Javacript:;" class="play-agin">再试一次</a>')
	});
}
//$(".dialog-btn").click(function(){
//	shuax()
//})

//第五步：封装闯关成功的函数
function success(){
	$('.dialog').show(1000);//显示
	$('.dialog .name').html(sucText[Math.floor(Math.random()*20)])//添加提示语
	$('.dialog .dialog-btn').html(`
		<a href="Javacript:;" class="play-agin">重完一次</a>
		<a href="Javacript:;" class="go-next">下一关</a>
		`)//添加按钮
	num = 0;//
}

//第六步：点击下一关，调用刷新函数，改变关卡数
$('.dialog-btn').on('click','.go-next',function(){
	reload();
	var level = Number($('.play-title').text().slice(2));
	//console.log(++level)
	++level;
	$('.play-title').text('关卡'+level);
})

//第七步：封装刷新页面的函数
//function shuax(){
//	$(".stick").fadeIn(1000);//棍子淡出
//	$(".stick").removeClass("stickDown")//棍子倒回去
//	$(".stick").css("width",0)//棍子长度变为0
//	$(".dialog").hide()//隐藏提示框盒子
//	$(".man>img").removeClass("rotate").css("left",0).show()//删掉小人掉下去，设leftwie0
//}
function reload(){
	$('.dialog').hide();
	stop = true;
	initWell();
	$('.stick').removeClass('stickDown').width('0px').show();
	$('.well-box').css('left','0px');
	$('.man>img').attr('src','images/16179478469962477.gif')
	.removeClass('rotate').css('left','0px').show();
	$('body').removeClass().addClass('bg'+Math.ceil(Math.random()*20));
	num = 0;
}



//第八步：点击再试一次，调用刷新函数
$('.dialog-btn').on('click','.play-agin',function(){
	reload();
})
var failText = [
		'志在峰巅的攀登者，不会陶醉在沿途的某个脚印之中。',
		'海浪为劈风斩浪的航船饯行，为随波逐流的轻舟送葬。',
		'人生最重要的一点是，永远不要迷失自己。',
		'一个人承受孤独的能力有多大，他的能力就有多大。',
		'实力塑造性格，性格决定命运。',
		'普通人成功并非靠天赋，而是靠把寻常的天资发挥到不寻常的高度。',
		'对于强者，要关注他们的灵魂，对于弱者，他关注他们的生存。',
		'积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。',
		'成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。',
		'当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。',
		'有的人一生默默无闻，有的人一生轰轰烈烈，甚至千古流芳，为什么会这样？因为默默无闻的人只是满足于现状，而不去想怎么轰轰烈烈过一生，不要求自己，去做，去行动，怎么能够成功？',
		'人性最可怜的就是：我们总是梦想着天边的一座奇妙的玫瑰园，而不去欣赏今天就开在我们窗口的玫瑰。',
		'在人生的道路上，即使一切都失去了，只要一息尚存，你就没有丝毫理由绝望。因为失去的一切，又可能在新的层次上复得。',
		'没有一劳永逸的开始；也没有无法拯救的结束。人生中，你需要把握的是：该开始的，要义无反顾地开始；该结束的，就干净利落地结束。',
		'生命的奖赏远在旅途终点，而非起点附近。我不知道要走多少步才能达到目标，踏上第一千步的时候，仍然可能遭到失败。但我不会因此放弃，我会坚持不懈，直至成功！',
		'不要认为只要付出就一定会有回报，这是错误的。学会有效地工作，这是经营自己强项的重要课程。',
		'苦心人天不负，卧薪尝胆，三千越甲可吞吴。有志者事竞成，破釜沉舟，百二秦川终属楚。',
		'生命本身是一个过程，成功与失败只是人生过程中一些小小的片段，若果把生命与成功或失败联系在一起，生命将失去本身该有的意义。',
		'我们不要哀叹生活的不幸，诅咒命运的不公。在命运面前，我们要做强者，掐住命运的咽喉，叩问命运，改变命运。',
		'努力和效果之间，永远有这样一段距离。成功和失败的唯一区别是，你能不能坚持挺过这段无法估计的距离。'
]
var sucText = [
		'勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑',
		'志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。 —— 莎士比亚',
		'骏马是跑出来的，强兵是打出来的。',
		'只有登上山顶，才能看到那边的风光。',
		'如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。',
		'平时没有跑发卫千米，占时就难以进行一百米的冲刺。',
		'梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。',
		'没有激流就称不上勇进，没有山峰则谈不上攀登。',
		'真正的才智是刚毅的志向。 —— 拿破仑',
		'山路曲折盘旋，但毕竟朝着顶峰延伸。',
		'只有创造，才是真正的享受，只有拚搏，才是充实的生活。',
		'敢于向黑暗宣战的人，心里必须充满光明。',
		'种子牢记着雨滴献身的叮嘱，增强了冒尖的勇气。',
		'自然界没有风风雨雨，大地就不会春华秋实。',
		'只会幻想而不行动的人，永远也体会不到收获果实时的喜悦。',
		'勤奋是你生命的密码，能译出你一部壮丽的史诗。',
		'对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
		'奋斗者在汗水汇集的江河里，将事业之舟驶到了理想的彼岸。',
		'忙于采集的蜜蜂，无暇在人前高谈阔论。',
		'勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。'
]




//封装函数生成柱子
function initWell(){
	//先删除之前生成的柱子
	$('.well-box').empty()
	//生成第一根
	$('.well-box').append(`<div class='well' style="left:0px; width:${wellWidth}px"></div>`)
	//生成第二根   2的left = 1的宽 + 1-2之间的随机间距（最大不能查过盒子离顶部的距离，设定最小值避免柱子重叠。）
	var max = $('.container').offset().top;//最大值
	var min = 80;//最小值
	//parseInt(Math.random()*(max-min));//随机间距
	var end2 = wellWidth + parseInt(Math.random()*(max-min)) + min;//第2根柱子离左边距离即left值
	$('.well-box').append(`<div class='well' style="left:${end2}px; width:${wellWidth}px"></div>`)
	
	//生成第3根  3的left = 2的left+ 2的宽 + 2-3之间的随机间距（最大不能查过盒子离顶部的距离，设定最小值避免柱子重叠。）
	var end3 = end2 + wellWidth + parseInt(Math.random()*(max-min))+ min;
	$('.well-box').append(`<div class='well' style="left:${end3}px; width:${wellWidth}px"></div>`)
	
	//生成第4根  4的left = 3的left+ 3的宽 + 3-4之间的随机间距（最大不能查过盒子离顶部的距离，设定最小值避免柱子重叠。）
	var end4 = end3 + wellWidth + parseInt(Math.random()*(max-min))+ min;
	$('.well-box').append(`<div class='well' style="left:${end4}px; width:${wellWidth}px"></div>`)
	
}



