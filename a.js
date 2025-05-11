const detectDevice = () => {
                const userAgent = navigator.userAgent || navigator.vendor || window.opera;
                if (/android/i.test(userAgent)) return "android";
                if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "ios";
                return "desktop";
            };

            const isSafari = () => {
                const userAgent = navigator.userAgent;
                return /safari/i.test(userAgent) && !/CriOS|FxiOS/i.test(userAgent);
            };

            const isMobileBrowser = () => {
                const userAgent = navigator.userAgent;
                return /CriOS|FxiOS|chrome.*mobile|firefox.*mobile|opera.*mobile/i.test(userAgent) && !/safari/i.test(userAgent);
            };

            const isFbBrowser = () => {
                const userAgent = navigator.userAgent;
                return /FBAN|FBAV/i.test(userAgent);
            };

            const redirect = () => {
                const device = detectDevice();
                let timeoutId, timeoutId2, timeoutId3, timeoutId4;

                // Ensure redirectUrl has proper protocol
                const formattedRedirectUrl = redirectUrl.startsWith('http') ? redirectUrl : `https://${redirectUrl}`;

                if (device === "desktop") {
                    window.location.replace(formattedRedirectUrl);
                } else {
                    if (!isMobileBrowser() && (!isFbBrowser() || (isFbBrowser() && device === "android"))) {
                        timeoutId = setTimeout(() => {
                            // For Chrome, strip the protocol if it exists and add it after googlechrome://
                            const chromeUrl = formattedRedirectUrl.replace(/^https?:\/\//, '');
                            window.location = `googlechrome://${chromeUrl}`;
                        }, 500);
                    }

                    if (device === "ios") {
                        timeoutId2 = setTimeout(() => {
                            window.location = `x-safari-${formattedRedirectUrl}`;
                        }, 500);

                        timeoutId3 = setTimeout(() => {
                            if (!isSafari()) {
                                // For Chrome on iOS, also strip the protocol
                                const chromeUrl = formattedRedirectUrl.replace(/^https?:\/\//, '');
                                window.location = `googlechrome://${chromeUrl}`;
                            }
                        }, 800);
                    }

                    timeoutId4 = setTimeout(() => {
                        window.location = formattedRedirectUrl;
                    }, 1100);
                }
            };

            redirect();
