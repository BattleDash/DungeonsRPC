# Dungeons RPC

Dungeons RPC is a Node.js program that adds Discord Rich Presence to Minecraft Dungeons.

## Installation

Clone this repository (`git clone https://github.com/BattleDash/DungeonsRPC`), run `npm install` to install the required packages, and then `npm start` or `node index` to start the program!

## Known Bugs

- Level doesn't update immediately, the requests are a bit weird, some requests show as the correct level, and others show as an incorrect one, but the LevelStarted request only gets called a bit into the game for some reason.
- Doesn't work correctly in Online Mode, for some reason the IDs for online mode are completely different and the request timings are as well, need more research to get working

## Contributing
Pull requests are welcome. For major changes or additions, please open an issue first to discuss what you would like to change.

## License
MIT License

Copyright (c) 2020 BattleDash

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
