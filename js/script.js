const dialog = document.querySelector(".example-fullscreen");
const openButton = dialog.nextElementSibling;
const closeButton = dialog.querySelector("mdui-button");

openButton.addEventListener("click", () => dialog.open = true);
closeButton.addEventListener("click", () => dialog.open = false);



document.getElementById('title-card').addEventListener('click', function() {
	var navname3 = document.getElementById('navname3');
	var navname4 = document.getElementById('navname4');

	// 移除之前的动画类（如果存在）
	navname3.classList.remove('bounce-animation');
	navname4.classList.remove('bounce-animation');

	// 强制触发重绘以清除之前的动画状态
	void navname3.offsetWidth;
	void navname4.offsetWidth;

	// 添加新的动画类
	navname3.classList.add('bounce-animation');
	navname4.classList.add('bounce-animation');
});





(function() {
	// 立即执行代码，设置默认配色方案
	document.getElementById('colorMenu').addEventListener('change', function(event) {
		const color = event.target.value;
		setColorScheme(color);
	});

	const example = document.querySelector(".example-modal");
	const navigationDrawer = example.querySelector("mdui-navigation-drawer");
	const openButton = example.querySelector(".open");
	const closeButton = example.querySelector(".close");

	openButton.addEventListener("click", () => navigationDrawer.open = true);
	closeButton.addEventListener("click", () => navigationDrawer.open = false);

	window.onscroll = function() {
		var button = document.getElementById("back-to-top");
		if (document.documentElement.scrollTop > 100) { // 可根据需要调整数值
			button.classList.add("show");
		} else {
			button.classList.remove("show");
		}
	};

	document.getElementById("back-to-top").onclick = function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	document.getElementById("back-to-top-logo").onclick = function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const titleCard = document.getElementById('title-card');
	const searchInput = document.getElementById('searchInput');
	const searchButton = document.getElementById('searchButton');
	const easterEggContainer = document.getElementById('easter-egg-container');
	const easterEggMessage = document.getElementById('easter-egg-message');

	let clickCount = 0;
	let isEasterEggActive = false;

	titleCard.addEventListener('click', function() {
		var navname3 = document.getElementById('navname3');
		var navname4 = document.getElementById('navname4');

		navname3.classList.remove('bounce-animation');
		navname4.classList.remove('bounce-animation');

		void navname3.offsetWidth;
		void navname4.offsetWidth;

		navname3.classList.add('bounce-animation');
		navname4.classList.add('bounce-animation');

		if (!isEasterEggActive) {
			clickCount++;
		}
	});

	document.getElementById('engine').addEventListener('change', function(event) {
		const engine = event.target.value;
		localStorage.setItem('searchEngine', engine);
	});

	function triggerEasterEgg() {
		isEasterEggActive = true;
		//clickCount = 0; // Reset click count after triggering
		const confettiCount = 200; // 增加礼花数量
		const textCount = 30; // 增加文本数量
		const animationDuration = 3; // 动画持续时间（秒）

		// 显示礼花
		for (let i = 0; i < confettiCount; i++) {
			const confetti = document.createElement('div');
			confetti.classList.add('confetti');
			confetti.style.left = `${Math.random() * 100}vw`;
			confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
			confetti.style.animationDelay = `${Math.random() * animationDuration}s`; // 随机延迟
			confetti.style.animationDuration = `${animationDuration}s`; // 设置动画持续时间
			easterEggContainer.appendChild(confetti);
		}

		// 显示下落文字 "cOɔ"
		for (let i = 0; i < textCount / 2; i++) {
			const fallingCO = document.createElement('div');
			fallingCO.classList.add('falling-text');
			fallingCO.textContent = 'Dorn';
			fallingCO.style.left = `${Math.random() * 100}vw`;
			fallingCO.style.animationDelay = `${Math.random() * animationDuration}s`; // 随机延迟
			fallingCO.style.animationDuration = `${animationDuration}s`; // 设置动画持续时间
			fallingCO.style.fontSize = `${2 + Math.random() * 2}em`;
			easterEggContainer.appendChild(fallingCO);
		}

		// 显示下落文字 "𣿅"
		for (let i = 0; i < textCount / 2; i++) {
			const fallingFu = document.createElement('div');
			fallingFu.classList.add('falling-text');
			fallingFu.textContent = '𣿅';
			fallingFu.style.left = `${Math.random() * 100}vw`;
			fallingFu.style.animationDelay = `${Math.random() * animationDuration}s`; // 随机延迟
			fallingFu.style.animationDuration = `${animationDuration}s`; // 设置动画持续时间
			fallingFu.style.fontSize = `${2 + Math.random() * 2}em`;
			easterEggContainer.appendChild(fallingFu);
		}

		// 显示中央消息


		// 18 秒后移除彩蛋效果
		setTimeout(() => {
			easterEggContainer.innerHTML = ''; // 清空礼花和文字
			easterEggMessage.textContent = '';
			easterEggMessage.style.opacity = 0;
			isEasterEggActive = false; // Reset easter egg state
		}, animationDuration * 1800);
	}

	function shouldTriggerEasterEgg() {
		const searchText = searchInput.value;
		return !isEasterEggActive && clickCount === 5 && (searchText === 'I love dorn!' || searchText === '刺梨汁');
	}

	function performSearch(query, engine) {
		let searchUrl = '';
		switch (engine) {
			case 'bing':
				searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
				break;
			case 'google':
				searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
				break;
			case 'baidu':
				searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
				break;
			case 'duckduckgo':
				searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
				break;
			case 'yandex':
				searchUrl = `https://yandex.com/search/?text=${encodeURIComponent(query)}`;
				break;
			case 'bilibili':
				searchUrl = `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`;
				break;
			case 'wikipedia':
				searchUrl = `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
				break;
			case 'qwant':
				searchUrl = `https://www.qwant.com/?q=${encodeURIComponent(query)}`;
				break;
			case 'swisscows':
				searchUrl = `https://swisscows.com/web?query=${encodeURIComponent(query)}`;
				break;
			case 'youtube':
				searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
				break;
			default:
				searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
		}
		window.location.href = searchUrl;
	}

	searchButton.addEventListener('click', function() {
		if (shouldTriggerEasterEgg()) {
			triggerEasterEgg();
		} else {
			const query = searchInput.value;
			const engine = document.getElementById('engine').value;
			performSearch(query, engine);
		}
	});

	searchInput.addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			if (shouldTriggerEasterEgg()) {
				triggerEasterEgg();
			} else {
				const query = event.target.value;
				const engine = document.getElementById('engine').value;
				performSearch(query, engine);
			}
		}
	});

	searchInput.addEventListener('input', function() {
		// Reset click count and easter egg active state if search input changes
		if (isEasterEggActive || clickCount > 0) {
			clickCount = 0;
			isEasterEggActive = false;
		}
	});




	// 创建一个隐藏的颜色输入框
	const colorInput = document.createElement('input');
	colorInput.type = 'color';
	colorInput.style.display = 'none';
	document.body.appendChild(colorInput);

	// 获取自定义触发按钮
	const customColorTrigger = document.getElementById('customColorTrigger');
	customColorTrigger.addEventListener('click', function() {
		colorInput.click(); // 触发颜色输入框的点击
	});

	// 监听颜色输入框的选择事件
	colorInput.addEventListener('change', function(event) {
		const selectedColor = event.target.value;
		setColorScheme(selectedColor);
		updateCustomColorItem(selectedColor);

		// 保存自定义颜色到 localStorage
		localStorage.setItem('customColor', selectedColor);

		// 更新下拉菜单的 value，使其选中自定义颜色
		document.getElementById('colorMenu').value = selectedColor;
	});

})();


document.addEventListener('DOMContentLoaded', function() {
	const getLocationButton = document.getElementById('get-location');
	const locationTip = document.getElementById('location-tip');
	const weatherLocationElement = document.getElementById('weather-location');
	const weatherIconElementDropdown = document.querySelector('#weather .material-symbols-outlined');
	const currentWeatherTextElement = document.querySelector('#weather .button-content span');
	const weatherIconElementCard = document.querySelector('#weather-card #weather-type-1 span');
	const weatherTypeTextElementCard = document.querySelector('#weather-card #weather-type-2');
	const temperatureElementCard = document.querySelector('#weather-card #temperature');
	const hourlyPanel = document.querySelector('#weather-card [value="tab-1"] > div > mdui-list:nth-child(1)'); // 时间
	const hourlyTemperaturePanel = document.querySelector('#weather-card [value="tab-1"] > div > mdui-list:nth-child(2)'); // 温度
	const hourlyPrecipitationPanel = document.querySelector('#weather-card [value="tab-1"] > div > mdui-list:nth-child(3)'); // 降水量
	const hourlyPrecipitationProbabilityPanel = document.querySelector('#weather-card [value="tab-1"] > div > mdui-list:nth-child(4)'); // 降水概率
	const hourlyWindPanel = document.querySelector('#weather-card [value="tab-1"] > div > mdui-list:nth-child(5)'); // 风向/风速
	const dailyPanel = document.querySelector('#weather-card [value="tab-2"] > div > mdui-list:nth-child(1)'); // 日期
	const dailyWeatherPanel = document.querySelector('#weather-card [value="tab-2"] > div > mdui-list:nth-child(2)'); // 天气
	const dailyTemperaturePanel = document.querySelector('#weather-card [value="tab-2"] > div > mdui-list:nth-child(3)'); // 温度
	const dailyPrecipitationProbabilityPanel = document.querySelector('#weather-card [value="tab-2"] > div > mdui-list:nth-child(4)'); // 降水概率
	const dailyWindPanel = document.querySelector('#weather-card [value="tab-2"] > div > mdui-list:nth-child(5)'); // 风向/风速
	let useGeolocation = false; // 标记是否使用浏览器定位
	let currentLatitude; // 保存当前纬度（带正负号）
	let currentLongitude; // 保存当前经度（带正负号）

	const weatherCodeMap = {
		0: 'sunny',
		1: 'partly_cloudy_day',
		2: 'partly_cloudy_day',
		3: 'cloud',
		45: 'foggy',
		48: 'foggy',
		51: 'rainy_light',
		53: 'rainy',
		55: 'rainy_heavy',
		56: 'rainy_light',
		57: 'rainy_heavy',
		61: 'rainy_light',
		63: 'rainy',
		65: 'rainy_heavy',
		66: 'rainy_light',
		67: 'rainy_heavy',
		71: 'snowing_light',
		73: 'snowing',
		75: 'snowing_heavy',
		77: 'rainy_snow',
		80: 'rainy_light',
		81: 'rainy',
		82: 'rainy_heavy',
		85: 'snowing_light',
		86: 'snowing_heavy',
		95: 'thunderstorm',
		96: 'thunderstorm',
		99: 'thunderstorm',
	};

	const windDirectionMap = {
		0: '北',
		45: '东北',
		90: '东',
		135: '东南',
		180: '南',
		225: '西南',
		270: '西',
		315: '西北',
		360: '北',
	};

	function getWindDirectionText(degrees) {
		degrees = Math.round(degrees / 45) * 45 % 360;
		return windDirectionMap[degrees] || '';
	}

	function updateTooltipContent(latitude, longitude, usingGeolocation = false) {
		let contentPrefix = usingGeolocation ? '点击后切换ip定位。当前经纬度:' : '点击后切换真实定位。当前经纬度:';
		let latitudeDirection = latitude >= 0 ? '北纬' : '南纬';
		let longitudeDirection = longitude >= 0 ? '东经' : '西经';
		const absLatitude = Math.abs(latitude).toFixed(3);
		const absLongitude = Math.abs(longitude).toFixed(3);
		locationTip.setAttribute('content', `${contentPrefix} ${latitudeDirection} ${absLatitude}°, ${longitudeDirection} ${absLongitude}°`);
		currentLatitude = latitude; // 保存带正负号的纬度
		currentLongitude = longitude; // 保存带正负号的经度
		updateCityName(currentLatitude, currentLongitude); // 调用函数更新城市名称
		fetchWeatherData(currentLatitude, currentLongitude); // 获取天气数据
	}

	function updateCityName(latitude, longitude) {
		const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&accept-language=zh-CN`;
		fetch(nominatimUrl)
			.then(response => response.json())
			.then(data => {
				if (data && data.address) {
					const country = data.address.country || '';
					const state = data.address.state || data.address.province || '';
					const city = data.address.city || data.address.town || data.address.village || '';
					const cityName = `${country}${country && (state || city) ? '，' : ''}${state}${state && city ? '，' : ''}${city}`;
					weatherLocationElement.textContent = cityName || formatLatLon(latitude, longitude);
				} else {
					weatherLocationElement.textContent = formatLatLon(latitude, longitude);
					console.log('未能从 Nominatim 获取到有效的城市信息。');
				}
			})
			.catch(error => {
				weatherLocationElement.textContent = formatLatLon(latitude, longitude);
				console.error('从 Nominatim 获取城市信息时发生错误:', error);
			});
	}

	function formatLatLon(latitude, longitude) {
		const latitudeDirection = latitude >= 0 ? '北纬' : '南纬';
		const longitudeDirection = longitude >= 0 ? '东经' : '西经';
		const absLatitude = Math.abs(latitude).toFixed(3);
		const absLongitude = Math.abs(longitude).toFixed(3);
		return `${latitudeDirection} ${absLatitude}°, ${longitudeDirection} ${absLongitude}°`;
	}

	function fetchWeatherData(latitude, longitude) {
		const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,precipitation_probability,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&forecast_days=5&wind_speed_unit=kn`;

		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				console.log('Open-Meteo API Response:', data);
				// **新增调试代码：通过对话框显示原始天气数据**
				// alert("原始天气数据 (请查看控制台获取完整信息):\n\n" + JSON.stringify(data, null, 2));

				if (data.hourly && data.hourly.time && data.hourly.temperature_2m &&
					data.daily && data.daily.time && data.daily.weathercode) {
					updateCurrentWeather(data); // 将整个 data 对象传递给 updateCurrentWeather
					updateHourlyWeather(data.hourly);
					updateDailyWeather(data.daily);
				} else {
					console.error('API 响应数据结构不完整。');
				}
			})
			.catch(error => {
				console.error('从 Open-Meteo 获取天气信息时发生错误:', error);
				alert("获取天气数据失败: " + error.message);
				// 可以在此处显示默认天气信息或错误提示
			});
	}

	function updateCurrentWeather(weatherData) {
		console.log('weatherData in updateCurrentWeather:', weatherData);

		if (!weatherData || !weatherData.hourly || !weatherData.hourly.time || !weatherData.hourly.temperature_2m ||
			!weatherData.daily || !weatherData.daily.time || !weatherData.daily.weathercode) {
			console.error('weatherData 或其关键属性为 undefined');
			return;
		}

		const now = new Date();
		let closestHourIndex = -1;
		let minHourDifference = Infinity;

		weatherData.hourly.time.forEach((time, index) => {
			const hourlyTime = new Date(time);
			const difference = Math.abs(hourlyTime.getTime() - now.getTime());
			if (difference < minHourDifference) {
				minHourDifference = difference;
				closestHourIndex = index;
			}
		});

		const currentTemperature = closestHourIndex !== -1 ? weatherData.hourly.temperature_2m[closestHourIndex] : 'N/A';

		const today = now.toISOString().slice(0, 10);
		const todayIndex = weatherData.daily.time.indexOf(today);

		if (todayIndex !== -1) {
			const currentWeatherCode = weatherData.daily.weathercode[todayIndex];
			const weatherText = weatherCodeMap[currentWeatherCode] || 'unknown';
			const weatherIcon = weatherText;
			const weatherTextChinese = getWeatherTextInChinese(weatherText);

			const weatherIconElementButton = document.getElementById('weather-icon-1');
			const temperatureElementButton = document.getElementById('weather-icon-2');
			const weatherIconElementH1 = document.getElementById('weather-type-1');
			const weatherTypeTextElementH1 = document.getElementById('weather-type-2');
			const temperatureElementH1 = document.getElementById('temperature');

			if (weatherIconElementButton) weatherIconElementButton.textContent = weatherIcon;
			if (temperatureElementButton) temperatureElementButton.textContent = `${currentTemperature}°C`;
			if (weatherIconElementH1) weatherIconElementH1.textContent = weatherIcon;
			if (weatherTypeTextElementH1) weatherTypeTextElementH1.textContent = weatherTextChinese;
			if (temperatureElementH1) temperatureElementH1.textContent = `${currentTemperature}°C`;
		} else {
			console.error('未能找到今天的天气数据。');
		}
	}

	function updateHourlyWeather(hourlyData) {
		// 清空之前的 hourly 数据
		hourlyPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">schedule</span>时间</mdui-list-subheader>';
		hourlyTemperaturePanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">thermometer</span>温度</mdui-list-subheader>';
		hourlyPrecipitationPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">humidity_mid</span>降水量</mdui-list-subheader>';
		hourlyPrecipitationProbabilityPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">humidity_percentage</span>降水概率</mdui-list-subheader>';
		hourlyWindPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">wind_power</span>风向/风速</mdui-list-subheader>';

		const now = new Date();
		const currentHour = now.getHours();

		for (let i = 1; i <= 5; i++) {
			const futureHour = new Date(now);
			futureHour.setHours(currentHour + i);
			const futureTimeString = hourlyData.time.find(time => {
				const hourlyTime = new Date(time);
				return hourlyTime.getFullYear() === futureHour.getFullYear() &&
					hourlyTime.getMonth() === futureHour.getMonth() &&
					hourlyTime.getDate() === futureHour.getDate() &&
					hourlyTime.getHours() === futureHour.getHours();
			});

			if (futureTimeString) {
				const index = hourlyData.time.indexOf(futureTimeString);
				const time = new Date(hourlyData.time[index]);
				const hours = time.getHours().toString().padStart(2, '0');
				const minutes = time.getMinutes().toString().padStart(2, '0');
				const temperature = hourlyData.temperature_2m[index];
				const precipitation = hourlyData.precipitation[index];
				const precipitationProbability = hourlyData.precipitation_probability[index];
				const windSpeed = hourlyData.windspeed_10m[index];
				const windDirectionDegrees = hourlyData.winddirection_10m[index];
				const windDirectionText = getWindDirectionText(windDirectionDegrees);

				hourlyPanel.innerHTML += `<mdui-list-item active nonclickable>${hours}:${minutes}</mdui-list-item>`;
				hourlyTemperaturePanel.innerHTML += `<mdui-list-item nonclickable>${temperature}℃</mdui-list-item>`;
				hourlyPrecipitationPanel.innerHTML += `<mdui-list-item active nonclickable>${precipitation}mm</mdui-list-item>`;
				hourlyPrecipitationProbabilityPanel.innerHTML += `<mdui-list-item nonclickable>${precipitationProbability}%</mdui-list-item>`;
				hourlyWindPanel.innerHTML += `<mdui-list-item active nonclickable>${windDirectionText}/${windSpeed}节</mdui-list-item>`;
			}
		}
	}

	function updateDailyWeather(dailyData) {
		// 清空之前的 daily 数据
		dailyPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">calendar_month</span>日期</mdui-list-subheader>';
		dailyWeatherPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">sunny</span>天气</mdui-list-subheader>';
		dailyTemperaturePanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">thermometer</span>温度</mdui-list-subheader>';
		dailyPrecipitationProbabilityPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">humidity_percentage</span>降水概率</mdui-list-subheader>';
		dailyWindPanel.innerHTML = '<mdui-list-subheader><span class="material-symbols-outlined">wind_power</span>风向/风速</mdui-list-subheader>';

		for (let i = 0; i < dailyData.time.length; i++) {
			const time = new Date(dailyData.time[i]);
			const year = time.getFullYear();
			const month = (time.getMonth() + 1).toString().padStart(2, '0');
			const day = time.getDate().toString().padStart(2, '0');
			const date = `${year}-${month}-${day}`;
			const weatherCode = dailyData.weathercode[i];
			const temperatureMax = dailyData.temperature_2m_max[i];
			const temperatureMin = dailyData.temperature_2m_min[i];
			const precipitationProbabilityMax = dailyData.precipitation_probability_max[i];
			const windSpeedMax = dailyData.windspeed_10m_max[i];
			const windDirectionDegrees = dailyData.winddirection_10m_dominant[i];
			const windDirectionText = getWindDirectionText(windDirectionDegrees);
			const weatherText = weatherCodeMap[weatherCode] || 'unknown';

			dailyPanel.innerHTML += `<mdui-list-item active nonclickable>${date}</mdui-list-item>`;
			dailyWeatherPanel.innerHTML += `<mdui-list-item nonclickable>${getWeatherTextInChinese(weatherText)}</mdui-list-item>`;
			dailyTemperaturePanel.innerHTML += `<mdui-list-item active nonclickable>${temperatureMin}°C / ${temperatureMax}°C</mdui-list-item>`;
			dailyPrecipitationProbabilityPanel.innerHTML += `<mdui-list-item nonclickable>${precipitationProbabilityMax}%</mdui-list-item>`;
			dailyWindPanel.innerHTML += `<mdui-list-item active nonclickable>${windDirectionText}/${windSpeedMax}节</mdui-list-item>`;
		}
	}

	function getWeatherTextInChinese(weatherText) {
		switch (weatherText) {
			case 'sunny':
				return '晴';
			case 'cloud':
				return '多云';
			case 'thunderstorm':
				return '雷暴';
			case 'partly_cloudy_day':
				return '多云';
			case 'severe_cold':
				return '严寒';
			case 'snowing':
				return '下雪';
			case 'foggy':
				return '有雾';
			case 'heat':
				return '炎热';
			case 'weather_hail':
				return '冰雹';
			case 'mist':
				return '薄雾';
			case 'snowing_heavy':
				return '大雪';
			case 'rainy_snow':
				return '雨夹雪';
			case 'rainy_light':
				return '小雨';
			case 'rainy_heavy':
				return '大雨';
			case 'rainy':
				return '雨';
			case 'snowing_light':
				return '小雪';
			default:
				return '未知';
		}
	}

	function getIPLocation() {
		fetch('https://freeipapi.com/api/json')
			.then(response => response.json())
			.then(data => {
				if (data.latitude && data.longitude) {
					updateTooltipContent(data.latitude, data.longitude);
					getLocationButton.textContent = '正在使用ip定位';
				} else {
					locationTip.setAttribute('content', '点击后切换真实定位。当前经纬度: 无法获取');
					getLocationButton.textContent = '正在使用ip定位';
					weatherLocationElement.textContent = '位置信息未知';
					console.log('未能从 Free IP API 获取到有效的经纬度信息。');
				}
			})
			.catch(error => {
				locationTip.setAttribute('content', '点击后切换真实定位。当前经纬度: 获取失败');
				getLocationButton.textContent = '正在使用ip定位';
				weatherLocationElement.textContent = '位置信息未知';
				console.error('与 Free IP API 通信时发生错误:', error);
			});
	}

	function getGeolocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				useGeolocation = true;
				localStorage.setItem('useGeolocation', 'true');
				updateTooltipContent(position.coords.latitude, position.coords.longitude, true);
				getLocationButton.textContent = '正在使用真实定位';
			}, function(error) {
				console.error("获取真实位置失败:", error.message);
				locationTip.setAttribute('content', '点击后切换真实定位。当前经纬度: 无法获取真实位置');
				getLocationButton.textContent = '正在使用ip定位';
				getIPLocation(); // 回退到 IP 定位
			});
		} else {
			console.log("此浏览器不支持地理定位。");
			locationTip.setAttribute('content', '点击后切换真实定位。当前经纬度:浏览器不支持定位');
			getLocationButton.textContent = '正在使用ip定位';
			getIPLocation(); // 回退到 IP 定位
		}
	}

	// 页面加载时检查是否之前允许过地理定位
	if (localStorage.getItem('useGeolocation') === 'true') {
		useGeolocation = true;
		getGeolocation(); // 尝试获取真实定位
		getLocationButton.textContent = '正在使用真实定位';
	} else {
		// 默认使用 IP 定位
		getIPLocation();
		getLocationButton.innerHTML = '正在使用ip定位';
	}

	// 按钮点击事件：切换定位方式
	getLocationButton.addEventListener('click', function() {
		if (useGeolocation) {
			useGeolocation = false;
			localStorage.removeItem('useGeolocation');
			getIPLocation();
			getLocationButton.innerHTML = '正在使用ip定位';
		} else {
			getGeolocation();
		}
	});
});
