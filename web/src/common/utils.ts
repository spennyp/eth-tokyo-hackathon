export function openLink(url: string | undefined, newTab: boolean): void {
    if (url) {
        if (newTab) {
            window.open(url, "_blank");
        } else {
            window.open(url, "_self");
        }
    } else {
        console.log("NO URL");
    }
}
