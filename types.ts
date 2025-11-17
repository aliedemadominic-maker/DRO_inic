
export enum GameState {
  START_SCREEN,
  PLAYING,
  LEVEL_WON_ANIMATION,
  LEVEL_LOST_ANIMATION,
  LEVEL_WON,
  LEVEL_LOST,
}

export interface PuzzleData {
  riddle: string;
  answer: string;
}
