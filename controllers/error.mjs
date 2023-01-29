export const getError = (req, res, next) => {
    res.render("error", {
        docTitle: "Error 404"
    });
}