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

        // Add command for collapsing all folders
        this.addCommand({
            id: 'collapse-all-folders',
            name: 'Collapse all folders',
            callback: () => {
                this.collapseAllFolders();
            }
        });

        // Add command for expanding all folders
        this.addCommand({
            id: 'expand-all-folders',
            name: 'Expand all folders',
            callback: () => {
                this.expandAllFolders();
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

    collapseAllFolders() {
        const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
        
        if (fileExplorer && fileExplorer.view) {
            const fileExplorerView = fileExplorer.view;
            
            // Collapse all folders by setting them to collapsed state
            if (fileExplorerView.fileItems) {
                Object.values(fileExplorerView.fileItems).forEach((item) => {
                    if (item.file instanceof obsidian.TFolder) {
                        item.setCollapsed(true);
                    }
                });
            }
        }
    }

    expandAllFolders() {
        const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
        
        if (fileExplorer && fileExplorer.view) {
            const fileExplorerView = fileExplorer.view;
            
            // Expand all folders by setting them to expanded state
            if (fileExplorerView.fileItems) {
                Object.values(fileExplorerView.fileItems).forEach((item) => {
                    if (item.file instanceof obsidian.TFolder) {
                        item.setCollapsed(false);
                    }
                });
            }
        }
    }

    onunload() {
        console.log('File Explorer Toggle plugin unloaded');
    }
}

module.exports = FileExplorerTogglePlugin;