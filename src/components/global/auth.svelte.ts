export const user = $state({
  is_logged_in: false,
  nome: "",
});

export function log_in(nome = "developer") {
  user.is_logged_in = true;
  user.nome = nome;
}

export function log_out() {
  user.is_logged_in = false;
  user.nome = "";
}
