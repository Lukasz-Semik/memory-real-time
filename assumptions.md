# Base Logic

- Shows who starts - 3s (progress bar)
- Board. Current player clicks:
  - first tile? - only publish event to player
  - second tile?, match? -
    - block tiles, mark by whom, add current player a score, change round, publish event
    - ?else, change current player, add round, block board for 3s (progress bar)

# Tiles shape

- array
