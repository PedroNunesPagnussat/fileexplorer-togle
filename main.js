'use strict';

var obsidian = require('obsidian');

class FileExplorerTogglePlugin extends obsidian.Plugin {
    onload() {
        // Add command for toggling file explorer
        this.addCommand({
            id: 'toggle-file-explorer',
            name: 'Toggle file explorer',
            callback: () => {
                this.toggleFileExplorer();
            }
        });

        console.log('File Explorer Toggle plugin loaded');
    }

    toggleFileExplorer() {
        // Get the file explorer leaf
        const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
        
        if (fileExplorer) {
            // Check if file explorer is visible
            const isVisible = fileExplorer.view.containerEl.offsetParent !== null;
            
            if (isVisible) {
                // Hide the file explorer by collapsing left sidebar
                this.app.workspace.leftSplit.collapse();
            } else {
                // Show the file explorer by expanding left sidebar
                this.app.workspace.leftSplit.expand();
            }
        }
    }

    onunload() {
        console.log('File Explorer Toggle plugin unloaded');
    }
}

module.exports = FileExplorerTogglePlugin;