import * as UglifyJS from 'uglify-es';
import CleanCss from 'clean-css';

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
    const result = str.replace(
        /<style type="text\/css">[\s\S]*?<\/style>/g,
        (match: string) => `<style>${minifyCss(match)}</style>`
    );

    return result.replace(/style=["'][\s\S*]*?["']/g, (match: string) => {
        const minified = minifyCss(`p{${match.substring(7, match.length - 1)}}`);
        return `style=${match.charAt(6)}${minified.substring(2, minified.length - 1)}${match.charAt(6)}`;
    });
}

function minifyJS(str: string): string {
    return str.replace(
        /<script>[\s\S]*?<\/script>/g,
        (match: string) => `<script>${minifyJs(match.substring(9, match.length - 9))}</script>`
    );
}

function minifyBundleJS(str: string): string {
    return str.replace(
        /<script id="build_index_js">[\s\S]*?<\/script>/g,
        (match: string) => `<script id='build_index_js'>${minifyJs(match.substring(9, match.length - 9))}</script>`
    );
}

function removeWhitespace(str: string): string {
    let result = str;

    result = result.trim();

    // Double / multi spaces to single
    result = result.replace(/[^\S\r\n]+/g, ' ');

    // Collapse everything to a single line
    result = result.replace(/\s*\n+\s*/g, '');

    return result;
}

export function minify(str: string): string {
    const filters = [
        removeComments,
        minifyJS,
        minifyCSS,
        minifyBundleJS,
        removeWhitespace
    ];

    return filters.reduce(
        (result, applyFilter) => applyFilter(result),
        str
    );
}
