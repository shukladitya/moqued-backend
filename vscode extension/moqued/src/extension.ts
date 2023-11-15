import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "moqued" is now active!');

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'moqued-sidebar',
      sidebarProvider,
    ),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
