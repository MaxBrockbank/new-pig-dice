import { Player } from '../src/js/scripts.js';

describe('the Player and all its prototypes', () => {

  test('should create player object with provided name', () => {
    const player = new Player("Greg");
    expect(player.name).toEqual("Greg");
  })


});