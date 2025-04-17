// Keep track of our current state
let isEnabled = false;

// Function to inject or update the stylesheet
function updateStyles(enabled) {
    isEnabled = enabled;
    
    let style = document.getElementById('shop-modal-hider-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'shop-modal-hider-style';
        document.head.appendChild(style);
    }

    // Find the shop portal element
    const shopPortal = document.querySelector('[data-nametag="shop-portal-provider"]');
    
    if (shopPortal && shopPortal.shadowRoot) {
        let shadowStyle = shopPortal.shadowRoot.getElementById('shop-modal-hider-shadow-style');
        if (!shadowStyle) {
            shadowStyle = document.createElement('style');
            shadowStyle.id = 'shop-modal-hider-shadow-style';
            shopPortal.shadowRoot.appendChild(shadowStyle);
        }

        shadowStyle.textContent = enabled ? `
            :host([data-nametag="shop-portal-provider"][data-type="modal"]),
            :host([data-nametag="shop-portal-provider"][data-variant="default"]) {
                position: absolute !important;
                visibility: hidden !important;
                opacity: 0 !important;
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                clip: rect(0 0 0 0) !important;
                -webkit-transform: scale(0) !important;
                transform: scale(0) !important;
                pointer-events: none !important;
                max-height: 0 !important;
                max-width: 0 !important;
                overflow: hidden !important;
            }
        ` : '';
    }

    // Also keep the main document styles as a fallback
    style.textContent = enabled ? `
        div[data-nametag="shop-portal-provider"][data-type="modal"],
        div[data-portal-instance-id][data-type="modal"] {
            display: none !important;
            visibility: hidden !important;
        }
    ` : '';
}

// Watch for the portal being added to the DOM
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && 
                    node.matches && 
                    node.matches('[data-nametag="shop-portal-provider"]')) {
                    setTimeout(() => updateStyles(isEnabled), 100);
                }
            });
        }
    }
});

// Start observing
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Initialize with stored state
chrome.storage.local.get('isEnabled', ({ isEnabled: enabled }) => {
    updateStyles(enabled || false);
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleModal') {
        updateStyles(request.isEnabled);
        sendResponse({ success: true });
    }
    return true;
});
