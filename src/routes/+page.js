export const load = (async ({ fetch, setHeaders }) => {

    const url = "https://api.calc.cesarsanz.dev/tariffs";
    const response = await fetch(url);
    // cache the page for the same length of time
    // as the underlying data
    setHeaders({
        age: response.headers.get('age'),
        'cache-control': response.headers.get('cache-control')
    });

    return { "tariffsData": response.json() };
});