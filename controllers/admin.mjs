const getHome = (req, res, next) => {
    res.render("admin/home", {
        docTitle: req.admin.name,
    })
}
export default getHome;