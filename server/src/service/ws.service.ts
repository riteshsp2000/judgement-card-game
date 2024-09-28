import { RawData, WebSocket } from "ws";
import { redisStore, RedisStore } from "./redisStore.service";
import { ACTION } from "~/type/action.type";
import { CustomError } from "~/dto/customError";
import { ERRORS } from "~/constant/error";
import { Game } from "~/dto/game";
import { redisPubSub, RedisPubSub } from "./redisPubSub.service";
import { Player } from "~/dto/player";
import { generatePlayerName } from "~/util/generateId";

// Temporary naming service;
const gameNames = new Map<string, Array<{ name: string; img: string }>>();

export class WsService {
  private ws: WebSocket;

  private channelId: string | undefined;

  constructor(ws: WebSocket) {
    this.ws = ws;

    this.handleOnMessage = this.handleOnMessage.bind(this);
    this.handleOnSubscribe = this.handleOnSubscribe.bind(this);
  }

  fetchGameFromRedis = async (gameId?: string) => {
    if (!gameId) throw new CustomError(ERRORS.GAME_NOT_FOUND);

    const rawGame = await redisStore.getValue(gameId);
    if (!rawGame) throw new CustomError(ERRORS.GAME_NOT_FOUND);

    return new Game(JSON.parse(rawGame));
  };

  handleOnSubscribe(channel: string, message: string) {
    if (this.channelId && this.channelId === channel) {
      this.ws.send(message);
    }
  }

  async handleOnMessage(message: RawData) {
    let action, payload, request;

    try {
      const data = JSON.parse(message.toString());
      request = data;
      action = data.action.type;
      payload = data.action.payload;
    } catch (error) {
      console.error(error);
    }

    try {
      switch (action) {
        case ACTION.CREATE_GAME:
          /**
           * TODO: validate if a game can be created by the user
           */
          const game = new Game();
          const player = new Player(generatePlayerName(game.id, gameNames));
          game.addPlayer(player);
          this.channelId = game.id;
          await redisStore.setValue(game.id, game);
          await redisPubSub.subscribe(
            game.id,
            (channel: string, message: string) => {
              if (game.id === channel) {
                this.ws.send(message);
              }
            }
          );
          await redisPubSub.publish(this.channelId, { game, player, action });
          break;

        case ACTION.JOIN_GAME: {
          /**
           * TODO: validate if the user can join the game
           */
          const game = await this.fetchGameFromRedis(payload.gameId);
          const player = new Player(generatePlayerName(game.id, gameNames));
          game.addPlayer(player);
          this.channelId = game.id;
          await redisStore.setValue(game.id, game);
          await redisPubSub.subscribe(
            game.id,
            (channel: string, message: string) => {
              if (game.id === channel) {
                this.ws.send(message);
              }
            }
          );
          await redisPubSub.publish(this.channelId, { game, player, action });
          break;
        }

        case ACTION.LEAVE_GAME: {
          // check if player ID is there;
          const game = await this.fetchGameFromRedis(request.game.id);
          game.removePlayer(payload.playerId);
          redisStore.setValue(game.id, game);
          redisPubSub.unsubscribe(game.id);
          redisPubSub.publish(game.id, { game, action });
          break;
        }

        case ACTION.START_GAME: {
          const game = await this.fetchGameFromRedis(request.game.id);
          game.startGame();
          await redisStore.setValue(game.id, game);
          await redisPubSub.publish(game.id, { game, action });
          break;
        }

        case ACTION.START_ROUND: {
          const game = await this.fetchGameFromRedis(request.game.id);
          game.startRound();
          await redisStore.setValue(game.id, game);
          await redisPubSub.publish(game.id, { game, action });
          break;
        }

        case ACTION.CALL_HANDS: {
          const game = await this.fetchGameFromRedis(request.game.id);
          console.log(request);
          game.callHand(request.player.id, payload.numberOfHands);
          await redisStore.setValue(game.id, game);
          await redisPubSub.publish(game.id, { game, action });
          break;
        }

        case ACTION.PLAY_CARD: {
          const game = await this.fetchGameFromRedis(request.game.id);
          game.playCard(request.player.id, payload.card);
          await redisStore.setValue(game.id, game);
          await redisPubSub.publish(game.id, { game, action });
          break;
        }

        default:
          throw new CustomError(ERRORS.INVALID_ACTION);
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleOnClose() {}

  handleOnError() {}

  handleOnOpen() {}

  handleOnPing() {}

  handleOnPong() {}
}
