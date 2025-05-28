fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    .then(response => response.json())
    .then(data => {
        const game = data.applist.apps.slice(0, 20);
        game.forEach(game => {
            fetch(`https://store.steampowered.com/api/appdetails?appids=${game.appid}`)
                .then(response => response.json())
                .then(detailGame => {
                    const gameDetail = detailGame[game.appid];
                    if (gameDetail.success) {
                        const gameInfo = gameDetail.data;
                        console.log(info.name, info.short_description);
            }
        });
    });
});
