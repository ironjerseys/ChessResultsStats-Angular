export class Game {
  event: string = '';
  site: string = '';
  date: Date;
  round: string = '';
  white: string = '';
  black: string = '';
  result: string = '';
  whiteElo: number = 0;
  blackElo: number = 0;
  timeControl: string = '';
  endTime: string = '';
  termination: string = '';
  moves: string = '';
  playerUsername: string = '';
  resultForPlayer: string = '';
  endOfGameBy: string = '';
  dateAndTime: string = '';
  accuracy: number = 0;
  playerElo: number = 0;
  opening: string = '';
  eco: string = '';


  constructor() {
    this.date = new Date();
  }

}
