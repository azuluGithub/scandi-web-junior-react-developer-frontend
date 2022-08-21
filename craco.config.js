const path = require('path');

module.exports = {
    webpack: {
        alias: {
            "Style": path.resolve(__dirname, "src/style/"),
            "Component": path.resolve(__dirname, "src/component/"),
            "Route": path.resolve(__dirname, "src/route/"),
            "Store": path.resolve(__dirname, "src/store/"),
            "Util": path.resolve(__dirname, "src/util/"),
            "Query": path.resolve(__dirname, "src/query/"),
            "Type": path.resolve(__dirname, "src/type/"),
        },
    }
}
