export const load = (async ({ fetch, setHeaders, params }) => {

    let id = params.slug;
    const url = "https://api.calc.cesarsanz.dev/energy-data/" + id;
    const response = await fetch(url);
    // cache the page for the same length of time
    // as the underlying data
    setHeaders({
        age: response.headers.get('age'),
        'cache-control': response.headers.get('cache-control')
    });
    return { "energyData":  response.json() };
});