var config = {
    // A pale basemap keeps the fountain colors visible. The basemap style. OpenFreeMap's styles need no account and no key.
    style: "https://tiles.openfreemap.org/styles/positron",

    // No centre markers, don't want to be misundertand as a drinking fountain.
    showMarkers: false,

    // No overview map anywhere
    inset: false,

    // The colour of the story panels is "light"
    theme: "light",

    // 3D terrain (off here)
    use3dTerrain: false,

    // Move through the chapters by itself (off here)
    auto: false,

    title: "Finding Water in Vancouver",
    subtitle: "Explore fountain locations, parks, and reported operating seasons.",
    byline: "By Fengyu Zou",
    footer: "Fountain data: <a href='https://opendata.vancouver.ca/explore/assets/drinking-fountains/' target='_blank'>City of Vancouver</a>. Locations are approximate and records do not show live working status. Basemap: OpenFreeMap, OpenMapTiles, and openStreetMap contributors. Adapted from the <a href='https://github.com/FoldingSpace/maplibre-storymap' target='_blank'>FoldingSpace class storymap template</a>, based on MapLibre Storytelling by opengeos. Reuses fountain data from my Exploratory Lab 1.", 

    // The layers your story can show. Each layer starts invisible.
    // A chapter shows a layer when the layer's id is in the chapter's show list.
    layers: [
        {
            id: "my_fountains",
            type: "circle",
            data: "./drinking-fountains.geojson",
            paint: {
                // colors represent reported operating seasons. Blue for Year Round, Orange for May to October, if not then gray.
                "circle-color": ["match", ["get", "in_operation"],
                    ["year-round", "Year Round"], "#0077B6",
                    ["spring to fall", "May-October"], "#D55E00", 
                    "#707070"
                 ],
                "circle-radius": 5,
                "circle-stroke-color": "#FFFFFF",
                "circle-stroke-width": 1
            },
            // Fountain information shown when hovering over a point.
            popup: ["name", "maintainer"],
        }
    ],

    // The chapters, in the order a reader scrolls through them
    // Chapter 1, general openning of the drinking fountain topic
    chapters: [
        {
            alignment: "left",
            title: "Where are Vancouver's drinking fountains?",
            description: "Where could you find drinking water while exploring Vancouver? Each dot represents a fountain in the City's records. Hover over a dot for details. Blue means reported year-round operation, orange means seasonal operation, and gray means the season is not specified. These records do not show whether a fountain is working right now. For more information, visit the <a href='https://vancouver.ca/home-property-development/water-fountains.aspx' target='_blank' rel='noopener noreferrer'>City of Vancouver's drinking fountain information</a>.",
            location: { center: [-123.12, 49.26], zoom: 11, pitch: 0, bearing: 0 },
            show: ["my_fountains"]
        },
        {
            // Chapter 2, change the location focus on Stanley Park
            alignment: "left",
            title: "Explore fountains around Stanley Park",
            description: "Look at the fountain locations around Stanley Park and the surrounding waterfront. Which are reported as year-round, and which are seasonal? Drag the map to explore and hover over the dots for details.",
            location: { center: [-123.139999, 49.299999], zoom: 13, pitch: 0, bearing: 0 },
            
            legend: [
                { color: "#0077B6", label: "Year-round" },
                { color: "#D55E00", label: "Seasonal" },
                { color: "#707070", label: "Season not specified" },
            ],
            
            show: ["my_fountains"],
            // The reader can't move and zoom the map in this chapter
            exploreAllowed: false
        },
        {
            // Chapter 3, location focus on Mount Pleasant area
            alignment: "left",
            title: "Compare a different part of Vancouver",
            description: "Now explore Mount Pleasant and its surroundings. How does the pattern of fountain locations compare with the Stanley Park view? Both chapters use the same zoom level to support comparison. You can drag and zoom the map and hover over fountains for details.",
            location: { center: [-123.107590, 49.259762], zoom: 13, pitch: 0, bearing: 0 },
            // Using the same default level of zoom of 13 to align with the Stanley Park for an accurate comparison
            legend: [
                { color: "#0077B6", label: "Year-round" },
                { color: "#D55E00", label: "Seasonal" },
                { color: "#707070", label: "Season not specified" },
            ],
            show: ["my_fountains"],
            // The reader can't move and zoom the map in this chapter
            exploreAllowed: false
        },
        {
            // Chapter 4, the city wide general look
            alignment: "left",
            title: "Does the season change in the picture?",
            description: "Return to the citywide view. All recorded fountains are shown here, including seasonal fountains and those without a specified operating season. Notice where the blue year-round fountains appear. In the next chapter, we will hide the other categories so you can compare the patterns.",
            location: { center: [-123.12, 49.26], zoom: 11, pitch: 0, bearing: 0 },
            legend: [
                { color: "#0077B6", label: "Year-round" },
                { color: "#D55E00", label: "Seasonal" },
                { color: "#707070", label: "Season not specified" },
            ],
            show: ["my_fountains"],
            callback: "showAllFountains",
            exploreAllowed: true
        },

        {
            // chapter 5, map of drinking fountains that remians year-round
            alignment: "left",
            title: "What remains year-round?",
            description: "Only fountains reported as operating year-round are shown now. The map starts at the same position and zoom as the previous chapter, making the change easier to see. Where do you notice the gaps between the remaining dots? Scroll back to compare with all recorded fountains.",
            location: { center: [-123.12, 49.26], zoom: 11, pitch: 0, bearing: 0 },
            legend: [
                { color: "#0077B6", label: "Year-round" }],
            show: ["my_fountains"],
            callback: "showYearRoundFountains",
            exploreAllowed: true
    }
    ]
    {
            alignment: "left",
            title: "Explore fountains by operating season",
            description: "Drag and zoom to an area you want to explore. Choose a reported operating season below to compare fountain locations while keeping the same map view..",
            location: { center: [-123.12, 49.26], zoom: 11, pitch: 0, bearing: 0 },
            legend: [
                { color: "#0077B6", label: "Year-round" }],
            show: ["my_fountains"],
            callback: "showYearRoundFountains",
            exploreAllowed: true   
    }

};

// Your own functions go below this line (see "Run your own code at a chapter" in README.md).

// functions learned and inspired from showALLTrees() and highlightTrees() in Filtering MapLibre Assignment.
// Show every fountain function
function showAllFountains() {
    map.setFilter('my_fountains', null);
}

// show only fountains reported as operating year-round.
function showYearRoundFountains() {
    map.setFilter('my_fountains', ['match',
                  ['get', 'in_operation'],
                  ['year-round', 'Year Round'], true,
                                   false
                ]);
}
                
