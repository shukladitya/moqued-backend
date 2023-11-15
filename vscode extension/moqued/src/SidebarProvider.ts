import * as vscode from 'vscode';
import { getNonce } from './getNonce';
import { infoBtnHtml } from './components/infoBtn';
import { dummyExample } from './utils/dummyExample';

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
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'scripts', 'script.js'),
    );
    const axiosScriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'scripts', 'axios.min.js'),
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    const dummySelection = Math.floor(Math.random() * dummyExample.length);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <!--
            Use a content security policy to only allow loading images from https or from our extension directory,
            and only allow scripts that have a specific nonce.
-->
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src 'self' http://localhost:3000; img-src https: data:; style-src 'unsafe-inline' ${
          webview.cspSource
        }; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${infoBtnStyleCss}" rel="stylesheet">
<link href="" rel="stylesheet">
<script nonce="${nonce}">
    const apiBaseUrl = "";
    const tsvscode = acquireVsCodeApi();
    let accessToken = "";
    let refreshToken = "";
  
</script>
    </head>
<body>
    </body>  
        <script nonce="${nonce}" src="${axiosScriptUri}"></script>
        <div class='optionPanel'>
            <div class='json-panel-btn'>JSON</div>
            <div class='xml-panel-btn'>XML</div>
            <div class='graphql-panel-btn'>GraphQL</div>
            <div class='html-panel-btn'>HTML Form</div>
        </div>

        <form class="jsonForm">
            
            <div class="requestType form-section">
              <label>Request type ${infoBtnHtml(
                'Select HTTP request type for API.',
              )}</label>
              <label for="get">
                <input type="radio" name="requestType" value="get" id="get">
                GET
              </label>
        
              <label for="post">
                <input type="radio" name="requestType" value="post" id="post">
                POST
              </label>
            </div>

            <div class="form-section input-field">
              <label for="apiName">Name</label>
              <input type="text" id="apiName" placeholder="${
                dummyExample[dummySelection].name
              }">
            </div>  

            <div class="form-section input-field">
              <label for="apiRoute">Route</label>
              <input type="text" id="apiRoute" placeholder="${
                dummyExample[dummySelection].route
              }">
            </div>  

            <div class="form-section input-field">
              <label for="description">Description</label>
              <textarea id="description" rows="4" cols="50" placeholder="${
                dummyExample[dummySelection].description
              }"></textarea>
            </div>  

            <div class="form-section checkbox-section"> 
              <input type="checkbox" id="schema">
              <label for="schema">Schema${infoBtnHtml(
                'Specify the response schema. Provide either example JSON for response generation or build a JSON tree.',
              )}</label>
            </div>  
            
            <div class="schema-definition-section">
            <div class="schema-definition-options">
                <div class='json-example'>JSON Example</div>
                <div class='json-tree'>JSON Tree</div>
            </div>
              <textarea id="jsonTextarea" rows="10" cols="50" placeholder=${
                dummyExample[dummySelection].schema
              }></textarea>
            </div>  

            <div class="form-section checkbox-section">
              <input type="checkbox" id="pagination">
              <label for="pagination">Refresh ${infoBtnHtml(
                'Enable content refreshing with each request. Kindly note that this may result in longer loading times for each request, and credits will be deducted per hit.',
              )}</label>
            </div>  

            <div class="form-section checkbox-section">
              <input type="checkbox" id="offsetLimit">
              <label for="offsetLimit">Limit & Offset ${infoBtnHtml(
                'Enable API pagination with updated offset and limit parameters in response for each request.',
              )}</label>
            </div>  

            <button type="submit" class="cookBtn">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" id="cookIcon">
            <g>
                <g>
                <path d="m495.4,206.3c-7.7-8.2-20.7-8.6-28.9-0.8l-131.4,124h-303.7c-11.3,0-20.4,9.1-20.4,20.4 0,83.3 67.8,151.1 151.2,151.1h50.6c80.4,0 146.3-63.1 150.9-142.4l130.9-123.5c8.2-7.7 8.6-20.6 0.8-28.8zm-282.6,253.9h-50.6c-53.9,0-98.9-38.8-108.5-89.9h267.5c-9.6,51.1-54.5,89.9-108.4,89.9z"/>
                <path d="M97.6,254.9c11.3,0,20.4-9.1,20.4-20.4V114c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4v120.5    C77.2,245.8,86.3,254.9,97.6,254.9z"/>
                <path d="m271.1,254.9c11.3,0 20.4-9.1 20.4-20.4v-120.5c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v120.5c-2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/>
                <path d="m184.3,173.9c11.3,0 20.4-9.1 20.4-20.4v-122c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v122c0,11.2 9.2,20.4 20.4,20.4z"/>
                </g>
            </g>
            </svg>
            Start cooking</button>
        </form>
        <script nonce="${nonce}" src="${scriptUri}"></script>  
        <script nonce="${nonce}" src="${uiScriptUri}"></script>  
    </html>`;
  }
}
