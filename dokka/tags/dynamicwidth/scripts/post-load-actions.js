/**
 * Compacts `keyValue` table such that the first column of all rows has the width
 * of the longest first column value within the entire table. This way
 * values are justified in relation to each other and are as close to the key as possible.
 *
 *
 * @param dataTogglable value of data-togglable param for the table
 * @see styling for `.keyValue` class
 */
const resizeTable = (dataTogglable) => {
    document.querySelectorAll(`div.table[data-togglable="${dataTogglable}"]`).forEach(table => {
        let tableGrids = table.querySelectorAll("div.keyValue")

        // see @media print, screen and (min-width: 960px)
        if (window.innerWidth < 960) {
            // just want to reset it so that it's shrunk
            // and displayed properly on narrow screens
            tableGrids.forEach(tableGrid => {
                tableGrid.style.gridTemplateColumns = null
            })
            return
        }

        let firstColumn = table.querySelectorAll("span.inline-flex div")
        let firstColumnWidths = Array.from(firstColumn).map(col => col.clientWidth)
        let maxFirstColWidth = Math.max(...firstColumnWidths)

        let tableWidth = table.clientWidth;
        if (tableWidth === maxFirstColWidth) {
            // javascript being javascript - something hasn't been loaded completely, most likely
            // styles. Imo simple retry is better than various hacks for waiting for styles to
            // load that might not work in all browsers
            setTimeout(function () {
                resizeTable(dataTogglable)
            }, 100)
            return
        }

        // taken from the default grid-template-columns: 35% 65%;
        let fortyPercentOfTableWidth = tableWidth * 0.35;

        // We want first col to be as close to the longest text as possible,
        // but occupy no more than 40% of the overall table width in case
        // there's some long class names. +15 is just to have some offset
        let newFirstColWidth = Math.min(maxFirstColWidth + 15, fortyPercentOfTableWidth)

        tableGrids.forEach(tableGrid => {
            tableGrid.style.gridTemplateColumns = newFirstColWidth + "px auto"
        })
    })
}

resizeTables = () => {
    resizeTable("See also")
    resizeTable("Throws")
    resizeTable("Parameters")
}

window.onresize = event => {
    resizeTables()
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        resizeTables()
    })
} else {
    resizeTables()
}
