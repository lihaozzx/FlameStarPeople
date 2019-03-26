
//修改时间格式
function Format(now,mask){
    var d = now;
    var zeroize = function (value, length)
    {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++)
        {
            zeros += '0';
        }
        return zeros + value;
    };
 
    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
    {
        switch ($0)
        {
            case 'd': return d.getDate();
            case 'dd': return zeroize(d.getDate());
            case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M': return d.getMonth() + 1;
            case 'MM': return zeroize(d.getMonth() + 1);
            case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy': return String(d.getFullYear()).substr(2);
            case 'yyyy': return d.getFullYear();
            case 'h': return d.getHours() % 12 || 12;
            case 'hh': return zeroize(d.getHours() % 12 || 12);
            case 'H': return d.getHours();
            case 'HH': return zeroize(d.getHours());
            case 'm': return d.getMinutes();
            case 'mm': return zeroize(d.getMinutes());
            case 's': return d.getSeconds();
            case 'ss': return zeroize(d.getSeconds());
            case 'l': return zeroize(d.getMilliseconds(), 3);
            case 'L': var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z': return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default: return $0.substr(1, $0.length - 2);
        }
    });
};
//Format(new Date(dangerList[i].findtime),"yy-MM-dd HH:mm")

//判断闰年
function isLeapYear(year){
	var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
    var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
    var cond3 = year % 400 == 0;  //条件3：年份是400的倍数
    //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
    //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
    //所以得出判断闰年的表达式：
    var cond = cond1 && cond2 || cond3;
    if (cond) {
      // alert(year + "是闰年");
      return true;
    } else {
      // alert(year + "不是闰年");
      return false;
    }
};

//获取月份中的日期
function getD(y,m){
	var a = [];
    var n = 1;
    if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
    	n = 32;
    } else if (m == 2) {
      	if (isLeapYear(y)) {
        	n = 30;
      	} else {
        	n = 29;
      	};
    } else {
      	n = 31;
    };
    for (var i = 1; i < n; i++) {
      a.push(i);
    };
	return a
};

//设置周


//设置月份中的日期
function setMonthDay(ye, mo, da){
	var a = new Date(ye, mo, da);
	var y = a.getFullYear();
	var m = a.getMonth();
	var d = a.getDate();
	var cure_month_days = getD(y,m+1);
	var prev_month_days = getD(y,m);
	var next_month_days = getD(y,m+2);
	var first_week = (new Date(y,m,1)).getDay() ? (new Date(y,m,1)).getDay() : 7;
	var dat_date = $('.dat-date');
	var m_Str = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
	var m_str = ['1/','2/','3/','4/','5/','6/','7/','8/','9/','10/','11/','12/'];
	var w_str = ['周日','周一','周二','周三','周四','周五','周六'];
	var w_Str = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	var dates = {};
	dates.prev = [];
	dates.cure = cure_month_days;
	dates.next = [];
	for(var i = 0; i < first_week; i++){
		dates.prev.unshift(prev_month_days[prev_month_days.length-i-1]);
	}
	var last_week = 42-dates.prev.length-dates.cure.length;
	for(var i = 0; i < last_week; i++){
		dates.next.push(i+1);
	}
	//上月日期
	for(var i = 0; i < dates.prev.length; i++){
		dat_date[i].innerHTML = dates.prev[i];
		$(dat_date[i]).parent().addClass('date-other-month')
		dat_date[i].parentNode.parentNode.dataset.y = y;
		dat_date[i].parentNode.parentNode.dataset.m = m-1;
		dat_date[i].parentNode.parentNode.dataset.d = dates.prev[i];
	}
	//当月日期
	for(var i = 0, j = dates.prev.length; i < dates.cure.length; i++, j++){
		dat_date[j].innerHTML = dates.cure[i];
		$(dat_date[j]).parent().removeClass('date-other-month')
		dates.cure[i] == d ? $(dat_date[j]).parent().addClass('date-today'): $(dat_date[j]).parent().removeClass('date-today');
		dat_date[j].parentNode.parentNode.dataset.y = y;
		dat_date[j].parentNode.parentNode.dataset.m = m;
		dat_date[j].parentNode.parentNode.dataset.d = dates.cure[i];
	}
	//下月日期
	for(var i = 0, j = dates.prev.length + dates.cure.length; i < dates.next.length; i++, j++){
		dat_date[j].innerHTML = dates.next[i];
		$(dat_date[j]).parent().addClass('date-other-month')
		dat_date[j].parentNode.parentNode.dataset.y = y;
		dat_date[j].parentNode.parentNode.dataset.m = m+1;
		dat_date[j].parentNode.parentNode.dataset.d = dates.next[i];
	}
	$('.dat-nav-center').text(m_Str[m]+' '+y);
	var index = (new Date(y,m,d)).getDay();
	var index_1 = dates.cure.indexOf(d);
	var week_bod_tds = $('.dat-week-allDay td');
	var week_nav_tds = $('.dat-weekAll thead td');
	var d_index = 0;
	//console.log(y,m,d)
	week_bod_tds.each(function(k, v){
		var da = k;
		if(da == index){
			$(week_nav_tds[k]).text(w_str[k]+' '+((m+1)<10?'0'+(m+1):(m+1))+'/'+ (d < 10 ? '0' + d : d));
			$(week_nav_tds[k]).attr({'data-y':y,'data-m':m,'data-d':d});
		}else if(da < index){
			var t_d = null;
			if(dates.cure[index_1-(index-k)] < 10){
				t_d = dates.cure[index_1-(index-k)]
			}else if(!dates.cure[index_1-(index-k)]){
				
				t_d = dates.prev[dates.prev.length -((new Date(y,m,1)).getDay()+1-k)]
				var ddd = new Date(y,m-1,d);
			}else{
				t_d = dates.cure[index_1-(index-k)]
			}
			$(week_nav_tds[k]).text(w_str[k]+' '+(ddd?(ddd.getMonth()+1)<10?'0'+(ddd.getMonth()+1):ddd.getMonth()+1:(m+1)<10?'0'+(m+1):m+1)+'/'+ (t_d<10?'0'+(t_d-0):t_d));
			$(week_nav_tds[k]).attr({'data-y':ddd?ddd.getFullYear():y,'data-m':ddd?ddd.getMonth():m,'data-d':(t_d)});
		}else{
			var t_d = null;
			if(dates.cure[index_1-(index-k)] < 10){
				t_d = dates.cure[index_1-(index-k)]
			}else if(!dates.cure[index_1-(index-k)]){
				t_d = dates.next[d_index]
				d_index++
				var ddd = new Date(y,m+1,d);
			}else{
				t_d = dates.cure[index_1-(index-k)]
			}
			$(week_nav_tds[k]).text(w_str[k]+' '+(ddd?(ddd.getMonth()+1)<10?'0'+(ddd.getMonth()+1):ddd.getMonth()+1:(m+1)<10?'0'+(m+1):m+1)+'/'+ (t_d<10?'0'+(t_d-0):t_d));
			$(week_nav_tds[k]).attr({'data-y':ddd?ddd.getFullYear():y,'data-m':ddd?ddd.getMonth():m,'data-d':(t_d)});
		}
	})
	$('.dat-day-allDay td').text(w_Str[new Date(y,m,d).getDay()] + ' ' + (m+1) + ' / ' + d)
	$('.dat-week .dat-weekAll tbody tr').each(function(k,v){
		$(v).children().each(function(k1,v1){
			$(v1).attr({'data-y':$(week_nav_tds[k1]).attr('data-y'),'data-m':$(week_nav_tds[k1]).attr('data-m'),'data-d':$(week_nav_tds[k1]).attr('data-d'), 'data-time':$(v).attr('data-time')});
		})
	})
	$('.dat-day tbody td').attr({'data-y':y,'data-m':m,'data-d':d});
		
};



$(function(){
	var a = new Date();
	var year = a.getFullYear();
	var month = a.getMonth();
	var day = a.getDate();
	var y = a.getFullYear();
	var m = a.getMonth();
	var d = a.getDate();
	var colors = ['bg-red','bg-green','bg-primary']
	var dat_month = $('.dat-month');
	var dat_week = $('.dat-week');
	var dat_day = $('.dat-day');
	for(var i = 0; i < 6; i++){
		var tr = document.createElement('tr');
		tr.className = 'dat-month-week'
		$('.dat-month').append(tr);
		for(var j = 0; j < 7; j++){
			$(tr).append(
				'<td class="dat-week-item">'
				+'<div class="dat-week-body">'
				+'<div class="dat-date">0</div>'
				+'<div class="dat-event"></div>'
				+'</div>'
				+'</td>'
			)
		}
	}
	setMonthDay(y,m,d);
	var dat_week = $('.dat-week .dat-week-body');
	dat_week.children().remove()
	var dat_day = $('.dat-day .dat-day-body');
	dat_day.children().remove()
	dat_day.width(dat_day.parent().width())
	$('.dat-month .dat-week-body').css({'min-height': $('.dat-week-item').width() - 20 + 'px'})
	var m_w_d = $('.dat-nav-right .y_grpItem');
	var p_n = $('.dat-nav-left .btn-group button');
	var today = $('.dat-nav-left .today');
	dat_month.show();
	$('.dat-week').hide();
	$('.dat-day').hide();
	$('.yue').change(function(){
		var nian = $('.nian').val();
		var yue = $('.yue').val();
		y = nian-0; m = yue-0; d = day;
		$('.dat-week').hide();
		$('.dat-day').hide();
		$('.dat-month').show();
		$('.y_grpItem').removeClass('active')
		$('.y_grpItem').eq(0).addClass('active');
		setMonthDay(y,m,d);
		getdatly({
			req_obj: $('.dat-month td'),
			req_boo: false,
			dt: y+'-'+((m+1)<10?'0'+(m+1):(m+1))
		})
		$('.nian').val(y)
		$('.yue').val(m < 10 ? '0' + m : m)
	})
	getdatly({
		req_data: {},
		req_obj: $('.dat-month td'),
		req_boo: false,
		dt: ''
	})
	$('.nian').val(y)
	$('.yue').val(m < 10 ? '0' + m : m)
	
	$('.prev').click(function(){
		var menu = 'month';
		$('.today.active').removeClass('active');
		var objobj = null;
		m--;if( m < 1){m = 12;--y}
		setMonthDay(y,m,d);
		
		objobj = $('.dat-month td');
			
		getdatly({
			req_obj: objobj,
			dt: y+'-'+((m+1)<10?'0'+(m+1):(m+1))
		})
		$('.nian').val(y)
		$('.yue').val(m < 10 ? '0' + m : m)
	})
	$('.next').click(function(){
		var menu = 'month';
		$('.today.active').removeClass('active');
		var objobj = null;
		
		m++;if( m > 12){m = 1;++y}
		setMonthDay(y,m,d);
		
		objobj = $('.dat-month td');
		
		getdatly({
			req_obj: objobj,
			dt: y+'-'+((m+1)<10?'0'+(m+1):(m+1))
		})
		$('.nian').val(y)
		$('.yue').val(m < 10 ? '0' + m : m)
	})
	$('.y_rowBox.load_box').css({'min-height': $('.y_rowBox').eq(0).height()})
})

