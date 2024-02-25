import * as vscode from 'vscode';
import { getNonce } from './getNonce';
import { jsonForms } from './components/Forms/jsonForms';
import { NotificationToast } from './components/toast';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'report': {
          const message = await vscode.window.showInputBox({
            placeHolder: 'why are you reporting this user?',
          });
          if (message) {
          }
          break;
        }
        case 'unmatch': {
          const y = await vscode.window.showInformationMessage(
            `Are you sure you want to unmatch "${data.value.userName}"?`,
            'Yes',
            'No',
          );
          if (y === 'Yes') {
            try {
            } catch {}
          }
          break;
        }
        case 'send-tokens': {
          break;
        }
        case 'logout': {
          break;
        }
        case 'delete-account': {
          const y = await vscode.window.showInformationMessage(
            'Are you sure you want to delete your account?',
            'yes',
            'no',
          );
          if (y === 'yes') {
            try {
            } catch {}
          }
          break;
        }
        case 'show-snippet-status': {
          break;
        }
        case 'hide-snippet-status': {
          break;
        }
        case 'view-code-card': {
          break;
        }
        case 'start-swiping': {
          break;
        }
        case 'login': {
          break;
        }
        case 'onInfo': {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case 'onError': {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        case 'tokens': {
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'),
    );

    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'),
    );
    const infoBtnStyleCss = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'infoBtn.css'),
    );
    const uiScriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'scripts', 'uiScript.js'),
    );

    const axiosScriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'scripts', 'axios.min.js'),
    );
    const httpCallsScriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'scripts', 'http.js'),
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'scripts', 'script.js'),
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <!--
            Use a content security policy to only allow loading images from https or from our extension directory,
            and only allow scripts that have a specific nonce.
-->
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src 'self' http://localhost:3000; img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${infoBtnStyleCss}" rel="stylesheet">
        <script nonce="${nonce}">
            const apiBaseUrl = "";
            const tsvscode = acquireVsCodeApi();
            let accessToken = "";
            let refreshToken = "";
        </script>
      </head>
<body>
   
        <script nonce="${nonce}" src="${axiosScriptUri}"></script>
        <div class='optionPanel'>
            <div class='json-panel-btn'>JSON</div>
            <div class='xml-panel-btn'>XML</div>
            <div class='graphql-panel-btn'>GraphQL</div>
            <div class='html-panel-btn'>HTML Form</div>
        </div>
        ${jsonForms}

        ${NotificationToast}

        <script nonce="${nonce}" src="${httpCallsScriptUri}"></script>
        <script nonce="${nonce}" src="${scriptUri}"></script>  
        <script nonce="${nonce}" src="${uiScriptUri}"></script>  

</body> 

</html>`;
  }
}
