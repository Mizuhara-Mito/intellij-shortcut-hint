
import * as vscode from 'vscode';

const keymap = new Map<string, { vscodeShortcut: string, description: string }>([
  ['ctrl+alt+l', { vscodeShortcut: 'Shift + Alt + F', description: 'Format Code' }],
  ['cmd+alt+l', { vscodeShortcut: 'Shift + Option + F', description: 'Format Code' }],
  ['ctrl+d', { vscodeShortcut: 'Alt + Shift + Down', description: 'Duplicate Line' }],
  ['cmd+d', { vscodeShortcut: 'Option + Shift + Down', description: 'Duplicate Line' }],
  ['ctrl+shift+n', { vscodeShortcut: 'Ctrl + P', description: 'Navigate to File' }],
  ['cmd+shift+o', { vscodeShortcut: 'Cmd + P', description: 'Navigate to File' }],
  ['ctrl+e', { vscodeShortcut: 'Ctrl + Tab', description: 'Recent Files' }],
  ['cmd+e', { vscodeShortcut: 'Ctrl + Tab', description: 'Recent Files' }],
  ['ctrl+b', { vscodeShortcut: 'F12', description: 'Go to Definition' }],
  ['cmd+b', { vscodeShortcut: 'F12', description: 'Go to Definition' }],
  ['alt+f7', { vscodeShortcut: 'Shift + F12', description: 'Find Usages' }],
  ['shift+f6', { vscodeShortcut: 'F2', description: 'Rename' }],
  ['ctrl+y', { vscodeShortcut: 'Ctrl + Shift + K', description: 'Delete Line' }],
  ['cmd+y', { vscodeShortcut: 'Cmd + Shift + K', description: 'Delete Line' }],
  ['ctrl+alt+left', { vscodeShortcut: 'Alt + Left', description: 'Navigate Back' }],
  ['ctrl+alt+right', { vscodeShortcut: 'Alt + Right', description: 'Navigate Forward' }],
  ['cmd+alt+left', { vscodeShortcut: 'Ctrl + -', description: 'Navigate Back' }],
  ['cmd+alt+right', { vscodeShortcut: 'Ctrl + Shift + -', description: 'Navigate Forward' }],
  ['cmd+option+left', { vscodeShortcut: 'Ctrl + -', description: 'Navigate Back' }],
  ['cmd+option+right', { vscodeShortcut: 'Ctrl + Shift + -', description: 'Navigate Forward' }],
  ['option+cmd+left', { vscodeShortcut: 'Ctrl + -', description: 'Navigate Back' }],
  ['option+cmd+right', { vscodeShortcut: 'Ctrl + Shift + -', description: 'Navigate Forward' }],
  ['cmd+[', { vscodeShortcut: 'Ctrl + -', description: 'Navigate Back' }],
  ['cmd+]', { vscodeShortcut: 'Ctrl + Shift + -', description: 'Navigate Forward' }]
]);

export function activate(context: vscode.ExtensionContext) {
  vscode.window.setStatusBarMessage('IntelliJ Shortcut Hint is now active.', 5000);

  const disposable = vscode.commands.registerCommand('intellijShortcutHint.checkShortcut', (args) => {
    const pressedKey = args.key;
    const entry = keymap.get(pressedKey);
    if (entry) {
      vscode.window.setStatusBarMessage(`💡${entry.description} => '${entry.vscodeShortcut}'`, 10000);
    }
  });

  context.subscriptions.push(disposable);

  const listShortcutsDisposable = vscode.commands.registerCommand('intellijShortcutHint.listSupportedShortcuts', () => {
    const items = Array.from(keymap.entries()).map(([intellij, { vscodeShortcut, description }]) => ({
      label: `💡 ${description}`,
      detail: `IntelliJ: ${intellij}  =>  VS Code: ${vscodeShortcut}`
    }));

    vscode.window.showQuickPick(items, {
      matchOnDetail: true,
      placeHolder: 'Search for a shortcut'
    });
  });

  context.subscriptions.push(listShortcutsDisposable);
}

export function deactivate() {}
