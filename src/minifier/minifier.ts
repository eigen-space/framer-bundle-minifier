import * as UglifyJS from 'uglify-es';
import CleanCss from 'clean-css';

export function minify(str: string): string {
    const filters = [
        removeComments,
        minifyJS,
        minifyCSS,
        removeWhitespace
    ];

    let result = str;
    filters.forEach(applyFilter => result = applyFilter(result));

    return result;
}

function minifyJs(str: string): string {
    return UglifyJS.minify(str).code;
}

function minifyCss(str: string): string {
    return new CleanCss({ level: 0 }).minify(str).styles;
}

function removeComments(str: string): string {
    return str.replace(/<!--[\s\S]*?-->/g, '');
}

function minifyCSS(str: string): string {
    return str.replace(
        /(<style.*?>)([\s\S]*?)(<\/style>)/g,
        (_, openTag: string, content: string, closeTag: string) => {
            return `${openTag}${minifyCss(content.trim())}${closeTag}`;
        }
    );
}

function minifyJS(str: string): string {
    return str.replace(
        /(<script.*?>)([\s\S]*?)(<\/script>)/g,
        (_, openTag: string, content: string, closeTag: string) => {
            return `${openTag}${minifyJs(content.trim())}${closeTag}`;
        }
    );
}

function removeWhitespace(str: string): string {
    const withoutSpacesInBorders = str.trim();
    const withoutMultiSpaces = withoutSpacesInBorders.replace(/[^\S\r\n]+/g, ' ');
    return withoutMultiSpaces.replace(/\s*\n+\s*/g, '');
}
