// Initialize the toggle state when popup opens
document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.getElementById('toggle');
    
    try {
        // Load saved state
        const { isEnabled = false } = await chrome.storage.local.get('isEnabled');
        toggle.checked = isEnabled;
        
        // Handle toggle changes
        toggle.addEventListener('change', async () => {
            const isEnabled = toggle.checked;
            
            try {
                // Save state
                await chrome.storage.local.set({ isEnabled });
                
                // Get all tabs that match our host permissions
                const tabs = await chrome.tabs.query({});
                
                // Update all tabs
                for (const tab of tabs) {
                    try {
                        await chrome.tabs.sendMessage(tab.id, {
                            action: 'toggleModal',
                            isEnabled
                        });
                    } catch (err) {
                        // Ignore errors for tabs where content script isn't loaded
                        console.log(`Skipping tab ${tab.id}: ${err.message}`);
                    }
                }
            } catch (err) {
                console.error('Error updating state:', err);
                // Revert toggle if update failed
                toggle.checked = !isEnabled;
            }
        });
    } catch (err) {
        console.error('Error initializing popup:', err);
    }
});
  