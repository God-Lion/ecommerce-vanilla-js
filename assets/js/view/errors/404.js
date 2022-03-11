export async function loadview (vars = null) {
  document.body.innerHTML = `
    <h1>Error 404</h1>
        ${(vars != null) ? '<p>' + vars.get('message') + '</p>' : ''}
    `
}
