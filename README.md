# LinqProject-Angular

## The project

LinqProject-Angular is the frontend for both 

- LinqProject-API https://github.com/jorisreynes/LinqProject-API 
- ChessResultAnalyzerJava https://github.com/jorisreynes/ChessResultAnalyzerJava

## How it works

You need to download the .pgn file from Chess.com, you can upload it (or with Postman if you prefer)

Once the file is sent on the backend, you can see your winrate and you can filter the games with the Opening, the color, and the End of game

For example you can see your winrate with the Scotch opening, or compare your winrate with white or black, or see your winrate because of checkmate or time (interesting if you play blitz)

## Other

I created the same project with the MERN stack to compare, you can find the repo here : https://github.com/jorisreynes/mern

This project is not finished because finally there is a Chess.com API with more data than what we have in the .pgn file, so the backend is not needed anymore, 

There is a new version, frontend only, of this project here : https://github.com/jorisreynes/ChessGameStats

## How to install it :

- For the finished C# version change the date as of October 1st 2023 and download the archive
- Extract the archive and change the name for LinqProject-Angular
- cd LinqProject-Angular

```
npm install
```

```
npm run start
```

![ChessResultAnalyzerJava](AngularScreenshot.jpg)
