export default function (word: $TSFixMe): void {
    if (typeof word === 'string') {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
}
