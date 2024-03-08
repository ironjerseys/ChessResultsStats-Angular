export class Game {
  event: string = '';
  site: string = '';
  date: Date;
  round: string = '';
  white: string = '';
  black: string = '';
  result: string = '';
  whiteelo: number = 0;
  blackelo: number = 0;
  timecontrol: string = '';
  endtime: string = '';
  termination: string = '';
  moves: string = '';
  playerusername: string = '';
  resultForPlayer: string = '';
  endOfGameBy: string = '';
  dateandtime: string = '';
  accuracy: number = 0;
  playerelo: number = 0;
  opening: string = '';
  eco: string = '';


  constructor() {
    this.date = new Date();
  }

}
