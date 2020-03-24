const Clipper = require('image-clipper');
const Canvas = require('canvas');

Clipper.configure({ canvas: Canvas });

function generateTiles(zoomLevels) {
    Clipper('./input.jpg', function () {
        for (let zoom = 1; zoom <= zoomLevels + 1; zoom++) {
            // for every zoom level
            const rowsColumns = 2 ** zoom;

            const { width, height } = this.getCanvas();
            const rowWidth = Math.round(width / rowsColumns);
            const columnHeight = Math.round(height / rowsColumns);

            for (let row = 0; row < rowsColumns; row++) {
                // for every row

                for (let col = 0; col < rowsColumns; col++) {
                    // for every column

                    console.log(`processing: ${zoom - 1}-${row}-${col}`);

                    const startX = Math.round(rowWidth * row);
                    const startY = Math.round(columnHeight * col);

                    this.crop(startX, startY, rowWidth, columnHeight)
                        .resize(256, 256)
                        .quality(80)
                        .toFile(`./tiles/${zoom - 1}-${row}-${col}.jpg`, function () {
                        })
                        .reset();
                }
            }
        }
    });
}


generateTiles(5);
