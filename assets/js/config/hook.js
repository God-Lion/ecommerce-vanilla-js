export function hook (controller) {
  if (controller.request.prefix === 'admin') {
    controller.layout = 'admin'
    // if (!controller.Session.isLogged() || controller.Session.user('role') != 'admin') {
    // controller.redirect('users/login')
    // }
  }
}
