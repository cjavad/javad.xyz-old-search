function getDist(stringA, stringB) {
    var distArray = levenshteinenator(stringA.toLowerCase(), stringB.toLowerCase());
    return distArray[distArray.length - 1][distArray[distArray.length - 1].length - 1];
}

function search(query) {
    var all = document.getElementsByClassName("searchable");
    var all_matches = []

    for (let i = 0; i < all.length; i++) {
        var elm = $(all[i]);

        if (query === "") {
            elm.show();

        } else {
            var title = elm.find("h3").text().toLowerCase();
            query = query.toLowerCase();

            var distance = getDist(title, query);
            var doesMatch = false;

            var queries = query.split(" ");

            for (let i = 0; i < queries.length; i++) {
                if (title.indexOf(queries[i]) > -1) {
                    doesMatch = true;
                    break;
                } else {
                    doesMatch = false;
                    continue;
                }
            }

            if (doesMatch) {
                all_matches.push([
                    distance,
                    elm
                ])
            } else {
                elm.hide();
            }
        }
    }

    all_matches.sort((a, b) => {
        return a[0] - b[0];
    });

    for (let i = 0; i < all_matches.length; i++) {
        all_matches[i][1].show();
        all_matches[i][1].appendTo("#list");
    }
}

$(document).ready(() => {
    $("#search").keyup(() => {
        search($("#search").val());
    });
})