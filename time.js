/**
 * Created by Administrator on 2026/9/7 0013.
 */
// 当前时间实现代码
/*
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
*/
var weather = document.querySelector("#weather");
var oClock = document.querySelector("#clock");
var oDate = document.querySelector("#oDate");
var tStyle = true;
var w_array = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
var we_array = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var m_array = new Array("正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","腊月");
var me_array = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
//var WT;
var vv = 0;
var timeTag = 1;
var color2;
var  cityname = "未获取";
var  feels = "未获取";
var  weatherdata = "未获取";
var  high = "未获取";
var  low = "未获取";
var  weathernow = "未获取";
var  wind = "未获取";
var  windLv = "未获取";
//以后添加
function setTimeColor(){
		if(vv>255){timeTag*=-1;vv=255;}
		if(vv<0){timeTag*=-1;vv=0;}
		color2 = 'hsl('+vv+',90%,50%)';
		vv += timeTag/1;
		
		
		oClock.style.color = color2;
		oDate.style.color = color2;
		oClock.style.textShadow = '0 0 20px ' + color2;
		oDate.style.textShadow = '0 0 20px' + color2;
		//oClock.style.textShadow = '0 0 20px rgb('+c+')';
		//oDate.style.textShadow = '0 0 20px rgb('+c+')';
		//oClock.style.color = 'rgb('+c+')';
		//oDate.style.color = 'rgb('+c+')';
}
function oClockInit(){
	var w = window.innerWidth;
    var h = window.innerHeight;
	oClock.style.width = w+'px';
	oClock.style.lineHeight = h+'px';
	oClock.style.height =  h+'px';
	oClock.style.fontSize = Math.floor(h/300*20) + 'px';
	oDate.style.width = w+'px';
	oDate.style.lineHeight = h+'px';
	oDate.style.height =  h+'px';
	oDate.style.fontSize = Math.floor(h/300*20) + 'px';
	weather.style.width = w+'px';
	weather.style.lineHeight = h+'px';
	weather.style.height =  h+'px';
	weather.style.fontSize = Math.floor(h/300*20) + 'px';
	//weather.font-size = '0.5em';
}
oClockInit();
//window.onresize = oClockInit;
/*
var show = document.querySelector("#show");
function showi(str){
    show.innerHTML = str;
}
*/
/* 时间 */
function getTime(){
    var t = new Date();
	
    if(tStyle){
		if(tShowSencends){
			oClock.innerHTML = add0(t.getHours())+" : "+add0(t.getMinutes())+" <span class='sec'>"+add0(t.getSeconds()) + "</span>";
		}else{
			oClock.innerHTML = add0(t.getHours())+" : "+add0(t.getMinutes());
		}
		//oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+t.getMonth() + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
    }else{
        var h = t.getHours();
        var str = h<12 ? "AM" : "PM";
        //var str = h<12 ? "上午" : "下午";
        h = h<=12 ? h : h-12;
		if(tShowSencends){
			oClock.innerHTML = "<span id='time'>"+add0(h)+" : "+add0(t.getMinutes())+" <span class='sec'>"+add0(t.getSeconds())+"</span><span class='st'>"+str+"</span></span>";
		}else{
			oClock.innerHTML = "<span id='time'>"+add0(h)+" : "+add0(t.getMinutes())+ "</span>" +" <span class='sec'>"+ str + "</span>"
		}
    }
	//日期获取
		switch (DateFormatTest) {
            case 1://"YYYY年MM月DD日 星期x"
				oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+(t.getMonth()+1) + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
				break;
            case 2://"YYYY年MM月DD日"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+(t.getMonth()+1) + "月" + t.getDate() + "日 "+ "</span>";
                break;
            case 3://"MM月DD日 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
                break;
			case 4://"MM月DD日"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日"+ "</span>";
                break;
            case 5://"星期x"
                oDate.innerHTML = "<span class='sec'>" + w_array[t.getDay()] + "</span>";
                break;
            case 6://"月份 星期x"
                oDate.innerHTML = "<span class='sec'>" + m_array[t.getMonth()] + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 7://"月份"
                oDate.innerHTML = "<span class='sec'>" + m_array[t.getMonth()] + "</span>";
                break;
            case 8://"YYYY-MM-DD week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
			case 9://"YYYY-MM-DD 星期X"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ w_array[t.getDay()] + "</span>";
                break;
            case 10://"YYYY-MM-DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "</span>";
                break;
			case 11://"MM-DD week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
            case 12://"Month week"
                oDate.innerHTML = "<span class='sec'>" + me_array[t.getMonth()] + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 13://"week"
                oDate.innerHTML = "<span class='sec'>" + we_array[t.getDay()] + "</span>";
                break;
			case 14://"Month"
                oDate.innerHTML = "<span class='sec'>" + me_array[t.getMonth()] + "</span>";
                break;
            case 15://"YYYY/MM/DD week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 16://"YYYY/MM/DD 星期x"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 17://"YYYY/MM/DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate()  + "</span>";
                break;
            case 18://"MM/DD week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
            case 19://"MM/DD"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "</span>";
                break;
			case 20://"Month"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "</span>";
                break;
			case 21://"MM/DD/YYYY week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 22://"MM/DD/YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
            case 23://"MM/DD/YYYY"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "</span>";
                break;
			case 24://"MM-DD-YYYY"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "</span>";
                break;
            case 25://"MM-DD-YYYY week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 26://"MM-DD-YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 27://MM.DD.YYYY
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear()  + "</span>";
                break;
            case 28://"YYYY.MM.DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "</span>";
                break;
            case 29://"YYYY.MM.DD Week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
			case 30://"YYYY.MM.DD 星期x"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
            case 31://"MM.DD.YYYY Week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 32://"MM.DD.YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 33://"MM月DD日YYYY年 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日" + t.getFullYear() + "年" + "&nbsp" + w_array[t.getDay()]  + "</span>";
                break;
        }
}
function autoTime(){
    getTime();
    setTimeout(autoTime, 1000);
}
function add0(n){
    return n<10 ? '0'+n : ''+n;
}
autoTime();
function getWeather(){
    if(weatherInit) return;
    weatherInit = true;
	switch (WeatherFormatTest) {
            case 1://"城市+气温+天气+风向+风级"
				//$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}    {风向}    {风级}级</span>"});
				//weather.innerHTML = "	<iframe name='weather_inc' src='http://i.tianqi.com/index.php?c=code&id=11' width='330' height='35' frameborder='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>";
                //weather.innerHTML = "<iframe name='weather_inc' src='http://i.tianqi.com/index.php?c=code&id=99' width='160' height='36' frameborder='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>"
				testGetWeather("<span class='sec'>{城市}    {气温}℃    {天气}    {范围}    {风向}    {风级}</span>");
				break;
            case 2://"城市+气温+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}</span>"});
				testGetWeather("<span class='sec'>{城市}    {气温}℃    {天气}</span>");
				break;
            case 3://"城市+天气+气温+风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃    {风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃    {风向}    {风级}</span>");
				break;
			case 4://"城市+气温+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃</span>");
				break;
            case 5://"城市+气温+天气+风向"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}    {风向}</span>"});
                testGetWeather("<span class='sec'>{城市}    {气温}℃    {天气}    {风向}</span>");
				break;
            case 6://"城市+天气+气温+风向"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃    {风向}</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃    {风向}</span>");
				break;
			case 7://"城市+昼夜气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {昼夜}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {昼夜}    {气温}℃</span>");
				break;
            case 8://"城市+天气"
				//$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}"});
                testGetWeather("<span class='sec'>{城市}    {天气}");
				break;
			case 9://"城市+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {气温}℃</span>");
				break;
            case 10://"天气+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{天气}    {气温}℃</span>");
				break;
			case 11://"气温+天气+风向"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{气温}℃    {天气}    {风向}</span>"});
                testGetWeather("<span class='sec'>{气温}℃    {天气}    {风向}</span>");
				break;
            case 12://"天气+风向+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{风向}    {天气}    {气温}℃</span>");
				break;
            case 13://"风向+风级+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {风级}级   {气温}℃</span>"});
                testGetWeather("<span class='sec'>{风向}    {风级}级   {气温}℃</span>");
				break;
			case 14://"天气+风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{天气}    {风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{天气}    {风向}    {风级}</span>");
				break;
            case 15://"天气+风向+风级+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{天气}    {风向}    {风级}级    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{天气}    {风向}    {风级}    {气温}℃</span>");
				break;
            case 16://"风向+风级+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {风级}级    {天气}</span>"});
                testGetWeather("<span class='sec'>{风向}    {风级}    {天气}</span>");
				break;
			case 17://"气温+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{气温}℃    {天气}</span>"});
                testGetWeather("<span class='sec'>{气温}℃    {天气}</span>");
				break;
            case 18://"城市"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}</span>"});
                testGetWeather("<span class='sec'>{城市}</span>");
				break;
            case 19://"风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{风向}    {风级}</span>");
				break;
			case 20://"城市+风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{城市}    {风向}    {风级}</span>");
				break;
			case 21://"城市+天气+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃</span>");
				break;
        }
}
function autoWeather(){
	//alert("调用:自动");
    getWeather();
    WT = setTimeout(autoWeather, 1800000);
}
function testGetWeather(strHtml){
	// alert(strCity);
	if(strCity == "")
	{
		// 未配置城市：按 IP 自动定位（原 i.tianqi.com 为明文http且页面结构易失效，已弃用）
		getWeatherByIp(strHtml);
	}
	else
	{
		getWeatherByCity(strCity,strHtml);
	}
}
/* ============================================================
   天气接口说明（2026-09 修复）：
   原接口 https://autodev.openspeech.cn/csp/api/v2.1/weather 已失效
   （服务端返回 code:1014 "sign签名无效"，旧代码里的 sign=android 不再被接受），
   导致 #weather 一直停留在页面初始占位文字"天气"。
   现改用 wttr.in 免费接口：无需申请Key、支持跨域(CORS已放行)、支持中文城市名直查。
   ------------------------------------------------------------
   数据字段对应关系：
     {气温}  <- 当前实时气温(℃)
     {范围}  <- 今日最低温~最高温
     {天气}  <- 天气现象(英文描述已映射为中文)
     {风向}  <- 16方位英文缩写已映射为中文
     {风级}  <- 由风速(km/h)按蒲福风级换算，如"3级"
   ============================================================ */
// 英文天气 -> 中文映射表（wttr.in 返回的 WorldWeatherOnline 描述）
var weatherCnMap = {
    "clear": "晴",
    "sunny": "晴",
    "partly cloudy": "多云",
    "cloudy": "阴",
    "overcast": "阴",
    "mist": "薄雾",
    "fog": "雾",
    "freezing fog": "冻雾",
    "light drizzle": "毛毛雨",
    "drizzle": "毛毛雨",
    "freezing drizzle": "冻毛毛雨",
    "light rain": "小雨",
    "light rain shower": "小阵雨",
    "light rain showers": "小阵雨",
    "patchy rain possible": "零星小雨",
    "patchy light rain": "零星小雨",
    "patchy light drizzle": "零星毛毛雨",
    "moderate rain": "中雨",
    "moderate rain at times": "中雨",
    "heavy rain": "大雨",
    "heavy rain at times": "大雨",
    "torrential rain shower": "大阵雨",
    "moderate or heavy rain shower": "阵雨",
    "light rain with thunder": "雷阵雨",
    "patchy light rain with thunder": "雷阵雨",
    "moderate or heavy rain with thunder": "雷阵雨",
    "thundery outbreaks possible": "雷阵雨",
    "light snow": "小雪",
    "light snow showers": "小阵雪",
    "patchy snow possible": "零星小雪",
    "moderate snow": "中雪",
    "heavy snow": "大雪",
    "heavy snow showers": "大阵雪",
    "blizzard": "暴雪",
    "light sleet": "雨夹雪",
    "moderate or heavy sleet": "雨夹雪",
    "freezing rain": "冻雨",
    "light freezing rain": "冻雨",
    "hail": "冰雹",
    "ice pellets": "冰粒",
    "smoky haze": "霾"
};
function weatherCn(en){
    if(!en) return "未知";
    en = String(en).toLowerCase().trim();
    if(weatherCnMap[en]) return weatherCnMap[en];
    // 未精确命中时按关键词兜底
    if(en.indexOf("thunder") >= 0) return "雷阵雨";
    if(en.indexOf("snow") >= 0 || en.indexOf("sleet") >= 0) return "雪";
    if(en.indexOf("hail") >= 0) return "冰雹";
    if(en.indexOf("rain") >= 0 || en.indexOf("drizzle") >= 0 || en.indexOf("shower") >= 0) return "雨";
    if(en.indexOf("fog") >= 0) return "雾";
    if(en.indexOf("mist") >= 0) return "薄雾";
    if(en.indexOf("cloud") >= 0) return "多云";
    if(en.indexOf("clear") >= 0 || en.indexOf("sun") >= 0) return "晴";
    return en;
}
// 16方位风向 英文 -> 中文
var windCnMap = {
    "N":"北风","NNE":"东北偏北","NE":"东北","ENE":"东北偏东",
    "E":"东风","ESE":"东南偏东","SE":"东南","SSE":"东南偏南",
    "S":"南风","SSW":"西南偏南","SW":"西南","WSW":"西南偏西",
    "W":"西风","WNW":"西北偏西","NW":"西北","NNW":"西北偏北"
};
function windCn(abbr){
    abbr = String(abbr || "").toUpperCase().trim();
    return windCnMap[abbr] || abbr || "未知";
}
// 风速(km/h) -> 蒲福风级
function windLevelCn(kmph){
    kmph = parseFloat(kmph);
    if(isNaN(kmph) || kmph < 0) return "未知";
    var lv = 0;
    if(kmph >= 118) lv = 12;
    else if(kmph >= 103) lv = 11;
    else if(kmph >= 89) lv = 10;
    else if(kmph >= 75) lv = 9;
    else if(kmph >= 62) lv = 8;
    else if(kmph >= 50) lv = 7;
    else if(kmph >= 39) lv = 6;
    else if(kmph >= 29) lv = 5;
    else if(kmph >= 20) lv = 4;
    else if(kmph >= 12) lv = 3;
    else if(kmph >= 6) lv = 2;
    else if(kmph >= 1) lv = 1;
    return lv + "级";
}
function getWeatherByCity(city, strHtml){
    // 主方案：wttr.in（中文城市名直查）
    $.ajax({
        url: "https://wttr.in/" + encodeURIComponent(city || "") + "?format=j1",
        dataType: "json",
        timeout: 10000,
        success: function(data){
            if(data && data.current_condition && data.current_condition.length > 0){
                var c = data.current_condition[0];
                var today = data.weather[0];
                cityname = city || data.nearest_area[0].areaName[0].value;
                feels = c.temp_C;
                high = today.maxtempC;
                low = today.mintempC;
                weathernow = weatherCn(c.weatherDesc[0].value);
                wind = windCn(c.winddir16Point);
                windLv = windLevelCn(c.windspeedKmph);
                weather.innerHTML = FormatWeather(strHtml);
            }else{
                weather.innerHTML = "<span class='sec'>天气获取失败</span>";
            }
        },
        error: function(){
            // 兜底：主接口不可达时，按 IP 自动定位再试一次
            getWeatherByIp(strHtml);
        }
    });
}
function getWeatherByIp(strHtml){
    $.ajax({
        url: "https://wttr.in/?format=j1",
        dataType: "json",
        timeout: 10000,
        success: function(data){
            if(data && data.current_condition && data.current_condition.length > 0){
                var c = data.current_condition[0];
                var today = data.weather[0];
                cityname = data.nearest_area[0].areaName[0].value;
                feels = c.temp_C;
                high = today.maxtempC;
                low = today.mintempC;
                weathernow = weatherCn(c.weatherDesc[0].value);
                wind = windCn(c.winddir16Point);
                windLv = windLevelCn(c.windspeedKmph);
                weather.innerHTML = FormatWeather(strHtml);
            }else{
                weather.innerHTML = "<span class='sec'>天气获取失败</span>";
            }
        },
        error: function(){
            weather.innerHTML = "<span class='sec'>天气获取失败</span>";
        }
    });
}
// function getWeatherForCity(city,strHtml)
// {
// 	$.get("http://wthrcdn.etouch.cn/WeatherApi?city="+city,function(data,status){
// 		//data = data.replace("[","");
// 		//data = data.replace("]","");
// 		//data = $.parseJSON(data);
// 		//JSON.parse(data); //可以将json字符串转换成json对象 
// 		//data = eval('(' + data + ')')
// 		//alert("数据: " + data + "\n状态: " + status);
// 		var str = data;   
// 		//创建文档对象  
// 		var parser=new DOMParser();  
// 		var xmlDoc=parser.parseFromString(str,"text/xml");  
	   
// 		//提取数据  
// 		cityname = xmlDoc.getElementsByTagName('city')[0].textContent; 
// 		feels = xmlDoc.getElementsByTagName('wendu')[0].textContent; 
// 		weatherdata = xmlDoc.getElementsByTagName('weather'); 
// 		high = weatherdata[0].children[1].textContent.split(" ")[1];
// 		low = weatherdata[0].children[2].textContent.split(" ")[1];
// 		weathernow = weatherdata[0].children[3].children[0].textContent;
// 		wind = weatherdata[0].children[3].children[1].textContent;
// 		windLv = weatherdata[0].children[3].children[2].textContent;
		
// 		//alert("数据: " + cityname + "  " + feels +"℃  "+ low +  " ~ " + high + "  " + weathernow + "  " + wind + "  " + windLv + "\n状态: " + status);
		
// 		//$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}    {风向}    {风级}级</span>"});
		
// 		weather.innerHTML = FormatWeather(strHtml);
// 	})
// }
function FormatWeather(strHtml){
	//testGetWeather();
	strHtml = strHtml.replace("{城市}",cityname);
	strHtml = strHtml.replace("{气温}",feels);
	strHtml = strHtml.replace("{天气}",weathernow);
	strHtml = strHtml.replace("{风向}",wind);
	strHtml = strHtml.replace("{风级}",windLv);
	strHtml = strHtml.replace("{范围}",low +  "~" + high);
	return strHtml;
}
