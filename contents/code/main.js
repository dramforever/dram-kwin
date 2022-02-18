// Minimize Telegram window when unfocused
function addTelegramWatcher(client) {
    if (client.resourceClass.toString() !== 'telegramdesktop') {
        return;
    }

    client.activeChanged.connect(() => {
        if (! client.active) {
            client.minimized = true;
        }
    });
}

function main() {
    workspace.clientList().forEach(addTelegramWatcher);
    workspace.clientAdded.connect(addTelegramWatcher);
}

main();
