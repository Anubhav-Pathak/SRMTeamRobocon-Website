const getHome = (req, res, next) => {
    res.render("admin/home", {
        docTitle: req.admin.name,
        path: '/admin/panel'
    })
}
export default getHome;