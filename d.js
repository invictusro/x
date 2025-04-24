function detectDevice() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
    }
    return 'Desktop';
}

function detectBrowser() {
    var userAgent = navigator.userAgent;
    var browserName;
  
    if (userAgent.match(/chrome|chromium|crios/i) && !userAgent.match(/edg/i)) {
        browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
    } else if (userAgent.match(/safari/i) && !userAgent.match(/chrome|crios|fxios|opr|edg/i)) {
        browserName = "Safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
    } else if (userAgent.match(/msie|trident/i)) {
        browserName = "Internet Explorer";
    } else if (isFbBrowser()) {
        browserName = "Facebook";
    } else if (isTelegramBrowser()) {
        browserName = "Telegram";
    } else {
        browserName = "Unknown";
    }
    
    return browserName;
}

function isFbBrowser() {
    var userAgent = navigator.userAgent;
    return /FBAN|FBAV/i.test(userAgent);
}

function isTelegramBrowser() {
    var userAgent = navigator.userAgent;
    return /AppleWebKit\/605\.1\.15/.test(userAgent) && 
           /Mobile\/22E240/.test(userAgent) && 
           /Safari\/604\.1/.test(userAgent) &&
           !/CriOS|FxiOS/.test(userAgent);
}

function isWebView() {
    var userAgent = navigator.userAgent;
    return (
        // Check for WebView-specific window properties
        (window.hasOwnProperty('webkit') && window.webkit.hasOwnProperty('messageHandlers')) ||
        // Check for WebView-specific navigator properties
        (navigator.hasOwnProperty('standalone') && !navigator.standalone && !/CriOS/.test(userAgent)) ||
        // Check for WebView-specific capabilities
        (typeof window.webkit !== 'undefined' && !/CriOS/.test(userAgent)) ||
        // Check for WebView-specific message handlers
        (window.webkit && window.webkit.messageHandlers && !/CriOS/.test(userAgent)) ||
        // Check for in-app browsers
        isFbBrowser() ||
        isTelegramBrowser() ||
        // Check for other in-app browsers
        /Instagram|Twitter|LinkedIn|Pinterest|Snapchat|WhatsApp|Messenger|Line|WeChat|Viber|KakaoTalk|Discord|Slack|TikTok|Reddit|Tumblr|Medium|Quora|Pocket|Flipboard|Feedly|Inoreader|NewsBlur|TheOldReader|Bloglovin|Netvibes|MyYahoo|StartPage|DuckDuckGo|Ecosia|Qwant|Brave|Vivaldi|SamsungBrowser|MiuiBrowser|UCBrowser|Opera Mini|Opera Touch|Samsung Internet|QQBrowser|BaiduBrowser|Maxthon|Puffin|Dolphin|Ghostery|Ghostery Privacy Browser|Ghostery Dawn|Ghostery Privacy Browser Beta|Ghostery Privacy Browser Nightly|Ghostery Privacy Browser Dev|Ghostery Privacy Browser Canary|Ghostery Privacy Browser Unstable|Ghostery Privacy Browser Experimental|Ghostery Privacy Browser Testing|Ghostery Privacy Browser Alpha|Ghostery Privacy Browser Beta|Ghostery Privacy Browser Nightly|Ghostery Privacy Browser Dev|Ghostery Privacy Browser Canary|Ghostery Privacy Browser Unstable|Ghostery Privacy Browser Experimental|Ghostery Privacy Browser Testing|Ghostery Privacy Browser Alpha/i.test(userAgent)
    );
}

function redirect() {
    var browser = detectBrowser();
    var device = detectDevice();

    const formattedRedirectUrl = window.location.href
     
    var timeoutId, timeoutId2;
    
     if (device === "Desktop"){
      return;
     }
   
    if (device != 'Desktop')  {
        function tryOpenApp() {
            if (device === 'iOS') {
              
                timeoutId = setTimeout(function() { 
                  window.location = "x-safari-"+formattedRedirectUrl; 
              }, 1);
                
                // Then try Chrome (600ms)
                timeoutId2 = setTimeout(function() { 
                  const chromeUrl = formattedRedirectUrl.replace(/^https?:\/\//, '');
                  window.location = "googlechrome://"+chromeUrl+ '?a=0'; 
              }, 100);
            } 
            else if (device === 'Android') {
                // For Android, try Chrome (400ms)
                timeoutId = setTimeout(function() { 
                    window.location = "intent://" + formattedRedirectUrl.replace("https://", "").replace("http://", "")  + '?a=0' + "#Intent;scheme=https;end"; 
                }, 1);
            }
        }

        function handleVisibilityChange() {
            if (document.hidden) {
                clearTimeout(timeoutId);
                if (timeoutId2) clearTimeout(timeoutId2);
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        tryOpenApp();
    }
}

// Initialize
redirect();
