// Minimize Telegram window when unfocused

const telegramWindows = [];

function addTelegramWatcher(client) {
    if (client.resourceClass.toString() === 'telegramdesktop') {
        telegramWindows.push(client);
    }

    client.activeChanged.connect(() => {
        if (client.active && client.resourceClass.toString() !== 'telegramdesktop') {
            telegramWindows.forEach((w) => { w.minimized = true; });
        }
    });
}

function main() {
    workspace.clientList().forEach(addTelegramWatcher);
    workspace.clientAdded.connect(addTelegramWatcher);
    workspace.clientRemoved.connect((client) => {
        const i = telegramWindows.indexOf(client);
        if (i >= 0) {
            telegramWindows.splice(i, 1);
        }
    });
}

main();
