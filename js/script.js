



const dialog = document.querySelector(".example-fullscreen");
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector("mdui-button");

  openButton.addEventListener("click", () => dialog.open = true);
  closeButton.addEventListener("click", () => dialog.open = false);


document.getElementById('title-card').addEventListener('click', function() {
  var navname3 = document.getElementById('navname3');
  var navname4 = document.getElementById('navname4');

  // 添加动画类
  navname3.classList.add('bounce-animation');
  navname4.classList.add('bounce-animation');

  setTimeout(function() {
    navname3.classList.remove('bounce-animation');
    navname4.classList.remove('bounce-animation');
    // 重置位置
    navname3.style.transform = 'translateY(0)';
    navname4.style.transform = 'translateY(0)';
  }, 1000); 
});




(function() {
    // 立即执行代码，设置默认配色方案
    mdui.setColorScheme('#6750a4');
    
    // 页面加载时应用用户设置
    window.onload = function() {
        // 加载配色方案
        var savedColor = localStorage.getItem('colorScheme');
        if (savedColor) {
            setColorScheme(savedColor);
            document.getElementById('colorMenu').value = savedColor;
        } else {
            setColorScheme('#6750a4'); // 默认配色方案
            document.getElementById('colorMenu').value = '#6750a4'; // 确保选项也显示为默认颜色
        }

        // 加载明暗模式
        var savedMode = localStorage.getItem('themeMode');
        if (savedMode) {
            document.documentElement.className = savedMode;
            if (savedMode === 'mdui-theme-light') {
                document.getElementById("themeIcon").innerHTML = "light_mode";
            } else if (savedMode === 'mdui-theme-dark') {
                document.getElementById("themeIcon").innerHTML = "dark_mode";
            } else if (savedMode === 'mdui-theme-auto') {
                document.getElementById("themeIcon").innerHTML = "brightness_auto";
            }
        }

        // 加载搜索引擎
        var savedEngine = localStorage.getItem('searchEngine');
        if (savedEngine) {
            document.getElementById('engine').value = savedEngine;
        }
    };

    function applyCurrentColor() { 
        const color = document.getElementById('colorMenu').value; 
        setColorScheme(color); 
        localStorage.setItem('colorScheme', color); // 保存配色方案到 localStorage
    }

    function setColorScheme(color) {
        mdui.setColorScheme(color);
        document.getElementById('navname1').style.color = color;
        document.getElementById('navname2').style.backgroundColor = color; 
        document.getElementById('navname3').style.color = color; 
        document.getElementById('navname4').style.backgroundColor = color;
        document.getElementById('navname5').style.color = color;
        document.getElementById('navname6').style.backgroundColor = color;
        document.getElementById('title').style.color = color; 
        localStorage.setItem('colorScheme', color); // 保存配色方案到 localStorage
    }

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
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
	document.getElementById("back-to-top-logo").onclick = function() {
	    window.scrollTo({top: 0, behavior: 'smooth'});
	};

    document.getElementById('engine').addEventListener('change', function(event) {
        const engine = event.target.value;
        localStorage.setItem('searchEngine', engine); // 保存搜索引擎到 localStorage
    });

    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value;
        const engine = document.getElementById('engine').value;
        performSearch(query, engine);
    });

    document.getElementById('searchInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const query = event.target.value;
            const engine = document.getElementById('engine').value;
            performSearch(query, engine); 
        }
    });

    function performSearch(query, engine) {
        let searchUrl = '';
        switch(engine) {
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

    window.setLightMode = function() {
        mdui.setTheme('light');
        document.getElementById("themeIcon").innerHTML = "light_mode";
        localStorage.setItem('themeMode', 'mdui-theme-light'); // 保存明暗模式到 localStorage
        applyCurrentColor();
    }

    window.setDarkMode = function() {
        mdui.setTheme('dark');
        document.getElementById("themeIcon").innerHTML = "dark_mode";
        localStorage.setItem('themeMode', 'mdui-theme-dark'); // 保存明暗模式到 localStorage
        applyCurrentColor();
    }

    window.setAutoMode = function() {
        mdui.setTheme('auto');
        document.getElementById("themeIcon").innerHTML = "brightness_auto";
        localStorage.setItem('themeMode', 'mdui-theme-auto'); // 保存明暗模式到 localStorage
        applyCurrentColor();
    }
})();
