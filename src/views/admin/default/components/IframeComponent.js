"use client";
import React, { useEffect, useRef } from "react";

const IframeContentLoader = () => {
    const type = "iframe"; // Static type set to 'iframe'
    const url = "http://13.202.194.137:3050/en/login?redirectTo=/en/dashboards"; // Static URL
    const className = "custom-class"; // Static className
    const title = "Iframe Example"; // Static title
    const allow = "fullscreen"; // Static allow
    const allowfullscreen = true; // Static allowfullscreen value
    const webviewRef = useRef(null);

    useEffect(() => {
        if (type === "iframe" && url && window.electron) {
            // Preload content using headless Chromium in Electron
            window.electron.openHeadlessLink(url)
                .then((result) => {
                    console.log("Preloaded Content:", result);
                })
                .catch((error) => {
                    console.error("Preloading failed:", error);
                });
        }
    }, [type, url]);

    return (
        <div className={`w-full h-full ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
            {type === "iframe" && url ? (
                window.electron ? (

                    // Use webview in Electron
                    <webview
                        ref={webviewRef}
                        src={url}
                        title={title}
                        style={{ width: "100%", height: "45vw", border: "none" }}
                        allowpopups
                        webpreferences="contextIsolation=no, nodeIntegration=yes"
                    />
                ) : (

                    // Use iframe in non-Electron environments
                    <iframe
                        src={url}
                        title={title}
                        className="w-full h-full border-none"
                        allow={allow}
                        allowFullScreen={allowfullscreen}
                        style={{  width: "100%", height: "45vw" }}
                    />
                )
            ) : (
                <p className="text-gray-600 text-center">Loading content...</p>
            )}
        </div>
    );
};

export default IframeContentLoader;
