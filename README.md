# jsframework-project-socketserver

### Clone repo

```
git clone https://github.com/ollebergkvist/jsframework-vue-backend
```

### Install npm packages

```
npm install
```

### Start server

```
npm start
```

### Github repo

[Jsframework-vue-backend](https://github.com/ollebergkvist/jsframework-project-socketserver)

## Krav 3: Realtid

Rörande detta krav valde jag att använda mig utav det Javascript baserade biblioteket Socket.io för att hantera realtidsdata. Med hjälp utav detta bibliotek kan en lyssna och emitta events över en socket mellan en klient och en server i realtid och där typen utav uppkoppling gör det möjligt att skicka data åt båda håll. Det är möjligt att attacha socket.io till en enkel Node.JS HTTP server, men jag valde att kombinera Socket.io och Express, detta görs enkelt genom request handler funktioner i Express. Jag är vann vid att arbeta med Express vid det här laget, så det kändes som rätt väg att gå. Till en början byggde jag in min socket server direkt i mitt traditionella api, men jag valde i slutändan att bryta ut det till sitt egna repo. Jag tycker det skapar en bättre fördelning på så sätt. På socket server sidan så genereras priser för två aktier samt labels med datum stämplar, detta sker var femte sekund. På klient sidan tar jag emot datan genom att lyssna på socketen och därefter presenteras datan på olika sätt. Dels under routen "Stocks" kan en följa värdeutvecklingen utav två aktier under tid, men i den personliga portföljen för varje användare "Portfolio", kan användaren se antal, inköpsvärde och jämföra sin inköp mot realtidsdatan.
