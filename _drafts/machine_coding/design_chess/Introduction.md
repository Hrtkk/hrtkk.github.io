## Design Chess

### Requirements
- Design with standard chess system
- There will be two player, White and Black.
- Chess size will be 8 x 8 and 16 pieces for each player.
- There will be 8 Pawn, 2 Rook, 2 Khight, 2 Bishop, 1 Queen and 1 King
  - StaleMate: When King is not under attack but also does dont have proper move: No one will be winner
  - CheckMate: When King is under attack and also does not have proper next move: Player who place check will be winner.
  - Draw: Either player will offer to Draw, other player will have to accept Draw: No Winner
  - Resign: One player will resign and opponent will be declated winner.
- Game:
  - White will start the game
  - While player, each player will have to pick start cell and end cell
    - chess engine will validate move if move is valid, piece will move to end cell
    - pawn will move forward, and will move diagonally to kill
    - Casling: King will move two cell toward Rook and Rook will go to other side of king
    - Rook will move horizontally and vertically till there is no blokage
    - Knight will move two and half: Means 2 step Horizontal / Vertical and 1 step vertical / horizontal Bishop will move diagonally
    - Queen will move diagonally, horizontally and vertically till there is no blokage.
    - One piece will capture piece of another player when end cell overlap with current cell of piece of other player.
    - No piece will jump over piece of same player except knight.
  
### Design
Class Diagram

#### Actors



