import { WebSocketServer } from "ws";

class Game {
  private game;
  constructor(game?: unknown) {
    this.game = game;
  }
  createGame() {}
  joinGame() {}
  leaveGame() {}
}

class RedisStore {
  private client;
  constructor() {
    this.client = "client";
  }
  setState(game: unknown) {}
  getState(gameId: unknown) {}
  removeState(game: unknown) {}
}

class RedisPubSub {
  private pub;
  private sub;
  constructor() {
    this.pub = "pub";
    this.sub = "sub";
  }
  subscribe() {}
  unsubscribe() {}
  publish() {}
}

export const wssController = (wss: WebSocketServer) => {
  wss.on("connection", (ws, req) => {
    console.log("WSS SERVER CONNECTED");

    const redisStore = new RedisStore();
    const redisPubSub = new RedisPubSub(); // takes in ws for onMessage callback to send message to websocket;

    ws.on("message", (message) => {
      let action, payload;

      try {
        const data = JSON.parse(message.toString());
        action = data.action;
        payload = data.payload;
      } catch (error) {
        console.log(error);
      }

      switch (action) {
        case "CREATE_GAME":
          const game = new Game();
          redisStore.setState(game); // takes gameId and game;
          redisPubSub.subscribe(); // gameId, needs ws as well for onMessage handling;
          break;

        case "JOIN_GAME": {
          const game = new Game(redisStore.getState(payload.gameId));
          redisStore.setState(game.joinGame());
          redisPubSub.subscribe();
          break;
        }

        case "LEAVE_GAME": {
          const game = new Game(redisStore.getState(payload.gameId));
          redisStore.setState(game.leaveGame());
          redisPubSub.unsubscribe();
          break;
        }
      }
    });

    ws.on("close", () => {
      if (wss.clients.has(ws)) {
        // while joining/creating the game, set the game id in ws itself just so that it can be accessed here;
        // if not that, create a map in redis store that maps ws.id to game.id;
        const game = new Game(redisStore.getState({}));
        redisStore.setState(game.leaveGame());
        redisPubSub.publish();
        redisPubSub.unsubscribe();
      }
    });
  });
};
